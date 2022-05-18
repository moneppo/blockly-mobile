/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
  useCallback
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import htm from "https://unpkg.com/htm?module";
import VerticalMetrics from "./VerticalMetrics.js";
import toolbox from "./toolbox.js";
import { CustomRenderer } from "./CustomRenderer.js";

const html = htm.bind(h);

const addBlock = (workspace, type) => {
  const block = workspace.newBlock(type);
  block.initSvg();
  block.render(false);
  return block;
};


export default ({ blocks, save }) => {
  const blocklyDiv = createRef();
  const workspace = createRef();
  
  useEffect(() => {
    CustomRenderer.setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      CustomRenderer.setScreenWidth(window.innerWidth);
    })
  })

  useCallback((node) => {
    // This is means the div was unmounted; tear down the Blockly instance
    if (node === null) {
      console.log(Blockly.serialization.workspaces.save(workspace.current));
      workspace.current && save && save(Blockly.serialization.workspaces.save(workspace.current));
      console.log("teardown");
    }
    
    workspace.current = Blockly.inject(node, {
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
      // grid: { spacing: 20, length: 3, colour: "#eee", snap: true },
    });

    workspace.current.getFlyout().hide();

    return () => {
    
    };
  }, []);

  useEffect(() => {
    console.log("update", blocks, workspace)
    if (blocks && workspace.current) {
      console.log(blocks);
      Blockly.serialization.workspaces.load(blocks, workspace.current);
    }
  }, [blocks, workspace]);

  return html`<div ref=${blocklyDiv} id="workspace" />`;
};
