/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

import toolbox from "./toolbox.js";

const html = htm.bind(h);

const svgIcons = "BootstrapIcons.svg";

const Button = ({ button, activate }) => {
  const { w, h, r, x, y, icon } = button;
  const [selected, setSelected] = useState(false);

  const deselect = () => setSelected(false);
  return html` <g
    transform="translate(${x} ${y}) rotate(${r} ${w / 2} ${h / 2})"
  >
    <rect
      width=${w}
      height=${h}
      fill=${button.color || "teal"}
      onMouseDown=${activate}
      onMouseUp=${deselect}
      onMouseLeave=${deselect}
      onMouseOut=${deselect}
      onMouseUp=${deselect}
    />
    <use
      href="${svgIcons}#${icon}"
      x=${w * 0.1}
      y=${h * 0.1}
      fill="white"
      width=${w * 0.8}
      height=${h * 0.8}
      onMouseDown=${() => {setSelected(true); activate(button)}}
      onMouseUp=${deselect}
      onMouseLeave=${deselect}
      onMouseOut=${deselect}
      onMouseUp=${deselect}
    />
  </g>`;
};

const audio = new Audio("https://cdn.glitch.global/42a61bc0-fedb-4e83-8c59-7a23c15be838/samples_snare.wav?v=1654023316973");

export default ({ buttons,onExit }) => {
  const activate = (button) => {

    audio.play();
  }
  
  return html`
    <header>
     <button onClick=${onExit}><i class="bi bi-chevron-left" /></button>
    </header>
    <svg>
    <rect
      width="100%"
      height="100%"
      fill="transparent"
      stroke="blue"
    />
    ${buttons.map(
      (b) =>
        html`<${Button} button=${b} activate="${activate}" />`
    )}
    </svg>`;
};
