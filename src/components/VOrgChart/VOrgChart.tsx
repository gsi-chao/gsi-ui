import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'orgchart/src/css/jquery.orgchart.css';
import { OrgChartContainer } from './styles';
import ReactDOM from 'react-dom';
import { IOrgChartOptions, IVOrgChart } from './types';

require('orgchart/src/js/jquery.orgchart.js');

export const VOrgChart = ({
  idContainer,
  customTemplate: Custom,
  nodeTemplate,
  lineWidth,
  lineColor,
  onRender,
  initCompleted,
  ...options
}: IVOrgChart) => {
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const chart = ($(containerRef.current) as any).orgchart({
      nodeTemplate: Custom
        ? (data: any) => {
            const div = document.createElement('div');
            ReactDOM.render(<Custom {...{ data }} />, div);
            return div;
          }
        : nodeTemplate,
      initCompleted: ($chart: any) => {
        initCompleted && initCompleted($chart);
        onRender && onRender(chart);
      },
      ...options
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
