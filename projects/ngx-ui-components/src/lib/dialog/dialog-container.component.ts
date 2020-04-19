import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { ConfigurableFocusTrapFactory, ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { AnimationEvent } from '@angular/animations';
import { Observable, Subject, fromEvent, merge, race, timer } from 'rxjs';
import { first, mapTo, takeUntil, tap } from 'rxjs/operators';

import { AbstractAnimationEvent, AnimationPhase, AnimationState, getAnimationEvents } from '../core/animations';
import { classNames } from '../core/utils';
import { DialogConfig } from './dialog-config';
import { dialogAnimation } from './dialog-animation';

let uniqueId = 0;
const baseClass = 'ui-dialog';
const animationEvents = getAnimationEvents();
const animationsSupported = !!animationEvents;
const animationTimeout = 1000;

@Component({
  selector: 'ui-dialog',
  template: '<ng-template cdkPortalOutlet></ng-template>',
  animations: [dialogAnimation()]
})
export class DialogContainerComponent implements OnInit, OnDestroy {
  private document: Document;

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;

  /** Subject that notifies when the component is destroyed */
  private destroyed$ = new Subject<void>();

  /** The focus trap class to keep the focus inside of the dialog. */
  private focusTrap: ConfigurableFocusTrap;

  /** The element that was focused before opening the dialog */
  private previouslyFocusedElement: HTMLElement;

  /** Whether or not to use CSS animations */
  private useCssAnimation = this.dialogConfig.useCssAnimations && animationsSupported;

  /** State of the animation */
  private animationState: AnimationState = AnimationState.Enter;

  /** Emits when the animation state changed */
  public readonly animationStateChanged$ = new EventEmitter<AbstractAnimationEvent>();

  @HostBinding('class') classes = classNames(baseClass, this.dialogConfig.dialogClass);
  @HostBinding('tabindex') tabIndex = -1;
  @HostBinding('attr.id') attrId = `${baseClass}-${uniqueId++}`;
  @HostBinding('attr.role') attrRole = this.dialogConfig.role;
  @HostBinding('attr.aria-modal') ariaModal = true;
  @HostBinding('attr.aria-label') ariaLabel = this.dialogConfig.ariaLabel;
  @HostBinding('attr.aria-labelledby') ariaLabelledBy = this.dialogConfig.ariaLabelledBy;
  @HostBinding('attr.aria-describedby') ariaDescribedBy = this.dialogConfig.ariaDescribedBy;
  @HostBinding('@.disabled') animationDisabled = this.useCssAnimation;
  @HostBinding('@container') get animationBinding() { return this.animationState; }

  constructor(
    @Inject(DOCUMENT) document: any,
    private elementRef: ElementRef,
    private focusTrapFactory: ConfigurableFocusTrapFactory,
    public readonly dialogConfig: DialogConfig
  ) {
    this.document = document as Document;
  }

  @HostListener('@container.start', ['$event'])
  @HostListener('@container.done', ['$event'])
  onAnimationEvent(event: AnimationEvent) {
    if (!this.useCssAnimation) {
      // TODO: Write bug report to Angular: events are invoked when animation is disabled
      this.updateAnimationState(
        event.phaseName as AnimationPhase,
        event.toState as AnimationState
      );
    }
  }

  /**
   * Invoked when the dialog is initialized.
   */
  ngOnInit() {
    this.trapFocus();

    if (this.useCssAnimation) {
      this.bindAnimationListeners();
      this.setAnimationStateClass();
    }
  }

  /**
   * Attach a ComponentPortal as content to this dialog.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw new Error('Dialog content has already been attached.');
    }

    return this.portalOutlet.attachComponentPortal(portal);
  }

  /**
   * Get the first dialog animation event matching the given criteria.
   *
   * Mocks the event after the 'animationTimeout' time has passed, which covers
   * rare cases when the animation event is not fired - for whatever reason.
   */
  nextAnimationEvent(phaseName: AnimationPhase, toState: AnimationState): Observable<AbstractAnimationEvent> {
    const $event = this.animationStateChanged$.pipe(
      first(event => event.phaseName === phaseName && event.toState === toState),
    );

    return race($event,
      timer(animationTimeout).pipe(
        tap(() => console.warn('Dialog animation event did not fire on time - mocking the event.')),
        mapTo({ phaseName, toState }),
      )
    ).pipe(
      takeUntil(this.destroyed$)
    );
  }

  /**
   * Start the exit animation.
   */
  startExitAnimation(): void {
    this.animationState = AnimationState.Exit;

    if (this.useCssAnimation) {
      this.setAnimationStateClass();
    }
  }

  /**
   * Moves focus back into the dialog if it was moved out.
   */
  recaptureFocus() {
    if (!this.hasFocus() && !this.focusTrap.focusInitialElement()) {
      this.elementRef.nativeElement.focus();
    }
  }

  /**
   * Moves focus inside of a focus trap.
   */
  private trapFocus() {
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
    this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);

    if (this.dialogConfig.autoFocus) {
      this.focusTrap.focusInitialElementWhenReady();
    } else if (!this.hasFocus()) {
      this.elementRef.nativeElement.focus();
    }
  }

  /**
   * Restores focus to the element that was focused before the dialog opened.
   */
  private restoreFocus() {
    const toFocus = this.previouslyFocusedElement;
    const activeElement = this.document.activeElement;
    const element = this.elementRef.nativeElement;

    // Make sure that focus is still inside the dialog or is on the body (usually because
    // a non-focusable element like the backdrop was clicked) before moving it.
    if (toFocus && (!activeElement
      || activeElement === this.document.body
      || activeElement === element
      || element.contains(activeElement)
    )) {
      toFocus.focus();
    }

    this.focusTrap.destroy();
  }

  /**
   * Returns whether focus is inside the dialog.
   */
  private hasFocus() {
    const element = this.elementRef.nativeElement;
    const activeElement = this.document.activeElement;
    return element === activeElement || element.contains(activeElement);
  }

  /**
   * Set the animation state class on the host to allow for CSS animations.
   */
  private setAnimationStateClass() {
    const classList = this.elementRef.nativeElement.classList;
    const className = [baseClass, this.animationState].join('-');
    const enterClass = [baseClass, AnimationState.Enter].join('-');

    if (this.animationState === AnimationState.Exit && classList.contains(enterClass)) {
      classList.remove(enterClass);
    }

    classList.add(className);
  }

  /**
   * Listen to animation events on the host and update the state accordingly.
   */
  private bindAnimationListeners() {
    const element = this.elementRef.nativeElement;

    merge(
      fromEvent(element, animationEvents.animationstart).pipe(mapTo(AnimationPhase.Start)),
      fromEvent(element, animationEvents.animationend).pipe(mapTo(AnimationPhase.Done))
    ).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(phaseName => {
      this.updateAnimationState(phaseName, this.animationState);
    });
  }

  /**
   * Update the animation state.
   */
  private updateAnimationState(phaseName: AnimationPhase, toState: AnimationState) {
    this.animationStateChanged$.emit({
      phaseName,
      toState,
    });
  }

  /**
   * Invoked when the dialog is destroyed.
   */
  ngOnDestroy(): void {
    this.restoreFocus();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
