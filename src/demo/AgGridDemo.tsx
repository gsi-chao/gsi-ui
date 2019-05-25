import React, { useState } from 'react';
import VAgGrid from '../components/Grid/AgGrid';
import {
  ICellRendererParams,
  GridReadyEvent,
  GridApi,
  ColumnApi,
  RowValueChangedEvent,
  CellValueChangedEvent,
  ColumnMovedEvent,
  DragStoppedEvent,
  Column,
  GetContextMenuItemsParams,
  DragStartedEvent,
  RangeSelection,
  ColDef
} from 'ag-grid-community';
import { VInputField, VSelectField } from '../components/Form';
import moment, { Moment } from 'moment';
import { showToastNotification } from '../components/ToastNotification';
import { InfoSelection } from '../components/Table/type';
import EmptyData from '../components/Table/components/EmptyData';
import { VSpinner } from '../components/Spinner';
import '../components/Grid/style.css';
import {
  getProperLetterColor,
  VColorPicker,
  VColorResult
} from '../components/ColorPicker';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { debounce } from 'formstate/lib/internal/utils';
import { isNumeric } from 'tslint';

class MakeCellRender extends React.Component<ICellRendererParams> {
  render() {
    // put in render logic
    return (
      <>
        <span onClick={() => this.onClick()}>{`${this.props.value} LOL`}</span>
      </>
    );
  }

  onClick = () => {
    console.log('click');
  };
}

class CustomTooltip extends React.Component<any> {
  constructor(props: any) {
    super(props);
    console.log('constructor', props);
  }

  componentDidMount() {
    // this.props.reactContainer.className = 'custom-tooltip';
  }

  render() {
    const data = this.props.api.getRowNode(this.props.rowIndex).data;
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: this.props.color || 'white' }}
      >
        <p>
          <span>{data.athlete}</span>
        </p>
        <p>
          <span>Country: </span> {data.country}
        </p>
        <p>
          <span>Total: </span> {data.total}
        </p>
      </div>
    );
  }
}

const store = [
  {
    label: 'Toyota',
    value: 'Toyota'
  },
  {
    label: 'Ford',
    value: 'Ford'
  },
  {
    label: 'Porsche',
    value: 'Porsche'
  }
];

const datesColumnDefs = (size: number) => {
  const datesColumnDefs: any[] = [];
  for (let i = 0; i < size; i++) {
    const date: Moment = moment(new Date());
    date.add(i + 1, 'days');

    datesColumnDefs.push({
      colId: `${date.format('DD-MM-YYYY')}/date`,
      headerName: date.format('DD-MM-YYYY'),
      field: `${date.format('DD-MM-YYYY')}/date`,
      sortable: false,
      // cellRendererFramework: SelectCellRender,
      cellEditor: 'agRichSelectCellEditor',

      cellEditorParams: {
        values: [{ label: 'On', value: '1' }, { label: 'Off', value: '2' }],
        cellRenderer(params: any) {
          return 'Value is <b>' + params.value.label + '</b>';
        }
      },
      cellRenderer(params: any) {
        return ' <b>' + params.value.label + '</b>';
      },

      suppressMenu: true,
      pinned: false,
      lockPosition: true,
      editable: true
    });
  }
  return datesColumnDefs;
};

const totalsColumnDefs = (size: number) => {
  const datesColumnDefs: any[] = [];
  for (let i = 0; i < size; i++) {
    const date: Moment = moment(new Date());
    date.add(i + 1, 'days');

    datesColumnDefs.push({
      colId: `${date.format('DD-MM-YYYY')}/date`,
      headerName: date.format('DD-MM-YYYY'),
      field: `${date.format('DD-MM-YYYY')}/date`,
      sortable: false,
      suppressMenu: true,
      pinned: false,
      lockPosition: true,
      cellStyle(params: any) {
        if (params.value >= 5) {
          // mark police cells as red
          return { textAlign: 'end', backgroundColor: 'red' };
        } 
          return null;
        
      }
    });
  }
  return datesColumnDefs;
};

const getData = (size: number) => {
  const data: any[] = [];
  const dates = datesColumnDefs(60);
  const datesData: any = {};
  dates.forEach(x => {
    datesData[x.colId] = { label: 'On', value: '1' };
  });
  for (let i = 0; i < size; i++) {
    data.push({
      name: `name_${i + 1}`,
      workShift: `workShift_${i + 1}`,
      company: `company_${i + 1}`,
      supervisor: `supervisor_${i + 1}`,
      phonebook: `phonebook_${i + 1}`,
      terminal: `terminalt_${i + 1}`,
      ...datesData
    });
  }

  return data;
};

const getDataTotal = (size: number) => {
  const data: any[] = [];
  const dates = totalsColumnDefs(60);

  let labels: string[] = [
    'On',
    'Off',
    'DAY',
    'NGT',
    'ANY',
    'RES',
    'VAC',
    'TRD',
    'NEW',
    'TER'
  ];

  for (let i = 0; i < size; i++) {
    const datesData: any = {};
    dates.forEach(x => {
      datesData[x.colId] = Math.floor(Math.random() * 101);
    });
    const pos: number = Math.floor(Math.random() * labels.length);
    if (i % 2 === 0 && !data.some(x => x.name === labels[pos])) {
      data.push({
        name: labels[pos],
        ...datesData
      });
      labels = labels.filter(x => x !== labels[pos]);
    } else {
      data.push({
        name: '% of total',
        ...datesData
      });
    }
  }

  return data;
};

const getState = () => {
  const pinned :boolean = true;
  const state: any = {
    columnDefs: [
      {
        colId: 'name',
        headerName: 'name',
        field: 'name',
        sortable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['English', 'Spanish', 'French', 'Portuguese', '(other)']
        },
        suppressMenu: true,
        pinned,
        editable: true
      },
      {
        colId: 'company',
        headerName: 'company',
        field: 'company',
        sortable: true,
        suppressMenu: true,
        pinned
      },
      {
        colId: 'workShift',
        headerName: 'workShift',
        field: 'workShift',
        sortable: true,
        suppressMenu: true,
        pinned
      },
      {
        colId: 'supervisor',
        headerName: 'supervisor',
        field: 'supervisor',
        suppressMenu: true,
        pinned
      },
      {
        colId: 'phonebook',
        headerName: 'phone book',
        field: 'phonebook',
        suppressMenu: true,
        pinned
      },
      {
        colId: 'terminal',
        headerName: 'Terminal',
        field: 'terminal',
        suppressMenu: true,
        pinned
      }
    ],
    defaultColDef: {
      // set every column width

      // make every column editable
      editable: false,
      filter: 'agTextColumnFilter',
      tooltipComponent: 'customTooltip'
    },
    rowData: getData(200)
  };

  datesColumnDefs(60).forEach(x => {
    state.columnDefs!.push(x);
  });

  return state;
};

const getStateTotals = () => {
  const pinned = true;
  const state: any = {
    columnDefs: [
      {
        colId: 'name',
        headerName: 'Dates',
        field: 'name',
        sortable: false,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['English', 'Spanish', 'French', 'Portuguese', '(other)']
        },
        suppressMenu: true,
        pinned
      }
    ],
    defaultColDef: {
      // set every column width

      // make every column editable
      editable: false,
      filter: 'agTextColumnFilter'
    },
    rowData: getDataTotal(13)
  };

  totalsColumnDefs(60).forEach(x => {
    state.columnDefs!.push(x);
  });

  return state;
};

class SelectCellRender extends React.Component<ICellRendererParams> {
  render() {
    console.log(this.props.value);
    return (
      <VSelectField
        minimal
        fill
        options={store}
        inline
        value={this.props.value}
        id="store"
        // onChange={this.setSelectedValue}
      />
    );
  }
}

const AgGridDemo = () => {
  const [apiGrid, setApiGrid] = useState<GridApi | undefined>();
  const [columnApi, setColumnDefGrid] = useState<ColumnApi | undefined>();

  const [apiGridTotal, setApiGridTotal] = useState<GridApi | undefined>();

  const [columnApiTotal, setColumnDefGridTotal] = useState<
    ColumnApi | undefined
  >();

  const [enableContextualMenu, setEnableContextualMenu] = useState<boolean>(
    true
  );

  const [stateGridTotal, setStateGridTotal] = useState<any>(getStateTotals());

  const [hideColumns, setHideColumns] = useState<boolean>(true);

  const [colorConditional, setColorConditional] = useState<string>('red');
  const [valueConditional, setValueConditional] = useState<number>(60);

  const [clearData, setClearData] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const topOptions: any = { alignedGrids: [] };
  const bottomOptions: any = { alignedGrids: [] };

  topOptions.alignedGrids.push(bottomOptions);
  bottomOptions.alignedGrids.push(topOptions);

  const [oldColumns, setOldColumns] = useState<string[]>([]);

  const onGridReady = (event: GridReadyEvent): void => {
    console.log('GridReadyEvent', event);

    event.api.ensureColumnVisible('31-05-2019/dates');
    setApiGrid(event.api);

    setColumnDefGrid(event.columnApi);
  };

  const onGridReadyTotal = (event: GridReadyEvent): void => {
    console.log('GridReadyEvent', event);

    event.api.ensureColumnVisible('31-05-2019/dates');
    setApiGridTotal(event.api);
    setColumnDefGridTotal(event.columnApi);
  };

  const onRowValueChanged = (event: RowValueChangedEvent) => {
    console.log('RowValueChangedEvent', event);
  };

  const onCellValueChanged = (event: CellValueChangedEvent) => {
    const row = getData(200)[event.rowIndex];

    event.oldValue !== event.newValue &&
      showToastNotification({
        type: 'warning',
        message: `se ha cambiado el valor ${row.name} de ${
          event.oldValue.label
        } a ${event.newValue.label} en la fecha ${
          event.column.getColDef().headerName
        }`
      });
  };

  const onColumnMoved = (event: ColumnMovedEvent) => {
    showToastNotification({
      type: 'success',
      message: `se ha movido la columna ${
        event.column!.getColDef().colId
      } a la posicion ${event!.toIndex! + 1 - 60} `
    });
  };

  const onDragStopped = (event: DragStoppedEvent) => {
    const newOrder = event!
      .columnApi!.getAllDisplayedColumns()
      .filter((x: Column) => x.isPinned())
      .map(x => x.getColDef().field)
      .join(' , ');
    const oldOrder = oldColumns.join(' , ');

    oldOrder !== newOrder &&
      showToastNotification({
        type: 'primary',
        message: `${event.type} El nuevo orden de la columnas es ${newOrder} `,
        timeout: 3000
      });
  };

  const onDragStarted = (event: DragStartedEvent) => {
    const oldOrder: string[] = event
      .columnApi!.getColumnState()
      .filter((x: ColumnState) => x.pinned)
      .map((x: ColumnState) => x.colId!);
    setOldColumns(oldOrder);
  };

  const toggleContextualMenu = () => {
    setEnableContextualMenu(!enableContextualMenu);
  };

  const toggleVisibleColumns = () => {
    columnApi!.setColumnsVisible(['company', 'workShift'], !hideColumns);
    setHideColumns(!hideColumns);
  };

  const clearTable = () => {
    if (!clearData) {
      apiGrid && apiGrid.setRowData([]);
      apiGrid && apiGrid.setColumnDefs([]);
    } else {
      apiGrid && apiGrid.setRowData(getData(200));
      apiGrid && apiGrid.setColumnDefs(getState().columnDefs!);
    }

    setClearData(!clearData);
  };

  function createFlagImg(flag: any) {
    return (
      '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
      flag +
      '.png"/>'
    );
  }

  const parseRangeSelection = (
    rangesSelection: RangeSelection[],
    value: any,
    columns: Column[]
  ) => {
    const rangeParsed: {
      data: any;
      infoSelection: InfoSelection;
    }[] = [];

    rangesSelection.forEach((range: RangeSelection) => {
      for (let i = 0; i < range.columns!.length; i++) {
        for (let row = range.start.rowIndex; row <= range.end.rowIndex; row++) {
          const coldId = range.columns![i].getColId();

          const exitRangeParsed = rangeParsed.some(
            y =>
              y.infoSelection.rowIndex === row &&
              y.infoSelection.columnName === coldId
          );
          if (!exitRangeParsed) {
            rangeParsed.push({
              data: value,
              infoSelection: {
                rowIndex: row,
                columnName: coldId,
                columnIndex: columns.findIndex(s => s.getColId() === coldId)
              }
            });
          }
        }
      }
    });
    return rangeParsed;
  };

  const mapperDynamicOptionMenuToContextualMenu = (
    options: { label: string; value: string }[],
    params: GetContextMenuItemsParams
  ) => {
    return options.map((x: { label: string; value: string }) => {
      return {
        name: x.label,
        cssClasses: ['redFont', 'bold'],
        action() {
          const row = getData(200)[params.node.rowIndex];

          const rangeSelection: RangeSelection[] = params.api!.getRangeSelections();

          const value = rangeSelection ? rangeSelection : params.value;

          if (Array.isArray(value)) {
            const result = parseRangeSelection(
              value,
              x.value,
              params.columnApi!.getAllDisplayedColumns()
            );
            console.log('actualizar con ', x.label, 'a estas tuplas', result);
          } else {
            console.log('params.value', value);
          }

          showToastNotification({
            type: 'success',
            message: `Accion Update sobre el driver ${
              row.name
            } en  column ${params.column.getColId()} con value ${
              params.value.label
            } `
          });
        }
      };
    });
  };

  const getContextMenuItems = (params: GetContextMenuItemsParams) => {
    const columnDefs = getState().columnDefs!;
    const columnFixed = columnDefs!
      .filter((x: any) => !x.colId.includes('/date'))
      .map((y: any) => y.colId);
    if (
      params.column &&
      columnFixed.some((x: string) => x === params.column.getColId())
    ) {
      return [
        {
          name: 'Update schedule driver ',
          action() {
            const row = getData(200)[params.node.rowIndex];

            showToastNotification({
              type: 'success',
              message: `Accion Update sobre el driver ${
                row.name
              } en  column ${params.column.getColId()} con value ${
                params.value
              } `
            });
          },
          cssClasses: ['redFont', 'bold']
        },
        {
          name: 'Edit driver',
          action() {
            const row = getData(200)[params.node.rowIndex];

            showToastNotification({
              type: 'success',
              message: `Accion Edit sobre el driver ${
                row.name
              } en  column ${params.column.getColId()} con value ${
                params.value
              } `
            });
          },
          tooltip:
            'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!'
        }
      ];
    }

    const optionMenu: { label: string; value: any }[] = [
      {
        value: '1',
        label: 'code 1'
      },
      {
        value: '2',
        label: 'code 2'
      }
    ];

    return [
      {
        name: 'Update status ',
        action() {
          const row = getData(200)[params.node.rowIndex];

          showToastNotification({
            type: 'success',
            message: `Accion Update sobre el driver ${
              row.name
            } en  column ${params.column.getColId()} con value ${params.value} `
          });
        },
        cssClasses: ['redFont', 'bold'],
        subMenu: [
          {
            name: 'On',
            subMenu: mapperDynamicOptionMenuToContextualMenu(optionMenu, params)
          },
          {
            name: 'Off'
          }
        ]
      },
      {
        name: 'Edit driver',
        action() {
          const row = getData(200)[params.node.rowIndex];

          showToastNotification({
            type: 'success',
            message: `Accion Edit sobre el driver ${
              row.name
            } en  column ${params.column.getColId()} con value ${params.value} `
          });
        },
        tooltip:
          'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!'
      }
    ];

    // let result = [
    //   {
    //     name: 'Alert ' + params.value,
    //     action: function() {
    //       window.alert('Alerting about ' + params.value);
    //     },
    //     cssClasses: ['redFont', 'bold']
    //   },
    //   {
    //     name: 'Always Disabled',
    //     disabled: true,
    //     tooltip:
    //       'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!'
    //   },
    //   {
    //     name: 'Country',
    //     subMenu: [
    //       {
    //         name: 'Ireland',
    //         action: function() {
    //           console.log('Ireland was pressed');
    //         },
    //         icon: createFlagImg('ie')
    //       },
    //       {
    //         name: 'UK',
    //         action: function() {
    //           console.log('UK was pressed');
    //         },
    //         icon: createFlagImg('gb')
    //       },
    //       {
    //         name: 'France',
    //         action: function() {
    //           console.log('France was pressed');
    //         },
    //         icon: createFlagImg('fr')
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Person',
    //     subMenu: [
    //       {
    //         name: 'Niall',
    //         action: function() {
    //           console.log('Niall was pressed');
    //         }
    //       },
    //       {
    //         name: 'Sean',
    //         action: function() {
    //           console.log('Sean was pressed');
    //         }
    //       },
    //       {
    //         name: 'John',
    //         action: function() {
    //           console.log('John was pressed');
    //         }
    //       },
    //       {
    //         name: 'Alberto',
    //         action: function() {
    //           console.log('Alberto was pressed');
    //         }
    //       },
    //       {
    //         name: 'Tony',
    //         action: function() {
    //           console.log('Tony was pressed');
    //         }
    //       },
    //       {
    //         name: 'Andrew',
    //         action: function() {
    //           console.log('Andrew was pressed');
    //         }
    //       },
    //       {
    //         name: 'Kev',
    //         action: function() {
    //           console.log('Kev was pressed');
    //         }
    //       },
    //       {
    //         name: 'Will',
    //         action: function() {
    //           console.log('Will was pressed');
    //         }
    //       },
    //       {
    //         name: 'Armaan',
    //         action: function() {
    //           console.log('Armaan was pressed');
    //         }
    //       }
    //     ]
    //   },
    //   'separator',
    //   {
    //     name: 'Windows',
    //     shortcut: 'Alt + W',
    //     action: function() {
    //       console.log('Windows Item Selected');
    //     },
    //     icon: '<img src="../images/skills/windows.png"/>'
    //   },
    //   {
    //     name: 'Mac',
    //     shortcut: 'Alt + M',
    //     action: function() {
    //       console.log('Mac Item Selected');
    //     },
    //     icon: '<img src="../images/skills/mac.png"/>'
    //   },
    //   'separator',
    //   {
    //     name: 'Checked',
    //     checked: true,
    //     action: function() {
    //       console.log('Checked Selected');
    //     },
    //     icon: '<img src="../images/skills/mac.png"/>'
    //   },
    //   'copy'
    // ];
    // return result;
  };

  const templateNoData = () => {
    return (
      '<div style="height: 100%;width: 100%; background: rgb(245, 245, 245); display: flex; justify-content: center;align-items: center" >' +
      '<h1  style=" fontSize: 22; fontWeight: 400;  color: rgba(49, 59, 67, 0.27); padding: 10px; ">This is a custom \'no rows\' overlay</h1>' +
      '</div>'
    );
  };

  const suppressContextMenu = () => {
    if (columnApi && apiGrid) {
      return (
        columnApi!.getColumnState().length === 0 ||
        apiGrid!.getDisplayedRowCount() === 0
      );
    }

    return false;
  };

  const onBtShowLoading = () => {
    if (!showLoading) {
      apiGrid && apiGrid.showLoadingOverlay();
    } else {
      apiGrid && apiGrid.hideOverlay();
    }
    setShowLoading(!showLoading);
  };

  const onBtScrolling = () => {
    apiGrid && apiGrid!.ensureColumnVisible('05-06-2019/date');
    apiGrid && apiGrid!.ensureColumnVisible('31-05-2019/date');

    apiGridTotal && apiGridTotal!.ensureColumnVisible('05-06-2019/date');
    apiGridTotal && apiGridTotal!.ensureColumnVisible('31-05-2019/date');

    apiGrid && apiGrid!.ensureIndexVisible(100);
    apiGrid && apiGrid!.ensureNodeVisible(200);
  };


  const changeColors = (value: any) => {
    raiseDoSearchWhenUserStoppedTypingColor(value);
  };

  const raiseDoSearchWhenUserStoppedTypingColor = debounce((value: any) => {
    changeConditionalColor(value)
  }, 150);

  const changeConditionalColor = (color: VColorResult) => {
    setColorConditional(color.hex);

    const columnDate: ColDef[] = columnApiTotal!
      .getColumnState()
      .filter(y => y.colId.includes('/date'))
      .map((x: ColumnState) => {
        const columnDef: ColDef = apiGridTotal!.getColumnDef(x!.colId);
        return {
          ...columnDef,
          cellStyle(params: any) {
            if (params.value >= valueConditional) {
              // mark police cells as red
              return {
                textAlign: 'end',
                color: getProperLetterColor(color.hex),
                backgroundColor: color.hex
              };
            }
            return { textAlign: 'end' };
          }
        };
      });
    const columnName: ColDef[] = columnApiTotal!
      .getColumnState()
      .filter(y => !y.colId.includes('/date'))
      .map((x: ColumnState) => {
        const columnDef: ColDef = apiGridTotal!.getColumnDef(x!.colId);
        return {
          ...columnDef
        };
      });


    apiGridTotal && apiGridTotal!.setColumnDefs([...columnName, ...columnDate]);

    apiGridTotal && apiGridTotal!.refreshCells();
  };


  const changeValue = (value: any) => {
    raiseDoSearchWhenUserStoppedTypingValue(value);
  };

  const raiseDoSearchWhenUserStoppedTypingValue = debounce((value: any) => {
 if(!isNaN(value)){
   changeConditionalValue(parseInt(value))
 }


  }, 150);

const  changeConditionalValue =(value:number)=>{
  setValueConditional(value);
  const columnDate: ColDef[] = columnApiTotal!
    .getColumnState()
    .filter(y => y.colId.includes('/date'))
    .map((x: ColumnState) => {
      const columnDef: ColDef = apiGridTotal!.getColumnDef(x!.colId);
      return {
        ...columnDef,
        cellStyle(params: any) {
          if (params.value >= value) {
            // mark police cells as red
            return {
              textAlign: 'end',
              color: getProperLetterColor(colorConditional),
              backgroundColor: colorConditional
            };
          }
          return { textAlign: 'end' };
        }
      };
    });
  const columnName: ColDef[] = columnApiTotal!
    .getColumnState()
    .filter(y => !y.colId.includes('/date'))
    .map((x: ColumnState) => {
      const columnDef: ColDef = apiGridTotal!.getColumnDef(x!.colId);
      return {
        ...columnDef
      };
    });


  apiGridTotal && apiGridTotal!.setColumnDefs([...columnName, ...columnDate]);

  apiGridTotal && apiGridTotal!.refreshCells();
};

  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ height: '100%', width: '100%',display:'flex' }}>

          <VInputField inline={true} label={'filters'} id={'value conditional'} value={valueConditional} onChange={changeValue}/>
          <div style={{marginLeft:'10px'}}>
            <VColorPicker
            height={31}
            width={31}
            Color={colorConditional}
            typePickerColor={'SketchPicker'}
            onChange={changeColors}
          /></div>

        </div>
        <div style={{ width: '99%' }}>
          <VAgGrid
            onGridReady={onGridReadyTotal}
            columnDefs={stateGridTotal.columnDefs}
            defaultColDef={stateGridTotal.defaultColDef}
            rowData={stateGridTotal.rowData}
            gridOptions={topOptions}
            suppressContextMenu={true}
            getContextMenuItems={getContextMenuItems}
            animateRows={true}
            // overlayNoRowsTemplate={templateNoData()}
            noRowsOverlayComponent={'customNoRowsOverlay'}
            loadingOverlayComponent={'customLoadingOverlay'}
            frameworkComponents={{
              customLoadingOverlay: VSpinner,
              customNoRowsOverlay: EmptyData
            }}
          />
        </div>
      </div>

      <button onClick={toggleContextualMenu}>
        {' '}
        {enableContextualMenu ? 'deshabilitar ' : 'hablilitar '} Menu contextual
      </button>
      <button onClick={toggleVisibleColumns}>
        {' '}
        {hideColumns
          ? 'Ocultar columns, company y workShift  '
          : 'Mostrar columnas, company y workShift '}
      </button>
      <button onClick={clearTable}>
        {clearData ? 'Poblar tabla  ' : 'Borrar tabla'}
      </button>
      <button onClick={onBtShowLoading}>
        {showLoading ? 'Ocultar cargando ' : 'Mostrar cargando'}
      </button>
      <button onClick={onBtScrolling}>scroll to 31-05-2019</button>

      <VAgGrid
        onGridReady={onGridReady}
        columnDefs={getState().columnDefs}
        defaultColDef={getState().defaultColDef}
        rowData={getState().rowData}
        enableRangeSelection={true}
        onRowValueChanged={onRowValueChanged}
        onCellValueChanged={onCellValueChanged}
        onColumnMoved={onColumnMoved}
        suppressContextMenu={!enableContextualMenu || suppressContextMenu()}
        getContextMenuItems={getContextMenuItems}
        onDragStarted={onDragStarted}
        onDragStopped={onDragStopped}
        animateRows={true}
        // overlayNoRowsTemplate={templateNoData()}
        noRowsOverlayComponent={'customNoRowsOverlay'}
        loadingOverlayComponent={'customLoadingOverlay'}
        frameworkComponents={{
          customLoadingOverlay: VSpinner,
          customNoRowsOverlay: EmptyData
        }}
        gridOptions={bottomOptions}
      />
    </>
  );
};

export default AgGridDemo;
