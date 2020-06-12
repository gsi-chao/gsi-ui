import { TypeWidget } from './Widget';

export const printNotFoundWidget = (row: number, column: number) => {
  console.error(
    `(Table-Dropdown-Widget) in Row: ${row} and Column: ${column} not found widget`
  );
};

export const printErrorWidgetByType = (
  row: number,
  column: number,
  value: string | number | boolean,
  type: TypeWidget,
  widget: any
): any => {
  switch (type) {
    case 'DROPDOWN': {
      console.error(
        `(Table-Dropdown-Widget) in Row: ${row} and Column: ${column} not found value selected for ${value} in options `,
        widget.options
      );

      break;
    }
    case 'CHECKBOX': {
      console.error(
        `(Table-Checkbox-Widget) in Row: ${row} and Column: ${column} invalid value ${value}. Value expeted boolean `
      );
      break;
    }
    case 'DATETIME': {
      console.error(
        `(Table-dateTime-Widget) in Row: ${row} and Column: ${column} invalid value format ${value}. format expeted MM/DD/YYYY `
      );
    }
  }
};

export const printErrorWidget = (
  row: number,
  column: number,
  widget: any,
  printErrorCallback: (
    row: number,
    column: number,
    value: string | number | boolean,
    type: TypeWidget,
    widget: any
  ) => any
) => {
  if (widget) {
    Function.call(printErrorCallback);
  } else {
    printNotFoundWidget(row, column);
  }
};
