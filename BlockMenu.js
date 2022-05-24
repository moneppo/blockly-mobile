/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

import toolbox from "./toolbox.js";

const html = htm.bind(h);

export default ({ addBlock }) => {
  return html`<div id="blockmenu">
    ${toolbox.contents.map(
      (i) =>
        html`<button onclick=${() => addBlock(i.type, i.fields)}>
          <i class=${i.icon} />
          ${i.display_name}
        </button>`
    )}
  </div>`;
};
