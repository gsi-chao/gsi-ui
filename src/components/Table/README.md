# VTable Component:
VTable is an extension of the blueprint framework tables.
It has the following characteristics:
- Columns Sortable
- Editable Cells
- Validations of Cells.
- Contextual menus configurable.
- Customizable cells.
- Sort between columns.
- Widgets cell
- Enable Column Resizing
- Enable Row Resizing
- Enable Row Header
- Column Widths

## Next Features!
  - Customizable Columns.
  - Copy, Paste and Import Cells.
  - Column filter.

### VTable Examples:
- Basic Example:
``
<VTable columns={['columns-list', 'separate', 'by', 'comma']} data={data} />
``
- Sortable Columns Example:
``
<VTable
      columns={['columns-list', 'separate', 'by', 'comma']}
      data={data}
      sortable={{
        columns: ['columns-list', 'separate'],
        onSort: callbackFunction,
        custom_render_menu: {
          separate: {
            name: 'action',
            text: 'Action',
            icon: 'Icon',
            callback: callback
          }
        }
      }}
    />
``

- Editable Cell and Ordenable Columns Example:
``
<VTable
      columns={['columns-list', 'separate', 'by', 'comma']}
      data={data}
      reordering={true}
      edit={{ columns: ['separate'], validation: {separate: validationFuction} }}
    />
``

- Contextual Menu Example
``
<VTable
      columns={['columns-list', 'separate', 'by', 'comma']}
      data={data}
      contextual={{
        columns: ['separate'],
        default_actions: ['paste'],
        actions: [
          {
            action: callback,
            text: 'Text',
            icon: 'SemanticIcon'
          }
        ]
      }}
    />
``

- Enable Column Resizing,  Enable Row Resizing, Enable Row Header, Column Widths

``
 <VTable
          edit={{ columns: ['name'], validation: { name: nameValidation } }}
          columns={['name', 'lastname']}
          reordering={true}
          sortable={{ columns: ['name'], onSort: this.onSort }}
          contextual={{
            columns: ['name'],
            default_actions: ['copy', 'paste', 'export'],
            actions: [
              {
                icon: 'export',
                action: (item: any) => console.log(item),
                text: 'Action Input'
              }
            ]
          }}
          data={data}
          enableColumnResizing={true}
          enableRowHeader={true}
          enableRowResizing={true}
          columnWidths={[80,100]}
        />
``
- Checkbox cell
``
 <VTable
            widgetsCell={[{

                              column: 'name',
                              widget: {
                                type: 'CHECKBOX'
                                checkboxCell:{
                                    label:'some text'
                                     }
                              }]}
            columns={['name', 'lastname']}

            data={data}
          />
``

- Color cell
``
 <VTable
            widgetsCell={[{
                              column: 'lastname',
                                widget: {
                                  type: 'COLOR',
                                  colorCell: {
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    printColor: (value: string) => {return true}
                                  }
                                }]}
            columns={['name', 'lastname']}
            data={data}
          />
``

- Datetime cell
``
 <VTable
            widgetsCell={[{

                              column: 'name',
                              widget: {
                                type: 'DATETIME',
                                dateTimeCell:{
                                        icon: 'calendar'
                                      }}
                              }]}
            columns={['name', 'lastname']}
            data={data}
          />
``

- Dropdown cell
``
 <VTable
            widgetsCell={[{

                              column: 'name',
                              widget: {
                               type: 'DROPDOWN',
                                   dropdownCell: {
                                     options:[
                                       { index: 1, value: 'otro' },
                                       { index: 2, value: 'Lastname7' },
                                       { index: 3, value: 'lucia alvares' },
                                       { index: 4, value: 'jajajojo jujuju' }
                                     ],
                                     filterable:false
                                   }

                              }]}
            columns={['name', 'lastname']}
            data={data}
          />
``

- Customer cell
``
 <VTable
            widgetsCell={[{

                              column: 'name',
                              widget: {
                               type: 'CUSTOMERCOMPONENT',
                                   cusmtomerCell: {
                                   renderCustomer: (value:string)=>(<div><Icon icon={'phone'} /> {value}</div>)
                                   }

                              }]}
            columns={['name', 'lastname']}
            data={data}
          />
``

### Dependencies
VTables requires [Blueprint Tables](https://blueprintjs.com/docs/#table) v3+ to run.


