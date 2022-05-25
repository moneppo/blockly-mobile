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
    let current = ws.blocks.blocks[0];
    while (current.next?.block) {
      current = current.next.block;
    }

    current.next = {block};
    return {...ws};
  }
};
