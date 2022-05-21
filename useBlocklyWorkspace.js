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

const debounce = (func, wait) => {
  let timeout = null;
  let later = null;

  const debouncedFunction = (...args) => {
    later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  const cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      later();
    }
  };

  return [debouncedFunction, cancel];
};

function importFromObject(blocks, workspace) {
  Blockly.serialization.workspaces.load(blocks, workspace);
}

const useBlocklyWorkspace = ({
  ref,
  blocks,
  toolboxConfiguration,
  workspaceConfiguration,
  onBlocksChanged,
}) => {
  const [workspace, setWorkspace] = useState(null);
  const [notifiedUpdate, setNotifiedUpdate] = useState(false);
 
  // we explicitly don't want to recreate the workspace when the configuration changes
  // so, we'll keep it in a ref and update as necessary in an effect hook
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
   
    // Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount)
    return () => newWorkspace.dispose();
  }, [ref]);

  useEffect(() => {
    if (workspace == null) {
      return undefined;
    }
    
//         const [callback, cancel] = debounce(() => {
//       if (notifiedUpdate) {
//         setNotifiedUpdate(false);
//       }
      
//       const newBlocks = Blockly.serialization.workspaces.save(workspace);
  
//       if (newBlocks === blocks) {
//         return;
//       }

//       console.log("blocks", newBlocks);
//       setNotifiedUpdate(true);
//       onBlocksChanged(newBlocks);
//     }, 2000);

//     workspace.addChangeListener(callback);

    return () => {
    //  workspace.removeChangeListener(callback);
     // cancel();
    };
  }, [workspace, blocks]);

  useEffect(() => {
    if (blocks && workspace) {
      const success = importFromObject(blocks, workspace);
    }
  }, [blocks, workspace]);

  return { workspace, blocks };
};

export default useBlocklyWorkspace;
