/* global Blockly */

export default class IconField extends Blockly.Field {
  constructor(name) {
    if (name === null) name = "balloon";
    super(name);
  }
  
  initView() {
    this.icon = Blockly.utils.dom.createSvgElement('use',
    {
      "href":`BootstrapIcons.svg#balloon`,
      width: "24px",
      height: "24px",
      x: "-12px",
      y: "-12px",
      fill: "white"
    }, this.fieldGroup_);
  }
  
  render_() {
    console.log(this);
    this.icon.setAttribute("href",`BootstrapIcons.svg#${this.value_}`)
  }
  
  static fromJson(options) {
    return new IconField(options['name'])
  }
}

IconField.prototype.SERIALIZABLE = true;

Blockly.fieldRegistry.register('field_icon', IconField);