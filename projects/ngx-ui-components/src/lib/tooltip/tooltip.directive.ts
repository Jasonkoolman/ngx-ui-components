import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from "@angular/cdk/portal";

import { TooltipPosition, ConnectedPositions } from './tooltip.enum';
import { TooltipContainerComponent } from "./tooltip-container.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";


// TODO: Support fallback position (left <-> right, top <-> bottom)
// TODO: Support multiple listeners / touch gestures


@Directive({
  selector: '[ui-tooltip], [uiTooltip]',
  exportAs: 'uiTooltip'
})
export class TooltipDirective implements OnInit, OnDestroy {
  /** Content of the tooltip */
  @Input('uiTooltip') content = '';

  /** Position of the tooltip relative to the origin */
  @Input() position: string = TooltipPosition.Bottom;

  /** The delay before showing the tooltip */
  @Input() showDelay = 0;

  /** The delay before hiding the tooltip */
  @Input() hideDelay = 0;

  /** Whether the tooltip is disabled */
  @Input() disabled: boolean;

  /** Emits when the tooltip is done showing */
  @Output() tooltipShown = new EventEmitter<void>();

  /** Emits when the tooltip is done hiding */
  @Output() tooltipHidden = new EventEmitter<void>();

  /** Subject that notifies when the directive is destroyed */
  private destroyed$ = new Subject<void>();

  /** Reference to the tooltip overlay */
  private overlayRef: OverlayRef;

  /** The component portal into which the tooltip will be loaded. */
  private componentPortal: ComponentPortal<TooltipContainerComponent>;

  /** Reference to the tooltip overlay */
  private componentInstance: TooltipContainerComponent;

  /** Connected tooltip position relative to the origin */
  private connectedPosition: ConnectedPosition;

  /** Timeout id for the show delay */
  private showTimeout: number | null;

  /** Timeout id for the hide delay */
  private hideTimeout: number | null;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  ngOnInit(): void {}

  /**
   * Shows the tooltip.
   */
  show(delay = this.showDelay) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    if (this.disabled || this.isShowing || this.showTimeout) {
      return;
    }

    this.showTimeout = setTimeout(() => {
      this.componentInstance = this.componentInstance || this.attach();
      this.componentInstance
        .afterShown()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => this.tooltipShown.emit());

      this.componentInstance.show();
      this.showTimeout = null;
    }, delay);
  }

  /**
   * Hides the tooltip.
   */
  hide(delay = this.hideDelay) {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    if (!this.componentInstance || !this.isShowing || this.hideTimeout) {
      return;
    }

    this.hideTimeout = setTimeout(() => {
      this.componentInstance
        .afterHidden()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          this.detach();
          this.tooltipHidden.emit();
        });

      this.componentInstance.hide();
      this.hideTimeout = null;
    }, delay);
  }

  /**
   * Whether the tooltip components is (busy) showing.
   */
  get isShowing(): boolean {
    return this.componentInstance && this.componentInstance.isShowing();
  }

  /**
   * Attaches a new tooltip component.
   */
  attach(): TooltipContainerComponent {
    this.detach();
    this.connectedPosition = this.connectedPosition || ConnectedPositions[this.position]
    this.overlayRef = this.overlayRef || this.createOverlay();
    this.componentPortal = this.componentPortal || new ComponentPortal(TooltipContainerComponent);

    const instance = this.overlayRef.attach(this.componentPortal).instance
    instance.content = this.content;
    instance.position = this.position as TooltipPosition;

    return instance;
  }

  /**
   * Detaches the current tooltip component.
   */
  detach() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.componentInstance = null;
  }

  /**
   * Creates a new tooltip overlay.
   */
  createOverlay(): OverlayRef {
    const scrollStrategy = this.overlay.scrollStrategies.close();
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withTransformOriginOn('.ui-tooltip')
      .withPositions([this.connectedPosition]);

    return this.overlay.create({
      positionStrategy,
      scrollStrategy,
      panelClass: 'ui-tooltip-panel',
      hasBackdrop: false
    });
  }

  /**
   * Invoked when the directive is destroyed.
   */
  ngOnDestroy() {
    this.detach();
    this.destroyed$.next();
    this.destroyed$.complete();

    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

}
