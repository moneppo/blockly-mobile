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
  y: 0,
});

export const addBlock = (ws, block) => {
  if (ws.blocks.blocks.length === 0) {
    return workspace([block]);
  } else {
    const first = ws.blocks.blocks[0];
    const rest = ws.blocks.blocks.slice(1);
    return workspace([{ ...first, next: block }, ...rest]);
  }
};
