import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDiagnosesInfoAsync } from "../../store/slices/diagnosesSlice";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EyeIcon from "../images/eye.svg";
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
          type={"diagnoses"}
          defaultPageSize={3}
          columns={columns}
          data={data}
        />
    </>
  );
};

function Diagnoses({clientId}) {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.diagnoses.data);
  const dataLoading = useSelector((state) => state.diagnoses.loading);

  useState(() => {
    if (!dataLoading) {
      dispatch(fetchDiagnosesInfoAsync({ clientId }));
    }
  }, []);

  const [open, setOpen] = useState(true);
  // const [data, setData] = useState([
  //   {
  //     diagnoses_name: "ICD10 Code",
  //     comments: "...",
  //     last_updated_by: "...",
  //     last_updated_date: "...",
  //     start_date: "2024-1-1",
  //     stop_date: "2024-1-1",
  //     status: "done",
  //   },
  //   {
  //     diagnoses_name: "ICD10 Code",
  //     comments: "...",
  //     last_updated_by: "...",
  //     last_updated_date: "...",
  //     start_date: "2024-1-1",
  //     stop_date: "2024-1-1",
  //     status: "pending",
  //   },
  //   {
  //     diagnoses_name: "ICD10 Code",
  //     comments: "...",
  //     last_updated_by: "...",
  //     last_updated_date: "...",
  //     start_date: "2024-1-1",
  //     stop_date: "2024-1-1",
  //     status: "active",
  //   },
  // ]);

  const columns = useMemo(
    () => [
      {
        Header: "Diagnosis Name",
        accessor: "diagnosis_name",
        align: "left",
      },
      {
        Header: "Comments",
        accessor: "comments",
      },
      {
        Header: "Last Updated By",
        accessor: "last_updated_by",
      },
      {
        Header: "Last Updated Date",
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
        Header: "Status",
        Cell: ({ row }) => <Tag text={row.original.diagnosis_status} />,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <img src={EyeIcon} className="size-4 mx-auto" alt="view" />
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
          <div className="text-[#28293B] text-xl">Diagnoses</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <SearchIcon className="text-[#585A60] hover:cursor-pointer" />
          <button className="px-3 py-1.5 text-xs bg-[#D9F1FF] text-[#1A1F25] rounded-sm font-medium">
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

export default Diagnoses;