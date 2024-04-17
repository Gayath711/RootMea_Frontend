import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "react-select";

import SearchIcon from "../images/search.svg";

function createData(
  Link,
  LastName,
  FirstName,
  PhoneNumber,
  RootsEmailAddress,
  LastActivityDate,
  SystemStatus,
  PositionTitle
) {
  return {
    id: Link,
    Link,
    LastName,
    FirstName,
    PhoneNumber,
    RootsEmailAddress,
    LastActivityDate,
    SystemStatus,
    PositionTitle,
  };
}

const rows = [
  createData(
    "Record 1",
    "William 1",
    "Richard",
    "123-4650-78",
    "root@gmail.com",
    "08/22/2024 8:00pm",
    "Active",
    "Doctor"
  ),
  createData(
    "Record 2",
    "William 2",
    "Richard",
    "123-4150-78",
    "root@gmail.com",
    "08/22/2024 8:00pm",
    "Deactivated",
    "Doctor"
  ),
  createData(
    "Record 3",
    "William 3",
    "Richard",
    "123-4150-78",
    "root@gmail.com",
    "08/22/2024 8:00pm",
    "Deactivated",
    "Doctor"
  ),
  createData(
    "Record 4",
    "William 4",
    "Richard",
    "123-4150-78",
    "root@gmail.com",
    "08/22/2024 8:00pm",
    "Active",
    "Doctor"
  ),
  createData(
    "Record 5",
    "William 5",
    "Richard",
    "123-4150-78",
    "root@gmail.com",
    "08/22/2024 8:00pm",
    "Active",
    "Doctor"
  ),
];

export default function StaffDirectoryTable() {
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
                field: "LastName",
                headerName: "Last Name",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "FirstName",
                headerName: "First Name",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "PhoneNumber",
                headerName: "Phone Number",
                flex: 1,
                filterable: true,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "RootsEmailAddress",
                headerName: "Roots Email Address",
                flex: 1,
                sortable: true,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
              },
              {
                field: "LastActivityDate",
                headerName: "Last Activity Date",
                align: "center",
                headerAlign: "center",
                flex: 1,
                headerClassName:
                  "bg-[#5BC4BF] text-white font-medium text-center w-100",
              },

              {
                field: "SystemStatus",
                headerName: "System Status",
                flex: 1,
                align: "center",
                headerAlign: "center",

                headerClassName: "bg-[#5BC4BF] text-white font-medium",
                renderCell: (params) => {
                  const {
                    row: { SystemStatus },
                  } = params;

                  let classToApply = "";

                  if (SystemStatus === "Active") {
                    classToApply = "text-[#2F9384] bg-[#DAFCE7]";
                  }
                  if (SystemStatus === "Deactivated") {
                    classToApply = "text-[#E0382D] bg-[#FFC7C7]";
                  }

                  return (
                    <>
                      <div className="h-100 w-100">
                        <span className={`m-2 p-1 px-2 ${classToApply}`}>
                          {SystemStatus}
                        </span>
                      </div>
                    </>
                  );
                },
              },

              {
                field: "PositionTitle",
                headerName: "Position Title",
                align: "left",
                headerAlign: "left",
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
  const List = [
    {
      label: "Last Name 1",
      value: "Last Name 1",
    },
    {
      label: "Last Name 2",
      value: "Last Name 2",
    },
    {
      label: "Last Name 3",
      value: "Last Name 3",
    },
    {
      label: "Last Name 4",
      value: "Last Name 4",
    },
    {
      label: "Last Name 5",
      value: "Last Name 5",
    },
  ];

  return (
    <div className="grid grid-cols-4 justify-between gap-2 w-100 mt-1 mb-4">
      <div className="col-start-1 col-span-1">
        <Select
          name={"selector"}
          options={List}
          placeholder="Last Name"
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
