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
  /*  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    CustomRenderer.setScreenWidth(window.innerWidth);
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  });

  const blocklyRef = useCallback((node) => {
    console.log("Callback", node);
    // This is means the div was unmounted; tear down the Blockly instance
    if (node === null) {
      console.log(Blockly.serialization.workspaces.save(workspace));
      workspace &&
        save &&
        save(Blockly.serialization.workspaces.save(workspace));
      console.log("teardown");
      return;
    }

    const ws = Blockly.inject(node, {
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
    ws.getFlyout().hide();

    setWorkspace(ws);
  }, []);

  useEffect(() => {
    console.log("update", blocks, workspace);
    if (blocks && workspace) {
      console.log(blocks);
      Blockly.serialization.workspaces.load(blocks, workspace);
    }
  }, [blocks]);

  return html`<div ref=${blocklyRef} id="workspace" />`;*/
  const blocklyRef = useRef(null);
  const { workspace, xml } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolbox, // this must be a JSON toolbox definition
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
    initialBlocks: blocks,
    onBlocksChanged: save,
  });

  return html`<div ref=${blocklyRef} id="workspace" />`;
};
