/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import htm from "https://unpkg.com/htm?module";
import VerticalMetrics from "./VerticalMetrics.js";
import toolbox from "./toolbox.js";
import { CustomRenderer } from "./CustomRenderer.js";
import IconField from "./IconField.js";
import useBlocklyWorkspace from "./useBlocklyWorkspace.js";

const html = htm.bind(h);

const addBlock = (workspace, type) => {
  const block = workspace.newBlock(type);
  block.initSvg();
  block.render(false);
  return block;
};

const resize = () => CustomRenderer.setScreenWidth(window.innerWidth);

export default ({ blocks, save }) => {
  console.log()
  useEffect(() => {
    CustomRenderer.setScreenWidth(window.innerWidth);
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  });

 
  const blocklyRef = useRef(null);
  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolbox,
    workspaceConfiguration: {
      renderer: "custom_renderer", // CustomRenderer.js
      move: {
        scrollbars: {
          vertical: true,
        },
      },
      plugins: {
        metricsManager: VerticalMetrics,
      },
    },
    blocks,
    onBlocksChanged: save,
  });

  return html`<div ref=${blocklyRef} id="workspace" />`;
};
