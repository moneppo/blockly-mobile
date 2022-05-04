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

let screenWidth = undefined;

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }
  
  static setScreenWidth(width) {
    screenWidth = width;
  }
  
  addElemSpacing_() {
    super.addElemSpacing_();
    
    if (!screenWidth) return;
    
    console.log("ha")
    
    for (let i = 0, row; (row = this.rows[i]); i++) {
      if (isStatementInputRow(row)) continue;
      
      let remainingSpace = this.width - row.width;
      console.log(screenWidth, remainingSpace)
       
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


export class CustomRenderer extends Blockly.zelos.Renderer {
  constructor(name) {
    super(name);
  }
  
  static setScreenWidth(width) {
    CustomRenderInfo.setScreenWidth(width);
  }

  makeRenderInfo_(block) {
    return new CustomRenderInfo(this, block);
  }
}

Blockly.blockRendering.register("custom_renderer", CustomRenderer);
