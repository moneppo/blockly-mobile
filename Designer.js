import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Essentially a getter/setter for higher-level state,
// reducing the number of attributes that need to be passed
// to child components.
const useLens = (val) => {
  const [state, setState] = useState(val);
  return (s) => {
    if (s === undefined) return state;

    if (typeof val === "object") {
      setState({ ...state, ...s });
    } else {
      setState(s);
    }
  };
};

const useSubLens = (state, setState, key) => {
  return (s) => {
    if (s === undefined) return state[key];

    if (typeof s === "object") {
      setState((oldState => {
        oldState[key] = {}
      }));
    } else {
      setState(s);
    }
  };
};

// TODO: Correct offsets

const Rotator = ({ box }) => {
  const ref = createRef();
  const { w, h, r } = box();

  const startRotate = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      box({ r: point.y - offset.y });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return html` <image
    href="https://cdn.glitch.global/42a61bc0-fedb-4e83-8c59-7a23c15be838/rotate.svg?v=1651769853843"
    ref=${ref}
    x=${w}
    y=${h / 2 - 16}
    height="32"
    width="32"
    onMouseDown=${startRotate}
  />`;
};

const Resizer = ({ box }) => {
  const ref = createRef();
  const { x, y, w, h } = box();

  const startResize = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      box({
        w: Math.max(w + point.x - offset.x, 75),
        h: Math.max(h + point.y - offset.y, 75),
      });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return html`<polyline
    points="${w + 8},${h - 12} ${w + 8},${h + 8} ${w - 12},${h + 8}"
    fill="transparent"
    stroke="black"
    pointer-events="all"
    ref=${ref}
    stroke-width="2.3px"
    stroke-linecap="round"
    onMouseDown=${startResize}
  />`;
};

const Button = ({ select, box }) => {
  const ref = createRef();
  const { x, y, w, h, r } = box();
  const selected = select();

  const startDrag = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      let cursor = point.matrixTransform(svg.getScreenCTM().inverse());
      box({ x: point.x - offset.x, y: point.y - offset.y });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    event.stopPropagation();
  };

  const rotate = (r) => box({ r });

  return html` <g
    ref=${ref}
    transform="translate(${x} ${y}) rotate(${r} ${w / 2} ${h / 2})"
  >
    <rect
      width=${w}
      height=${h}
      fill="teal"
      onMouseDown=${selected ? startDrag : () => select(true)}
    />
    ${selected &&
    html` <${Rotator} box=${box} />
      <${Resizer} box=${box} />`}
  </g>`;
};

export default () => {
  const box = useLens({ x: 25, y: 25, w: 100, h: 100, r: 0 });
  const select = useLens(false);

  return html`<svg viewBox="0 0 auto 100">
    <rect
      width="100%"
      height="100%"
      fill="transparent"
      stroke="green"
      onMouseUp=${() => select(false)}
    />
    <${Button} select=${select} box=${box} />
  </svg> `;
};
