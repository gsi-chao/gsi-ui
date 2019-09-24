import Pagination from 'rc-pagination';
import React from 'react';
import styled from 'styled-components';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import { IPagination } from './types';

function getPosition(position: 'start' | 'center' | 'end') {
  return position !== 'center' ? `flex-${position}` : position;
}
export const PaginationStyled = styled(Pagination)`
  display: flex;
  justify-content: ${(props: IPagination) =>
    getPosition(props.position || 'center')};

  .rc-pagination-prev,
  .rc-pagination-next {
    font-size: 14px;
    & span.gsi-pagination-navigation-icon {
      color: #666;
    }
  }

  .rc-pagination-disabled span.gsi-pagination-navigation-icon {
    color: #ccc;
  }

  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    & span.gsi-pagination-navigation-jump-icon {
      color: ${(props: IPagination) =>
        props.buttonColor ? props.buttonColor : '#396faa'};
      vertical-align: middle;
    }
    &:not(:hover) {
      & span.gsi-pagination-navigation-jump-icon {
        display: none;
      }
    }
  }

  .rc-pagination-item:hover,
  .rc-pagination-item-active,
  .rc-pagination-options-quick-jumper input:hover,
  .rc-pagination-options-quick-jumper button:hover,
  .rc-pagination-options-quick-jumper button:active,
  .rc-pagination-options-quick-jumper button:focus,
  .rc-pagination-simple .rc-pagination-simple-pager input:hover,
  .rc-pagination-simple .rc-pagination-simple-pager button:hover,
  .rc-pagination-simple .rc-pagination-simple-pager button:active,
  .rc-pagination-simple .rc-pagination-simple-pager button:focus {
    border-color: ${(props: IPagination) =>
      props.buttonColor ? props.buttonColor : '#396faa'};
  }

  .rc-pagination-item-active {
    background-color: ${(props: IPagination) =>
      props.buttonColor ? props.buttonColor : '#396faa'};
  }

  .rc-pagination-item:hover a,
  .rc-pagination-jump-prev:hover:after,
  .rc-pagination-jump-next:hover:after,
  .rc-pagination-jump-prev-custom-icon:hover .custom-icon-jump-prev,
  .rc-pagination-jump-next-custom-icon:hover .custom-icon-jump-prev,
  .rc-pagination-jump-prev-custom-icon:hover .custom-icon-jump-next,
  .rc-pagination-jump-next-custom-icon:hover .custom-icon-jump-next,
  .rc-pagination-options-quick-jumper button:hover,
  .rc-pagination-options-quick-jumper button:active,
  .rc-pagination-options-quick-jumper button:focus,
  .rc-pagination-simple .rc-pagination-simple-pager button:hover,
  .rc-pagination-simple .rc-pagination-simple-pager button:active,
  .rc-pagination-simple .rc-pagination-simple-pager button:focus {
    color: ${(props: IPagination) =>
      props.buttonColor ? props.buttonColor : '#396faa'};
  }

  .rc-pagination-item-active:hover a {
    color: white;
  }

  .rc-pagination-item,
  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next,
  .rc-pagination-options-quick-jumper input,
  .rc-pagination-options-quick-jumper button,
  .rc-pagination-simple .rc-pagination-simple-pager input,
  .rc-pagination-simple .rc-pagination-simple-pager button,
  .rc-select-selection {
    border-radius: 4px;
  }

  /*SELECT*/
  li.rc-select-dropdown-menu-item-active {
    background-color: ${(props: IPagination) =>
      props.buttonColor ? props.buttonColor : '#396faa'};
  }

  .rc-select-focused .rc-select-selection,
  .rc-select-enabled .rc-select-selection:hover {
    border-color: ${(props: IPagination) =>
      props.buttonColor ? props.buttonColor : '#396faa'};
  }
  .rc-select-enabled .rc-select-selection:active {
    border-color: ${(props: IPagination) =>
      props.buttonColor ? props.buttonColor : '#396faa'};
  }
`;
