/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const icons = ["bi bi-arrow-counterclockwise","bi bi-arrow-counterclockwise"];

const colors = ["teal", "purple"];

const html = htm.bind(h);

export default ({ addButton }) => {
  const [icon, setIcon] = useState();
  const [color, setColor] = useState();
  return html`<div id="iconmenu">
    <ul>
      ${icons.map(
        (icon) =>
          html`<li>
            <button onclick=${()=>setIcon(icon)}>
              <i class=${icon} />
            </button>
          </li>`
      )}
    </ul>
    <ul>
      ${colors.map(
        (color) =>
          html`<li>
            <button
              class="color_swatch"
              style="background-color:${color || "white"};"
              onclick=${()=>setColor(color)}
            ></button>
          </li>`
      )}
    </ul>

    <button onclick=${() => addButton(icon, color)}>Add</button>
  </div>`;
};
