import { cloneElement } from "https://unpkg.com/preact@latest?module";

export const StateRouter = ({ state, children }) => {
  for (let c in children) {
    if (children[c].props?.default) {
      continue;
    }

    if (children[c].props?.when && children[c].props?.when(state)) {
      if (children[c].props?.toProps) {
        const props = children[c].props?.toProps(state);
        return cloneElement(children[c], props);
      } else return cloneElement(children[c]);
    }
  }

  for (let c in children) {
    if (children[c].props?.default) {
      return cloneElement(children[c]);
    }
  }
};
