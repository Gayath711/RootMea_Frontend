import React, { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EyeIcon from "../images/eye.svg";
import EditIcon from "../images/edit.svg";

const Content = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
      <BasicTable type={"documents"} columns={columns} data={data} />
    </>
  );
};

function Documents({ clientId }) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([
    {
      type: "Note",
      doc_name: "...",
      program: "ECM",
      uploaded_by: "User name",
      doc_date: "1-1-2024",
      uploaded_date: "1-1-2024",
    },
    {
      type: "Encounter",
      doc_name: "...",
      program: "ECM",
      uploaded_by: "User name",
      doc_date: "1-1-2024",
      uploaded_date: "1-1-2024",
    },
    {
      type: "Encounter",
      doc_name: "...",
      program: "ECM",
      uploaded_by: "User name",
      doc_date: "1-1-2024",
      uploaded_date: "1-1-2024",
    },
    {
      type: "Note",
      doc_name: "...",
      program: "ECM",
      uploaded_by: "User name",
      doc_date: "1-1-2024",
      uploaded_date: "1-1-2024",
    },
    {
      type: "Encounter",
      doc_name: "...",
      program: "ECM",
      uploaded_by: "User name",
      doc_date: "1-1-2024",
      uploaded_date: "1-1-2024",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
        align: "left",
      },
      {
        Header: "Doc Name",
        accessor: "doc_name",
        align: "left",
      },
      {
        Header: "Program",
        accessor: "program",
        align: "left",
      },
      {
        Header: "Uploaded by",
        accessor: "uploaded_by",
        align: "left",
      },
      {
        Header: "Doc Date",
        accessor: "doc_date",
        align: "left",
      },
      {
        Header: "Uploaded Date",
        accessor: "uploaded_date",
        align: "left",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-3 items-center mx-auto justify-center">
            <img src={EditIcon} className="size-4" alt="edit" />
            <img src={EyeIcon} className="size-4" alt="view" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div
      id="clientChartClientProfile"
      className={`bg-white rounded-md shadow-sm flex flex-col ${
        open ? "h-full" : ""
      }`}
    >
      <div className="flex justify-between p-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Documents</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <button className="px-3 py-2 text-sm bg-[#8AD0F5] text-[#1A1F25] rounded-sm font-medium">
            Add New
          </button>
          <RemoveCircleIcon
            onClick={() => setOpen(!open)}
            className="text-[#585A60] hover:cursor-pointer"
          />
        </div>
      </div>
      {open && <Content data={data} columns={columns} />}
    </div>
  );
}

export default Documents;
