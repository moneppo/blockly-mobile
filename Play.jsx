/* global Blockly */

import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const svgIcons = "assets/BootstrapIcons.svg";

const Button = ({ button, activate }) => {
  const { width, height, rotation, x, y, icon } = button;
  const [selected, setSelected] = useState(false);

  const deselect = () => setSelected(false);
  return <g
    transform={`translate(${x} ${y}) rotate(${rotation} ${width / 2} ${height / 2})`}
  >
    <rect
      width={width}
      height={height}
      fill={button.color || "teal"}
      onMouseDown={activate}
      onMouseUp={deselect}
      onMouseLeave={deselect}
      onMouseOut={deselect}
    />
    <use
      href={`${svgIcons}#${icon}`}
      x={width * 0.1}
      y={height * 0.1}
      fill="white"
      width={width * 0.8}
      height={height * 0.8}
      onMouseDown={() => { setSelected(true); activate(button) }}
      onMouseUp={deselect}
      onMouseLeave={deselect}
      onMouseOut={deselect}
    />
  </g>
};

const audio = new Audio("assets/samples_snare.wav");

export default ({ buttons, onExit }) => {
  const activate = (button) => {
    audio.play();
  }

  return <>
    <header>
      <button onClick={onExit}><i class="bi bi-chevron-left" /></button>
    </header>
    <svg>
      <rect
        width="100%"
        height="100%"
        fill="transparent"
        stroke="blue"
      />
      {buttons.map(
        (b) => <Button button={b} activate={activate} />
      )}
    </svg>
  </>
};
