/* global Blockly */
import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
import toolbox from "./toolbox.js";

const html = htm.bind(h);

export default ({onTrashClick, onAddClick, onRunClick, children}) => {
  return html` <footer>
    <button onclick=${onAddClick}>
      <i class="bi bi-plus-square" />
    </button>
    <button onclick=${onRunClick}>
      <i class="bi bi-play" />
    </button>
    <button onclick=${onTrashClick}>
      <i class="bi bi-trash3" />
    </button>
    ${children}
  </footer>`;
};
