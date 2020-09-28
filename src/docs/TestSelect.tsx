import React, { useEffect, useState } from 'react';
import { FieldState, FormState } from 'formstate';
import {
  VDateRangePicker,
  VDateTimePicker,
  VNumericFieldRounded,
  VSearchSelectField,
  VSelectField,
  VTagInputField
} from '../components/Form';
import { ITabsPanelTypes, VTabsPanel } from '../components/TabsPanel';
import styled from 'styled-components';
import { Drawer, Icon } from '@blueprintjs/core';
import { DateRange } from '@blueprintjs/datetime';
import { Scrollbar } from 'react-scrollbars-custom';
import { VSuspenseLoading } from '../components/SuspenseLoading';
import { VColorPicker } from '../components/ColorPicker';
import moment from 'moment';
import { observer } from 'mobx-react';
import { IDatePickerShortcut } from '@blueprintjs/datetime/src/shortcuts';
import { CustomDateTimePicker } from '../components/Form/Inputs/CustomDateRange/CustomDateTimePicker';

interface IIconsComp {
  fill?: string;
  opacity?: number;
  margin?: string;
  iconSize?: number;
  rotate?: string;
}

interface IVIcons {
  fill?: string;
  opacity?: number;
  iconSize?: number;
  margin?: string;
  rotate?: string;
  iconName: string;
}

// const AppContext = React.createContext(3);

const toDay = moment().toDate();

const shortcuts = [
  {
    label: `THIS WEEK`,
    dateRange: [
      moment()
        .startOf('week')
        .toDate(),
      moment()
        .endOf('week')
        .toDate()
    ],
    includeTime: false
  },
  {
    label: `TODAY`,
    dateRange: [toDay, toDay],
    includeTime: true
  },
  {
    label: `WEEK TO DATE`,
    dateRange: [
      moment()
        .startOf('week')
        .toDate(),
      toDay
    ],
    includeTime: true
  }
];

const sex = [
  {
    label: 'Male',
    value: 'm',
    rep: 'M'
  },
  {
    label: 'Female',
    value: 'f',
    rep: 'F'
  }
];

const uaua = new FormState<any>({
  age: new FieldState(null),
  dateRage: new FieldState([
    moment('02/13/2020 07:00', 'MM/DD/YYYY hh:mm').toDate(),
    null
  ])
});
const fieldState = new FieldState([2]);

const form = new FormState<any>({
  username: new FieldState(''),
  search: new FieldState(''),
  description: new FieldState(''),
  store: new FieldState(''),
  tags: new FieldState(''),
  age: new FieldState(null),
  have_job: new FieldState(''),
  sex: new FieldState(''),
  range: new FieldState(0),
  places: new FieldState(sex[0].value),
  date: new FieldState(null),
  dateRange: new FieldState([null, null]),
  multiple: new FieldState([]),
  movies: new FieldState([]),
  mask: new FieldState('A34')
});

export const TestForm = observer(() => {
  const [options, setOptions] = useState([
    { label: 'The Shawshank Redemption nnnnnII ooooooooooooooo', value: 1 },
    { label: 'The Godfather', value: 2 },
    { label: 'The Godfather: Part II', value: 3 },
    { label: 'The Dark Knight', value: 4 },
    { label: 'The Dark Knight5', value: 5 },
    { label: 'The Dark Knight6', value: 6 },
    { label: 'The Dark Knight7', value: 7 },
    { label: 'The Dark Knight8', value: 8 },
    { label: 'The Dark Knight9', value: 9 },
    { label: 'The Dark Knight10', value: 10 },
    { label: 'The Dark Knight11', value: 11 },
    { label: 'The Dark Knight12', value: 12 },
    { label: 'The Dark Knight13', value: 13 },
    { label: 'The Dark Knight14', value: 14 },
    { label: 'The Dark Knight15', value: 15 },
    { label: 'The Dark Knight16', value: 16 },
    { label: 'The Dark Knight17', value: 17 }
  ]);

  const [date, setDate] = useState('');

  const [dateRange, setDateRange] = useState([
    new Date(),
    moment(new Date())
      .set({ hour: 7 })
      .toDate()
  ]);

  const [dateT, setDateT] = useState('');

  const [open, setOpen] = useState(true);

  const [open2, setOpen2] = useState(false);

  const [open3, setOpen3] = useState(false);

  const [value, setValue] = useState([3, 4]);

  const onClose = (event?: React.SyntheticEvent<HTMLElement>) => {
    console.log('se esta cerrando', event);
  };

  const onChangeDate = (date: Date) => {
    form.$.date.onChange(date);
  };

  /*  const renderForm = () => {

      return (<>
        <VCardPanel
          headerBackgroundColor={'red'}
          headerColor={'white'}
          bodyPadding={'0'}
          headerTextUppercase
          width={'1350px'}
          headerText={'aaa'}
          headerTextJustify={'start'}
        >
          <br/> <h1>{value}</h1> <br/>
          <div>
            footer
          </div>
        </VCardPanel>

        <input type="button" value={'ASD'} onClick={() => {
          form.$.movies.onChange(4);
          console.log(form.$.movies.value);
          console.log(form.$.date.value);
          console.log(date);
          setValue(form.$.movies.value);
        }
        }/>

        <input type="button" value={'Open'} onClick={() => {
          setOpen(true);
        }
        }/>

        <input type="button" value={'Open2'} onClick={() => {
          setOpen2(true);
        }
        }/>
        <VDraggableDialog
          isOpen={open}
        >
          <AppContext.Consumer>
            {(value: any) => value && (
              <VCardPanel
                headerBackgroundColor={'red'}
                headerColor={'white'}
                bodyPadding={'0'}
                headerTextUppercase
                width={'500px'}
                headerText={'aaa'}
                headerCustomComponent={
                  <input type="button" value={'Open'} onClick={() => {
                    setOpen(false);
                  }
                  }/>
                }
                headerTextJustify={'start'}
              > <br/> {value} <br/>
                <VDateTimePicker
                  required
                  inline
                  layer={{
                    labelWidth: 4,
                    inputWidth: 7,
                    labelOrientation: 'end',
                    inputOrientation: 'start'
                  }}
                  label={'Test date'}
                  dateType="DATE"
                  id="date"
                  value={date}
                  fill
                  onChange={setDate}
                  format={'DD/MM/YYYY'}
                />

                <input type="button" value={'Open Dialog 3'} onClick={() => {
                  setOpen3(true);
                }}/>
                <div style={{ backgroundColor: 'blue' }}>
                  <ol>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                  </ol>
                </div>
                <div>
                  footer
                </div>
              </VCardPanel>)}
          </AppContext.Consumer>
          <VDraggableDialog
            isOpen={open3}
          >
            <AppContext.Consumer>
              {(value: any) => value && (
                <VCardPanel
                  headerBackgroundColor={'red'}
                  headerColor={'white'}
                  bodyPadding={'0'}
                  headerTextUppercase
                  width={'300px'}
                  headerText={'ZZZZ'}
                  headerCustomComponent={
                    <input type="button" value={'Closed'} onClick={() => {
                      setOpen3(false);
                    }
                    }/>
                  }
                  headerTextJustify={'start'}
                > <br/> {value + 1} <br/>
                  <VDateTimePicker
                    required
                    inline
                    layer={{
                      labelWidth: 4,
                      inputWidth: 7,
                      labelOrientation: 'end',
                      inputOrientation: 'start'
                    }}
                    label={'Test date'}
                    dateType="DATE"
                    id="date"
                    value={date}
                    fill
                    onChange={setDate}
                    format={'DD/MM/YYYY'}
                  />

                  <input type="button" value={'Close'} onClick={() => {
                    setOpen3(false);
                  }}/>
                  <div style={{ backgroundColor: 'blue' }}>
                    <ol>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>6</li>
                      <li>RAFA</li>
                    </ol>
                  </div>
                  <div>
                    footer
                  </div>
                </VCardPanel>)}
            </AppContext.Consumer>
          </VDraggableDialog>

        </VDraggableDialog>


        <VDraggableDialog
          isOpen={open2}
        >
          <AppContext.Consumer>
            {(value: any) => value && (
              <VCardPanel
                headerBackgroundColor={'red'}
                headerColor={'white'}
                bodyPadding={'0'}
                headerTextUppercase
                width={'300px'}
                headerText={'aaa'}
                headerCustomComponent={
                  <input type="button" value={'Closed'} onClick={() => {
                    setOpen2(false);
                  }
                  }/>
                }
                headerTextJustify={'start'}
              > <br/> {value + 1} <br/>
                <VDateTimePicker
                  required
                  inline
                  layer={{
                    labelWidth: 4,
                    inputWidth: 7,
                    labelOrientation: 'end',
                    inputOrientation: 'start'
                  }}
                  label={'Test date'}
                  dateType="DATE"
                  id="date"
                  value={date}
                  fill
                  onChange={setDate}
                  format={'DD/MM/YYYY'}
                />

                <input type="button" value={'Close'} onClick={() => {
                  setOpen2(false);
                }}/>
                <div style={{ backgroundColor: 'blue' }}>
                  <ol>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>RAFA</li>
                  </ol>
                </div>
                <div>
                  footer
                </div>
              </VCardPanel>)}
          </AppContext.Consumer>
        </VDraggableDialog>

        <VSpinner/>

        <VSelectField
          defaultText="Please enter a text"
          layer={{
            labelWidth: 6,
            inputWidth: 2,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}

          icon="search"
          inline
          tipLabel={'Text'}
          label="Places"
          options={sex}
          id="places"
          fieldState={form.$.places}
          resetOnClose={true}
          isLoading={false}
          popoverProps={{ onClose, usePortal: true, interactionKind: 'click-target' }}
        />
        <VNumericField
          id="age"
          fieldState={form.$.age}
          label=""
          noLabel
          layer={{
            labelOrientation: 'end',
            inputOrientation: 'center'
          }}
          inline
        />

        <VDateTimePicker
          inline
          layer={{
            labelWidth: 4,
            inputWidth: 7,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          label={'Test date'}
          dateType="DATE"
          id="date"
          fieldState={form.$.date}
          icon={{ iconName: 'calendar' }}
          fill
          onChange={onChangeDate}
          format={'DD/MM/YYYY'}
        />
      </>);
    };*/

  /* const renderSelectMultiple = () => {
     return (
       <>
         <VSelectMultiple
           inline
           fill
           required
           label="Select movies:"
           options={options}
           id="selectMultipleTags"
           layer={{
             labelWidth: 6,
             inputWidth: 5,
             labelOrientation: 'end',
             inputOrientation: 'center'
           }}
           // isLoading={false}
           placeholder="evil placeholder..."
           fieldState={form.$.movies}
           onChange={() => {
             console.log(form.$.movies);
           }}
         />

       </>
     );
   };*/

  /* const ref = useRef<any>(null);

 const renderInput = () => {

    return (
      <>
        <VInputField
          inputRef={ref}
          upperCaseFormat
          required
          id={'22'}
          label={'Text'}
          fieldState={form.$.username}
          validators={[Validators.gt(12)]}
        />

        <input type="button" value={'Focus'} onClick={() => {
          ref && ref.current && ref.current.focus();
        }
        }/>
      </>
    );
  };*/

  /*
    const [d, setD] = useState(false);
    const renderMaskInput = () => {
      return (
        <>
          <VMaskField
            required
            id={'mask-text'}
            label={'Label'}
            disabled={d}
            fieldState={form.$.mask}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            guide={false}
          />

          <input type="button" value={'Open2'} onClick={() => {
            setD(!d);
          }
          }/>

        </>
      );
    };*/

  /*
    const renderNumericField = () => {
      return (
        <VNumericField
          id="age"
          fieldState={form.$.age}
          label=""
          noLabel
          layer={{
            labelOrientation: 'end',
            inputOrientation: 'center'
          }}
          inline
        />
      );
    };*/

  /* const renderDialogDraggable = () => {
     return (
       <>
         <input type="button" value={'Open'} onClick={() => {
           setOpen(true);
         }
         }/>

         <ResizableDraggableDialog
           width={200}
           height={400}
           key={'we'}
           isOpen={open}
           onClose={() => setOpen(false)}
           RndProps={{}}
         >
           Resr
         </ResizableDraggableDialog>
       </>
     );
   };*/

  const renderTab = () => {
    const IconsComp = styled.span`
      height: ${(props: IIconsComp) => props.iconSize && `${props.iconSize}px`};
      span {
        transform: ${(props: IIconsComp) =>
          props.rotate ? `rotate(${props.rotate})` : 'rotate(0deg)'};
        overflow: hidden;
        transition: all 0.1s ease-out;
        color: ${(props: IIconsComp) => props.fill && props.fill};
        opacity: ${(props: IIconsComp) => props.opacity && props.opacity};
        font-size: ${(props: IIconsComp) =>
          props.iconSize && `${props.iconSize}px`};
        margin: ${(props: IIconsComp) => props.margin && props.margin};
      }
    `;

    const VIcon = (props: IVIcons) => {
      return (
        <Icon
          icon={'camera'}
          iconSize={props.iconSize}
          style={{ margin: '-6px 5px' }}
        />
      );
    };

    const tabList1: ITabsPanelTypes[] = [
      {
        label: 'Code',
        content: <></>,
        key: 'tabSetupDefinitionCode',
        icon: (
          <VIcon iconName={'setup_code'} iconSize={20} margin={'-6px 5px'} />
        ),
        hidden: false,
        dataBadge: 'e'
      },
      {
        label: 'Reason Code',
        content: <></>,
        key: 'tabSetupDefinitionReasonCode',
        icon: (
          <VIcon iconName={'setup_code'} iconSize={20} margin={'-6px 5px'} />
        ),
        hidden: false
      },
      {
        label: 'Forms and Fields',
        content: <></>,
        key: 'tabSetupDefinitionFormsAndFields',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Commodities',
        content: <></>,
        key: 'tabSetupDefinitionCommodities',
        icon: <VIcon iconName={'commodity'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'RTU Station Logs Forms and Fields',
        content: <></>,
        key: 'tabSetupDefinitionRTUFormsAndFields',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      }
    ];

    const tabList: ITabsPanelTypes[] = [
      {
        label: 'Locations',
        content: <></>,
        key: 'tabSetupLocation',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Driver/Contractor',
        content: <></>,
        key: 'tabSetupDriverContractor',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Truck/Trailer',
        content: <></>,
        key: 'tabSetupTruckTrailer',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Account',
        content: <></>,
        key: 'tabSetupAccount',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Hierarchy',
        content: <></>,
        key: 'tabSetupHierarchy',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Administration',
        content: <></>,
        key: 'tabSetupAdministration',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      },
      {
        label: 'Definitions',
        content: <></>,
        key: 'tabSetupDefinition',
        icon: <VIcon iconName={'form'} iconSize={20} margin={'-6px 5px'} />
      }
    ];

    const ope = () => {
      setOpen(!open);
    };

    return (
      <>
        <input
          type="button"
          value={'Open'}
          onClick={() => {
            setOpen(true);
          }}
        />
        <CSidebarPushable>
          <SidebarDrawerContainer
            position="left"
            size="auto"
            hasBackdrop
            canEscapeKeyClose
            canOutsideClickClose
            usePortal
            autoFocus
            enforceFocus
            isOpen={open}
            onClose={ope}
          >
            <ol>
              <li>Text 1</li>
              <li>Test 2</li>
            </ol>
          </SidebarDrawerContainer>
          <CSidebarPusher>
            <Scrollbar height={'100%'} noScrollX style={{ height: '300px' }}>
              <VSuspenseLoading>
                <Container>
                  <VTabsPanel
                    size={'normal'}
                    padding={'0 0 0 0'}
                    tabsTagsContainerPadding={'0px'}
                    tabList={tabList}
                    beforeChangeTabValidation={() => {
                      console.log('Rfa');
                    }}
                    backgroundColor={'#f7f7f7'}
                    activeBorderColor={'red'}
                    activeColor={'#E3E4E2'}
                    active={'tabSetupDefinitionCode'}
                    handleChange={(tab: ITabsPanelTypes) => {}}
                    borderColor={'transparent'}
                    isResponsive
                  />
                  <VTabsPanel
                    size={'normal'}
                    padding={'0 0 0 0'}
                    tabsTagsContainerPadding={'0px'}
                    tabList={tabList1}
                    beforeChangeTabValidation={() => {
                      console.log('Rfa');
                    }}
                    backgroundColor={'#f7f7f7'}
                    activeBorderColor={'red'}
                    activeColor={'#E3E4E2'}
                    active={'tabSetupDefinitionCode'}
                    handleChange={(tab: ITabsPanelTypes) => {}}
                    borderColor={'transparent'}
                  />
                </Container>
              </VSuspenseLoading>
            </Scrollbar>
          </CSidebarPusher>
        </CSidebarPushable>
      </>
    );
  };
  /*
  const Container = styled.div`
    padding-top: ${process.env.REACT_APP_DS === 'DEPLOY' && '5px'};
    width: 100%;
    height: 100%;
    background-color: ${(props: IContainer) =>
      props.background && props.background};
    & > div {
      width: 100%;
    }
    //padding: 0px !important;
  `;*/

  const CSidebarPusher = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    @media (max-width: 992px) {
      width: calc(100% - 75px);
    }
    @media (min-width: 993px) {
      width: calc(100% - 120px);
    }
  `;

  const CSidebarPushable = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: start;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;

  const SidebarDrawerContainer = styled(Drawer)`
    .main-sidebar-container {
      padding: 0 10px;
      width: 100%;
      & > div {
        display: flex;
        align-items: center;
        & > span:first-child {
          margin-right: 10px;
        }
      }
    }
  `;

  // const renderDateTime = () => {
  //   return (
  //     <>
  //       <input
  //         type="button"
  //         value={'Reset value'}
  //         onClick={() => {
  //           setDateT('');
  //           uaua.$.age.onChange(null);
  //           setDate(null);
  //         }}
  //       />
  //
  //       <VDateTimePicker
  //         required
  //         inline
  //         layer={{
  //           labelWidth: 4,
  //           inputWidth: 7,
  //           labelOrientation: 'end',
  //           inputOrientation: 'start'
  //         }}
  //         label={'Test date'}
  //         dateType="DATE"
  //         id="date"
  //         value={date}
  //         fill
  //         onChange={setDate}
  //         format={'DD/MM/YYYY'}
  //       />
  //
  //       <VDateTimePicker
  //         required
  //         inline
  //         layer={{
  //           labelWidth: 4,
  //           inputWidth: 7,
  //           labelOrientation: 'end',
  //           inputOrientation: 'start'
  //         }}
  //         noLabel
  //         tipLabel={'FieldState  date'}
  //         dateType="TIME"
  //         id="date"
  //         fieldState={uaua.$.age}
  //         useAmPm={false}
  //         fill
  //         onChange={uaua.$.age.onChange}
  //         format={'DD/MM/YYYY'}
  //       />
  //
  //       <VDateTimePicker
  //         required
  //         inline
  //         layer={{
  //           labelWidth: 4,
  //           inputWidth: 7,
  //           labelOrientation: 'end',
  //           inputOrientation: 'start'
  //         }}
  //         label={'Test date'}
  //         dateType="TIME"
  //         id="date"
  //         value={dateT}
  //         useAmPm={false}
  //         fill
  //         onChange={setDateT}
  //         format={'DD/MM/YYYY'}
  //       />
  //
  //       <VDateTimePicker
  //         required
  //         inline
  //         layer={{
  //           labelWidth: 4,
  //           inputWidth: 7,
  //           labelOrientation: 'end',
  //           inputOrientation: 'start'
  //         }}
  //         label={'Test date'}
  //         dateType="DATETIME"
  //         useAmPm={true}
  //         id="date"
  //         value={date}
  //         fill
  //         onChange={setDate}
  //         format={'DD/MM/YYYY'}
  //       />
  //     </>
  //   );
  // };

  /* const renderSelectMultipleTag = () => {
     return (
       <VSelectMultipleTags label={'Rafa'} options={[{value:'a',label:'a'}]} id={'sest_5'} disabled={false}
                            fieldState={form.$.multiple} required />
     );
   };
 */

  const [c, setC] = useState('#fff');
  const [c2, setC2] = useState('#ff3123');

  const renderColorPicker = () => {
    return (
      <>
        <VColorPicker
          Color={c}
          typePickerColor={'ChromePicker'}
          position={'right'}
          disable={false}
          width={30}
          height={30}
          disableAlpha={true}
          addButton={{
            text: 'Apply',
            intent: 'success'
          }}
          onChange={() => setC('#ff3123')}
        />

        <VColorPicker
          Color={c2}
          typePickerColor={'ChromePicker'}
          position={'right'}
          disable={false}
          width={30}
          height={30}
          disableAlpha={true}
          addButton={{
            text: 'Apply',
            intent: 'success'
          }}
          onChange={() => setC2('#fff')}
        />
      </>
    );
  };

  const renderColorPickerScroll = () => {
    return (
      <div style={{ height: '500px', overflowY: 'auto', marginTop: '300px' }}>
        <VColorPicker
          Color={c2}
          typePickerColor={'ChromePicker'}
          position={'right'}
          disable={false}
          width={30}
          height={30}
          disableAlpha={true}
          addButton={{
            text: 'Apply',
            intent: 'success'
          }}
          onChange={() => setC2('#fff')}
        />
        <div style={{ height: '600px', backgroundColor: 'green' }}></div>
      </div>
    );
  };

  const renderNumericFieldRounded = () => {
    return (
      <VNumericFieldRounded
        fill
        noLabel
        id={'id'}
        required
        layer={{
          labelWidth: 12,
          inputWidth: 12,
          labelOrientation: 'start'
        }}
        disabled={false}
        fieldState={fieldState}
        roundTo={2}
        maxDecimals={3}
      />
    );
  };

  const [formState, setFormState] = useState<boolean>(false);

  const renderTimeWithMinDynamic = () => {
    return (
      <>
        {/*<input
          type="button"
          value={formState}
          onClick={() => {
            setFormState(!formState);
          }}
        />

        <input
          type="button"
          value={'DATE value'}
          onClick={() => {
            alert(date);
          }}
        />

        <input
          type="button"
          value={'reset DATE value'}
          onClick={() => {
            setDate(null);
          }}
        />

        <input
          type="button"
          value={'DATE fieldState'}
          onClick={() => {
            alert(uaua.$.age.value);
          }}
        />

        <input
          type="button"
          value={'Reset DATE fieldState'}
          onClick={() => {
            uaua.$.age.onChange(null);
          }}
        />

        <VDateTimePicker
          required
          inline
          layer={{
            labelWidth: 4,
            inputWidth: 7,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          label={'Test date'}
          dateType="DATE"
          id="date"
          value={date}
          fill
          onChange={setDate}
          icon={{ iconName: 'calendar' }}
          format={'DD/MM/YYYY'}
          minTime={formState ? moment().toDate() : moment('1/1/1900').toDate()}
          maxTime={moment('1/1/2100').toDate()}
        />

        <VDateTimePicker
          required
          inline
          layer={{
            labelWidth: 4,
            inputWidth: 7,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          label={'Test date 2'}
          dateType="DATE"
          id="date3"
          fieldState={uaua.$.age}
          fill
          format={'DD/MM/YYYY'}
          icon={{ iconName: 'calendar' }}
          minTime={formState ? moment().toDate() : moment('1/1/1900').toDate()}
          maxTime={moment('1/1/2100').toDate()}
        />*/}
      </>
    );
  };

  useEffect(() => {
    console.log(fieldState);
  }, [fieldState.value]);

  const renderSelect = () => {
    return (
      <>
        <div style={{ width: '300px' }}>
          <VSelectField
            required={true}
            popoverProps={{
              minimal: true
            }}
            options={options}
            disabled={false}
            fieldState={fieldState}
            fill
            id={'id'}
            layer={{
              labelOrientation: 'start',
              inputWidth: 12,
              labelWidth: 12
            }}
            label={'Label'}
            isLoading={false}
            allowEmptyItem={true}
          />
        </div>
        <VSelectField
          popoverProps={{
            minimal: true
          }}
          options={options}
          disabled={false}
          fieldState={fieldState}
          fill
          id={'id2'}
          layer={{
            labelOrientation: 'start',
            inputWidth: 12,
            labelWidth: 12
          }}
          tipLabel={'Label'}
          isLoading={false}
          allowEmptyItem={false}
          minimal={true}
          fixedInputWidthPx={500}
          createNewItemFormQuery={(i: any) => {
            setOptions((u: any) => [...u, i]);
          }}
        />
      </>
    );
  };

  const renderVTagsInput = () => {
    return (
      <div style={{ width: '200px' }}>
        <StyleTags
          id={'yupiiii'}
          inline
          noLabel={true}
          fill
          margin={'0'}
          disabled={false}
          label={''}
          layer={{
            inputWidth: 12,
            labelOrientation: 'start',
            labelWidth: 4
          }}
          value={value}
          onChange={value => {
            setValue(value);
          }}
          tagProps={{
            multiline: false
          }}
        />
      </div>
    );
  };

  const StyleTags = styled(VTagInputField)``;

  const renderDateRage = () => {
    return (
      <VDateRangePicker
        id={`daterange-asd`}
        inline
        margin={'0'}
        layer={{
          inputWidth: 12,
          labelOrientation: 'start',
          labelWidth: 4
        }}
        disabled={false}
        fill
        format={'MM/DD/YYYY'}
        label={'Mi maaaaaa'}
        allowSingleDayRange
        useAmPm
        precision={'minute'}
        popoverProps={{
          modifiers: { preventOverflow: { boundariesElement: 'viewport' } }
        }}
        fieldState={uaua.$.dateRange}
        onChange={(value: any) => {
          // console.log('AQUIIIII', value);
        }}
        shortcuts={shortcuts}
        dayPickerProps={{
          onShortcutChange: (shortcut: IDatePickerShortcut, index: number) => {
            console.log(shortcut, index);
          }
        }}
      />
    );
  };

  const getNewSelect = () => {
    return (
      <VSearchSelectField
        id={'frequency'}
        sort={'asc'}
        fill
        required
        multi
        label={`Frecuencia:`}
        options={options}
        popoverMinimal
        placeholder={'No select'}
        fieldState={fieldState}
      />
    );
  };
  const getDateTime = () => {
    return (
      <VDateTimePicker
        required
        inline
        layer={{
          labelWidth: 4,
          inputWidth: 7,
          labelOrientation: 'end',
          inputOrientation: 'start'
        }}
        label={'Test date'}
        dateType="DATETIME"
        id="date"
        value={date}
        fill
        onChange={setDate}
        icon={{ iconName: 'calendar' }}
        format={'DD/MM/YYYY hh:mm A'}
        minTime={formState ? moment().toDate() : moment('1/1/1900').toDate()}
        maxTime={moment('1/1/2100').toDate()}
        precision={'minute'}
        useAmPm
        timePickerProps={{
          defaultValue: moment(moment().toDate())
            .set({ hour: 11, minute: 59 })
            .toDate(),
          value: moment(moment().toDate())
            .set({ hour: 11, minute: 59 })
            .toDate()
        }}
      />
    );
  };

  const getDateRangePicker = () => {
    const shortcuts: any = [
      {
        label: 'yesterday',
        dateRange: [new Date(), new Date()],
        includeTime: true
      },
      {
        label: 'yesterday1',
        dateRange: [new Date(), new Date()],
        includeTime: true
      },
      {
        label: 'yesterday2',
        dateRange: [new Date(), new Date()],
        includeTime: true
      },
      {
        label: 'yesterday3',
        dateRange: [new Date(), new Date()],
        includeTime: true
      },
      {
        label: 'yesterday4',
        dateRange: [new Date(), new Date()],
        includeTime: true
      },
      {
        label: 'yesterday5',
        dateRange: [new Date(), new Date()],
        includeTime: true
      }
    ];

    return (
      <div style={{ position: 'absolute' }}>
        <div
          style={{
            color: 'white',
            backgroundColor: 'blue',
            height: '100px',
            width: '500px',
            textAlign: 'center'
          }}
        >
          {form.$.dateRange.value.toString()}
          {/*{dateRange.toString()}*/}
        </div>
        <div style={{ width: '350px' }}>
          <CustomDateTimePicker
            required
            label={'Test date'}
            dateType="DATETIME"
            id="date"
            // value={dateRange}
            fill
            format={'MM-DD-YYYY hh:mm A'}
            onChange={(dta: DateRange) => setDateRange(dta)}
            minTime={
              formState ? moment().toDate() : moment('1/1/1900').toDate()
            }
            maxTime={moment('1/1/2100').toDate()}
            shortcuts={shortcuts}
            fieldState={form.$.dateRange}
            useAmPm
            precision={'minute'}
            startTimeProps={{
              precision: 'second'
            }}
            endTimeProps={{
              useAmPm: false
            }}
          />
        </div>
      </div>
    );
  };

  return getDateRangePicker();
});
