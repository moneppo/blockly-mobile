/* global fabric */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState, useMemo, useEffect } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

function resizeCanvas(canvas) {
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio=1 } = window
      const context = canvas.getContext('2d')
      canvas.width = width*ratio
      canvas.height = height*ratio
      context.scale(ratio, ratio)
    }
  }

export default () => {
  const ref = createRef();
  if (ref.current) resizeCanvas(ref.current);
  
  const canvas = useMemo(() => {
    return new fabric.Canvas(ref.current);
  }, [ref]);
  
  return html`<canvas ref=${ref} />`;
}