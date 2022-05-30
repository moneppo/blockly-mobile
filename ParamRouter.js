import { h, cloneElement, createContext, useContext } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

function setUrl(url, type = 'push') {
  if (typeof history !== 'undefined' && history[`${type}State`]) {
		history[`${type}State`](null, null, url);
	}
}

export const ParamRouter = ({ children }) => {
  const params = (new URL(location)).searchParams;

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
