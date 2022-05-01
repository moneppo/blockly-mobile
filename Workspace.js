import { h, text } from "https://esm.run/hyperapp";

export default props =>
  h("div", {
    oncreate: (e) => {
      let workspace = Blockly.inject(e, {
        toolbox,
        renderer: "custom_renderer",
      });
    }
  }, [
    h("header", {})
    h("input", {
      type: "checkbox",
      checked: props.highlight,
      onclick: props.ontoggle,
    }),
  ])
 
<header></header>
    <main>
      <div id="root"></div>
    </main>

    <footer>
      <button id="add">
        +
      </button>
      <button id="trash">
        T
      </button>
    </footer>