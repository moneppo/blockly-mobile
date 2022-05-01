/* global Blockly */

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }

//   getDesiredRowWidth_(row) {
//    // this.width = this.block_.workspace.getWidth();
//     if (row.hasStatement) {
//       const rightCornerWidth = this.constants_.INSIDE_CORNERS.rightWidth || 0;
//       return this.width - this.startX - rightCornerWidth;
//     }

//     return this.width - this.startX; //super.getDesiredRowWidth_(row);
//   }
 }

class CustomRenderer extends Blockly.zelos.Renderer {
  constructor(name) {
    super(name);
  }

//   makeRenderInfo_(block) {
//     const result = new CustomRenderInfo(this, block);
//     if (!block.isInFlyout)
//     result.width = block.workspace.getWidth() - result.statementEdge;
//     return result;
//   }
 }

Blockly.blockRendering.register("custom_renderer", CustomRenderer);
