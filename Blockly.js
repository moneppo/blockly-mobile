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

export default ({ initialJSON, children }) => {
  const blocklyDiv = createRef();
  const workspace = createRef();

  useEffect(() => {
    if (!blocklyDiv.current) return;

    console.log("buildup");
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

    if (initialJSON) {
      Blockly.serialization.workspaces.load(initialJSON, workspace.current);
    }
    
    return () => console.log("teardown")
  }, [initialJSON, blocklyDiv, toolbox]);

  return html`<div ref=${blocklyDiv} id="workspace" />`;
};
