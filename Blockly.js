/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import htm from "https://unpkg.com/htm?module";
import VerticalMetrics from "./VerticalMetrics.js";
import toolbox from "./toolbox.js";

const html = htm.bind(h);

export default ({ json, children, save }) => {
  const blocklyDiv = createRef();
  const workspace = createRef();

  useEffect(() => {
    console.log("buildup")
    workspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox,
      renderer: "custom_renderer", // CustomRenderer.js
      move: {
        scrollbars: {
          vertical: true,
        },
      },
      plugins: {
        metricsManager: VerticalMetrics,
      },
      grid: { spacing: 20, length: 3, colour: "#eee", snap: true },
    });

    workspace.current.getFlyout().hide();

    if (json) {
      Blockly.serialization.workspaces.load(json, workspace.current);
    }

    return () => {
      save && save(Blockly.serialization.workspaces.save(workspace.current));
      console.log("teardown");
    };
  }, []);

  return html`<div ref=${blocklyDiv} id="workspace" />`;
};
