import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import React from "react";

import ExternalLinkIcon from "../../components/images/externalLink.svg";
// import BasicTable from "../react-table/BasicTable";
import BasicTable from "../../components/react-table/BasicTable";

// import EyeIcon from "../images/eye.svg";
// import EditIcon from "../images/edit.svg";
import EyeIcon from "../../components/images/eye.svg";
import EditIcon from "../../components/images/edit.svg";

const Users = ({ setShowAlert, setUser, group }) => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://192.168.3.24:8000/api/user_directory");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const Usercolumns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "user_roots_email", // Correct accessor according to your API response
        align: "left",
      },
      {
        Header: "User Account",
        accessor: "user_acct", // Correct accessor according to your API response
      },
      {
        Header: "User Position",
        accessor: "user_position", // Correct accessor according to your API response
      },
      {
        Header: "User Title",
        accessor: "user_title", // Correct accessor according to your API response
      },
      // Add more columns as needed
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-1 items-center mx-auto">
            <img src={EditIcon} className="size-4 mx-auto" alt="edit" />
            <img src={EyeIcon} className="size-4 mx-auto" alt="view" />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get("http://192.168.3.24:8000/api/program_directory");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  const ProjectColumns = useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "program_name",
        align: "left",
      },
      {
        Header: "Description",
        accessor: "program_desc",
      },
      {
        Header: "Eligibility",
        accessor: "prog_eligibility",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-1 items-center mx-auto">
            <img src={EditIcon} className="size-4 mx-auto" alt="edit" />
            <img src={EyeIcon} className="size-4 mx-auto" alt="view" />
          </div>
        ),
      },
    ],
    []
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col  p-3">
      <div className="flex flex-row justify-between pb-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Users</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
      </div>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
      <BasicTable
        type={"encounterNotes"}
        defaultPageSize={10}
        columns={Usercolumns}
        data={users} // Pass fetched users data to the table
      />

      <br></br>
      
      <div className="flex flex-row justify-between pb-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Programs</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
      </div>
      <BasicTable
        type={"encounterNotes"}
        defaultPageSize={10}
        columns={ProjectColumns}
        data={projects}
      />
    </div>
  );
};

export default Users;
