import React, { Component } from 'react';
import { Page, Pages } from './style';
import { Icon } from '@blueprintjs/core';
import { FieldState, FormState } from 'formstate';
import { VSelectField } from '../../Form';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

interface IInfoPage {
  totalPages: number;
  currentPage: number;
  totals: number;
}
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

interface IItemsByPages {
  fieldState: FieldState<any>;
  options: any[];
  onChange: (value: any) => void;

}

const ItemsByPages = (props: IItemsByPages) => {
  return (
    <VSelectField
      layer={{
        inputOrientation: 'start'
      }}
      filterable={false}
      margin={'0px 10px'}
      inline
      label={'Items by pages:'}
      minimal
      options={props.options}
      id="places"
      fieldState={props.fieldState}
      onChange={props.onChange}
    />
  );
};



export interface IProps {
  totalRecords: any;
  pageLimit: number;
  pageNeighbours: number;
  onPageChanged: (value: any) => void;
  itemsByPage?:{label:string, value:number}[];
}

export interface IState {
  currentPage: number;
}

class Pagination extends Component<IProps, IState> {
  form: FormState<any>;

  constructor(props: IProps) {
    super(props);

    this.form = new FormState<any>({
      pageLimit: new FieldState(this.getPageLimit())
    });

    this.state = { currentPage: 1 };
  }

  getItemsByPages=()=>{

    if(this.props.itemsByPage && this.props.itemsByPage.length>0)
    {
      return this.props.itemsByPage;
    }
    return [
      { label: '5', value: 5 },
      { label: '10', value: 10 },
      { label: '20', value: 20 }
    ]

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
    const { pageLimit = 10} = this.props;
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: 'solid 1px whitesmoke',
          borderRadius: '8px',
          width: 'fit-content'
        }}
      >
        <ItemsByPages
          fieldState={this.form.$.pageLimit}
          options={this.getItemsByPages()}
          onChange={value => {
            this.form.$.pageLimit.onChange(value);
            this.gotoPage(1);
          }}
        />
        <InfoPage
          currentPage={currentPage}
          totalPages={this.getTotalPages()}
          totals={this.getTotalsRecord()}
        />
        <div>
          <Pages className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE) {
                return (
                  <Page
                    onClick={e => {
                      this.handleMoveLeft(e);
                    }}
                    key={index}
                    className="page-item"
                  >
                    <Icon icon={'chevron-left'} />
                  </Page>
                );
              }

              if (page === RIGHT_PAGE) {
                return (
                  <Page
                    onClick={e => {
                      this.handleMoveRight(e);
                    }}
                    key={index}
                    className="page-item"
                  >
                    <Icon icon={'chevron-right'} />
                  </Page>
                );
              }

              return (
                <Page
                  key={index}
                  backgroundColor={
                    currentPage === page ? '#e8e8e8' : 'transparent'
                  }
                  backgroundHover={
                    currentPage === page ? '#e8e8e8' : 'whitesmoke'
                  }
                  onClick={e => {
                    this.handleClick(page, e);
                  }}
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
}

export default Pagination;
