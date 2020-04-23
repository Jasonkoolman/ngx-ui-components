import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { animations } from '@koolm/ngx-ui-components';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({opacity: 0}),
      stagger(100, useAnimation(animations.fadeInLeft))
    ], {optional: true}),
    query(':leave', [
      stagger(100, useAnimation(animations.fadeOutLeft))
    ], {optional: true}),
  ])
]);
