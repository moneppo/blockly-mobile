/* global Blockly */

import { h, text } from "https://esm.run/hyperapp";

var toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "text_print",
    },
  ],
};

Blockly.Blocks["top"] = {
  init: function () {
    this.jsonInit({
      type: "top",
      message0: "when started",
      nextStatement: null,
      colour: 230,
      tooltip: "",
      helpUrl: "",
    });
  },
};

export default props => 

    h("div", {
      oncreate: (e) => {
        const workspace = Blockly.inject(e, {
          toolbox,
          renderer: "custom_renderer",
        });
   //     workspace.getFlyout().hide();
  //      const b = addBlock(workspace, "top");
  //      b.setEditable(false);
   //     b.setMovable(false);
      }
    });
  