import { animate, animation, keyframes, style, AnimationReferenceMetadata } from '@angular/animations';

const DEFAULT_PARAMS = {
  duration: 280,
  delay: 0,
  timingFunction: 'cubic-bezier(0.25, 0, 0.25, 1)'
};

export const scaleIn = scaleAnimation('enter', 0.6, 1);
export const scaleInUp = scaleAnimation('enter', 0.6, 1, 'bottom');
export const scaleInDown = scaleAnimation('enter', 0.6, 1, 'top');
export const scaleInLeft = scaleAnimation('enter', 0.6, 1, 'right');
export const scaleInRight = scaleAnimation('enter', 0.6, 1, 'left');

export const scaleOut = scaleAnimation('leave', 1, 0.6);
export const scaleOutUp = scaleAnimation('leave', 1, 0.6, 'bottom');
export const scaleOutDown = scaleAnimation('leave', 1, 0.6, 'top');
export const scaleOutLeft = scaleAnimation('leave', 1, 0.6, 'right');
export const scaleOutRight = scaleAnimation('leave', 1, 0.6, 'left');

/**
 * Produces a reusable scale animation.
 *
 * @param state             State of the animation, either 'enter' or 'leave'
 * @param startScale        The starting scale size
 * @param endScale          The ending scale size
 * @param transformOrigin   Origin of the transformation
 */
export function scaleAnimation(
  state: 'enter' | 'leave',
  startScale: number,
  endScale: number,
  transformOrigin?: string | number
): AnimationReferenceMetadata {
  return animation(
    animate(
      '{{ duration }}ms {{ delay }}ms {{ timingFunction }}',
      keyframes([
        style(scaleStart(state, startScale, transformOrigin)),
        style(scaleEnd(state, endScale))
      ])
    ),
    { params: DEFAULT_PARAMS }
  );
}

/**
 * Gets the starting styles for the scale animation.
 */
function scaleStart(state, scale, transformOrigin?) {
  return {
    offset: 0,
    opacity: state === 'enter' ? 0 : 1,
    transform: `scale(${scale})`,
    ...(transformOrigin && { transformOrigin }),
  };
}

/**
 * Gets the ending styles for the scale animation.
 */
function scaleEnd(state, scale) {
  return {
    offset: 1,
    opacity: state === 'enter' ? 1 : 0,
    transform: `scale(${scale})`,
  }
}
