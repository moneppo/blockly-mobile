/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const icons = [
  "bi bi-arrow-counterclockwise"
];


const html = htm.bind(h);

export default ({ addButton }) => {
  return html`<div id="blockmenu">
    ${icons.map(
      (icon) =>
        html`<button onclick=${() => addButton(icon)}>
          <i class=${icon} />
        </button>`
    )}
  </div>`;
};
