/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

/* global Blockly */

console.log("Hello, world!");

var toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "controls_if",
    },
    {
      kind: "block",
      type: "controls_repeat_ext",
    },
    {
      kind: "block",
      type: "logic_compare",
    },
    {
      kind: "block",
      type: "math_number",
    },
    {
      kind: "block",
      type: "math_arithmetic",
    },
    {
      kind: "block",
      type: "text",
    },
    {
      kind: "block",
      type: "text_print",
    },
  ],
};

// class CustomRenderInfo extends Blockly.zelos.RenderInfo {
//   constructor(renderer, block) {
//     super(renderer, block);
//   }

//   getDesiredRowWidth_(row) {
//    // this.width = this.block_.workspace.getWidth();
//     if (row.hasStatement) {
//       const rightCornerWidth = this.constants_.INSIDE_CORNERS.rightWidth || 0;
//       return this.width - this.startX - rightCornerWidth;
//     }

//     return this.width - this.startX; //super.getDesiredRowWidth_(row);
//   }
// }

// class CustomRenderer extends Blockly.zelos.Renderer {
//   constructor(name) {
//     super(name);
//   }

//   makeRenderInfo_(block) {
//     const result = new CustomRenderInfo(this, block);
//     if (!block.isInFlyout)
//     result.width = block.workspace.getWidth() - result.statementEdge;
//     return result;
//   }
// }

// Blockly.blockRendering.register("custom_renderer", CustomRenderer);

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

let workspace = Blockly.inject("root", {
  toolbox,
  renderer: "zelos", //"custom_renderer",
});

console.log(Blockly);

workspace.getFlyout().hide();
const b = addBlock(workspace, "top");
b.setEditable(false);
b.setMovable(false);
