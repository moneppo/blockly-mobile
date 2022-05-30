/* global Blockly */

/** 

I've selected Preact as it is significantly lighter weight than React and has good 
support for direct-to-browser usage. I can even keep JSX format by using the `htm`
package, so this should be pretty fast to port to React.

*/
import { h, render, createRef } from "https://unpkg.com/preact@latest?module";
import htm from "https://unpkg.com/htm?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const html = htm.bind(h);

import { ParamRouter, useParams, routeParam } from "./ParamRouter.js";
import Designer from "./Designer.js";
import { workspace, block, addBlock } from "./blockHelpers.js";
import Footer from "./Footer.js";
import BlockMenu from "./BlockMenu.js";
import IconMenu from "./IconMenu.js";
import Workspace from "./Workspace.js";

// TODO:
//  - Run view
//  - Run triggers starter code
//  - down/over triggers code
//  - Audio engine
//  - Block definitions
//  - Child blocks render smaller than parent
//  - Image background

const App = () => {
  const params = useParams();
  const [selected, setSelected] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [startingBlocks, setStartingBlocks] = useState(
    workspace([
      block("top", undefined, block("play_sample", { NAME: "OPTIONNAME" })),
    ])
  );
  const [mode, setMode] = useState({ type: "design" });

  const play = () => {
    setMode({ type: "play" });
  };

  const updateButton = (i, b) => {
    buttons[i] = { ...buttons[i], ...b };
    setButtons([...buttons]);
  };

  const addButton = (icon, color) => {
    setMenuOpen(false);
    setSelected(buttons.length);
    setButtons([
      ...buttons,
      {
        x: 35,
        y: 35,
        w: 100,
        h: 100,
        r: 0,
        color,
        icon,
        b: workspace([block("event", { icon })]),
      },
    ]);
  };

  const onAddClick = (...args) => {
    setMenuOpen(!menuOpen);
  };

  const onTrashClick = () => {
    if (mode.type === "design" && selected !== null) {
      setButtons((b) => {
        b.splice(selected, 1);
        return b;
      });
      setSelected(null);
      return;
    }
    if (Blockly.selected && Blockly.selected.isDeletable()) {
      const ws = Blockly.selected.workspace;
      Blockly.selected.checkAndDelete();
      switch (mode.type) {
        case "started":
          setStartingBlocks(Blockly.serialization.workspaces.save(ws));
          break;
        case "button":
          setButtons((buttons) => {
            buttons[mode.i].b = Blockly.serialization.workspaces.save(ws);
            return [...buttons];
          });
          break;
      }
    }
  };

  const add = (type, fields) => {
    setMenuOpen(false);

    switch (mode.type) {
      case "started":
        setStartingBlocks(addBlock(startingBlocks, block(type, fields)));
        break;
      case "button":
        setButtons((buttons) => {
          buttons[mode.i].b = addBlock(buttons[mode.i].b, block(type, fields));
          return [...buttons];
        });
        break;
    }
  };

  const navLeft = () => {
    switch (mode.type) {
      case "started":
        setMode({ type: "design" });
        break;
      case "button":
        setMode(
          mode.i === 0 ? { type: "started" } : { type: "button", i: mode.i - 1 }
        );
        break;
    }
  };

  const navRight = () => {
    switch (mode.type) {
      case "design":
        setMode({ type: "started" });
        break;
      case "started":
        setMode({ type: "button", i: 0 });
        break;
      case "button":
        setMode({ type: "button", i: mode.i + 1 });
        break;
    }
  };

  let showRight = false;
  switch (mode.type) {
    case "design":
      showRight = true;
      break;
    case "started":
      if (buttons.length > 0) showRight = true;
      break;
    case "button":
      if (mode.i < buttons.length - 1) showRight = true;
  }

  const saveBlocks = (blocks, index) => {
    setButtons((b) => {
      b[index].b = blocks;
      return [...b];
    });
  };

  return html` <header>
      <button onClick=${navLeft}>
        ${mode.type !== "design" && html`<i class="bi bi-chevron-left" />`}
      </button>
      <button onClick=${navRight}>
        ${showRight && html`<i class="bi bi-chevron-right" />`}
      </button>
    </header>
    <main>
      <${ParamRouter}>
        <${Designer}
          default
          buttons=${buttons}
          updateButton=${updateButton}
          selected=${selected}
          setSelected=${setSelected}
          onEdit=${(i) => setMode({ type: "button", i })}
        />
        <${Workspace}
          param="started"
          blocks=${startingBlocks}
          save=${setStartingBlocks}
        />
        <${Workspace}
          param="button"
          getProps=${(i) => ({ blocks: buttons[i] })}
          save=${saveBlocks}
        />
      </${ParamRouter}>
    </main>
    <${Footer} onAddClick=${onAddClick} onTrashClick=${onTrashClick}>
      ${menuOpen &&
      (mode.type === "design"
        ? html`<${IconMenu} addButton=${addButton} />`
        : html`<${BlockMenu} addBlock=${add} />`)}
    </${Footer}>`;
};

render(html`<${App} />`, document.body);
