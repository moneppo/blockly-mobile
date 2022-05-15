/* global Blockly */

export const workspace = (blocks) => ({
  blocks: {
    languageVersion: 0,
    blocks: blocks || [],
  },
});


export const block = (type, fields, next) => ({
    type,
    fields,
    next,
    id: Blockly.utils.idGenerator.genUid(),
    x: 0,
    y: 0
});

export const addBlock = (ws, block) => {
  return workspace([...ws.blocks.blocks, block]);
}
