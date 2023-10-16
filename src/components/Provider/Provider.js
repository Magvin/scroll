import { createContext } from "react";

export const EcommerceContext = createContext();


export const InitialState = {
    windowOpen: false

};

export const reducers = (state, action) => {
  switch (action.type) {
    case "SET_WINDOW":
      return setActiveInput(state);
    default:
      return state;
  }
};

function setActiveInput(state) {
    return {
      ...state,
      windowOpen: !state.windowOpen,
    };
}