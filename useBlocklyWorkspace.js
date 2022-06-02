/** Ported to Preact & ES6 from https://github.com/nbudin/react-blockly */

/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import {
  useState,
  useEffect,
  useRef,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

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

    const newWorkspace = Blockly.inject(ref.current, {
      ...workspaceConfigurationRef.current,
      toolbox: toolboxConfiguration,
    });

    newWorkspace.getFlyout().hide();

    setWorkspace(newWorkspace);

    // This is a poor way to manage state between Blockly and an FRP
    // system like React or Preact, but it enables the direct recording
    // of the blockly workspace as a JS object for storage in P/React state,
    // while also enabling the modification of that JS object outside of 
    // Blockly, e.g. through the footer menu.
    const handler = (event) => {
      if (event.type=="move" && (event.newParentId)) {
        onBlocksChanged(Blockly.serialization.workspaces.save(newWorkspace));
        
      }
    };

    newWorkspace.addChangeListener(handler);

    return () => newWorkspace.dispose();
  }, [ref]);

  useEffect(() => {
    if (blocks && workspace) {
      Blockly.serialization.workspaces.load(blocks, workspace);
    }
  }, [blocks, workspace]);

  return { workspace, blocks };
};

export default useBlocklyWorkspace;
