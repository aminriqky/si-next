import React from "react";
import MUIDataTable from "mui-datatables";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  searchBox: {
    '& .MuiToolbar-root': {
      alignItems: 'center', // Ensures the toolbar items are aligned properly
    },
    '& .MuiFormControl-root': {
      position: 'relative', // Adjusts the position of the input box
      top: '45px', // Fine-tune this value based on your layout
    },
  },
});

function DataTable(props) {
  const classes = useStyles();

  const options = {
    selectableRows: false,
    filterType: "dropdown",
    responsive: "scroll",
    customToolbar: () => <div/>,
  };

  const columns = props.columns || [];

  const data = props.data || [];

  const arrayOfArrays = data.map((obj: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(obj));

  return (
    <React.Fragment>
      <div className={classes.searchBox}>
        <MUIDataTable
          title={props.title}
          data={arrayOfArrays}
          columns={columns}
          options={options}
        />
      </div>
    </React.Fragment>
  );
}

export default DataTable;