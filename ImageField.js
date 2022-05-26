/* global Blockly */

class IconField extends Blockly.Field {
  constructor(opt_value, opt_validator) {
    if (opt_value === null) {
      opt_value = "";
    }
    
    super(opt_value, opt_validator);
  }
}

Blockly.fieldRegistry.register('field_icon', IconField);