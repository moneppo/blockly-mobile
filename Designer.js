import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

const Rotator = ({ button, update }) => {
  const ref = createRef();
  const { w, h, r } = button;

  const startRotate = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      update({ r: point.y - offset.y });
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

const Resizer = ({ button, update }) => {
  const ref = createRef();
  const { x, y, w, h } = button;

  const startResize = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      update({
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

const Button = ({ select, selected, update, button }) => {
  const ref = createRef();
  let { x, y, w, h, r } = button;

  const startDrag = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      console.log(offset, point, { x: point.x - offset.x, y: point.y - offset.y })
      update({ x: x + point.x - offset.x, y: y+ point.y - offset.y });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    event.stopPropagation();
  };

  return html` <g
    ref=${ref}
    transform="translate(${x} ${y}) rotate(${r} ${w / 2} ${h / 2})"
  >
    <rect
      width=${w}
      height=${h}
      fill="teal"
      onMouseDown=${selected ? startDrag : select}
    />
    ${selected &&
    html` <${Rotator} button=${button} update=${update} />
      <${Resizer} button=${button} update=${update} />`}
  </g>`;
};

export default ({buttons, updateButton}) => {
 
  const [selected, setSelected] = useState(-1);

  return html`<svg>
    <rect
      width="100%"
      height="100%"
      fill="transparent"
      stroke="green"
      onClick=${() => setSelected(-1)}
    />
    ${buttons.map((b, i) => {
      const select = () => setSelected(i);

      return html`<${Button}
        button=${b}
        key=${i}
        selected=${i === selected}
        update=${(b) => updateButton(i,b)}
        select=${select}
      />`;
    })}
  </svg> `;
};
