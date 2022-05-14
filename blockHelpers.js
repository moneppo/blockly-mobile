/* global Blockly */

export const newWorkspace = () => ({
  blocks: {
    languageVersion: 0,
    blocks: [],
  },
});

export const addBlock = (workspace, type, fields) => {
  workspace.blocks.blocks.push({
    type,
    fields,
    id: Blockly.utils.idGenerator.genUid(),
    x: 0,
    y: 0,
  });
  return workspace
};