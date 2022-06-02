/* global Blockly */
import {h} from "https://unpkg.com/preact@latest?module";
import toolbox from "./toolbox.js";

export default ({ addBlock }) => {
  return <div id="blockmenu">
    {toolbox.contents.map(
      (i) =>
        <button onclick={() => addBlock(i.type, i.fields)}>
          <i class={i.icon} />
          {i.display_name}
        </button>
    )}
  </div>
};
