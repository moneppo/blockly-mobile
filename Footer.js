/* global Blockly */
import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
import toolbox from "./toolbox.js";

const html = htm.bind(h);

const addBlock = (type) => {
  const block = Blockly.mainWorkspace.newBlock(type);
  block.initSvg();
  block.render(false);
  Blockly.mainWorkspace
    .getTopBlocks()[0]
    .lastConnectionInStack()
    .connect(block.previousConnection);
};

const BlockMenu = ({ onSelected }) => {
  return html`<div id="blockmenu">
    ${toolbox.contents.map(
      (i) =>
        html`<button
          onclick=${() => {
            addBlock(i.type);
            onSelected && onSelected();
          }}
        >
          ${i.type}
        </button>`
    )}
  </div>`;
};

export default () => {
  const [open, setOpen] = useState(false);

  const trashClick = () => {
    if (Blockly.selected && Blockly.selected.isDeletable) {
      Blockly.selected.dispose();
    }
  };

  const addClick = () => setOpen(!open);

  return html` <footer>
    <button onclick=${addClick}><i class="bi bi-plus-square-fill"></i></button>
    <button>P</button>
    <button onclick=${trashClick}>T</button>
    ${open && html`<${BlockMenu} onSelected=${() => setOpen(false)}/>`}
  </footer>`;
};
