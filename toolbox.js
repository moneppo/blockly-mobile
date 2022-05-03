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

Blockly.Blocks["play_sample"] = {
  init: function () {
    this.jsonInit({
      type: "play_sample",
      message0: "%1 play sample %2",
      args0: [
        {
          type: "field_image",
          src: "https://www.gstatic.com/codesite/ph/images/star_on.gif",
          width: 36,
          height: 36,
          alt: "*",
          flipRtl: false,
        },
        {
          type: "field_dropdown",
          name: "NAME",
          options: [
            ["option", "OPTIONNAME"],
            ["option", "OPTIONNAME"],
            ["option", "OPTIONNAME"],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
      tooltip: "",
      helpUrl: "",
    });
  },
};

export default {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "play_sound",
      icon: "bi bi-music-note",
      display_name: "Play Sound",
    },
  ],
};
