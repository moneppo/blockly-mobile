/* global Blockly */

import { h, render } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import { StateRouter } from "./StateRouter.js";
import Designer from "./Designer.js";
import { workspace, block, addBlock } from "./blockHelpers.js";
import Footer from "./Footer.js";
import BlockMenu from "./BlockMenu.js";
import IconMenu from "./IconMenu.js";
import Workspace from "./Workspace.js";
import Play from "./Play.js";

// TODO:
//  - Run view
//  - Run triggers starter code
//  - down/over triggers code
//  - Audio engine
//  - Block definitions
//  - Child blocks render smaller than parent
//  - Image background

const App = () => {
  const [selected, setSelected] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [mode, setMode] = useState({ name: "design", id: 0 });
  const [startingBlocks, setStartingBlocks] = useState(
    workspace([
      block("top", undefined, block("play_sample", { NAME: "OPTIONNAME" })),
    ])
  );

  const updateButton = (i, b) => {
    buttons[i] = { ...buttons[i], ...b };
    setButtons([...buttons]);
  };

  const addButton = (icon, color) => {
    setMenuOpen(false);
    setSelected(buttons.length);
    setButtons([
      ...buttons,
      {
        x: 35,
        y: 35,
        width: 100,
        height: 100,
        rotation: 0,
        color,
        icon,
        b: workspace([block("event", { icon })]),
      },
    ]);
  };

  const onTrashClick = () => {
    if (mode.name === "design" && selected !== null) {
      setButtons((b) => {
        b.splice(selected, 1);
        return b;
      });
      setSelected(null);
      return;
    }
    if (Blockly.selected && Blockly.selected.isDeletable()) {
      const ws = Blockly.selected.workspace;
      Blockly.selected.checkAndDelete();
      if (mode.name === "started") {
        setStartingBlocks(Blockly.serialization.workspaces.save(ws));
      } else if (mode.name === "button") {
        setButtons((buttons) => {
          buttons[mode.id].b = Blockly.serialization.workspaces.save(ws);
          return [...buttons];
        });
      }
    }
  };

  const add = (type, fields) => {
    setMenuOpen(false);

    if (mode.name === "started") {
      setStartingBlocks(addBlock(startingBlocks, block(type, fields)));
    } else if (mode.name === "button") {
      setButtons((buttons) => {
        buttons[mode.id].b = addBlock(buttons[mode.id].b, block(type, fields));
        return [...buttons];
      });
    }
  };

  const navLeft = () => {
    if (mode.name === "started") {
      setMode({ name: "design" });
    } else if (mode.name === "button") {
      if (mode.id === 0) {
        setMode({ name: "started" });
      } else {
        setMode({ name: "button", id: mode.id - 1 });
      }
    }
  };

  const navRight = () => {
    switch (mode.name) {
      case "design":
        setMode({ name: "started" });
        break;
      case "started":
        setMode({ name: "button", id: 0 });
        break;
      case "button":
        setMode({ name: "button", id: mode.id + 1 });
        break;
    }
  };

  let showRight =
    mode.name === "design" ||
    (mode.name === "started" && buttons.length > 0) ||
    (mode.name !== "button" && mode.i < buttons.length - 1);

  const saveBlocks = (blocks, index) => {
    setButtons((b) => {
      b[index].b = blocks;
      return [...b];
    });
  };

  if (mode.name === "play") {
    return <Play
      buttons={buttons}
      onExit={() => setMode({ name: "design" })}
    />
  }

  return <>
    <header style="user-select: none;">
      <button onClick={navLeft}>
        {mode.name !== "design" && <i class="bi bi-chevron-left" />}
      </button>
      <button onClick={navRight}>
        {showRight && <i class="bi bi-chevron-right" />}
      </button>
    </header>
    <main style="user-select: none;">
      <StateRouter state={mode}>
        <Designer
          default
          buttons={buttons}
          updateButton={updateButton}
          selected={selected}
          setSelected={setSelected}
          onEdit={(id) => setMode({ name: "button", id })}
        />
        <Workspace
          when={(s) => s.name === "started"}
          blocks={startingBlocks}
          save={setStartingBlocks}
        />
        <Workspace
          when={(s) => s.name === "button"}
          toProps={(s) => ({
            blocks: buttons[s.id].b,
            save: (b) => saveBlocks(b, s.id),
          })}
        />
      </StateRouter>
    </main>
    <Footer style="user-select: none;"
      onAddClick={(onAddClick) => setMenuOpen(!menuOpen)}
      onTrashClick={onTrashClick}
      onRunClick={() => setMode({ name: "play" })}>
      {
        menuOpen &&
        (mode.name === "design"
          ? <IconMenu addButton={addButton} />
          : <BlockMenu addBlock={add} />)
      }
    </Footer>
  </>;
};

render(<App />, document.body);
