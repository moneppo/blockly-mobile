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

    // For this prototype, Workspace treats the Blockly workspace
    // as a singleton.
    
    if (Blockly?.mainWorkspace === undefined) {
      console.log("ws setup");
      Blockly.inject(ref.current, {
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
    }


    if (blocks) {
      Blockly.serialization.workspaces.load(blocks, Blockly.mainWorkspace);
    } else {
      addBlock(Blockly.mainWorkspace, "top");
      updateBlocks(Blockly.serialization.workspaces.save(Blockly.mainWorkspace));
    };
  
    Blockly.mainWorkspace.getFlyout().hide();
    Blockly.mainWorkspace.scroll(300, 0);
    resize();

    window.addEventListener("resize", resize);
    
    return () => {

      Blockly.mainWorkspace.clear();
      window.removeEventListener("resize", resize);
    };
  }, [ref]);
  

  return html`<div ref=${ref} id="workspace" />`;
};
