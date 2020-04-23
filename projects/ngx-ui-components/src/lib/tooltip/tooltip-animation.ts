import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeOut, scaleIn } from '../core/animations';

/**
 * The default tooltip animation.
 */
export function tooltipAnimation() {
  return trigger('tooltip', [
    state('void, initial', style({opacity: 0})),
    transition('* => enter',
      useAnimation(scaleIn, {
        params: {duration: 200}
      })
    ),
    transition('* => exit',
      useAnimation(fadeOut, {
        params: {duration: 100}
      })
    )
  ]);
}
