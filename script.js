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
  
  getDesiredRowWidth_(row) {
   // this.width = this.block_.workspace.getWidth();
    if (row.hasStatement) {
      const rightCornerWidth = this.constants_.INSIDE_CORNERS.rightWidth || 0;
      return this.width - this.startX - rightCornerWidth;
    }
    
    return this.width - this.startX; //super.getDesiredRowWidth_(row);
  }
}

class CustomRenderer extends Blockly.zelos.Renderer {
  constructor(name) {
    super(name);
  }

  makeRenderInfo_(block) {
    const result = new CustomRenderInfo(this, block);
    if (!block.isInFlyout)
      console.log(result);
    result.width 
    return result;
  }
}

Blockly.blockRendering.register("custom_renderer", CustomRenderer);

let workspace = Blockly.inject("root", {
  toolbox,
  renderer: "custom_renderer",
});

//workspace.getFlyout().hide();
