import { h, createRef } from "https://unpkg.com/preact@latest?module";
import { useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";
import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

const Rect = () => {
    const ref = createRef();
 
    const startDrag = (event) => {
      const svg = ref.current.ownerSVGElement;
      event.preventDefault();
      let point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      point = point.matrixTransform(svg.getScreenCTM().inverse());
    this.setState({dragOffset: {
      x: point.x - this.state.rect.x,
      y: point.y - this.state.rect.y
    }});
    
    const mousemove = (event) => {
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;
      let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
      this.setState({rect: {
        x: cursor.x - this.state.dragOffset.x,
        y: cursor.y - this.state.dragOffset.y
      }});
    };
    
    const mouseup = (event) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
    
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  }
}

  
    return html`
      <svg viewBox="0 0 100 100">
        <rect
          x={this.state.rect.x}
          y={this.state.rect.y}
          width="20"
          height="20"
          ref=${ref}
          onMouseDown=${startDrag}
        />
      </svg>`;
  
