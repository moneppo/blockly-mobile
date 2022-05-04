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
  constructor(renderer, block, width) {
    super(renderer, block);
    this.width = width;
  }
  
  addElemSpacing_() {
    super.addElemSpacing_();
    for (let i = 0, row; (row = this.rows[i]); i++) {
      if (isStatementInputRow(row)) continue;
      
      let remainingSpace = this.width - row.width;  
       
      if (row.startsWithElemSpacer()) {
        if (row.endsWithElemSpacer()) {
          row.elements[0].width += remainingSpace/2;
          row.elements[row.elements.length - 1].width += remainingSpace/2;
        } else {
          row.elements[0].width += remainingSpace;
        }
      } else if (row.endsWithElemSpacer()) {
        row.elements[row.elements.length - 1].width += remainingSpace;
      }
    }
  }
}

class CustomRenderer extends Blockly.zelos.Renderer {
  constructor(name) {
    super(name);
  }
  
  setScreenWidth(width) {
    this.width = width;
  }

  makeRenderInfo_(block) {
    if (this.width) {
      return new Blockly.zelos.RenderInfo(this, block);
    }
    return new CustomRenderInfo(this, block, this.width);
  }
}

Blockly.blockRendering.register("custom_renderer", CustomRenderer);
