/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import {
  useEffect,
  useLayoutEffect,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
import toolbox from "./toolbox.js";
import VerticalMetrics from "./VerticalMetrics.js";
import { CustomRenderer } from "./CustomRenderer.js";

const html = htm.bind(h);

const addBlock = (workspace, type) => {
  const block = workspace.newBlock(type);
  block.initSvg();
  block.render(false);
  return block;
};

const addBlockToEnd = (start, type) => {
  const newBlock = addBlock(start.workspace, type);
  start.lastConnectionInStack().connect(newBlock.previousConnection);
};

export default ({ blocks, updateBlocks }) => {
  const ref = createRef();

  useEffect(() => {
    const resize = () => {
      CustomRenderer.setScreenWidth(ref.current.clientWidth);
      Blockly.mainWorkspace.resize();
      Blockly.mainWorkspace.render();
    };

    const ws = Blockly.inject(ref.current, {
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
    });


    if (blocks) {
      ws.clear();
      Blockly.serialization.workspaces.load(blocks, ws);
    } else {
      console.log("initializing");
      const top = addBlock(ws, "top");
      updateBlocks(Blockly.serialization.workspaces.save(ws));
    };
  
    ws.getFlyout().hide();
    ws.scroll(300, 0);
    resize();

    window.addEventListener("resize", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [ref]);
  

  return html`<div ref=${ref} id="workspace" />`;
};
