import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'orgchart/dist/css/jquery.orgchart.min.css';
import 'orgchart/demo/css/font-awesome.min.css';
import { OrgChartContainer } from './styles';
import ReactDOM from 'react-dom';
import { IOrgChartOptions, IVOrgChart } from './types';

require('orgchart/dist/js/jquery.orgchart.min');

const VOrgChart = ({
  idContainer,
  customTemplate: Custom,
  nodeTemplate,
  lineWidth,
  lineColor,
  ...options
}: IVOrgChart) => {
  const containerRef = useRef<any>(null);

  useEffect(() => {
    ($(containerRef.current) as any).orgchart({
      ...options,
      nodeTemplate: Custom
        ? (data: any) => {
            const div = document.createElement('div');
            ReactDOM.render(<Custom {...{ data }} />, div);
            return div;
          }
        : nodeTemplate
    } as IOrgChartOptions);
    return () => {
      $(containerRef.current).empty();
    };
  }, []);

  return (
    <OrgChartContainer
      id={idContainer || 'vx-org-chart-container'}
      ref={containerRef}
      {...{ lineWidth, lineColor }}
    />
  );
};

export default VOrgChart;
