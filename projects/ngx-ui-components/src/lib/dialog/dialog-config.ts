import { GlobalPositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { DialogRole, DialogSize } from './dialog.interface';

export class DialogConfig<D = any> {
  /** Data being passed to the child component. */
  data?: D = null;

  /** The ARIA role of the dialog element. */
  role?: DialogRole = 'dialog';

  /** Setters for the dialog's size. */
  size?: DialogSize;

  /** Whether the dialog has a backdrop. */
  hasBackdrop? = true;

  /** Whether the dialog should close when the user clicks on the backdrop. */
  closeOnBackdropClick? = true;

  /** Whether the dialog should close when the user presses escape. */
  closeOnEscape? = true;

  /** Whether the dialog should close when the user goes backwards/forwards in history. */
  closeOnNavigation? = true;

  /** Whether the dialog should focus the first focusable element on open. */
  autoFocus? = true;

  /** Whether the dialog should listen to CSS animations instead of Angular animations. */
  useCssAnimations? = false;

  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null = null;

  /** ID of the element that labels the dialog. */
  ariaLabelledBy?: string | null = null;

  /** Aria label to assign to the dialog element. */
  ariaLabel?: string | null = null;

  /** Custom class for the dialog. */
  dialogClass?: string;

  /** Custom class for the overlay pane. */
  panelClass?: string;

  /** Custom class for the backdrop. */
  backdropClass?: string;

  /** Position strategy to be used for the dialog. */
  positionStrategy?: GlobalPositionStrategy;

  /** Scroll strategy to be used for the dialog. */
  scrollStrategy?: ScrollStrategy;
}
