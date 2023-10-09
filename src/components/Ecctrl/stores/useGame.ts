import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useGame = create(
  subscribeWithSelector<State>((set) => ({
    /**
     * Character animations state manegement
     */
    // Initial animation
    curAnimation: null as unknown as string,
    animationSet: {} as AnimationSet,

    initializeAnimationSet: (animationSet: AnimationSet) => {
      set((state) => {
        if (Object.keys(state.animationSet).length === 0) {
          return { animationSet };
        }
        return {};
      });
    },

    reset: () => {
      set((state) => ({ curAnimation: state.animationSet.idle }));
    },

    idle: () => {
      set((state) => {
        if (state.curAnimation === state.animationSet.jumpIdle) {
          return { curAnimation: state.animationSet.jumpLand };
        }
        if (
          state.curAnimation !== state.animationSet.action1 &&
          state.curAnimation !== state.animationSet.action2 &&
          state.curAnimation !== state.animationSet.action3 &&
          state.curAnimation !== state.animationSet.action4
        ) {
          return { curAnimation: state.animationSet.idle };
        }
        return {};
      });
    },

    walk: () => {
      set((state) => {
        if (state.curAnimation !== state.animationSet.action4) {
          return { curAnimation: state.animationSet.walk };
        }
        return {};
      });
    },

    run: () => {
      set((state) => {
        if (state.curAnimation !== state.animationSet.action4) {
          return { curAnimation: state.animationSet.run };
        }
        return {};
      });
    },

    jump: () => {
      set((state) => ({ curAnimation: state.animationSet.jump }));
    },

    jumpIdle: () => {
      set((state) => {
        if (state.curAnimation === state.animationSet.jump) {
          return { curAnimation: state.animationSet.jumpIdle };
        }
        return {};
      });
    },

    jumpLand: () => {
      set((state) => {
        if (state.curAnimation === state.animationSet.jumpIdle) {
          return { curAnimation: state.animationSet.jumpLand };
        }
        return {};
      });
    },

    fall: () => {
      set((state) => ({ curAnimation: state.animationSet.fall }));
    },

    action1: () => {
      set((state) => {
        if (state.curAnimation === state.animationSet.idle) {
          return { curAnimation: state.animationSet.action1 };
        }
        return {};
      });
    },

    action2: () => {
      set((state) => {
        if (state.curAnimation === state.animationSet.idle) {
          return { curAnimation: state.animationSet.action2 };
        }
        return {};
      });
    },

    action3: () => {
      set((state) => {
        if (state.curAnimation === state.animationSet.idle) {
          return { curAnimation: state.animationSet.action3 };
        }
        return {};
      });
    },

    action4: () => {
      set((state) => {
        if (
          state.curAnimation === state.animationSet.idle ||
          state.curAnimation === state.animationSet.walk ||
          state.curAnimation === state.animationSet.run
        ) {
          return { curAnimation: state.animationSet.action4 };
        }
        return {};
      });
    },
  }))
);

export type AnimationSet = {
  idle: string;
  walk: string;
  run: string;
  jump: string;
  jumpIdle: string;
  jumpLand: string;
  fall: string;
  // Currently support four additional animations
  action1: string;
  action2: string;
  action3: string;
  action4: string;
};

type State = {
  curAnimation: string;
  animationSet: AnimationSet;
  initializeAnimationSet: (animationSet: AnimationSet) => void;
  reset: () => void;
} & {
  [key in keyof AnimationSet]: () => void;
};
