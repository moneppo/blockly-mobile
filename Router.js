import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export const Router = ({children}) => children.find(c => {
  
  if (c.props.path) {
    const 
  } else if (c.props.default) {
    return true;
  }
  
  return false;
})