/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import {

  useEffect,

  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import VerticalMetrics from "./VerticalMetrics.js";
import toolbox from "./toolbox.js";
import { CustomRenderer } from "./CustomRenderer.js";
import IconField from "./IconField.js";
import useBlocklyWorkspace from "./useBlocklyWorkspace.js";

const resize = () => CustomRenderer.setScreenWidth(window.innerWidth);

export default ({ blocks, save }) => {
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

  return <div ref={blocklyRef} id="workspace" />;
};
