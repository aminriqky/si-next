import React from "react";
import MUIDataTable from "mui-datatables";

function DataTable(props) {

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    search: true,
    selectableRows: false,
    sort: true,
  };

  const columns = props.columns || [];

  const data = props.data || [];

  const arrayOfArrays = data.map((obj: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(obj));

  return (
    <React.Fragment>
      <MUIDataTable
        title={props.title}
        data={arrayOfArrays}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}

export default DataTable;