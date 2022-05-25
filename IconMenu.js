/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const icons = [
  "balloon-fill", 
  "balloon-heart",
  "bell",
  "bullseye",
  "wind",
  "volume-up",
"vinyl",
  "triangle-fill",
  "suit-diamond",
  "suit-heart",
  "suit-spade",
  "suit-club",
  "star",
  "star-fill",
  "square-fill",
  "soundwave",
  "speaker-fill",
  "record-circle-fill",
  "radioactive",
  "megaphone",
  "lightning-fill"
];

const colors = ["teal", "purple"];

const html = htm.bind(h);

export default ({ addButton }) => {
  const [icon, setIcon] = useState();
  const [color, setColor] = useState();
  return html`<div id="iconmenu">
    <div id="iconmenu_options">
      <ul>
        ${icons.map(
          (i) =>
            html`<li class=${icon === i ? "selected" : ""}>
              <button onclick=${() => (i === icon ? setIcon() : setIcon(i))}>
                <i class="bi bi-${i}" />
              </button>
            </li>`
        )}
      </ul>
      <ul>
        ${colors.map(
          (c) =>
            html`<li class=${color === c ? "selected" : ""}>
              <button
                class="color_swatch"
                style="background-color:${c || "white"};"
                onclick=${() => (c === color ? setColor() : setColor(c))}
              ></button>
            </li>`
        )}
      </ul>
    </div>
    <button onclick=${() => {if (icon && color) addButton(icon, color)}}>Add</button>
  </div>`;
};