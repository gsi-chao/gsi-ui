import React, { Component } from 'react';
import { Page, Pages } from './style';
import { Icon } from '@blueprintjs/core';
import { FieldState, FormState } from 'formstate';
import { VSelectField } from '../Form';
import {
  IInfoPage,
  IItemsByPages,
  IState,
  LEFT_PAGE,
  RIGHT_PAGE,
  VPaginatorProps
} from './type';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const InfoPage = (props: IInfoPage) => {
  return (
    <div style={{ margin: '0px 10px' }}>
      {props.currentPage && (
        <span>
          Page <strong>{props.currentPage}</strong> of{' '}
          <strong>{props.totalPages}</strong>
        </span>
      )}
      <span>
        {' / '}
        Total: <strong className="text-secondary">{` ${props.totals}`}</strong>
      </span>
    </div>
  );
};

const ItemsByPages = (props: IItemsByPages) => {
  return (
    <VSelectField
      layer={{
        inputOrientation: 'start'
      }}
      filterable={false}
      margin={'0px 10px'}
      inline
      label={props.label ? props.label : 'Items by pages:'}
      minimal
      options={props.options}
      id="places"
      fieldState={props.fieldState}
      onChange={props.onChange}
      color={props.color?props.color:'black'}
    />
  );
};

export class VPagination extends Component<VPaginatorProps, IState> {
  form: FormState<any>;

  constructor(props: VPaginatorProps) {
    super(props);

    this.form = new FormState<any>({
      pageLimit: new FieldState(this.getPageLimit())
    });

    this.state = { currentPage: 1 };
  }

  getItemsByPages = () => {
    if (this.props.itemsByPage && this.props.itemsByPage.length > 0) {
      return this.props.itemsByPage;
    }
    return [
      { label: '5', value: 5 },
      { label: '10', value: 10 },
      { label: '20', value: 20 }
    ];
  };

  getPageNeighbours = () => {
    const { pageNeighbours = 0 } = this.props;

    return Math.max(0, Math.min(pageNeighbours, 2));
  };

  getTotalPages = () => {
    const { totalRecords = null, pageLimit = 30 } = this.props;
    return Math.ceil(totalRecords / pageLimit);
  };

  getTotalsRecord = () => {
    const { totalRecords = 0 } = this.props;

    return totalRecords;
  };

  getPageLimit = () => {
    const { pageLimit = 10 } = this.props;
    return pageLimit;
  };

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page: any) => {
    const { onPageChanged = (f: any) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.getTotalPages()));

    const paginationData = {
      currentPage,
      totalPages: this.getTotalPages(),
      pageLimit: this.getPageLimit(),
      totalRecords: this.getTotalsRecord()
    };
    const result: any = {
      paginationData,
      pageLimit: this.form.$.pageLimit.value
    };

    this.setState({ currentPage }, () => onPageChanged(result));
  };

  handleClick = (page: any, evt: any) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt: any) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.getPageNeighbours() * 2 - 1);
  };

  handleMoveRight = (evt: any) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.getPageNeighbours() * 2 + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.getTotalPages();
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.getPageNeighbours();

    const totalNumbers = this.getPageNeighbours() * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages: any[];

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
    if (!this.getTotalsRecord()) return null;

    if (this.getTotalPages() === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <div style={this.getStyles()}>
        {this.props.hideItemsByPage !== true && this.renderItemsByPages()}

        {this.props.hideInfoLabels !== true && this.renderInfoPage(currentPage)}

        <div>
          <Pages className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE) {
                return this.getLeftPage(index);
              }

              if (page === RIGHT_PAGE) {
                return this.getRightPage(index);
              }


              return (
                <Page
                  key={index}
                  backgroundColor={
                    currentPage === page
                      ? this.getBackgroundColorCurrentPage()
                      : 'transparent'
                  }
                  color={this.getColorCurrentPage()}
                  backgroundHover={
                    currentPage === page
                      ? this.getBackgroundColorCurrentPage()
                      : this.getBackgroundHover()
                  }
                  colorHover={this.getColorHover()}

                  onClick={e => {
                    this.handleClick(page, e);
                  }}

                  isLast={(index+1)===pages.length}
                >
                  {page}
                </Page>
              );
            })}
          </Pages>
        </div>
      </div>
    );
  }

  getBackgroundColorCurrentPage = (): string => {
    return this.props.customerStyle &&
      this.props.customerStyle.pageSelectedBackgroundColor
      ? this.props.customerStyle.pageSelectedBackgroundColor
      : '#e8e8e8';
  };

  getColorCurrentPage = (): string => {
    return this.props.customerStyle &&
      this.props.customerStyle.pageSelectedColor
      ? this.props.customerStyle.pageSelectedColor
      : 'black';
  };

  getBackgroundHover = (): string => {
    return this.props.customerStyle &&
      this.props.customerStyle.pageHoverBackgroundColor
      ? this.props.customerStyle.pageHoverBackgroundColor
      : '#e8e8e8';
  };

  getColorHover = ():string=>{
    return this.props.customerStyle &&
    this.props.customerStyle.pageHoverColor
      ? this.props.customerStyle.pageHoverColor
      : 'black';

  };

  getStyles: any = () => {
    return {
      display: 'flex',
      alignItems: 'center',
      border: 'solid 1px whitesmoke',
      borderRadius: '8px',
      width: 'fit-content',
      ...this.props.style
    };
  };

  private renderInfoPage(currentPage: number) {
    if (this.props.labels && this.props.labels.renderInfoDetails) {
      return this.props.labels.renderInfoDetails({
        currentPage,
        totalPages: this.getTotalPages(),
        totals: this.getTotalsRecord()
      });
    }

    return (
      <InfoPage
        currentPage={currentPage}
        totalPages={this.getTotalPages()}
        totals={this.getTotalsRecord()}
      />
    );
  }

  private renderItemsByPages() {
    const label: string | undefined =
      this.props.labels && this.props.labels.itemsByPage;

    return (
      <ItemsByPages
        fieldState={this.form.$.pageLimit}
        options={this.getItemsByPages()}
        label={label}
        onChange={value => {
          this.form.$.pageLimit.onChange(value);
          this.gotoPage(1);
        }}
        color={this.getColorCurrentPage()}
      />
    );
  }

  private getRightPage(index: number) {
    return (
      <Page
        onClick={e => {
          this.handleMoveRight(e);
        }}
        key={index}
        className="page-item"
      >
        <Icon style={{color:this.getColorIcon()}}  icon={'chevron-right'} />
      </Page>
    );
  }

  private getLeftPage(index: number) {
    return (
      <Page
        onClick={e => {
          this.handleMoveLeft(e);
        }}
        key={index}
        className="page-item"
      >
        <Icon style={{color:this.getColorIcon()}} icon={'chevron-left'} />
      </Page>
    );
  }

  private getColorIcon=():string=>{

    return  this.props.customerStyle && this.props.customerStyle.iconColor ? this.props.customerStyle.iconColor:'black';

  }
}
