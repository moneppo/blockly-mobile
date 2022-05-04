/* global Blockly */
console.log(Blockly.blockRendering.Types);

const isStatementInputRow = (row) => {
  for (let j = 0, elem; (elem = row.elements[j]); j++) {
    if (Blockly.blockRendering.Types.isStatementInput(elem)) {
      return true;
    }
  }
  return false;
};

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }

  addElemSpacing_() {
    super.addElemSpacing_();
    for (let i = 0, row; (row = this.rows[i]); i++) {
      if (
        row.startsWithElemSpacer() &&
        !isStatementInputRow(row)
      ) {
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
