const styleDeclaration = document.createElement('div').style;

/** Default animation state */
export enum AnimationState {
  Initial = 'initial',
  Enter = 'enter',
  Exit = 'exit',
  Void = 'void'
}

/** Default animation phase */
export enum AnimationPhase {
  Start = 'start',
  Done = 'done'
}

/** Represents an abstract animation event. */
export interface AbstractAnimationEvent {
  phaseName: AnimationPhase;
  toState: AnimationState;
}

/** Holds the (cross-browser) animation event names. */
export class AnimationEventName {
  constructor(
    public animationstart: string,
    public animationend: string
  ) {}
}

/**
 * Get the supported animation event names.
 *
 * For cross-browser support, we need to include the prefix when necessary.
 */
export function getAnimationEvents(): AnimationEventName | null {
  return getSupported({
    animation: new AnimationEventName('animationstart', 'animationend'),
    OAnimation: new AnimationEventName('oAnimationStart', 'oAnimationEnd'),
    MozAnimation: new AnimationEventName('animationstart', 'animationend'),
    WebkitAnimation: new AnimationEventName('webkitAnimationStart', 'webkitAnimationEnd')
  });
}

/**
 * Get the supported property name.
 */
function getSupported(props: {[key: string]: any}): any | null {
  for (const key in props) {
    if (styleDeclaration[key] !== undefined) {
      return props[key];
    }
  }
  return null;
}
