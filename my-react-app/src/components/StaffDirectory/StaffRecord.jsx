import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../apiConfig";

export default function StaffRecord() {
  const { recordid } = useParams();
  const token = localStorage.getItem("access_token");

  const [recordData, setRecordData] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchData();
  }, [recordid]);

  const fetchData = () => {
    axios
      .get(`${apiURL}/api/users/${recordid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoadingData(true);
        setRecordData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching SVS Questions:", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };
  const assignedProgramTableRows = useMemo(() => {
    if (JSON.stringify(recordData) === "{}" || loadingData) {
      return [];
    }
    return recordData.profile
      ? recordData.profile.program.map((item) => {
          return {
            id: item.id,
            ProgramName: item.program || "",
            linkToProgram: "link to program",
            AssignedToProgramDate: item.date_joined || "",
          };
        })
      : [];
  }, [recordData, loadingData]);

  let staffName = `${recordData.first_name || ""} ${
    recordData.last_name || ""
  }`;
  let StaffTitle = recordData.profile?.position || "";

  return (
    <div class="container mx-auto sm:grid-cols-12 md:grid-cols-7 shadow p-0">
      <div className="w-100 bg-[#5BC4BF] text-white p-2.5 px-4">
        {staffName}
      </div>
      <div className="flex flex-column gap-4 p-4">
        <StaffDetail staffName={staffName} staffTitle={StaffTitle} />
        <AssignedProgramTable
          loadingData={loadingData}
          rows={assignedProgramTableRows}
        />
        <AssignedPriorityListsTable />
      </div>
    </div>
  );
}

const StaffDetail = ({ staffName = "", staffTitle = "" }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <p className="text-base m-0 p-0 flex gap-2 items-center">
          <span className="fw-medium">Staff Title :</span>
          <span className="fw-bold">{staffTitle}</span>
        </p>
      </div>
      <div className="col-span-1">
        <input
          type="text"
          placeholder="Phone Number"
          className={`placeholder:text-sm appearance-none border-1 border-[#5BC4BF] rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
      <div className="col-span-1">
        <input
          type="text"
          placeholder="Email"
          className={`placeholder:text-sm appearance-none border-1 border-[#5BC4BF] rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
      <div className="col-span-1">
        {" "}
        <input
          type="text"
          placeholder="Supervisor"
          className={`placeholder:text-sm appearance-none border-1 border-[#5BC4BF] rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
    </div>
  );
};

const AssignedProgramTable = ({ rows, loadingData }) => {
  // const rows = [
  //   {
  //     id: 1,
  //     ProgramName: "John",
  //     linkToProgram: "link to program",
  //     AssignedToProgramDate: "02/18/2024",
  //   },
  //   {
  //     id: 2,
  //     ProgramName: "John",
  //     linkToProgram: "link to program",
  //     AssignedToProgramDate: "02/18/2024",
  //   },
  //   {
  //     id: 3,
  //     ProgramName: "John",
  //     linkToProgram: "link to program",
  //     AssignedToProgramDate: "02/18/2024",
  //   },
  //   {
  //     id: 4,
  //     ProgramName: "John",
  //     linkToProgram: "link to program",
  //     AssignedToProgramDate: "02/18/2024",
  //   },
  // ];

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <div className="flex flex-column gap-2 w-100 ">
        <p className="mb-2 fw-medium text-base">Assigned Programs</p>
        <DataGrid
          loading={loadingData}
          rows={rows}
          columns={[
            {
              field: "ProgramName",
              headerName: "Program Name",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
            },
            {
              field: "linkToProgram",
              headerName: "Link To Program",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
              renderCell: (params) => {
                return (
                  <>
                    <Link
                      to={`/program-directory/${params.row.id}`}
                      className="text-[#2F9384]"
                    >
                      {params.row.linkToProgram}
                    </Link>
                  </>
                );
              },
            },

            {
              field: "AssignedToProgramDate",
              headerName: "Assigned To ProgramDate",
              flex: 1,
              align: "center",
              headerAlign: "center",
              headerClassName: "bg-[#2F9384] text-white font-medium",
            },
          ]}
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
      </div>
    </Box>
  );
};
const AssignedPriorityListsTable = () => {
  const rows = [
    {
      id: 1,
      ProgramName: "John",
      PriorityListName: "list Name",
      ListActivityDate: "02/18/2024",
      linkToProgram: "link to program",
    },
    {
      id: 2,
      ProgramName: "John",
      PriorityListName: "list Name",
      ListActivityDate: "02/18/2024",
      linkToProgram: "link to program",
    },
    {
      id: 3,
      ProgramName: "John",
      PriorityListName: "list Name",
      ListActivityDate: "02/18/2024",
      linkToProgram: "link to program",
    },
    {
      id: 4,
      ProgramName: "John",
      PriorityListName: "list Name",
      ListActivityDate: "02/18/2024",
      linkToProgram: "link to program",
    },
  ];

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <div className="flex flex-column gap-2 w-100 ">
        <p className="mb-2 fw-medium text-base">Assigned Priority Lists</p>
        <DataGrid
          rows={rows}
          columns={[
            {
              field: "ProgramName",
              headerName: "Program Name",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },

            {
              field: "PriorityListName",
              headerName: "PriorityList Name",
              flex: 1,
              align: "center",
              headerAlign: "center",
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },
            {
              field: "ListActivityDate",
              headerName: "List Activity Date",
              flex: 1,
              align: "center",
              headerAlign: "center",
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },

            {
              field: "linkToProgram",
              headerName: "Link To Program",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
              renderCell: (params) => {
                return (
                  <>
                    <Link
                      to={`/program-directory/${params.row.id}`}
                      className="text-[#5BC4BF]"
                    >
                      {params.row.linkToProgram}
                    </Link>
                  </>
                );
              },
            },
          ]}
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
      </div>
    </Box>
  );
};
