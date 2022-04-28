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

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }
  
  alignStatementRow_(row) {
    const statementInput = row.getLastInput();
    let currentWidth = row.width - statementInput.width;
    let desiredWidth = this.statementEdge;
    // Add padding before the statement input.
    const missingSpace = desiredWidth - currentWidth;
    if (missingSpace > 0) {
      this.addAlignmentPadding_(row, missingSpace);
    }
    // Also widen the statement input to reach to the right side of the
    // block. Note that this does not add padding.
    currentWidth = row.width;
    desiredWidth = this.getDesiredRowWidth_(row);
    statementInput.width += (desiredWidth - currentWidth);
    statementInput.height = Math.max(statementInput.height, row.height);
    row.width += (desiredWidth - currentWidth);
    row.widthWithConnectedBlocks =
        Math.max(row.width, this.statementEdge + row.connectedBlockWidths);
    
    row.width = this.block_.workspace.getWidth();
  }
}

class CustomRenderer extends Blockly.zelos.Renderer {
  constructor(name) {
    super(name);
  }

  makeRenderInfo_(block) {
    return new CustomRenderInfo(this, block);
  }
}

Blockly.blockRendering.register("custom_renderer", CustomRenderer);

let workspace = Blockly.inject("root", {
  toolbox,
  renderer: "custom_renderer",
});

//workspace.getFlyout().hide();
