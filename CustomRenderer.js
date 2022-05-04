/* global Blockly */
console.log(Blockly.blockRendering.Types)

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }

  addElemSpacing_() {
    super.addElemSpacing_();
    for (let i = 0, row; (row = this.rows[i]); i++) {
    
      if (row.startsWithElemSpacer() && !Blockly.blockRendering.Types.isStatementInput(row)) {
        row.elements[0].width += 20;
      } else {
        console.log(Blockly.blockRendering.Types.getType(row))
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
