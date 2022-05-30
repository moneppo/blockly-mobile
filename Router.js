import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export const ParamRouter = ({ children }) => {
  const params = new URLSearchParams(location.search);

  for (let i in children) {
    if ( children[i].props?.default) {
      return html`<>${children[i]}</>`;
    }
    
    const param = children[i].props?.param;
    if (params.get(param)) {
      
    }
  }
};
