/* global Blockly */

import { h, render } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const html = htm.bind(h);

import Workspace from "./Workspace.js";
import Designer from "./Designer.js";
import DesignFooter from "./DesignFooter.js";

// TODO:
//  - child blocks render smaller than parent
//  - designer mode
//  - image background

const App = () => {
  const [buttons, setButtons] = useState([
    { x: 25, y: 25, w: 100, h: 100, r: 0 },
  ]);
  const [selected, setSelected] = useState(-1);

  const updateButton = (i, b) => {
    buttons[i] = { ...buttons[i], ...b };
    setButtons([...buttons]);
  };

  const add = () => {
    setSelected(buttons.length);
    setButtons([...buttons, { x: 35, y: 35, w: 100, h: 100, r: 0 }])
  }

  const remove = () => {
    if (selected >= 0) {
      buttons.splice(selected, 1);
      setButtons([...buttons]);
      setSelected(-1);
    }
  };

  return html`<header />
    <main>
      <${/*Workspace*/ Designer}
        buttons=${buttons}
        updateButton=${updateButton}
        selected=${selected}
        setSelected=${setSelected}
      />
    </main>
    <${DesignFooter} add=${add} remove=${remove} />`;
};

render(html`<${App} />`, document.body);
