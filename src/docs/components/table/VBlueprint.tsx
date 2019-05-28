import React from 'react';
import { showToastNotification } from '../../../components/ToastNotification';
import { VTable } from '../../../components/Table';
import { ISortResult } from '../../../components/Table/Table';
import TableWithWidgetDemo from '../../../demo/TableWithWidgetDemo';
import VLoadProgressTaskDemo from '../../../demo/VLoadProgressTaskDemo';

const data = [
  {
    name: 'Carlos',
    lastname: 'Chao',
    age: 28,
    age1: 28,
    age2: 28,
    age3: 28,
    age4: 28,
    age5: 28
  },
  {
    name: 'Carlos',
    lastname: 'Chao',
    age: 28,
    age1: 28,
    age2: 28,
    age3: 28,
    age4: 28,
    age5: 28
  },
  {
    name: 'Carlos',
    lastname: 'Chao',
    age: 28,
    age1: 28,
    age2: 28,
    age3: 28,
    age4: 28,
    age5: 28
  }
];

// validator example
const nameValidation = (value: string) => {
  return value.length > 5;
};

export const VBlueprintTable = () => {
  const onSave = (data: any) => {
    console.log(data);
  };

  const onSort = (item: ISortResult) => {
    console.log(item.order);
    console.log(item.columnIndex);
    console.log(item.columnName);
  };

  return (
    <div>
      <VTable
        striped
        columns={[
          'name',
          'lastname',
          'age',
          'age1',
          'age2',
          'age3',
          'age4',
          'age5'
        ]}
        cellSelectionType={'ENTIRE_ROW'}
        columns_name={{ name: 'mi nombre' }}
        reordering={true}
        sortable={{ onSort, columns: ['name'] }}
        contextual={{
          columnsContextual: [
            {
              columns: ['name'],
              default_actions: ['copy', 'paste'],
              actions: [
                {
                  icon: 'export',
                  action: (item: any) => console.log(item),
                  text: 'Action Input'
                }
              ]
            }
          ]
        }}
        edit={{
          onSave,
          editColumn: {
            columns: ['lastname']
          },
          invalidDataMessage: (invalidColumns: string[]) => {
            showToastNotification({
              type: 'danger',
              message: `No se puede guardar porq las siguiente columnas tienen datos invalidos: ${invalidColumns.join(
                ' , '
              )}`,
              timeout: 8000
            });
          },

          editToolbar: {
            textSave: 'Salvar',
            textCancel: 'Cancelar',
            iconCancel: 'cross',
            iconEdit: 'take-action',
            iconSave: 'share'
          }
        }}
        data={data}
        enableColumnResizing={true}
        enableRowHeader={true}
        enableRowResizing={true}
        columnWidths={[200, 200, 250, 250, 250]}
        numFrozenRows={2}
        numFrozenColumns={1}
        actionsSelection={{
          onDoubleClick: (
            value: any,
            rowIndex: number,
            columnIndex: number,
            columnName: string
          ) => {
            console.log('doble click');
          }
        }}
      />
      <TableWithWidgetDemo />

    </div>
  );
};
