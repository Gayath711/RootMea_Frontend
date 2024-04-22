import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "react-select";
import SearchIcon from "../images/search.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../apiConfig";
// function createData(
//   Link,
//   LastName,
//   FirstName,
//   PhoneNumber,
//   RootsEmailAddress,
//   LastActivityDate,
//   SystemStatus,
//   PositionTitle
// ) {
//   return {
//     id: Link,
//     Link,
//     LastName,
//     FirstName,
//     PhoneNumber,
//     RootsEmailAddress,
//     LastActivityDate,
//     SystemStatus,
//     PositionTitle,
//   };
// }

// const rows = [
//   createData(
//     "Record 1",
//     "William 1",
//     "Richard",
//     "123-4650-78",
//     "root@gmail.com",
//     "08/22/2024 8:00pm",
//     "Active",
//     "Doctor"
//   ),
//   createData(
//     "Record 2",
//     "William 2",
//     "Richard",
//     "123-4150-78",
//     "root@gmail.com",
//     "08/22/2024 8:00pm",
//     "Deactivated",
//     "Doctor"
//   ),
//   createData(
//     "Record 3",
//     "William 3",
//     "Richard",
//     "123-4150-78",
//     "root@gmail.com",
//     "08/22/2024 8:00pm",
//     "Deactivated",
//     "Doctor"
//   ),
//   createData(
//     "Record 4",
//     "William 4",
//     "Richard",
//     "123-4150-78",
//     "root@gmail.com",
//     "08/22/2024 8:00pm",
//     "Active",
//     "Doctor"
//   ),
//   createData(
//     "Record 5",
//     "William 5",
//     "Richard",
//     "123-4150-78",
//     "root@gmail.com",
//     "08/22/2024 8:00pm",
//     "Active",
//     "Doctor"
//   ),
// ];

export default function StaffDirectoryTable() {
  const token = localStorage.getItem("access_token");
  const [loadingData, setLoadingData] = useState(true);
  const [recordData, setRecordData] = useState([
    {
      id: 3,
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@rootsclinic.org",
      last_login: null,
      is_active: true,
      profile: {
        phone_no: "+1-555-345-6789",
        position: null,
        facility: "",
        program: ["STI", "Asthma"],
        supervisor_first_name: "arrun",
        supervisor_last_name: "prasaath",
        supervisor_title: null,
        supervisor_email: "arrun@dataterrain.com",
      },
    },
    {
      id: 1,
      first_name: "arrun",
      last_name: "prasaath",
      email: "arrun@dataterrain.com",
      last_login: "2024-04-17T17:51:01.236789Z",
      is_active: true,
      profile: {
        phone_no: "+1-555-123-4567",
        position: null,
        facility: "",
        program: [],
        supervisor_first_name: "",
        supervisor_last_name: "",
        supervisor_title: "",
        supervisor_email: "",
      },
    },
    {
      id: 4,
      first_name: "David",
      last_name: "Brown",
      email: "david.brown@rootsclinic.org",
      last_login: null,
      is_active: true,
      profile: {
        phone_no: "2345124",
        position: null,
        facility: "",
        program: [],
        supervisor_first_name: "Alice",
        supervisor_last_name: "Johnson",
        supervisor_title: null,
        supervisor_email: "alice.johnson@rootsclinic.org",
      },
    },
    {
      id: 2,
      first_name: "John",
      last_name: "Smith",
      email: "john.smith@rootsclinic.org",
      last_login: null,
      is_active: true,
      profile: {
        phone_no: "+1-555-234-5678",
        position: null,
        facility: "",
        program: [],
        supervisor_first_name: "arrun",
        supervisor_last_name: "prasaath",
        supervisor_title: null,
        supervisor_email: "arrun@dataterrain.com",
      },
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiURL}/api/users`, {
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

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectorValue = (item) => {
    setSelectedValue(item);
  };

  const selectorList = useMemo(
    () =>
      recordData.map((item) => {
        return {
          label: item.last_name,
          value: item.last_name,
        };
      }),
    [recordData]
  );

  let rowData = useMemo(
    () =>
      recordData.map((item) => {
        return {
          id: item.id,
          Link: `Record ${item.id}`,
          LastName: item.last_name || "",
          FirstName: item.first_name || "",
          PhoneNumber: item.profile?.phone_no || "",
          RootsEmailAddress: item.email || "",
          LastActivityDate: item.last_login || "",
          SystemStatus: item.is_active || null,
          PositionTitle: item.profile?.position || "",
        };
      }),
    [recordData]
  );

  function searchFilter(arrayOfObjects, searchText) {
    if (!searchText) return arrayOfObjects; // Return the original array if searchText is empty

    const filteredArray = arrayOfObjects.filter((obj) => {
      // Convert object keys to an array and check if any of them contains the searchText
      return Object.keys(obj).some((key) => {
        const value = obj[key];
        if (typeof value === "string") {
          // If the value is a string, perform case-insensitive search
          return value.toLowerCase().includes(searchText.toLowerCase());
        } else {
          // If the value is not a string, convert it to string and perform search
          return String(value).toLowerCase().includes(searchText.toLowerCase());
        }
      });
    });

    return filteredArray;
  }

  const rows = useMemo(() => {
    return searchFilter(rowData, searchText);
  }, [searchText, rowData]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <div className="flex flex-column gap-2 w-100 p-4">
          <TableActions
            selectorList={selectorList}
            selectedValue={selectedValue}
            handleSelectorValue={handleSelectorValue}
            searchText={searchText}
            handleSearchText={handleSearchText}
          />
          <DataGrid
            loading={loadingData}
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
                      <Link
                        to={`/staff-directory/${params.row.id}`}
                        className="text-[#5BC4BF]"
                      >
                        {params.row.Link}
                      </Link>
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
                renderCell: (params) => {
                  let date = params.row.LastActivityDate
                    ? new Date(params.row.LastActivityDate).toLocaleDateString()
                    : "";

                  return date;
                },
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

                  let classToApply = SystemStatus
                    ? "text-[#2F9384] bg-[#DAFCE7]"
                    : "text-[#E0382D] bg-[#FFC7C7]";

                  // if (SystemStatus === "Active") {
                  //   classToApply = "text-[#2F9384] bg-[#DAFCE7]";
                  // }
                  // if (SystemStatus === "Deactivated") {
                  //   classToApply = "text-[#E0382D] bg-[#FFC7C7]";
                  // }

                  return (
                    <>
                      <div className="h-100 w-100">
                        <span className={`m-2 p-1 px-2 ${classToApply}`}>
                          {SystemStatus ? "Active" : "Deactivated"}
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
  selectorList,
  selectedValue,
  handleSelectorValue,
  searchText,
  handleSearchText,
}) {
  return (
    <div className="grid grid-cols-4 justify-between gap-2 w-100 mt-1 mb-4">
      <div className="col-start-1 col-span-1">
        <Select
          name={"selector"}
          options={selectorList}
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