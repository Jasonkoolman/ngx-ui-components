import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { DialogContainerComponent } from './dialog-container.component';
import { AnimationPhase, AnimationState } from '../core/animations';

enum KeyCode {
  Escape = 'Escape'
}

export class DialogRef<T = any> {

  /** The instance of component opened into the dialog. */
  public componentInstance: T;

  /** Subject for notifying that the dialog has finished opening. */
  private afterOpened$: Subject<void> = new Subject();

  /** Subject for notifying that the dialog has finished closing. */
  private afterClosed$: Subject<void> = new Subject();

  /** Subject for notifying that the dialog has started closing. */
  private beforeClosed$: Subject<void> = new Subject();

  constructor(
    private overlayRef: OverlayRef,
    public containerInstance: DialogContainerComponent,
    public readonly id = containerInstance.attrId
  ) {
    containerInstance.nextAnimationEvent(AnimationPhase.Done, AnimationState.Enter).subscribe(() => {
      this.afterOpened$.next();
      this.afterOpened$.complete();
    });

    overlayRef.keydownEvents().subscribe((event) => {
      if (containerInstance.dialogConfig.closeOnEscape && event.code === KeyCode.Escape) {
        this.close();
      }
    });

    overlayRef.backdropClick().subscribe(() => {
      if (containerInstance.dialogConfig.closeOnBackdropClick) {
        this.close();
      } else {
        containerInstance.recaptureFocus();
      }
    });
  }

  /**
   * Close the dialog.
   *
   * @param result  Result to return to the dialog opener.
   */
  close(result?: any): void {
    this.containerInstance.nextAnimationEvent(AnimationPhase.Start, AnimationState.Exit).subscribe(() => {
      this.beforeClosed$.next();
      this.beforeClosed$.complete();
      this.overlayRef.detachBackdrop();
    });

    this.containerInstance.nextAnimationEvent(AnimationPhase.Done, AnimationState.Exit).subscribe(() => {
      this.overlayRef.dispose();
      this.afterClosed$.next(result);
      this.afterClosed$.complete();
      this.componentInstance = null;
    });

    this.containerInstance.startExitAnimation();
  }

  /**
   * Get an observable that is notified when the dialog is finished opening.
   */
  afterOpened(): Observable<void> {
    return this.afterOpened$.asObservable();
  }

  /**
   * Get an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<any> {
    return this.afterClosed$.asObservable();
  }

  /**
   * Get an observable that is notified when the dialog has started closing.
   */
  beforeClosed(): Observable<void> {
    return this.beforeClosed$.asObservable();
  }

}
