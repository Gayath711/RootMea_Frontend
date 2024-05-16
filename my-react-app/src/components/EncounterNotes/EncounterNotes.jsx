import React, { useState, useMemo, useCallback, useEffect } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EyeIcon from "../images/eye.svg";
import EditIcon from "../images/edit.svg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { protectedApi } from "../../services/api";
import {notifyError} from "../../helper/toastNotication"

const options = {
  Pending: "bg-[#FFE5E5] text-[#E0382D]",
  Active: "bg-[#FEE4D0] text-[#F79421]",
  Done: "bg-[#E9FEFB] text-[#2F9384]",
};

const Tag = ({ text }) => {
  return (
    <div
      className={`${options[text]} text-center text-xs w-[70px] mx-auto py-1 rounded-[2px]`}
    >
      {text?.charAt(0)?.toUpperCase() + text?.slice(1)}
    </div>
  );
};

const Content = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
      <BasicTable
        type={"encounterNotes"}
        defaultPageSize={10}
        columns={columns}
        data={data}
      />
    </>
  );
};

function EncounterNotes({ clientId }) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);

  const fetchEncounters = useCallback(async () => {
    try {
      const response = await protectedApi.get(
        `/encounters-notes-client/${clientId}`
      );
      setData(response.data);
    } catch (error) {
      notifyError("Failed to fetch encounter notes");
      console.error(error);
    }
  }, [clientId]);

  useEffect(() => {
    fetchEncounters();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Staff Name",
        accessor: "staff_name",
        align: "left",
      },
      // {
      //   Header: "Facility",
      //   accessor: "facility",
      // },
      // {
      //   Header: "Note type",
      //   accessor: "note_type",
      // },
      {
        Header: "Encounter Type",
        accessor: "encounter_type",
        align: "left",
      },
      {
        Header: "Encounter Date",
        accessor: "encounter_date",
        align: "left",
        Cell: ({ row }) =>
          format(new Date(row.original.encounter_date), "MM-dd-yyyy"),
      },
      {
        Header: "Status",
        Cell: ({ row }) => <Tag text={row.original.encounter_status} />,
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
          <div className="text-[#28293B] text-xl">Encounter Notes</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <Link
            to={`/encounter-note/add/${clientId}`}
            className="px-3 py-2 text-sm bg-[#5BC4BF] text-white rounded-sm font-medium"
          >
            Add New
          </Link>
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

export default EncounterNotes;
