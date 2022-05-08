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
  console.log();
  return html`<div id="blockmenu">
    ${toolbox.contents.map(
      (i) =>
        html`<button
          onclick=${() => {
            addBlock(i.type);
            onSelected && onSelected();
          }}
        >
          <i class=${i.icon} />
          ${i.display_name}
        </button>`
    )}
  </div>`;
};

export default ({onTrashClick, onAddClick, onRunClick}) => {
  const [open, setOpen] = useState(false);

  const trashClick = () => {
    if (Blockly.selected && Blockly.selected.isDeletable()) {
      Blockly.selected.checkAndDelete();
    }
  };

  const addClick = () => setOpen(!open);

  return html` <footer>
    <button onclick=${onAddClick}>
      <i class="bi bi-plus-square" />
    </button>
    <button onclick=${onRunClick}>>
      <i class="bi bi-play" />
    </button>
    <button onclick=${onTrashClick}>
      <i class="bi bi-trash3" />
    </button>
    ${open && html`<${BlockMenu} onSelected=${() => setOpen(false)} />`}
  </footer>`;
};
