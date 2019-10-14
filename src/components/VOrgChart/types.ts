export interface IOrgChartContainer {
  lineColor?: string;
  lineWidth?: number;
}

export interface ITemplateProps {
  data: any;
  props?: any;
}

export interface IOrgChart {
  $chartContainer: any;
  $chart?: any;
  opts: IOrgChartOptions;
  defaultOptions: IOrgChartOptions;
  init(opts: IOrgChartOptions): IOrgChart;
  triggerInitEvent: () => void;
  attachExportButton: () => void;
  setOptions: (opts: any, val: any) => IOrgChart;
  panStartHandler: (e: any) => void;
  panEndHandler: (e: any) => void;
  bindPan: () => void;
  unbindPan: () => void;
  zoomWheelHandler: (e: any) => void;
  zoomStartHandler: (e: any) => void;
  zoomingHandler: (e: any) => void;
  zoomEndHandler: (e: any) => void;
  bindZoom: () => void;
  unbindZoom: () => void;
  getPinchDist: (e: any) => number;
  setChartScale: ($chart: any, newScale: number) => void;
  buildJsonDS: ($li: any) => { name: any; relationship: string };
  attachRel: (data: any, flags: any) => any;
  loopChart: ($chart: any) => { id: any };
  getHierarchy():
    | 'Error: orgchart does not exist'
    | 'Error: nodes do not exist'
    | 'Error: All nodes of orghcart to be exported must have data-id attribute!'
    | { id: any };
  getNodeState(
    $node: any,
    relation: 'parent' | 'children' | 'siblings'
  ): { exist: boolean; visible: boolean };
  getRelatedNodes(
    $node: any,
    relation: 'parent' | 'children' | 'siblings'
  ): any;
  hideParentEnd: (event: any) => void;
  hideParent($node: any): void;
  showParentEnd: (event: any) => void;
  showParent($node: any): void;
  stopAjax: ($nodeLevel: any) => void;
  isVisibleNode: (index: any, elem: any) => boolean;
  hideChildrenEnd: (event: any) => void;
  hideChildren($node: any): void;
  showChildrenEnd: (event: any) => void;
  showChildren($node: any): void;
  hideSiblingsEnd: (event: any) => void;
  hideSiblings($node: any, direction: 'left' | 'right'): void;
  showSiblingsEnd: (event: any) => void;
  showRelatedParentEnd: (event: any) => void;
  showSiblings($node: any, direction: 'left' | 'right'): void;
  startLoading: ($edge: any) => boolean;
  endLoading: ($edge: any) => void;
  isInAction: ($node: any) => boolean;
  switchVerticalArrow: ($arrow: any) => void;
  switchHorizontalArrow: ($node: any) => void;
  repaint: (node: any) => void;
  nodeEnterLeaveHandler: (event: any) => void;
  nodeClickHandler: (event: any) => void;
  loadNodes: (rel: any, url: any, $edge: any) => void;
  HideFirstParentEnd: (event: any) => void;
  topEdgeClickHandler: (event: any) => void;
  bottomEdgeClickHandler: (event: any) => void;
  hEdgeClickHandler: (event: any) => void;
  expandVNodesEnd: (event: any) => void;
  collapseVNodesEnd: (event: any) => void;
  toggleVNodes: (event: any) => void;
  createGhostNode: (event: any) => void;
  filterAllowedDropNodes: ($dragged: any) => void;
  dragstartHandler: (event: any) => void;
  dragoverHandler: (event: any) => void;
  dragendHandler: (event: any) => void;
  dropHandler: (event: any) => void;
  touchstartHandler: (event: any) => void;
  touchmoveHandler: (event: any) => void;
  touchendHandler: (event: any) => void;
  simulateMouseEvent: (event: any, simulatedType: any) => void;
  bindDragDrop: ($node: any) => void;
  createNode($node: any): any;
  buildHierarchy: ($appendTo: any, data: any) => void;
  buildChildNode: ($appendTo: any, data: any) => void;
  addChildren($node: any, data: any[]): void;
  buildParentNode: ($currentRoot: any, data: any) => void;
  addParent($currentRoot: any, data: any): void;
  complementLine: (
    $oneSibling: any,
    siblingCount: any,
    existingSibligCount: any
  ) => void;
  buildSiblingNode: ($nodeChart: any, data: any) => void;
  addSiblings($node: any, data: any[]): void;
  removeNodes($node: any): void;
  export(exportFilename: string, exportFileextension: 'png' | 'pdf'): boolean;
}

export interface IOrgChartOptions {
  data: object | string;
  pan?: boolean;
  zoom?: boolean;
  zoominLimit?: number;
  zoomoutLimit?: number;
  direction?: 't2b' | 'b2t' | 'l2r' | 'r2l';
  verticalLevel?: number;
  toggleSiblingsResp?: boolean;
  ajaxURL?: any;
  visibleLevel?: number;
  nodeTitle?: string;
  parentNodeSymbol?: string;
  nodeContent?: string;
  nodeId?: string;
  exportButton?: boolean;
  exportFilename?: string;
  exportFileextension?: 'png' | 'pdf';
  chartClass?: string;
  draggable?: boolean;
  createNode?($node: any, data: any): void;
  nodeTemplate?(data: any): void;
  dropCriteria?(draggedNode: any, dragZone: any, dropZone: any): boolean;
  initCompleted?($chart: any): void;
}

export interface IVOrgChart extends IOrgChartOptions, IOrgChartContainer {
  idContainer?: string;
  customTemplate?: (templateProps: ITemplateProps) => JSX.Element;
  onRender?: (api: IOrgChart) => void;
}
