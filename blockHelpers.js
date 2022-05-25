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
    const result = workspace();
    let 
    let current = ws.blocks.blocks[0];
    while (current) {
      r
      current = current.next?.block;
    }
    const rest = ws.blocks.blocks.slice(1);
    return workspace([{ ...first, next: {block} }, ...rest]);
  }
};
