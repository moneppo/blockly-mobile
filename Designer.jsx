import { createRef } from "https://unpkg.com/preact@latest?module";
const svgIcons = "assets/BootstrapIcons.svg";

// TODO: Scale after rotation is wonky

const Rotator = ({ button, update }) => {
  const ref = createRef();
  const { width, height, rotation } = button;

  const startRotate = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      update({ rotation: rotation + point.y - offset.y });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return <image
    href="assets/rotate.svg"
    ref={ref}
    x={width}
    y={height / 2 - 16}
    height="32"
    width="32"
    onMouseDown={startRotate}
  />
};

const Resizer = ({ button, update }) => {
  const ref = createRef();
  const { width, height } = button;

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
        width: Math.max(width + point.x - offset.x, 75),
        height: Math.max(height + point.y - offset.y, 75),
      });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  return <polyline
    points={`${width + 8},${height - 12} ${width + 8},${height + 8} ${width - 12},${height + 8}`}
    fill="transparent"
    stroke="black"
    pointer-events="all"
    ref={ref}
    stroke-width="2.3px"
    stroke-linecap="round"
    onMouseDown={startResize}
  />
};

const Edit = ({ onEdit, button }) => {
  return <image
    href="assets//code-slash.svg"
    height="32"
    width="32"
    x={button.width + 8}
    y="-16"
    onClick={onEdit}
  />
};

const Button = ({ select, selected, update, button, onEdit }) => {
  const ref = createRef();
  let { x, y, width, height, rotation } = button;

  const startDrag = (event) => {
    const svg = ref.current.ownerSVGElement;
    event.preventDefault();
    let offset = new DOMPoint(event.clientX, event.clientY);
    offset = offset.matrixTransform(svg.getScreenCTM().inverse());

    const mousemove = (event) => {
      event.preventDefault();
      let point = new DOMPoint(event.clientX, event.clientY);
      point = point.matrixTransform(svg.getScreenCTM().inverse());
      update({ x: x + point.x - offset.x, y: y + point.y - offset.y });
    };

    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    event.stopPropagation();
  };

  return <g
    ref={ref}
    transform={`translate(${x} ${y}) rotate(${rotation} ${width / 2} ${height / 2})`}
  >
    <rect
      width={width}
      height={height}
      fill={button.color || "teal"}
      onMouseDown={selected ? startDrag : select}
    />
    <use
      href={`${svgIcons}#${button.icon}`}
      x={width * 0.1}
      y={height * 0.1}
      fill="white"
      width={width * 0.8}
      height={height * 0.8}
      onMouseDown={selected ? startDrag : select}
    />
    {selected &&
      <>
        <Rotator button={button} update={update} />
        <Resizer button={button} update={update} />
        <Edit onEdit={onEdit} button={button} />
      </>}
  </g>;
};

export default ({ buttons, updateButton, selected, setSelected, onEdit }) => {
  return <svg>
    <rect
      width="100%"
      height="100%"
      fill="transparent"
      stroke="green"
      onClick={() => setSelected(-1)}
    />
    {buttons.map((b, i) => {
      const select = () => setSelected(i);

      return <Button
        button={b}
        key={i}
        selected={i === selected}
        update={(b) => updateButton(i, b)}
        select={select}
        onEdit={() => onEdit(i)}
      />;
    })}
  </svg>;
};
