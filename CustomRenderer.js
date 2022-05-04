/* global Blockly */

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }
  
  addElemSpacing_() {
    super.addElemSpacing_();
     for (let i = 0, row; (row = this.rows[i]); i++) {
      // No spacing needed before the corner on the top row or the bottom row.
      if (row.startsWithElemSpacer()) {
        
      }
  }

  finalize_() {
    super.finalize_();
    console.log("FOR:", this.block_, this);
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      const spacing = 300 / row.elements.filter(e => Blockly.blockRendering.Types.isSpacer(e)).length;
      for (let s = 0; s < row.elements.length; s++) {
        const element = row.elements[s];
        if (Blockly.blockRendering.Types.isSpacer(element)) {
          element.width += spacing;
        }
      }
      console.log(row);
    }
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
