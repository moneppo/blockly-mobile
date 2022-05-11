/* global Blockly */

import { h, createRef } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

import toolbox from "./toolbox.js";

const html = htm.bind(h);

export default ({ initialXML, children, ...rest }) => {
  const blocklyDiv = createRef();
  const toolbox = createRef();
  const workspace = createRef();

  useEffect(() => {
    if (!workspace.current) return;
    workspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    if (initialXML) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXML),
        workspace.current
      );
    }
    
  },[initialXML,blocklyDiv,toolbox]);

  return html`
            <div ref=${blocklyDiv} id="blocklyDiv" />
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style="display: 'none'; ref=${toolbox}>
                ${children}
            </xml>
        `;
};
