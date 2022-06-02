/* global Blockly */
import { h } from "https://unpkg.com/preact@latest?module";

export default ({ onTrashClick, onAddClick, onRunClick, children }) => {
  return <footer>
    <button onclick={onAddClick}>
      <i class="bi bi-plus-square" />
    </button>
    <button onclick={onRunClick}>
      <i class="bi bi-play" />
    </button>
    <button onclick={onTrashClick}>
      <i class="bi bi-trash3" />
    </button>
    {children}
  </footer>;
};
