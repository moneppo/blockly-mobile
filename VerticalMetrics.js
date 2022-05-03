/* global Blockly */

export default class extends Blockly.MetricsManager {
  constructor(workspace) {
    super(workspace);
  }

  getAbsoluteMetrics() {
    return {left: 0, top: 0}
  }
  
  getScrollMetrics(
      getWorkspaceCoordinates = undefined,
      cachedViewMetrics = undefined,
      cachedContentMetrics = undefined) {
    
    
    const scrollMetrics = super.getScrollMetrics(
        getWorkspaceCoordinates, cachedViewMetrics, cachedContentMetrics);
    const contentMetrics = cachedContentMetrics ||
        this.getContentMetrics(getWorkspaceCoordinates);
    const viewMetrics = cachedViewMetrics ||
        this.getViewMetrics(getWorkspaceCoordinates);

    return scrollMetrics;
  }
}
