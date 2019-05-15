import styled, { css } from 'styled-components';
import { Cell, ColumnHeaderCell } from '@blueprintjs/table';
import { IConfignHeader } from './TableColumn';
import { VInputField, VSelectField } from '../Form';

export interface IProps {
  isValid: boolean;
}

export const CellDiv = styled(Cell)`
  padding: 0 !important;

  ${(props: IProps) => {
    return props.isValid ? '' : 'background-color: #F5CDC9;';
  }}

  & .bp3-table-cell.bp3-table-truncated-cell {
    width: 100%;
    height: 100%;
  }

  & .bp3-table-no-wrap-text {
    height: 100%;

    width: 100%;
  }
`;

export interface ICellCenterText {
  textAling?: string;
}

export const CellCenterText = styled(Cell)`
  & .bp3-table-truncated-text.bp3-table-no-wrap-text {
    text-align: ${(props: ICellCenterText) =>
      props.textAling ? props.textAling : 'center'};
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ColumnHeaderCellStyled = styled(ColumnHeaderCell)`
  background-color: ${(props: IConfignHeader) =>
    props ? props.backgroundColor : 'gray'}!important;
  cursor: default;
  :hover {
    filter: brightness(75%);
  }
  ::before {
    display: none;
  }

  & div.bp3-table-th-menu-container-background {
    background: #ffffff00 !important;
  }

  & div.bp3-table-column-name-text {
    color: ${(props: IConfignHeader) =>
      props ? props.textColor : 'gray'} !important;
    text-align: ${(props: IConfignHeader) =>
      props.textAlign ? props.textAlign : 'center'} !important;
  }

  & div.bp3-table-reorder-handle {
    color: ${(props: IConfignHeader) =>
      props ? props.textColor : 'gray'} !important;
  }
`;

export interface ISelectionStyle {
  borderColor?: string;
  borderRadius?: string;
  backgroundColor?: string;
}

interface ITableContainer {
  tableHeight?: string;
  isEdit?: any;
  striped?: boolean;
  selection?: ISelectionStyle;
}

function existBorders(props: ITableContainer) {
  return props.selection && props.selection.borderColor;
}

function existBorderRadius(props: ITableContainer) {
  return props.selection && props.selection.borderRadius;
}

function existBackgroundColor(props: ITableContainer) {
  return props.selection && props.selection.backgroundColor;
}

export const TableContainer = styled.div`
  width: 100%;
  min-height: ${(props: ITableContainer) =>
    props.tableHeight ? `${props.tableHeight} !important` : '100px !important'};
  height: ${(props: ITableContainer) =>
    props.tableHeight && `${props.tableHeight} !important`};
  border: ${(props: ITableContainer) =>
    props.isEdit ? '1px solid #dbdcdd' : 'none'};

  & .bp3-table-cell {
    box-shadow: none !important;
  }
  ${(props: ITableContainer) =>
    props.striped &&
    css`
      & .bp3-table-cell-ledger-even {
        background-color: rgba(220, 220, 221, 0.49) !important;
        border-bottom: 1px solid rgba(128, 128, 128, 0.11);
      }
    `};

  & .bp3-table-cell-ledger-odd {
    border-bottom: 1px solid white !important;
  }

  & .bp3-table-column-headers .bp3-table-header {
    min-height: 35px;
    line-height: 35px;
    box-shadow: none;
  }
  & .bp3-table-quadrant-top-left .bp3-table-header.bp3-table-last-in-row {
    box-shadow: 0 0 0 rgba(16, 22, 26, 0.15),
      inset -3px 0 0 rgba(16, 22, 26, 0.15) !important;
  }

  & .bp3-table-selection-region {
    border: ${(props: ITableContainer) =>
      existBorders(props)
        ? `1px solid ${props!.selection!.borderColor}`
        : '1px solid #137cbd'};
    border-radius: ${(props: ITableContainer) =>
      existBorderRadius(props) ? `${props.selection!.borderRadius}px` : '3px'};
    background-color: ${(props: ITableContainer) =>
      existBackgroundColor(props)
        ? `${props.selection!.backgroundColor}`
        : 'hsla(192, 73%, 36%, 0.15)'};
  }
`;

export const StyledHeaderFilterInput = styled(VInputField)`
  width: calc(100% - 9px);
  max-width: 100%;
`;
export const StyledHeaderFilterSelect = styled(VSelectField)`
  width: calc(100% - 9px);
  .gsi-input-and-error-container {
    width: 100% !important;
  }
`;
export const StyledHeaderFilterSelectContainer = styled.div`
  & > .bp3-form-group {
    width: calc(100% - 9px);
    max-width: 100%;
  }
  .gsi-input-and-error-container {
    width: 100% !important;
  }
`;
