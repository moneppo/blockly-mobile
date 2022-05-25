/** Ported to Preact & ES6 from https://github.com/nbudin/react-blockly */

/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

import toolbox from "./toolbox.js";

const html = htm.bind(h);

const useBlocklyWorkspace = ({
  ref,
  blocks,
  toolboxConfiguration,
  workspaceConfiguration,
  onBlocksChanged,
}) => {
  const [workspace, setWorkspace] = useState(null);

  const workspaceConfigurationRef = useRef(workspaceConfiguration);
  useEffect(() => {
    workspaceConfigurationRef.current = workspaceConfiguration;
  }, [workspaceConfiguration]);

  // Workspace creation
  useEffect(() => {
    if (!ref.current) return;

    console.log("workspace creation");

    const newWorkspace = Blockly.inject(ref.current, {
      ...workspaceConfigurationRef.current,
      toolbox: toolboxConfiguration,
    });

    newWorkspace.getFlyout().hide();

    setWorkspace(newWorkspace);

    const handler = (event) => {
      console.log(event);
      if (event.type=="move" && (event.newParentId || event.oldParentId)) {
        onBlocksChanged(Blockly.serialization.workspaces.save(newWorkspace));
        
      }
   //   if (event.isUiEvent && event.type !== "selected" && onBlocksChanged && blocks) {
    //    onBlocksChanged(Blockly.serialization.workspaces.save(newWorkspace));
   //   }
    };

    newWorkspace.addChangeListener(handler);

    return () => {
      console.log("teardown");
      newWorkspace.dispose();
    };
  }, [ref]);

  useEffect(() => {
    if (blocks && workspace) {
      Blockly.serialization.workspaces.load(blocks, workspace);
    }
  }, [blocks, workspace]);

  return { workspace, blocks };
};

export default useBlocklyWorkspace;
