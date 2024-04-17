import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "react-select";

import SearchIcon from "../images/search.svg";

function createData(
  Link,
  ProgramName,
  Department,
  Description,
  Eligibility,
  ManagementAdminContacts,
  ClientMattersContacts
) {
  return {
    id: Link,
    Link,
    ProgramName,
    Department,
    Description,
    Eligibility,
    ManagementAdminContacts,
    ClientMattersContacts,
  };
}

const rows = [
  createData(
    "Record 1",
    "Diabetes",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 2",
    "Workforce",
    "Transition Services",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 3",
    "Client Services",
    "Community Engagement",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 4",
    "STOMP",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 5",
    "Safe Landing",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 6",
    "Diabetes",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 7",
    "Diabetes",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 8",
    "Diabetes",
    "Community Engagement",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 9",
    "Diabetes",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
  createData(
    "Record 10",
    "Diabetes",
    "Clinical Programs",
    "description",
    "Eligibility",
    "123-4650-78",
    "123-4650-78"
  ),
];

export default function ProgramListTable() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <div className="flex flex-column gap-2 w-100 p-4">
          <TableActions />
          <DataGrid
            rows={rows}
            columns={[
              {
                field: "Link",
                headerName: "Link",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
                renderCell: (params) => {
                  return (
                    <>
                      <a href="#" className="text-[#5BC4BF]">
                        {params.row.Link}
                      </a>
                    </>
                  );
                },
              },
              {
                field: "ProgramName",
                headerName: "Program Name",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "Department",
                headerName: "Department",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "Description",
                headerName: "Description",
                flex: 1,
                filterable: true,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "Eligibility",
                headerName: "Eligibility",
                flex: 1,
                sortable: true,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "ManagementAdminContacts",
                headerName: "Management Admin Contacts",
                align: "center",
                headerAlign: "center",
                flex: 1,
                headerClassName:
                  "bg-[#5BC4BF] text-white font-medium text-center w-100",
              },
              {
                field: "ClientMattersContacts",
                headerName: "Client Matters Contacts",
                align: "center",
                headerAlign: "center",
                flex: 1,
                headerClassName:
                  "bg-[#5BC4BF] text-white font-medium text-center w-100",
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
      </Paper>
    </Box>
  );
}

function TableActions({
  selectedValue,
  handleSelectorValue,
  searchText,
  handleSearchText,
}) {
  const programList = [
    {
      label: "Program 1",
      value: "Program 1",
    },
    {
      label: "Program 2",
      value: "Program 2",
    },
    {
      label: "Program 3",
      value: "Program 3",
    },
    {
      label: "Program 4",
      value: "Program 4",
    },
    {
      label: "Program 5",
      value: "Program 5",
    },
  ];

  return (
    <div className="grid grid-cols-4 justify-between gap-2 w-100 mt-1 mb-4">
      <div className="col-start-1 col-span-1">
        <Select
          name={"selector"}
          options={programList}
          placeholder="Program Name"
          value={selectedValue}
          styles={{
            control: (styles) => ({
              ...styles,
              padding: "5px",
              // height: `${height}`,
              border: `1px solid #5BC4BF`,
              // background: `${bgDisabled}`,
              fontSize: "14px",
              // borderRadius: "0.375rem",
            }),
            menu: (styles) => ({
              ...styles,
              background: "white",
              zIndex: 9999,
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
          isClearable
          onChange={(item) => {
            handleSelectorValue(item);
          }}
          menuPortalTarget={document.body}
        />
      </div>
      <div className="col-end-5 col-span-1 flex gap-1 items-center border-b-2 border-[#5BC4BF]">
        <img src={SearchIcon} className="w-[20px] h-100" />
        <input
          type={"text"}
          value={searchText}
          onChange={handleSearchText}
          placeholder="Search here"
          className={`appearance-none w-full p-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
    </div>
  );
}
