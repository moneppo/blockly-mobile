/* global Blockly */

export default class extends Blockly.MetricsManager {
  constructor(workspace) {
    super(workspace);
  }

  getAbsoluteMetrics() {
    return {left: 0, top: 0}
  }
}
