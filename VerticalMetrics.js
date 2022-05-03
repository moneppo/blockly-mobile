/* global Blockly */

export default class extends Blockly.MetricsManager {
  constructor(workspace) {
    super(workspace);
  }

  hasFixedEdges() {
    return true;
  }

  getComputedFixedEdges_(cachedViewMetrics = undefined) {
    const viewMetrics = cachedViewMetrics || this.getViewMetrics(false);

    return {
      top: 0,
      left: 0,
      right: viewMetrics.width,
    };
  }
}
