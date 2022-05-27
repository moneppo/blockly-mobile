/* global Blockly */

export default class IconField extends Blockly.Field {
  constructor(name) {
    if (name === null) name = "balloon";
    super(name);
  }
  
  static SERIALIZABLE = true;
  
  initView() {
    console.log(this.prototype);
    this.icon = Blockly.utils.dom.createSvgElement('use',
    {
      "href":`BootstrapIcons.svg#balloon`,
      width: "24px",
      height: "24px",
      fill: "white"
    }, this.fieldGroup_);
  }
  
  render_() {
    this.icon.setAttribute("href",`BootstrapIcons.svg#${this.value_}`);
    this.size_.width = 24;
    this.size_.height = 24;
  }
  
  static fromJson(options) {
    return new IconField(options['name'])
  }
}

Blockly.fieldRegistry.register('field_icon', IconField);