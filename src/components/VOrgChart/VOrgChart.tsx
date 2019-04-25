import React from 'react';
import $ from 'jquery';
require('orgchart/dist/js/jquery.orgchart.min');
import 'orgchart/dist/css/jquery.orgchart.min.css';
import 'orgchart/demo/css/font-awesome.min.css';
import { OrgChartContainer } from './styles';

export interface VOrgChartProps {
  dataSource: any;
  draggable?: boolean;
  onClick?: any;
  onReorder?: any;
}

export interface VOrgChartState {
  dataSource: any;
  draggedElement: any;
}

export class VOrgChart extends React.Component<VOrgChartProps, VOrgChartState> {
  public $el: any;
  public el: any;

  constructor(props: VOrgChartProps) {
    super(props);
    this.state = {
      draggedElement: null,
      dataSource: this.props.dataSource
    };
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.$el.orgchart({
      chartContainer: '#vx-org-chart-container',
      data: this.props.dataSource || {},
      nodeContent: 'title',
      createNode: (node: any, data: any) => {
        const possibleSon =
          node &&
          node[0] &&
          node[0].firstChild &&
          node[0].firstChild.firstChild;
        if (possibleSon && possibleSon.className) {
          possibleSon.className = possibleSon.className.replace('fa-users', '');
        }
        this.props.onClick &&
          node.on('click', () => {
            this.props.onClick(data);
          });
        node.on('drop', () => {
          const { dataSource, draggedElement } = this.state;
          this.handleReorderOrgChart(data);
        });
        node.on('drag', () => {
          this.setDraggedElement(data);
        });
      },
      draggable: this.props.draggable || false,
      dropCriteria: (draggedNode: any, dragZone: any, dropZone: any) => {
        if (
          draggedNode[0].className.includes('Terminal') &&
          dropZone[0].className.includes('Company')
        ) {
          return true;
        }
        return false;
      }
    });
  }

  setDraggedElement = (data: any) => {
    if (data !== this.state.draggedElement) {
      this.setState({ draggedElement: data });
    }
  };

  handleReorderOrgChart = (droppedData: any) => {
    const { dataSource, draggedElement } = this.state;
    dataSource.children.some(
      (item: any) =>
        item.children &&
        item.children.some((subItem: any) => {
          const subResult = subItem.id === draggedElement.id;
          if (subResult) {
            item.children = item.children.filter(
              (filteredItem: any) => filteredItem.id !== draggedElement.id
            );
          }
          return subResult;
        })
    );
    dataSource.children.some((item: any) => {
      const result = item.id === droppedData.id;
      if (result) {
        draggedElement.parentId = droppedData.id;
        if (item.children && item.children.length > 0) {
          item.children.push(draggedElement);
        } else {
          item.children = [draggedElement];
        }
      }
      return result;
    });
    this.setState(dataSource, () => {
      if (this.props.onReorder) {
        this.props.onReorder(this.state.dataSource);
      }
    })
  };

  componentWillUnmount() {
    this.$el.empty();
  }

  render() {
    return (
      <OrgChartContainer
        id="vx-org-chart-container"
        ref={el => (this.el = el)}
      />
    );
  }
}
