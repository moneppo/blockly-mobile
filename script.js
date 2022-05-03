/* global Blockly */

import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(h);

import Workspace from "./Workspace.js";
import Footer from "./Footer.js";

// TODO:
//  - full-width blocks
//  - unselectable top block
//  - navigation
//  - image background

console.log(Blockly.Blocks)

render(
  html` <header />
    <main>
      <${Workspace} />
    </main>
    <${Footer}/>`,
  document.body
);

