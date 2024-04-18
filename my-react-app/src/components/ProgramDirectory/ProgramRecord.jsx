import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function ProgramRecord() {
  return (
    <div class="container mx-auto sm:grid-cols-12 md:grid-cols-7 shadow p-0">
      <div className="w-100 bg-[#5BC4BF] text-white p-2.5 px-4">
        Program Name
      </div>
      <div className="flex flex-column gap-4 p-4">
        <ProgramDetail />
        <PrimaryContactManagementTable />
        <PrimaryContactReferralsTable />
        <AdditionalTeamMembersTable />
        <PriorityListTable />
      </div>
    </div>
  );
}

const ProgramDetail = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1 my-2">
        <p className="text-base m-0 p-0 flex gap-2 items-center">
          <span className="fw-medium">Department:</span>
          <span className="fw-bold">[Department Name]</span>
        </p>
      </div>
      <div className="col-start-1 col-span-1">
        <textarea
          rows={4}
          style={{ resize: "none" }}
          placeholder="Description.."
          className={`placeholder:text-sm appearance-none border-1 border-[#5BC4BF] rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
      <div className="col-span-1">
        <textarea
          rows={4}
          style={{ resize: "none" }}
          placeholder="Eligibility.."
          className={`placeholder:text-sm appearance-none border-1 border-[#5BC4BF] rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        />
      </div>
    </div>
  );
};

const PrimaryContactManagementTable = () => {
  const rows = [
    {
      id: 1,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 2,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 3,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 4,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
  ];

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <div className="flex flex-column gap-2 w-100 ">
        <p className="mb-2 fw-medium text-base">
          Primary Contact(s) for management/administration
        </p>
        <DataGrid
          rows={rows}
          columns={[
            {
              field: "StaffName",
              headerName: "Staff Name",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },
            {
              field: "StaffTitle",
              headerName: "Staff Title",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },
            {
              field: "StaffEmail",
              headerName: "Staff Email",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },
            {
              field: "StaffPhone",
              headerName: "Staff Phone",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
            },
            {
              field: "LinkToContactCcard",
              headerName: "Link To Contact Ccard",
              flex: 1,
              headerClassName: "bg-[#5BC4BF] text-white font-medium",
              renderCell: (params) => {
                return (
                  <>
                    <Link to="#" className="text-[#5BC4BF]">
                      {params.row.LinkToContactCcard}
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
const PrimaryContactReferralsTable = () => {
  const rows = [
    {
      id: 1,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 2,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 3,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 4,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
  ];

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <div className="flex flex-column gap-2 w-100 ">
        <p className="mb-2 fw-medium text-base">
          Primary Contact(s) for referrals/client care matters
        </p>
        <DataGrid
          rows={rows}
          columns={[
            {
              field: "StaffName",
              headerName: "Staff Name",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
            },
            {
              field: "StaffTitle",
              headerName: "Staff Title",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
            },
            {
              field: "StaffEmail",
              headerName: "Staff Email",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
            },
            {
              field: "StaffPhone",
              headerName: "Staff Phone",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
            },
            {
              field: "LinkToContactCcard",
              headerName: "Link To Contact Ccard",
              flex: 1,
              headerClassName: "bg-[#2F9384] text-white font-medium",
              renderCell: (params) => {
                return (
                  <>
                    <Link to="#" className="text-[#5BC4BF]">
                      {params.row.LinkToContactCcard}
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
const AdditionalTeamMembersTable = () => {
  const rows = [
    {
      id: 1,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 2,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 3,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
    {
      id: 4,
      StaffName: "John",
      StaffTitle: "Staff Title",
      StaffEmail: "Staff Email",
      StaffPhone: "Staff phone",
      LinkToContactCcard: "Link to contact card",
    },
  ];

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <div className="flex flex-column gap-2 w-100 ">
        <p className="mb-2 fw-medium text-base">Additional team members</p>
        <DataGrid
          rows={rows}
          columns={[
            {
              field: "StaffName",
              headerName: "Staff Name",
              flex: 1,
              headerClassName: "bg-[#89D6DE] text-black font-medium",
            },
            {
              field: "StaffTitle",
              headerName: "Staff Title",
              flex: 1,
              headerClassName: "bg-[#89D6DE] text-black font-medium",
            },
            {
              field: "StaffEmail",
              headerName: "Staff Email",
              flex: 1,
              headerClassName: "bg-[#89D6DE] text-black font-medium",
            },
            {
              field: "StaffPhone",
              headerName: "Staff Phone",
              flex: 1,
              headerClassName: "bg-[#89D6DE] text-black font-medium",
            },
            {
              field: "LinkToContactCcard",
              headerName: "Link To Contact Ccard",
              flex: 1,
              headerClassName: "bg-[#89D6DE] text-black font-medium",
              renderCell: (params) => {
                return (
                  <>
                    <Link to="#" className="text-[#5BC4BF]">
                      {params.row.LinkToContactCcard}
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

const PriorityListTable = () => {
  const rows = [
    {
      id: 1,
      PriorityListName: "Priority List Name",
      LinkToPriorityList: "link to priority list",
    },
    {
      id: 2,
      PriorityListName: "Priority List Name",
      LinkToPriorityList: "link to priority list",
    },
    {
      id: 3,
      PriorityListName: "Priority List Name",
      LinkToPriorityList: "link to priority list",
    },
    {
      id: 4,
      PriorityListName: "Priority List Name",
      LinkToPriorityList: "link to priority list",
    },
  ];

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <div className="flex flex-column gap-2 w-100 ">
        <p className="mb-2 fw-medium text-base">Priority Lists</p>
        <DataGrid
          rows={rows}
          columns={[
            {
              field: "PriorityListName",
              headerName: "Priority ListName",
              flex: 1,
              headerClassName: "bg-[#C7CED4] text-black font-medium",
            },

            {
              field: "LinkToPriorityList",
              headerName: "Link To Priority List",
              flex: 1,
              headerClassName: "bg-[#C7CED4] text-black font-medium",
              renderCell: (params) => {
                return (
                  <>
                    <Link to="#" className="text-[#5BC4BF]">
                      {params.row.LinkToPriorityList}
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
