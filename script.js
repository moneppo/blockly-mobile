/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

/* global Blockly */

console.log("Hello, world!");

var toolbox = {
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_repeat_ext"
    },
    {
      "kind": "block",
      "type": "logic_compare"
    },
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "block",
      "type": "math_arithmetic"
    },
    {
      "kind": "block",
      "type": "text"
    },
    {
      "kind": "block",
      "type": "text_print"
    },
  ]
}

class CustomConstantsProvider extends Blockly.zelos.ConstantProvider {
  constructor() {
    // Set up all of the constants from the base provider.
    super();
    this.TAB_HEIGHT = 30;

  }
}

class CustomRenderer extends Blockly.zelos.Renderer {
  makeConstants() {
    return new CustomConstantsProvider();
  };
}

console.log(Blockly.zelos.Renderer)
Blockly.blockRendering.register('custom_renderer', /*Blockly.zelos.Renderer*/CustomRenderer);

let workspace = Blockly.inject('root', {toolbox, renderer:"custom_renderer"});

//workspace.getFlyout().hide();
