import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);


const ids_regex = /:([^\/]+)/gm;

export const Router = ({ children }) => {
  for (let i in children) {
    if (children[i].props?.path) {
      return;
    } else if (children[i].props?.default) {
      return html`<>${children[i]}</>`;
    }
  }
};
