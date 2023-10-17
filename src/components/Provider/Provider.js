import { createContext } from "react";

export const EcommerceContext = createContext();


export const InitialState = {
    windowOpen: false,
    target: null

};

export const reducers = (state, action) => {
  switch (action.type) {
    case "SET_WINDOW":
      return setActiveInput(state,action.id);
    default:
      return state;
  }
};

function setActiveInput(state,id) {


    return {
      ...state,
      windowOpen: !state.windowOpen,
      target: id
    };
}