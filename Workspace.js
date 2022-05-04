/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useEffect, useLayoutEffect } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";
import toolbox from "./toolbox.js";
import VerticalMetrics from "./VerticalMetrics.js";
import {CustomRenderer} from "./CustomRenderer.js";

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

const setWidth = (width) => {
  CustomRenderer.setScreenWidth(width);
}

export default ({ workspace }) => {
  const ref = createRef();
  
  useLayoutEffect(() => {
    setWidth(ref.current.clientWidth)
  })

  useEffect(() => {
    const ws = Blockly.inject(ref.current, {
      toolbox,
      renderer: "custom_renderer", // CustomRenderer.js
      move: {
        scrollbars: {
          vertical: true
        }
      },
      plugins: {
        metricsManager: VerticalMetrics,
      },
      grid: { spacing: 20, length: 3, colour: "#ccc" },
    });

    ws.getFlyout().hide();
    ws.scroll(300, 0);

    const top = addBlock(ws, "top");

    if (workspace) {
      workspace.current = ws;
    }
  }, [ref]);

  return html`<div ref=${ref} id="workspace" />`;
};
