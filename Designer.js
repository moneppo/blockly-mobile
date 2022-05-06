import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

const useLens = (val) => {
  const [state, setState] = useState(val);
  return (s) => {
    if (s === undefined) return state;
    
    if (Object.is(state, Object)) {
      setState({...state, ...s})
    } else {
      setState(s);
    }
   
  }
}

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
    
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };
  
  return html` <image
    href="https://cdn.glitch.global/42a61bc0-fedb-4e83-8c59-7a23c15be838/rotate.svg?v=1651769853843"
    ref=${ref}
    x=${width}
    y=${height / 2 - 4}
    height="8"
    width="8"
    onMouseDown=${startRotate}
  />`;
};

const Button = ({ select, box }) => {
  const ref = createRef();
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const {x, y, w, h, r} = box();
  const selected = select();

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
      box({x: cursor.x - dragOffset.x, y: cursor.y - dragOffset.y});
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  const rotate = r => box({r})

  return html` <g
    ref=${ref}
    transform="translate(${x} ${y}) rotate(${r} 10 10)"
  >
    <rect
      width="20"
      height="20"
      onMouseDown=${selected ? startDrag : select}
      fill="teal"
    />
    ${selected && html`<${Rotator} width="20" height="20" update=${rotate} />`}
  </g>`;
};

export default () => {
  const box = useLens({x: 0, y: 0, w: 20, h: 20, r: 0});
  const select = useLens(false);

  return html`<svg viewBox="0 0 100 100">
    <${Button}
      select=${select}
      box=${box}
    />
  </svg> `;
};
