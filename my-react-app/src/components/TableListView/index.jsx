import React from "react";
import DataViewTransferList from "./DataViewTransferList";
import DataViewTable from "./DataViewTable";
import DataView from "./DataView";

function TableListView() {
  return (
    <div className="flex flex-column gap-10">
      <DataViewTransferList />
      <DataViewTable />
    </div>
  );
}

export default TableListView;
