/* global Blockly */
import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

export default () => {
  const [open, setOpen] = useState(false);

  const trashClick = () => {
    if (Blockly.selected) {
      Blockly.mainWorkspace.removeBlockById(Blockly.selected.id);
    }
  };

  const addClick = () => setOpen(!open);

  return html` <footer>
    <button onclick=${addClick}>+</button>
    <button>P</button>
    <button onclick=${trashClick}>T</button>
    ${open && html``}
  </footer>`;
};
