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
  data: object | string; // data source usded to build out structure of orgchart. It could be a json object or a string containing the URL to which the ajax request is sent.
  pan?: boolean; // no	false	Users could pan the orgchart by mouse drag&drop if they enable this option.
  zoom?: boolean; // no	false	Users could zoom-in/zoom-out the orgchart by mouse wheel if they enable this option.
  zoominLimit?: number; // no	7	Users are allowed to set a zoom-in limit.
  zoomoutLimit?: number; // no	0.5	Users are allowed to set a zoom-out limit.
  direction?: 't2b' | 'b2t' | 'l2r' | 'r2l'; // no	"t2b"	The available values are t2b(implies "top to bottom", it's default value), b2t(implies "bottom to top"), l2r(implies "left to right"), r2l(implies "right to left").
  verticalLevel?: number; // no		Users can make use of this option to align the nodes vertically from the specified level.
  toggleSiblingsResp?: boolean; // no	false	Once enable this option, users can show/hide left/right sibling nodes respectively by clicking left/right arrow.
  ajaxURL?: any; // no		It includes four properties -- parent, children, siblings, families(ask for parent node and siblings nodes). As their names imply, different propety provides the URL to which ajax request for different nodes is sent.
  visibleLevel?: number; // no	999	It indicates the level that at the very beginning orgchart is expanded to.
  nodeTitle?: string; // no	"name"	It sets one property of data source as text content of title section of orgchart node. In fact, users can create a simple orghcart with only nodeTitle option.
  parentNodeSymbol?: string; // no	"fa-users"	Using font awesome icon to imply that the node has child nodes.
  nodeContent?: string; // no		It sets one property of data source as text content of content section of orgchart node.
  nodeId?: string; // no	"id"	It sets one property of data source as unique identifier of every orgchart node.
  exportButton?: boolean; // no	false	It enable the export button for orgchart.
  exportFilename?: string; // no	"Orgchart"	It's filename when you export current orgchart as a picture.
  exportFileextension?: 'png' | 'pdf'; // no	"png"	Available values are png and pdf.
  chartClass?: string; // no	""	when you wanna instantiate multiple orgcharts on one page, you should add different classname to them in order to distinguish them.
  draggable?: boolean; // no	false	Users can drag & drop the nodes of orgchart if they enable this option. **Note**: this feature doesn't work on IE due to its poor support for HTML5 drag & drop API.
  createNode?($node: any, data: any): void; // no		It's a callback function used to customize every orgchart node. It receives two parameters: "$node" stands for jquery object of single node div; "data" stands for datasource of single node.
  nodeTemplate?(data: any): void; // no		It's a template generation function used to customize any complex internal structure of node. It receives only one parameter: "data" stands for json datasoure which will be use to render one node.
  dropCriteria?(draggedNode: any, dragZone: any, dropZone: any): boolean; // no		Users can construct their own criteria to limit the relationships between dragged node and drop zone. Furtherly, this function accept three arguments(draggedNode, dragZone, dropZone) and just only return boolen values.
  initCompleted?($chart: any): void; // no		It can often be useful to know when your table has fully been initialised, data loaded and rendered, particularly when using an ajax data source. It receives one parament: "$chart" stands for jquery object of initialised chart.
}

export interface IVOrgChart extends IOrgChartOptions, IOrgChartContainer {
  idContainer?: string;
  customTemplate?: (templateProps: ITemplateProps) => JSX.Element;
}
