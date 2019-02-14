import styled from 'styled-components';
import { Cell } from '@blueprintjs/table';

export const DropdownCell = styled.div`
            border-bottom: 1px solid #dfdfe0;
            border-right: 1px solid #dfdfe0;
            padding: 0px 11px;
            
            & .ui.inline.dropdown>.text {
    font-weight: 400 !important;
}
            `;

export const DatetimeCell = styled(Cell)`
             padding: 0px;
             border-bottom: 1px solid #dfdfe0;
             
             &  span.bp3-popover-target {
                  display: inline-block;
                  width: 100%;
              }
              
              .bp3-input-group {
                  display: block;
                  position: relative;
                  border-bottom: 1px solid #dfdfe0 !important;
                  border-right: 1px solid #dfdfe0 !important;
              }
              
              .bp3-input:focus, .bp3-input.bp3-active {
                  box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0), inset 0 0 0 0px rgba(16, 22, 26, 0.15), inset 0 0px 0px rgba(16, 22, 26, 0.2);
              
              }
              
              .bp3-input {
                  outline: none !important;
                  border: none !important;
                   border-radius: 0px !important;
                  box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0), inset 0 0 0 0px rgba(16, 22, 26, 0.15), inset 0 0px 0px rgba(16, 22, 26, 0.2);
                  background: #ffffff;
                  height: 30px;
                  padding: 0 10px;
                  vertical-align: middle;
                  line-height: 30px;
                  color: #182026;
                  font-size: 13px;
                  font-weight: 400;
                  transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  appearance: none;
                  height: 17px !important;
              }
             `;

export const CheckboxCell = styled(Cell)`
             padding: 0px;
             
             & .ui.checkbox {
    position: relative;
    display: inline-block;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    outline: 0;
    vertical-align: baseline;
    font-style: normal;
    min-height: 17px;
    font-size: 12px;
    line-height: 17px;
    min-width: 17px;
    width: 100%;
}
             `;