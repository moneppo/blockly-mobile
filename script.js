/* global Blockly */
import { h, text, app } from "https://esm.run/hyperapp";

var toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "text_print",
    },
  ],
};

// TODO: 
//  - full-width blocks
//  - unselectable top block
//  - navigation
//  - image background

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
  },
};

const addBlock = (workspace, type) => {
  const block = workspace.newBlock(type);
  block.initSvg();
  block.width = workspace.getWidth();
  block.render(false);
  return block;
};

const addBlockToEnd = (start, type) => {
  const newBlock = addBlock(start.workspace, type);
  start.lastConnectionInStack().connect(newBlock.previousConnection);
};

let workspace = Blockly.inject("root", {
  toolbox,
  renderer: "custom_renderer",
});


workspace.getFlyout().hide();
const b = addBlock(workspace, "top");
b.setEditable(false);
b.setMovable(false);

const add = document.getElementById("add");
const trash = document.getElementById("trash");

add.addEventListener("click", () => {
  const expanded = add.getAttribute("open");
  if (expanded) {
    add.removeAttribute("open");
  } else {
    add.setAttribute("open", true);
    addBlockToEnd(b, "text_print");
  }
});

trash.addEventListener("click", () => {
  if (Blockly.selected !== b) {
    Blockly.selected.dispose(true);
  }
});

app({
    init: {},
    view: ({}) => {},
    node: document.getElementById("root"),
  })
