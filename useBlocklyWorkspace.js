/** Ported to Preact & ES6 from https://github.com/nbudin/react-blockly */

/* global Blockly */

import { h } from "https://unpkg.com/preact@latest?module";
import { useState, useEffect, useRef, useCallback } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
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
}

function importFromObject(blocks, workspace) {
   Blockly.serialization.workspaces.load(blocks, workspace);
}

const useBlocklyWorkspace = ({
  ref,
  initialBlocks,
  toolboxConfiguration,
  workspaceConfiguration,
  onWorkspaceChange,
}) => {
  const [workspace, setWorkspace] = useState(null);
  const [blocks, setBlocks] = useState(initialBlocks);
  const [didInitialImport, setDidInitialImport] = useState(false);
  const [didHandleNewWorkspace, setDidHandleNewWorkspace] =
    useState(false);

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

  const handleWorkspaceChanged = useCallback(
    (newWorkspace) => {
      if (onWorkspaceChange) {
        onWorkspaceChange(newWorkspace);
      }
    },
    [onWorkspaceChange]
  );

  // Workspace creation
  useEffect(() => {
    if (!ref.current){
      return;
    }
    const newWorkspace = Blockly.inject(ref.current, {
      ...workspaceConfigurationRef.current,
      toolbox: toolboxConfigurationRef.current,
    });
    setWorkspace(newWorkspace);
    setDidInitialImport(false); // force a re-import if we recreate the workspace
    setDidHandleNewWorkspace(false); // Signal that a workspace change event needs to be sent.

    
    // Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount)
    return () => newWorkspace.dispose();

  }, [ref]);

  // Send a workspace change event when the workspace is created
  useEffect(() => {
    if (workspace && !didHandleNewWorkspace) {
      handleWorkspaceChanged(workspace);
    }
  }, [handleWorkspaceChanged, didHandleNewWorkspace, workspace]);

  // Workspace change listener
  useEffect(() => {
    if (workspace == null) {
      return undefined;
    }

    const listener = () => {
      handleWorkspaceChanged(workspace);
    };
    workspace.addChangeListener(listener);
    return () => {
      workspace.removeChangeListener(listener);
    };
  }, [workspace, handleWorkspaceChanged]);

  useEffect(() => {
    if (workspace == null) {
      return undefined;
    }

    const [callback, cancel] = debounce(() => {
      const newBlocks = Blockly.serialization.workspaces.save(workspace);
      if (newBlocks === blocks) {
        return;
      }

      setBlocks(newBlocks);
    }, 200);

    workspace.addChangeListener(callback);

    return () => {
      workspace.removeChangeListener(callback);
      cancel();
    };
  }, [workspace, blocks]);

  useEffect(() => {
    if (blocks && workspace && !didInitialImport) {
      const success = importFromObject(blocks, workspace);
      setDidInitialImport(true);
    }
  }, [blocks, workspace, didInitialImport]);

  return { workspace, blocks };
};

export default useBlocklyWorkspace;