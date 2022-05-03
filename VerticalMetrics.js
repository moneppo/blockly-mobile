/* global Blockly */

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

  getScrollMetrics(
    getWorkspaceCoordinates = undefined,
    cachedViewMetrics = undefined,
    cachedContentMetrics = undefined
  ) {
    const scrollMetrics = super.getScrollMetrics(
      getWorkspaceCoordinates,
      cachedViewMetrics,
      cachedContentMetrics
    );
    const contentMetrics =
      cachedContentMetrics || this.getContentMetrics(getWorkspaceCoordinates);
    const viewMetrics =
      cachedViewMetrics || this.getViewMetrics(getWorkspaceCoordinates);

    return scrollMetrics;
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
