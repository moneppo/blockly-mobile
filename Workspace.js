/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
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

export default ({ workspaceRef }) => {
  const [blocks, setBlocks] = useState();
  const ref = createRef();

  useEffect(() => {
    workspaceRef.current = Blockly.inject(ref.current, {
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
      grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
    });
    
    if (blocks) {
      Blockly.serialization.workspaces.load(blocks, workspaceRef.current);
    } else {
      addBlock(workspaceRef.current, "top");
    }

    const resize = () => {
      CustomRenderer.setScreenWidth(ref.current.clientWidth);
      workspaceRef.current.resize();
      workspaceRef.current.render();
    };

    workspaceRef.current.getFlyout().hide();
    workspaceRef.current.scroll(300, 0);
    resize();

    window.addEventListener("resize", resize);

    return () => {
      setBlocks(Blockly.serialization.workspaces.save(workspaceRef.current));
      window.removeEventListener("resize", resize);
    };
  }, [ref]);

  return html`<div ref=${ref} id="workspace" />`;
};
