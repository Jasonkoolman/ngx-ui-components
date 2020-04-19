import { ConnectedPosition } from '@angular/cdk/overlay';

export enum TooltipPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left'
}

/**
 * Connected position relative to the target element.
 */
export const ConnectedPositions: {[key: string]: ConnectedPosition} = {
  [TooltipPosition.Top]: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom'
  },
  [TooltipPosition.Right]: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center'
  },
  [TooltipPosition.Bottom]: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top'
  },
  [TooltipPosition.Left]: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  }
}
