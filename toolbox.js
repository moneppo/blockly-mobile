/* global Blockly */

export const blocks = {
  play_sample: {
    message0: "play sample",
    nextStatement: null,
    colour: 230,
  },
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
    this.setEditable(false);
    this.setMovable(false);
    this.setDeletable(false);
  },
};

Object.entries(blocks).forEach((name, block) => {
  Blockly.Blocks["play_sample"] = {
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
});

export const toolbox = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "text_print",
      icon: "bi bi-music-note",
      display_name: "Play Sound",
    },
  ],
};
