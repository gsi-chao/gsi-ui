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

- Checkbox cell
``
 <VTable
            widgetsCell={[{
                              row: 7,
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
                              row: 7,
                              column: 'name',
                              widget: {
                                type: 'COLOR'
                                checkboxCell:{
                                    backgroundColor: 'blue',
                                    color: 'white'
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
                              row: 7,
                              column: 'name',
                              widget: {
                                type: 'DATETIME'

                              }]}
            columns={['name', 'lastname']}
            data={data}
          />
``

- Dropdown cell
``
 <VTable
            widgetsCell={[{
                              row: 7,
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

### Dependencies
VTables requires [Blueprint Tables](https://blueprintjs.com/docs/#table) v3+ to run.


