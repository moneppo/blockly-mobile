/* global Blockly */

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }

  finalize_() {
        super.finalize_();
    console.log("FOR:", this.block_, this)
     for (let i = 0; i < this.rows.length; i++) {
       const row = this.rows[i];
       if (!Blockly.blockRendering.Types.isInputRow(row)) {
         continue;
       }
//       const firstElem = row.elements[1];
//       const lastElem = row.elements[row.elements.length - 2];
//       console.log(firstElem, lastElem);
       row.elements[0].width=100;
      console.log(row.elements[0]);
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
