import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

const Rotator = ({ width, height, rotation, update }) => {
  const ref = createRef();
  const [offset, setOffset] = useState(0);

  const startRotate = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    setOffset(event.clientX - rotation);

    const mousemove = (event) => {
      event.preventDefault();
      update(event.clientX - offset);
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  };
  return html`<ellipse ref=${ref} cx="20" cy="20" rx="3" ry="3" />`;
};

const Button = ({ selected, x, y, update, select }) => {
  const ref = createRef();
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDrag = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let point = new DOMPoint(event.clientX, event.clientY);
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    setDragOffset({ x: point.x - x, y: point.y - y });

    const mousemove = (event) => {
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;
      let cursor = point.matrixTransform(svg.getScreenCTM().inverse());
      update(cursor.x - dragOffset.x, cursor.y - dragOffset.y);
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  //    ${selected && html`<${Rotator} />`}
  return html` <g ref=${ref} transform="translate(${x} ${y})">
    <rect
      width="20"
      height="20"
      onMouseDown=${selected ? startDrag : select}
      fill="teal"
    />
  </g>`;
};

export default () => {
  const [pos, setPos] = useState([0, 0]);
  const [selected, setSelected] = useState(false);

  const update = (x, y) => {
    setPos([x, y]);
  };

  return html`<svg viewBox="0 0 100 100">
    <${Button}
      selected=${selected}
      x=${pos[0]}
      y=${pos[1]}
      update=${update}
      select=${setSelected}
    />
  </svg> `;
};
