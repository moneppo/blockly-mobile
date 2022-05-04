/* global Blockly */

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }

  addElemSpacing_() {
    super.addElemSpacing_();
    for (let i = 0, row; (row = this.rows[i]); i++) {
      // No spacing needed before the corner on the top row or the bottom row.
      if (row.startsWithElemSpacer() && row.type ) {
        row.elements[0].width += 20;
      }

      if (row.endsWithElemSpacer()) {
        row.elements[row.elements.length - 1].width += 20;
      }
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
