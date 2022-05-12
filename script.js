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

/**

The app consists of three views: Designer, Workspace, and Run. These are 
documented in more detail in their respective sources, but they provide
the following: 

**Designer**: A simple UX for adding and removing buttons that can trigger
  events when tapped or a finger moves over them. The hope is that this will
  allow for "beat surfing" style playing, but even just a button grid is a 
  sufficient experience for the prototype.

**Workspace**: Place blocks as actions in response to events. In this prototype,
  there are only two types of events: "when started" and "when tapped".
  
**Run**: Actually run the app, allowing for playback of sounds and responding to 
  touch events.

*/
import Workspace from "./Workspace.js";
import Designer from "./Designer.js";

import Footer from "./Footer.js";
import BlockMenu from "./BlockMenu.js";
import Blockly from "./Blockly.js";

// TODO:
//  - child blocks render smaller than parent
//  - designer mode
//  - image background

const App = () => {
  /** 

All state is stored at the top level component (`App`). This allows for
easier porting to a redux store.

*/

  const [selected, setSelected] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [startingBlocks, setStartingBlocks] = useState();
  const [mode, setMode] = useState({ type: "design" });

  const updateButton = (i, b) => {
    buttons[i] = { ...buttons[i], ...b };
    setButtons([...buttons]);
  };

  const onAddClick = () => {
    if (mode.type === "design") {
      setSelected(buttons.length);
      setButtons([...buttons, { x: 35, y: 35, w: 100, h: 100, r: 0 }]);
    } else {
      setMenuOpen(!menuOpen);
    }
  };
  const onTrashClick = () => {
    if (Blockly.selected && Blockly.selected.isDeletable()) {
      Blockly.selected.checkAndDelete();
    }
  };

  const addBlock = (type) => {
    console.log("add", type);
    setMenuOpen(false);

    // const block = buttons[view].ref.current.newBlock(type);
    // block.initSvg();
    // block.render(false);
    // buttons[view].ref.current
    //   .getTopBlocks()[0]
    //   .lastConnectionInStack()
    //   .connect(block.previousConnection);
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
      default:
        console.log("should never get here");
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
      default:
        console.log("should never get here");
    }
  };
  
  let showRight = false;
  switch(mode.type) {
    case "design": 
  }

  return html`
  <header>
    <button onClick=${navLeft}>
      ${mode.type !== "design" && html`<i class="bi bi-chevron-left" />`}
    </button>
    <button onClick=${navRight}>
     ${showRight && html`${mode.type} <i class="bi bi-chevron-right" />`}
    </button>
  </header>
  <main>
    ${
      mode.type === "design" &&
      html`<${Designer}
        buttons=${buttons}
        updateButton=${updateButton}
        selected=${selected}
        setSelected=${setSelected}
        onEdit=${(i) => setMode({ type: "button", i })}
      />`
    }
     ${
       mode.type === "started" &&
       html` <${Blockly} json=${startingBlocks} update=${setStartingBlocks} />`
     }
    ${
      mode.type === "button" &&
      html`<${Blockly} json=${startingBlocks} update=${setStartingBlocks} />`
    }
  </main>
  <${Footer} onAddClick=${onAddClick} onTrashClick=${onTrashClick}>
  ${menuOpen && html`<${BlockMenu} addBlock=${addBlock} />`}
  </${Footer}>`;
};

render(html`<${App} />`, document.body);
