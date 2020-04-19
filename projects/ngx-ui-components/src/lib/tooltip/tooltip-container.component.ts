import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { AbstractAnimationEvent, AnimationPhase, AnimationState } from "../core/animations";
import { TooltipPosition } from "./tooltip.enum";
import { tooltipAnimation } from "./tooltip-animation";
import { classNames } from "../core/utils";
import { Observable } from "rxjs";
import { filter, first, mapTo, timeout } from "rxjs/operators";

// TODO: Support auto positioning
// TODO: Support useCssAnimations?

const baseClass = 'ui-tooltip';
const animationTimeout = 500;

@Component({
  selector: 'ui-tooltip',
  template: '{{ content }}',
  animations: [tooltipAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipContainerComponent implements OnInit {
  /** Content to display in the tooltip */
  content: string;

  /** Position of the tooltip */
  position: TooltipPosition;

  /** Custom class to be added to the tooltip */
  tooltipClass: string;

  /** State of the animation */
  animationState: AnimationState = AnimationState.Initial;

  /** Emits when the animation state changed */
  readonly animationStateChanged$ = new EventEmitter<AbstractAnimationEvent>();

  @HostBinding('attr.role') attrRole = 'tooltip';
  @HostBinding('@tooltip') get animationBiding() { return this.animationState; }

  constructor(private elementRef: ElementRef) {}

  @HostListener('@tooltip.start', ['$event'])
  @HostListener('@tooltip.done', ['$event'])
  onAnimationEvent(event) {
    this.updateAnimationState(
      event.phaseName as AnimationPhase,
      event.toState as AnimationState
    );
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.className = classNames(
      baseClass,
      baseClass + '-' + this.position,
      this.tooltipClass
    );
  }

  /**
   * Start showing the tooltip.
   */
  show() {
    this.animationState = AnimationState.Enter;
  }

  /**
   * Start hiding the tooltip.
   */
  hide() {
    this.animationState = AnimationState.Exit;
  }

  /**
   * Notifies once after the tooltip was shown.
   */
  afterShown(): Observable<void> {
    return this.animationEvent(AnimationPhase.Done, AnimationState.Enter).pipe(
      mapTo(null), first(), filter(() => this.isShowing()), timeout(animationTimeout)
    );
  }

  /**
   * Notifies once after the tooltip was hidden.
   */
  afterHidden(): Observable<void> {
    return this.animationEvent(AnimationPhase.Done, AnimationState.Exit).pipe(
      mapTo(null), first(), filter(() => !this.isShowing()), timeout(animationTimeout)
    );
  }

  /**
   * Whether the tooltip is (busy) showing.
   */
  isShowing(): boolean {
    return this.animationState === AnimationState.Enter;
  }

  /**
   * Gets the tooltip animation events matching the given criteria.
   */
  animationEvent(phaseName: AnimationPhase, toState: AnimationState): Observable<AbstractAnimationEvent> {
    return this.animationStateChanged$.pipe(
      filter(event => event.phaseName === phaseName && event.toState === toState),
    );
  }

  /**
   * Updates the animation state.
   */
  private updateAnimationState(phaseName: AnimationPhase, toState: AnimationState) {
    this.animationStateChanged$.emit({
      phaseName,
      toState,
    });
  }
}

