/* global Blockly */

import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(h);

import Workspace from "./Workspace.js";
import Footer from "./Footer.js";

// TODO:
//  - child blocks render smaller than parent
//  - designer mode
//  - image background

render(
  html` <header />
    <main>
      <${Workspace} />
    </main>
    <${Footer} />`,
  document.body
);
