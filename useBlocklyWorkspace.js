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

  const toolboxConfigurationRef = useRef(toolboxConfiguration);
  useEffect(() => {
    toolboxConfigurationRef.current = toolboxConfiguration;
    if (toolboxConfiguration && workspace) {
      workspace.updateToolbox(toolboxConfiguration);
    }
  }, [toolboxConfiguration, workspace]);

  // Workspace creation
  useEffect(() => {
    if (!ref.current) return;

    const newWorkspace = Blockly.inject(ref.current, {
      ...workspaceConfigurationRef.current,
      toolbox: toolboxConfigurationRef.current,
    });
    setWorkspace(newWorkspace);
    
    const handler = (event) => {
      console.log(event)
      if (event.isUiEvent && onBlocksChanged && workspace && blocks ) {
        onBlocksChanged(Blockly.serialization.workspaces.save(workspace))
      }
    }
    
     newWorkspace.addChangeListener(handler);

    return () => newWorkspace.dispose();
  }, [ref]);

  useEffect(() => {
    console.log("load1", blocks, workspace)
    if (blocks && workspace) {
      Blockly.serialization.workspaces.load(blocks, workspace);
    }
  }, [blocks, workspace]);

  return { workspace, blocks };
};

export default useBlocklyWorkspace;
