import React from "react";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
// import ClientProfileImg from "../images/clientProfile.svg";
import ClientChartImg from "../images/clientChart.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientsInfoAsync } from "../../store/slices/clientsInfoSlice";

function getRandomDate(dates) {
  const randomIndex = Math.floor(Math.random() * dates.length);
  return dates[randomIndex];
}

function getRandomProgram(programs) {
  const randomIndex = Math.floor(Math.random() * programs.length);
  return programs[randomIndex];
}

function MyPanel() {
  const programs = ["ECM", "Diabetes", "STOMP"];

  const dates = [
    "2024-03-15",
    "2024-03-16",
    "2024-03-17",
    "2024-03-18",
    "2024-03-19",
    "2024-03-20",
    "2024-03-21",
    "2024-03-22",
    "2024-03-23",
    "2024-03-24",
  ];

  // const [data, setData] = useState([]);
  const data = useSelector((state) => state.clientsInfo.data);
  const dataLoading = useSelector((state) => state.clientsInfo.loading);
  const dispatch = useDispatch()
  // const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   fetchData();
  // }, [searchQuery]);

  useEffect(() => {
    if (!dataLoading) {
      dispatch(fetchClientsInfoAsync())
    }
  }, [])

  // const fetchData = async () => {
  //   const token = localStorage.getItem("access_token");

  //   if (!token) {
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `http://192.168.3.24:8000/clientinfo-api?search=${searchQuery}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const processedData = response.data.slice(0, 6).map((client) => ({
  //       date_assigned: getRandomDate(dates),
  //       program: getRandomProgram(programs),
  //       ...client,
  //     }));

  //     setData(processedData);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching Client Data:", error);
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        Header: "Client",
        accessor: "first_name",
        align: "left",
        Cell: ({ row }) =>
          `${row.original.first_name}, ${row.original.last_name}`,
      },
      {
        Header: "D.O.B",
        accessor: "date_of_birth",
        Cell: ({ value }) => {
          // Parse the date string
          const date = new Date(value);
          // Extract day, month, and year
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          // Format date as "dd-mm-yyyy"
          return `${month}-${day}-${year}`;
        },
      },
      {
        Header: "Gender",
        accessor: "sex",
      },
      {
        Header: "Phone Number",
        accessor: "mobile_number",
      },
      {
        Header: "Date Assigned",
        accessor: "date_assigned",
        Cell: ({ value }) => {
          // Parse the date string
          const date = new Date(value);
          // Extract day, month, and year
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          // Format date as "dd-mm-yyyy"
          return `${month}-${day}-${year}`;
        },
      },
      {
        Header: "Program",
        accessor: "program",
      },
      {
        Header: "Client Profile",
        Cell: ({ row }) => (
          <Link to={`/clientprofile/${row.original.id}`}>
            <Avatar className="mx-auto" sx={{ bgcolor: "#77ceca", height: 25, width: 25, fontSize: 10 }}>
              {row.original?.first_name[0].toUpperCase() +
                row.original?.last_name[0].toUpperCase()}
            </Avatar>
          </Link>
        ),
      },
      {
        Header: "Client Chart",
        Cell: ({row}) => (
          <Link to={`/clientchart/${row.original.id}`}>
          <img src={ClientChartImg} className="size-6 mx-auto" alt="client" />
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-md shadow-md flex flex-col">
      <div className="flex justify-between items-center mx-8 mt-2">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">My Panel</span>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div>
          <button className="px-3 py-1 border-2 rounded-sm border-[#2F9384] text-xs text-[#2F9384]">
            View all
          </button>
        </div>
      </div>
      <hr className="w-[98%] mx-auto my-2" />
      <div className="w-full flex-grow flex flex-col">
        <BasicTable type={"myPanel"} columns={columns} data={data} />
      </div>
    </div>
  );
}

export default MyPanel;
