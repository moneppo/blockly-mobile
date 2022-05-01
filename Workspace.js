/* global Blockly */

import { h, createRef} from 'https://unpkg.com/preact@latest?module';
import { useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);


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

export default (props) => {
  const ref = createRef();
  const workspaceRef = createRef();
  
   useEffect(() => {
    workspaceRef.current = Blockly.inject(ref.current, {
       toolbox,
       renderer: "custom_renderer",
     });
   });//, [ref]);
  
  return html`
    <div ref=${ref} id="workspace" />`;
  
}
//   h("div", {
//     id: "workspace",
//     oncreate: (e) => {
//       console.log("on create");
     
//       //     workspace.getFlyout().hide();
//       //      const b = addBlock(workspace, "top");
//       //      b.setEditable(false);
//       //     b.setMovable(false);
//     },
//   });
