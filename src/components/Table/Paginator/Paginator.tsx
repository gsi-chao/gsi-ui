import React, { Component, Fragment } from "react";
import { Page, Pages } from './style';
import { Icon } from '@blueprintjs/core';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from:number, to:number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export interface IProps {
  totalRecords:any;
  pageLimit:number;
  pageNeighbours:number;
  onPageChanged:(value:any)=>void

}

export interface IState {
  currentPage:number
}


class Pagination extends Component<IProps,IState> {
  pageLimit:number;
  totalRecords:number;
  pageNeighbours:number;
  totalPages:number;

  constructor(props:IProps) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page:any) => {
    const { onPageChanged = (f:any) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page:any, evt:any) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt:any) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = (evt:any) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
          <Pages className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <Page onClick={(e)=>{this.handleMoveLeft(e)}}  key={index} className="page-item" >
                       <Icon icon={'chevron-left'} />
                  </Page>
                );

              if (page === RIGHT_PAGE)
                return (
                  <Page onClick={(e)=>{this.handleMoveRight(e)}} key={index} className="page-item" >

                    <Icon icon={'chevron-right'} />
                  </Page>
                );

              return (

                <Page
                  key={index}
                  backgroundColor={
                    currentPage === page ? "#e8e8e8" : "transparent"
                    }
                  backgroundHover={ currentPage === page ? "#e8e8e8" : "whitesmoke"}
                  onClick={(e)=>{this.handleClick(page,e)}}
                >
                    {page}
                </Page>
              );
            })}
          </Pages>
      </Fragment>
    );
  }
}

// Pagination.propTypes = {
//   totalRecords: PropTypes.number.isRequired,
//   pageLimit: PropTypes.number,
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func
// };

export default Pagination;
