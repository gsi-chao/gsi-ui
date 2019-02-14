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