/* global Blockly */

let screenWidth = undefined;

class CustomRenderInfo extends Blockly.zelos.RenderInfo {
  constructor(renderer, block) {
    super(renderer, block);
  }

  static setScreenWidth(width) {
    console.log(screenWidth);
    screenWidth = width;
  }

  addElemSpacing_() {
    super.addElemSpacing_();

    if (!screenWidth) return;

    for (let i = 0, row; (row = this.rows[i]); i++) {
      row.measure();
      let remainingSpace = screenWidth - row.width;
      switch (row.align) {
        case -1:
          if (row.endsWithElemSpacer()) {
            row.elements[row.elements.length - 1].width += remainingSpace;
          }
          break;
        case 1:
          if (row.startsWithElemSpacer()) {
            row.elements[0].width += remainingSpace;
          }
          break;
        default:
          if (row.endsWithElemSpacer() && row.startsWithElemSpace()) {
            row.elements[0].width += remainingSpace / 2;
            row.elements[row.elements.length - 1].width += remainingSpace / 2;
          }
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
