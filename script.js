/* global Blockly */

import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(h);

import Workspace from "./Workspace.js";

// TODO:
//  - full-width blocks
//  - unselectable top block
//  - navigation
//  - image background

render(
  html` <header />
    <main>
      <${Workspace} />
    </main>
    <footer>
      <button>+</button>
      <button onclick=${()=>Blockly.selected.dispose(true)}>T</button>
    </footer>`,
  document.body
);

