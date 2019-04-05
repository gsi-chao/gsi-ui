import React, { Component } from 'react';
import Pagination from './Paginator';
import { VSelectField } from '../../Form';
import { FieldState, FormState } from 'formstate';

interface ISate {
  allCountries: any[];
  currentCountries: any[];
  currentPage: number;
  totalPages: number;
}

class VPaginator extends Component<any, ISate> {
  form: FormState<any>;

  constructor(props: any) {
    super(props);
    this.state = {
      allCountries: [],
      currentCountries: [],
      currentPage: 1,
      totalPages: 0
    };
    this.form = new FormState<any>({
      pageLimit: new FieldState(10)
    });
  }

  getCountry = () => {
    return [
      {
        country: 'Afghanistan'
      },
      {
        country: 'Albania'
      },
      {
        country: 'Algeria'
      },
      {
        country: 'American Samoa'
      },
      {
        country: 'Andorra'
      },
      {
        country: 'Angola'
      },
      {
        country: 'Anguilla'
      },
      {
        country: 'Antarctica'
      },
      {
        country: 'Antigua and Barbuda'
      },
      {
        country: 'Argentina'
      },
      {
        country: 'Armenia'
      },
      {
        country: 'Aruba'
      },
      {
        country: 'Australia'
      },
      {
        country: 'Austria'
      },
      {
        country: 'Azerbaijan'
      },
      {
        country: 'Bahamas'
      },
      {
        country: 'Bahrain'
      },
      {
        country: 'Bangladesh'
      },
      {
        country: 'Barbados'
      },
      {
        country: 'Belarus'
      },
      {
        country: 'Belgium'
      },
      {
        country: 'Belize'
      },
      {
        country: 'Benin'
      },
      {
        country: 'Bermuda'
      },
      {
        country: 'Bhutan'
      },
      {
        country: 'Bolivia'
      },
      {
        country: 'Bosnia and Herzegovina'
      },
      {
        country: 'Botswana'
      },
      {
        country: 'Bouvet Island'
      },
      {
        country: 'Brazil'
      },
      {
        country: 'British Indian Ocean Territory'
      },
      {
        country: 'Brunei'
      },
      {
        country: 'Bulgaria'
      },
      {
        country: 'Burkina Faso'
      },
      {
        country: 'Burundi'
      },
      {
        country: 'Cambodia'
      },
      {
        country: 'Cameroon'
      },
      {
        country: 'Canada'
      },
      {
        country: 'Cape Verde'
      },
      {
        country: 'Cayman Islands'
      },
      {
        country: 'Central African Republic'
      },
      {
        country: 'Chad'
      },
      {
        country: 'Chile'
      },
      {
        country: 'China'
      },
      {
        country: 'Christmas Island'
      },
      {
        country: 'Cocos (Keeling) Islands'
      },
      {
        country: 'Colombia'
      },
      {
        country: 'Comoros'
      },
      {
        country: 'Congo'
      },
      {
        country: 'The Democratic Republic of Congo'
      },
      {
        country: 'Cook Islands'
      },
      {
        country: 'Costa Rica'
      },
      {
        country: 'Ivory Coast'
      },
      {
        country: 'Croatia'
      },
      {
        country: 'Cuba'
      },
      {
        country: 'Cyprus'
      },
      {
        country: 'Czech Republic'
      },
      {
        country: 'Denmark'
      },
      {
        country: 'Djibouti'
      },
      {
        country: 'Dominica'
      },
      {
        country: 'Dominican Republic'
      },
      {
        country: 'East Timor'
      }
    ];
  };

  componentDidMount() {
    const allCountries = this.getCountry();
    this.setState({ allCountries: allCountries });
  }

  onPageChanged = (data: any) => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  };

  render() {
    const {
      allCountries,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;
    const totalCountries = allCountries.length;

    if (totalCountries === 0) return null;

    const headerClass = [
      'text-dark py-2 pr-4 m-0',
      currentPage ? 'border-gray border-right' : ''
    ]
      .join(' ')
      .trim();

    return (
      <React.Fragment>

        <div style={{
          display: 'flex', alignItems: 'center', border: 'solid 1px whitesmoke',
          borderRadius: '8px', width: 'fit-content'
        }}>
          <VSelectField
            layer={{
              inputOrientation: 'start'
            }}
            filterable={false}
            margin={'0px 10px'}
            inline
            label={'item by page:'}
            minimal
            options={[{ label: '10', value: 10 }, { label: '15', value: 15 }, { label: '10', value: 20 }]}
            id="places"
            fieldState={this.form.$.pageLimit}
          />
          <div style={{ margin: '0px 10px' }}>
            {currentPage && (
              <span>
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>
            )}
            <span>
              {' / '}
              Total:{' '}
              <strong className="text-secondary">{` ${totalCountries}`}</strong>
            </span>
          </div>
          <div>
            <Pagination
              totalRecords={totalCountries}
              pageLimit={5}
              pageNeighbours={2}
              onPageChanged={this.onPageChanged}
            />
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default VPaginator;
