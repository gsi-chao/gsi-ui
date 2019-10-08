import styled from 'styled-components';
import { IOrgChartContainer } from './types';

function getLineStyle(
  lineColor = 'gray',
  lineWidth = 1,
  isTop = false
): string {
  return `${lineWidth * (isTop ? 2 : 1)}px solid ${lineColor}`;
}

export const OrgChartContainer = styled.div`
  --lineStyle: ${({ lineColor, lineWidth }: IOrgChartContainer) =>
    getLineStyle(lineColor, lineWidth)};
  --lineTopStyle: ${({ lineColor, lineWidth }: IOrgChartContainer) =>
    getLineStyle(lineColor, lineWidth, true)};
  .orgchart {
    background: none;
    .node {
      padding: 0;
      position: relative;
      margin: 0 5px;
    }

    .bottomEdge {
      bottom: -2px;
    }

    .lines {
      & .downLine {
        background-color: ${({ lineColor }: IOrgChartContainer) =>
          lineColor || 'gray'};
        width: ${({ lineWidth }: IOrgChartContainer) =>
          `${(lineWidth || 1) * 2}px`};
      }
      & .rightLine {
        border-right: var(--lineStyle);
      }
      & .leftLine {
        border-left: var(--lineStyle);
      }
      & .topLine {
        border-top: var(--lineTopStyle);
      }
    }
  }
`;
