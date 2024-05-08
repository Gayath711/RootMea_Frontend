import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../apiConfig";

import MUIDataGridWrapper from "../HOC/MUIDataGridWrapper";

export default function DataViewTable() {
  const token = localStorage.getItem("access_token");

  const [recordData, setRecordData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiURL}/api/dataview/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoadingData(true);
        setRecordData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Records:", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const tableRows = useMemo(() => {
    if (recordData.length === 0 || loadingData) {
      return [];
    }
    return recordData.map((item) => {
      return {
        id: item.id,
        Name: item.name || "",
      };
    });
  }, [recordData, loadingData]);

  const tableColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "bg-[#5BC4BF] text-white font-medium",
      width: "15%",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      headerClassName: "bg-[#5BC4BF] text-white font-medium",
    },
    {
      field: "View",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#5BC4BF] text-white font-medium",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dataview/${params.row.id}`} className="text-[#5BC4BF]">
              View
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div class="container mx-auto sm:grid-cols-12 md:grid-cols-7 rounded shadow p-0">
      <div className="border-b-2">
        <div className="flex justify-between items-center w-100 bg-[#ffffff] text-black p-2.5 px-4">
          <div className="font-bold">Data View Table</div>
          <div>
            <button
              onClick={fetchData}
              className="m-auto px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5 hover:bg-[#5BC4BF] hover:text-white"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-column gap-4 p-4">
        <Box sx={{ width: "100%", my: 1 }}>
          <div className="flex flex-column gap-2 w-100 ">
            <MUIDataGridWrapper>
              <DataGrid
                loading={loadingData}
                rows={tableRows}
                columns={tableColumns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[3, 5, 10, 25]}
                disableRowSelectionOnClick
              />
            </MUIDataGridWrapper>
          </div>
        </Box>
      </div>
    </div>
  );
}
