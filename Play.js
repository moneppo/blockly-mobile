/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

import toolbox from "./toolbox.js";

const html = htm.bind(h);

const svgIcons = "BootstrapIcons.svg";


const Button = ({button, activate}) => {
  const {w,h,r,x,y, icon} = button;
  return html` <g
    transform="translate(${x} ${y}) rotate(${r} ${w / 2} ${h / 2})"
  >
    <rect
      width=${w}
      height=${h}
      fill=${button.color || "teal"}
      onMouseDown=${activate}
    />
    <use
      href="${svgIcons}#${icon}"
      x=${w * 0.1}
      y=${h * 0.1}
      fill="white"
      width=${w * 0.8}
      height=${h * 0.8}
      onMouseDown=${activate}
    />
    </g>`;
}

export default ({buttons, activateButton}) => {
 return html`<svg>
    <rect
      width="100%"
      height="100%"
      fill="transparent"
      stroke="blue"
    >
    ${buttons.map(b => html`<Button button=${b} activate)}
    </svg>`
}