/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useEffect } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

var toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "text_print",
    },
  ],
};

Blockly.Blocks["top"] = {
  init: function () {
    this.jsonInit({
      type: "top",
      message0: "when started",
      nextStatement: null,
      colour: 230,
      tooltip: "",
      helpUrl: "",
    });
    this.setEditable(false);
    this.setMovable(false);
    this.setDeletable(false);
  },
};

const addBlock = (workspace, type) => {
  const block = workspace.newBlock(type);
  block.initSvg();
//  block.width = workspace.getWidth();
  block.render(false);
  return block;
};

const addBlockToEnd = (start, type) => {
  const newBlock = addBlock(start.workspace, type);
  start.lastConnectionInStack().connect(newBlock.previousConnection);
};

export default ({ workspace }) => {
  const ref = createRef();

  useEffect(() => {
    const ws = Blockly.inject(ref.current, {
      toolbox,
      renderer: "custom_renderer",
    });
    
    ws.getFlyout().hide();
    
    const top = addBlock(ws, "top");
    
    
    if (workspace) {
      workspace.current = ws;
    }
  }, [ref]);

  return html`<div ref=${ref} id="workspace" />`;
};
