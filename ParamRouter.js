import { h, cloneElement, createContext, useContext,useMemo } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

let setUrl = () => {};

const useUrl = () => {
  const [url, invalidate] = useState(new URL(location));
  
  setUrl = useMemo(() => (url, type = 'push') => {
    if (typeof history !== 'undefined' && history[`${type}State`]) {
      history[`${type}State`](null, null, url);
      invalidate(new URL(url));
    }
  }, []);
  
  return url;
}

export const ParamRouter = ({ children }) => {
  const url = useUrl();
  const params = url.searchParams;

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
