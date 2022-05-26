/* global Blockly */

export default class IconField extends Blockly.Field {
  constructor(name) {
    if (name === null) name = "balloon";
    super(name);
  }
  
  initView() {
    this.icon = Blockly.utils.dom.createSvgElement('use',
    {
      "xlink:href":`BootstrapIcons.svg#balloon`,
      width: "24px",
      height: "24px"
    }, this.fieldGroup_);
  }
  
  render_() {
    const value = this.displayValue_;
    this.icon.setAttribute("xlink:href",`BootstrapIcons.svg#${value}`)
  }
  
  fromJson(options) {
    return new IconField(options['name'])
  }
}

IconField.prototype.SERIALIZABLE = true;

Blockly.fieldRegistry.register('field_icon', IconField);