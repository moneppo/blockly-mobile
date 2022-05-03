/* global Blockly */

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
    this.setEditable(false);
    this.setMovable(false);
    this.setDeletable(false);
  },
};

export default {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "text_print",
      icon: "bi bi-music-note",
      display_name: "Play Sound"
    },
  ],
};