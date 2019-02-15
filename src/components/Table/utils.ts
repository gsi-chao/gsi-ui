import {IRegion} from "@blueprintjs/table";
import {ICell} from "./ActionCellsMenuItem";

/**
* Return the first cell (top, left) and the last cell (bottom,right) of a given Region.
* */
export const getStartAndEndCell = (region: IRegion) => {
    const startCell: ICell = {
        col: region.cols && region.cols[0] || 0,
        row: region.rows && region.rows[0] || 0
    };
    const endCell: ICell = {
        col: region.cols && region.cols[1] || 0,
        row: region.rows && region.rows[1] || 0
    };
    return { startCell, endCell }
};

export const clone = (obj: any): any => {
    let copy: any;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) {
        return obj;
    }
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        obj.map((key, index) => {
            copy[index] = clone(obj[index]);
        });
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        Object.keys(obj).map(key => {
            copy[key] = clone(obj[key]);
        });
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};