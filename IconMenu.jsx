/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const icons = [
  "star",
  "lightning-fill",
  "balloon-fill",
  "speaker-fill",
  "vinyl",
  "balloon-heart",
  "bell",
  "bullseye",
  "wind",
  "volume-up",
  "triangle-fill",
  "suit-diamond",
  "suit-heart",
  "suit-spade",
  "suit-club",
  "star-fill",
  "square-fill",
  "soundwave",
  "record-circle-fill",
  "radioactive",
  "megaphone",
  "flower1",
  "fingerprint",
];

const colors = [
  "tomato",
  "orange",
  "khaki",
  "mediumseagreen",
  "cornflowerblue",
  "mediumorchid",
  "black",
];

export default ({ addButton }) => {
  const [icon, setIcon] = useState();
  const [color, setColor] = useState();
  return <div id="iconmenu">
    <div id="iconmenu_options">
      <ul>
        {icons.map(
          (i) =>
            <li class={icon === i ? "selected" : ""}>
              <button onclick={() => (i === icon ? setIcon() : setIcon(i))}>
                <i class={`bi bi-${i}`} />
              </button>
            </li>
        )}
      </ul>
      <ul>
        {colors.map(
          (c) =>
            <li class={color === c ? "selected" : ""}>
              <button
                class="color_swatch"
                style={`background-color:${c || 'white'};`}
                onclick={() => (c === color ? setColor() : setColor(c))}
              ></button>
            </li>
        )}
      </ul>
    </div>
    <button
      onclick={() => {
        if (icon && color) addButton(icon, color);
      }}
    >
      Add
    </button>
  </div>;
};
