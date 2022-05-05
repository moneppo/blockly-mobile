/* global fabric */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState, useMemo } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export default () => {
  const ref = createRef();
  const canvas = useMemo(() => {
    return new fabric.Canvas(ref.current);
  }, [ref]);
  
  return html`<canvas ref=${ref}/>`;
}