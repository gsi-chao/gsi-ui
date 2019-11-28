import React, { Component } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

export class GridExample extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: [{ field: "jobTitle" }, { field: "employmentType" }],
      rowData: [
        {
          orgHierarchy: ["Erica Rogers"],
          jobTitle: "CEO",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett"],
          jobTitle: "Exec. Vice President",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker"],
          jobTitle: "Director of Operations",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson"],
          jobTitle: "Fleet Coordinator",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson", "Leah Flowers"],
          jobTitle: "Parts Technician",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Brittany Hanson", "Tammy Sutton"],
          jobTitle: "Service Technician",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Derek Paul"],
          jobTitle: "Inventory Control",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland"],
          jobTitle: "VP Sales",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Morris Hanson"],
          jobTitle: "Sales Manager",
          employmentType: "Permanent"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Todd Tyler"],
          jobTitle: "Sales Executive",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Bennie Wise"],
          jobTitle: "Sales Executive",
          employmentType: "Contract"
        },
        {
          orgHierarchy: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland", "Joel Cooper"],
          jobTitle: "Sales Executive",
          employmentType: "Permanent"
        }
      ],
      groupDefaultExpanded: -1,
      getDataPath: function(data: any) {
        return data.orgHierarchy;
      },
      autoGroupColumnDef: {
        headerName: "Organisation Hierarchy",
        cellRendererParams: { suppressCount: true }
      }
    };
  }
// @ts-ignore
  onGridReady = params => {
    // @ts-ignore
    this.gridApi = params.api;
    // @ts-ignore
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  };

  onFilterTextBoxChanged() {
    // @ts-ignore
    this.gridApi.setQuickFilter(document.getElementById("filter-text-box")!.value);
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={this.onFilterTextBoxChanged.bind(this)}
          />
        </div>
        <div style={{ height: "calc(100% - 25px)" }}>
          <div
            id="myGrid"
            style={{
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-balham"
          >

            <AgGridReact
              modules={this.state.modules}
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              treeData={true}
              animateRows={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              getDataPath={this.state.getDataPath}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}