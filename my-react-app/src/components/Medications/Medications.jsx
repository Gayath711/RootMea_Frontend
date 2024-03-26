import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMedicationInfoAsync } from "../../store/slices/medicationSlice";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EditIcon from "../images/edit.svg";
import SearchIcon from "@mui/icons-material/Search";

const options = {
  Pending: "bg-[#FFE5E5] text-[#E0382D]",
  Active: "bg-[#FEE4D0] text-[#F79421]",
  Done: "bg-[#E9FEFB] text-[#2F9384]",
};

const Tag = ({ text }) => {
  return (
    <div
      className={`${options[text]} text-center text-xs px-3 py-0.5 mx-auto w-fit`}
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
          type={"medications"}
          defaultPageSize={3}
          columns={columns}
          data={data}
        />
    </>
  );
};

function Medications({clientId}) {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.medication.data);
  const dataLoading = useSelector((state) => state.medication.loading);

  useState(() => {
    if (!dataLoading) {
      dispatch(fetchMedicationInfoAsync({ clientId }));
    }
  }, []);

  const [open, setOpen] = useState(true);
  // const [data, setData] = useState([
  //   {
  //     medication: "...",
  //     comment: "...",
  //     updated_by: "...",
  //     updated_date: "...",
  //     start_date: "2024-1-1",
  //     stop_date: "2024-1-1",
  //     status: "done",
  //   },
  //   {
  //     medication: "...",
  //     comment: "...",
  //     updated_by: "...",
  //     updated_date: "...",
  //     start_date: "2024-1-1",
  //     stop_date: "2024-1-1",
  //     status: "pending",
  //   },
  //   {
  //     medication: "...",
  //     comment: "...",
  //     updated_by: "...",
  //     updated_date: "...",
  //     start_date: "2024-1-1",
  //     stop_date: "2024-1-1",
  //     status: "active",
  //   },
  // ]);

  const columns = useMemo(
    () => [
      {
        Header: "Medication",
        accessor: "medication",
        align: "left",
      },
      {
        Header: "Comment",
        accessor: "comments",
      },
      {
        Header: "Updated By",
        accessor: "last_updated_by",
      },
      {
        Header: "Updated Date",
        accessor: "last_updated_date",
      },
      {
        Header: "Start Date",
        accessor: "start_date",
      },
      {
        Header: "Stop Date",
        accessor: "stop_date",
      },
      {
        Header: "status",
        Cell: ({ row }) => <Tag text={row.original.status} />,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <img src={EditIcon} className="size-4 mx-auto" alt="view" />
        ),
      },
    ],
    []
  );

  return (
    <div
      id="clientChartClientProfile"
      className={`bg-white rounded-md shadow-sm flex flex-col ${open ? "h-full" : ""}`}
    >
      <div className="flex justify-between p-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Medications</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <SearchIcon className="text-[#585A60] hover:cursor-pointer" />
          <button className="px-3 py-2 text-sm bg-[#E4C3B1] text-white rounded-sm font-medium">
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

export default Medications;
