import { h, cloneElement } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export const ParamRouter = ({ children }) => {
  const params = new URLSearchParams(location.search);

  for (let i in children) {
    if ( children[i].props?.default) {
       return cloneElement(children[i]);
    }
    
    const param = children[i].props?.param;
    if (param) {
      const value = params.get(param);
      let props = {};
      if (children[i].props?.getProps) {
        props = children[i].props?.getProps(value);
      } else {
        props[param] = value;
      }
      return cloneElement(children[i], props);
    }
  }
  
  return null;
};

export const routeParam = (key, value) => {
  if (key) {
    
  }
}
