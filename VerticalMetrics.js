/* global Blockly */


// This metrics manager completely disregards the toolbox flyout
// and only enables vertical scrolling
export default class extends Blockly.MetricsManager {
  constructor(workspace) {
    super(workspace);
  }

  hasFixedEdges() {
    return true;
  }

  getAbsoluteMetrics() {
    return { left: 0, top: 0 };
  }
  
  getViewMetrics(opt_getWorkspaceCoordinates) {
    const scale = opt_getWorkspaceCoordinates ? this.workspace_.scale : 1;
    const svgMetrics = this.getSvgMetrics();
   
    return {
      height: svgMetrics.height / scale,
      width: svgMetrics.width / scale,
      top: -this.workspace_.scrollY / scale,
      left: -this.workspace_.scrollX / scale,
    };
  }
  

  getComputedFixedEdges_(opt_viewMetrics) {
    const vScrollEnabled = this.workspace_.isMovableVertically();
    const viewMetrics = opt_viewMetrics || this.getViewMetrics(false);

    const edges = {};

    edges.top = 0;

    edges.left = viewMetrics.left;
    edges.right = viewMetrics.left + viewMetrics.width;
    return edges;
  }
}
