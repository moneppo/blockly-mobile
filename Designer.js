import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

const Button = ({ selected, x, y, update }) => {
  const ref = createRef();
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDrag = (event) => {
    console.log("hai");
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let point = new DOMPoint(event.clientX, event.clientY);
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    setDragOffset({ x: point.x - x, y: point.y - y });

    const mousemove = (event) => {
      console.log("huh?")
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

  return html` <g ref=${ref} transform="translate(${x} ${y})">
    <rect width="20" height="20" onMouseDown=${startDrag} />
     <polyline points="0,100 50,25 50,75 100,0" fill="gray"/>
  </g>`;
};

export default () => {
  const [pos, setPos] = useState([0, 0]);

  const update = (x, y) => {
    setPos([x, y]);
  };

  return html`<svg viewBox="0 0 100 100">
    <${Button} x=${pos[0]} y=${pos[1]} update=${update} />
  </svg> `;
};
