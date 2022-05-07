/* global Blockly */
import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
import toolbox from "./toolbox.js";

const html = htm.bind(h);

export default ({remove, add}) => {

  return html` <footer>
    <button onclick=${add}>
      <i class="bi bi-plus-square" />
    </button>
    <button>
      <i class="bi bi-play" />
    </button>
    <button onclick=${remove}>
      <i class="bi bi-trash3" />
    </button>
   </footer>`;
};
