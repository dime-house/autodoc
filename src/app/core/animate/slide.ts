import { animate, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDurations } from './defaults';

const slideInTop = trigger('slideInTop',
  [
    state('void',
      style({
        transform: 'translate3d(0, -100%, 0)',
      }),
    ),

    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.entering } ${ AnimationCurves.deceleration }`,
        },
      },
    ),
  ],
);

const slideInBottom = trigger('slideInBottom',
  [
    state('void',
      style({
        transform: 'translate3d(0, 100%, 0)',
      }),
    ),

    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.entering } ${ AnimationCurves.deceleration }`,
        },
      },
    ),
  ],
);
const slideInLeft = trigger('slideInLeft',
  [
    state('void',
      style({
        transform: 'translate3d(-100%, 0, 0)',
      }),
    ),

    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    transition('void => false', []),

    transition('void => *', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.entering } ${ AnimationCurves.deceleration }`,
        },
      },
    ),
  ],
);
const slideInRight = trigger('slideInRight',
  [
    state('void',
      style({
        transform: 'translate3d(100%, 0, 0)',
      }),
    ),

    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.entering } ${ AnimationCurves.deceleration }`,
        },
      },
    ),
  ],
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out top
// -----------------------------------------------------------------------------------------------------
const slideOutTop = trigger('slideOutTop',
  [
    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    state('void',
      style({
        transform: 'translate3d(0, -100%, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.exiting } ${ AnimationCurves.acceleration }`,
        },
      },
    ),
  ],
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out bottom
// -----------------------------------------------------------------------------------------------------
const slideOutBottom = trigger('slideOutBottom',
  [
    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    state('void',
      style({
        transform: 'translate3d(0, 100%, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.exiting } ${ AnimationCurves.acceleration }`,
        },
      },
    ),
  ],
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out left
// -----------------------------------------------------------------------------------------------------
const slideOutLeft = trigger('slideOutLeft',
  [
    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    state('void',
      style({
        transform: 'translate3d(-100%, 0, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.exiting } ${ AnimationCurves.acceleration }`,
        },
      },
    ),
  ],
);

// -----------------------------------------------------------------------------------------------------
// @ Slide out right
// -----------------------------------------------------------------------------------------------------
const slideOutRight = trigger('slideOutRight',
  [
    state('*',
      style({
        transform: 'translate3d(0, 0, 0)',
      }),
    ),

    state('void',
      style({
        transform: 'translate3d(100%, 0, 0)',
      }),
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'),
      {
        params: {
          timings: `${ AnimationDurations.exiting } ${ AnimationCurves.acceleration }`,
        },
      },
    ),
  ],
);

export {
  slideInTop,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideOutTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
};
