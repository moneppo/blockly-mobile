/* global fabric */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useMemo,
  useEffect,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

function resizeCanvas(canvas) {
  console.log("resize");
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext("2d");
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
  }
}

export default () => {
  const ref = createRef();
  if (ref.current) resizeCanvas(ref.current);

  const c = useMemo(() => {
    let canvas = new fabric.Canvas(ref.current);
    console.log(canvas)
    canvas.setBackgroundColor("rgba(255, 73, 64, 0.6)");
    var rect = new fabric.Rect({
      left: 100,
      top: 50,
      fill: "yellow",
      width: 200,
      height: 100,
      objectCaching: false,
      stroke: "lightgreen",
      strokeWidth: 4,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    return canvas;
  }, [ref]);

  return html`<canvas ref=${ref} width="400" height="300" />`;
};
