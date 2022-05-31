import { h, cloneElement } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export const StateRouter = ({state, children}) => {
  for (let c in children) {
    if (children[c].props?.default) {
      return cloneElement(children[c]);
    }
    
    if (children[c].props?.when && children[c].props?.when(state)) {
      if (children[c].props?.toProps) {
        const props = children[c].props?.toProps(state);
        return cloneElement(children[c], props)
      } else return cloneElement(children[c]);
    }
  }
}