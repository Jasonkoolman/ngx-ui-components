import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeOut, scaleIn } from '../core/animations';

/**
 * The default dialog animation.
 */
export function dialogAnimation() {
  return trigger('dialog', [
    state('initial, void', style({opacity: 0})),
    transition('* => enter',
      useAnimation(scaleIn, {
        params: {timingFunction: 'cubic-bezier(0, 0, 0.25, 1)'}
      })
    ),
    transition('* => exit',
      useAnimation(fadeOut)
    )
  ]);
}
