import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "react-select";
import SearchIcon from "../images/search.svg";
import axios from "axios";
import apiURL from "../../apiConfig";
import { Link, useParams } from "react-router-dom";

import ViewPNG from "../images/view.png";
import EditPNG from "../images/edit.png";
import DeletePNG from "../images/delete.png";
// function createData(
//   Link,
//   ProgramName,
//   Department,
//   Description,
//   Eligibility,
//   ManagementAdminContacts,
//   ClientMattersContacts
// ) {
//   return {
//     id: Link,
//     Link,
//     ProgramName,
//     Department,
//     Description,
//     Eligibility,
//     ManagementAdminContacts,
//     ClientMattersContacts,
//   };
// }

// const rows = [
//   createData(
//     "Record 1",
//     "Diabetes",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 2",
//     "Workforce",
//     "Transition Services",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 3",
//     "Client Services",
//     "Community Engagement",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 4",
//     "STOMP",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 5",
//     "Safe Landing",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 6",
//     "Diabetes",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 7",
//     "Diabetes",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 8",
//     "Diabetes",
//     "Community Engagement",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 9",
//     "Diabetes",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
//   createData(
//     "Record 10",
//     "Diabetes",
//     "Clinical Programs",
//     "description",
//     "Eligibility",
//     "123-4650-78",
//     "123-4650-78"
//   ),
// ];

export default function ProgramListTable() {
  const token = localStorage.getItem("access_token");
  const [loadingData, setLoadingData] = useState(true);
  const [recordData, setRecordData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiURL}/api/resources/program`, {
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
          label: item.name,
          value: item.name,
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
          ProgramName: item.name || "",
          Department: item.department_name || "",
          Description: item.description || "",
          Eligibility: item.eligibility || "",
          ManagementAdminContacts:
            item.primary_contact.length > 0
              ? `${item.primary_contact[0].first_name} ${item.primary_contact[0].last_name}`
              : "",
          ClientMattersContacts:
            item.client_matter_contact.length > 0
              ? `${item.client_matter_contact[0].first_name} ${item.client_matter_contact[0].last_name}`
              : "",
        };
      }),
    [recordData]
  );

  function searchFilter(arrayOfObjects, searchText) {
    if (!searchText) return arrayOfObjects; // Return the original array if searchText is empty

    if (arrayOfObjects.length === 0) {
      return [];
    }
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
                minWidth: 50,
                renderCell: (params) => {
                  return (
                    <>
                      <Link
                        to={`/program-directory/${params.row.id}`}
                        className="text-[#5BC4BF]"
                      >
                        {params.row.Link}
                      </Link>
                    </>
                  );
                },
              },
              {
                field: "ProgramName",
                headerName: "Program Name",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
                minWidth: 150,
              },
              {
                field: "Department",
                headerName: "Department",
                flex: 1,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
                minWidth: 150,
              },
              {
                field: "Description",
                headerName: "Description",
                flex: 1,
                filterable: true,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
                minWidth: 200,
              },
              {
                field: "Eligibility",
                headerName: "Eligibility",
                flex: 1,
                sortable: true,
                headerClassName: "bg-[#5BC4BF] text-white font-medium",
                minWidth: 200,
              },
              // {
              //   field: "Action",
              //   headerName: "Action",
              //   align: "left",
              //   headerAlign: "center",
              //   flex: 1,
              //   headerClassName:
              //     "bg-[#5BC4BF] text-white font-medium text-center w-100",
              //   minWidth: 150,
              //   renderCell: (params) => {
              //     return (
              //       <>
              //         <div
              //           className="text-[#5BC4BF] flex items-center justify-evenly"
              //           style={{ height: "100%" }}
              //         >
              //           <img src={ViewPNG} className="w-5 h-5" />
              //           <img src={EditPNG} className="w-5 h-5" />
              //           <img src={DeletePNG} className="w-5 h-5" />
              //         </div>
              //       </>
              //     );
              //   },
              // },
              // {
              //   field: "ManagementAdminContacts",
              //   headerName: "Management Admin Contacts",
              //   align: "center",
              //   headerAlign: "center",
              //   flex: 1,
              //   headerClassName:
              //     "bg-[#5BC4BF] text-white font-medium text-center w-100",
              //   minWidth: 150,
              // },
              // {
              //   field: "ClientMattersContacts",
              //   headerName: "Client Matters Contacts",
              //   align: "center",
              //   headerAlign: "center",
              //   flex: 1,
              //   headerClassName:
              //     "bg-[#5BC4BF] text-white font-medium text-center w-100",
              //   minWidth: 150,
              // },
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
      {/* <div className="col-start-1 col-span-1">
      <Select
          name={"selector"}
          options={selectorList}
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
      </div> */}
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
