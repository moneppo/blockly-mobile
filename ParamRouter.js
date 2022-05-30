import { h, cloneElement } from "https://unpkg.com/preact@latest?module";
import { useState, useMemo } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

let setUrl = () => {};

export const useParams = () => {
  const [url, invalidate] = useState(
    Object.fromEntries((new URL(location)).searchParams.entries())
  );
  
  setUrl = useMemo(() => (url, type = 'push') => {
    if (typeof history !== 'undefined' && history[`${type}State`]) {
      history[`${type}State`](null, null, url);
      invalidate((new URL(url)).searchParams);
    }
  }, [url]);
  
  return Object.fromEntries(url.searchParams.entries())

}

export const ParamRouter = ({ children }) => {
  const params = useParams();

  for (let i in children) {
    if ( children[i].props?.default) {
       return cloneElement(children[i]);
    }
    
    const param = children[i].props?.param;
    if (param) {
      const value = params[param];
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
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    setUrl(url);
  }
}
