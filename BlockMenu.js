/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

import toolbox from "./toolbox.js";

const html = htm.bind(h);

/**

The BlockMenu component is essentially a mobile-friendly re-implementation
of the toolbox. It's debatable where this is a good solution. In theory,
one can specify where the toolbox gets rendered, so it could be reutilitized
in a menu component. However, there is a ton of complexity to the toolbox that
doesn't seem mobile-friendly from a screen-space usage perspective: e.g. the way 
categories are laid out, full preview of blocks, etc.

Due to Blockly having its own state outside of Preact, for this prototype, 
I've decided that the menu component adds blocks to the workspace and the delete
button deletes the selected blocks. This is not how I would implement this in a
production application. Instead, I would make blocks additions & deletions
dispatched actions, even if the end result was the same calls into the Blockly
workspace.

*/ 

const addBlock = (type) => {
  const block = Blockly.mainWorkspace.newBlock(type);
  block.initSvg();
  block.render(false);
  Blockly.mainWorkspace
    .getTopBlocks()[0]
    .lastConnectionInStack()
    .connect(block.previousConnection);
};

export default ({ onSelected }) => {
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