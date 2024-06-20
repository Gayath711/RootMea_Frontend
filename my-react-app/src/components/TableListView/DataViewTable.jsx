import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../apiConfig";

import MUIDataGridWrapper from "../HOC/MUIDataGridWrapper";
import BasicTable from "../react-table/BasicTable";

export default function DataViewTable({saveSuccess, setSaveSuccess}) {
  const token = localStorage.getItem("access_token");

  const [recordData, setRecordData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [state, setState] = useState({
    columns: [],
    data: []
});

const requestBody = {
  "dataview": "Admin",

}

  useEffect(() => {
    axios
      .post(`${apiURL}/priority_list/mapping/`,requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setState(response.data);
        console.log("/priority_list/mapping/",response.data);
      })
      .catch((error) => {
        console.error("Error fetching Client Medication Data:", error);
      });
  }, [saveSuccess]);
  
  const { columns, data } = state;

  return (
    <div class="container mx-auto sm:grid-cols-12 md:grid-cols-7 rounded shadow p-0">
      <div className="border-b-2">
        <div className="flex justify-between items-center w-100 bg-[#ffffff] text-black p-2.5 px-4">
          <div className="font-bold">Data View Table</div>
          <div>
            <button
              onClick={()=>setSaveSuccess(prev => !prev)}
              className="m-auto px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5 hover:bg-[#5BC4BF] hover:text-white"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex-grow flex flex-col">
                <BasicTable type={"priorityList"} columns={columns} data={data} />
              </div>
    </div>
  );
}
