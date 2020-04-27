import { animate, animation, AnimationReferenceMetadata, keyframes, style } from '@angular/animations';

const DEFAULT_PARAMS = {
  duration: 280,
  delay: 0,
  timingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
};

export const fadeIn = fadeAnimation('enter', 0, 0, 0, 0);
export const fadeInUp = fadeAnimation('enter', 0, '20%', 0, 0);
export const fadeInDown = fadeAnimation('enter', 0, '-20%', 0, 0);
export const fadeInLeft = fadeAnimation('enter', '-20%', 0, 0, 0);
export const fadeInRight = fadeAnimation('enter', '20', 0, 0, 0);

export const fadeOut = fadeAnimation('exit', 0, 0, 0, 0);
export const fadeOutUp = fadeAnimation('exit', 0, 0, 0, '20%');
export const fadeOutDown = fadeAnimation('exit', 0, 0, 0, '-20%');
export const fadeOutLeft = fadeAnimation('exit', 0, 0, '-20%', 0);
export const fadeOutRight = fadeAnimation('exit', 0, 0, '20%', 0);

/**
 * Produces a reusable fade animation.
 *
 * @param state   State of the animation, either 'enter' or 'exit'
 * @param startX  The starting X coordinate
 * @param startY  The starting Y coordinate
 * @param endX    The ending X coordinate
 * @param endY    The ending Y coordinate
 */
export function fadeAnimation(
  state: 'enter' | 'exit',
  startX: string | number,
  startY: string | number,
  endX: string | number,
  endY: string | number
): AnimationReferenceMetadata {
  return animation(
    animate(
      '{{ duration }}ms {{ delay }}ms {{ timingFunction }}',
      keyframes([
        style(fadeStart(state, startX, startY)),
        style(fadeEnd(state, endX, endY))
      ])
    ),
    {params: DEFAULT_PARAMS}
  );
}

/**
 * Gets the starting styles for the fade animation.
 */
export function fadeStart(state, x, y) {
  return {
    offset: 0,
    opacity: state === 'enter' ? 0 : 1,
    transform: `translate3d(${x}, ${y}, 0)`
  };
}

/**
 * Gets the ending styles for the fade animation.
 */
export function fadeEnd(state, x, y) {
  return {
    offset: 1,
    opacity: state === 'enter' ? 1 : 0,
    transform: `translate3d(${x}, ${y}, 0)`
  };
}
