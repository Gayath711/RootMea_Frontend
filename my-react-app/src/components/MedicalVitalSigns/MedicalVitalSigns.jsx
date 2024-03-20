import React, { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EyeIcon from "../images/eye.svg";

const options = {
  high: "bg-[#FFE5E5] text-[#E0382D]",
  medium: "bg-[#FEE4D0] text-[#F79421]",
  low: "bg-[#FEFAE5] text-[#F5D11E]",
};

const Tag = ({ text }) => {
  return (
    <div className={`${options[text]} text-center px-3 py-0.5 mx-auto w-fit`}>
      {text}
    </div>
  );
};

const Content = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
        <BasicTable
          type={"medicalVitalSigns"}
          defaultPageSize={10}
          columns={columns}
          data={data}
        />
    </>
  );
};

function MedicalVitalSigns({clientId}) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([
    {
      measure: "Blood Pressure (Syst/Diast)",
      date_time: "...",
    },
    {
      measure: "Heart Rate (Beats per minute)",
      date_time: "...",
    },
    {
      measure: "Respiration (Breaths per minute)",
      date_time: "...",
    },
    {
      measure: "Blood Pressure (Syst/Diast)",
      date_time: "...",
    },
    {
      measure: "Heart Rate (Beats per minute)",
      date_time: "...",
    },
    {
      measure: "Respiration (Breaths per minute)",
      date_time: "...",
    },
    {
      measure: "Blood Pressure (Syst/Diast)",
      date_time: "...",
    },
    {
      measure: "Respiration (Breaths per minute)",
      date_time: "...",
    },
    {
      measure: "Heart Rate (Beats per minute)",
      date_time: "...",
    },
    {
      measure: "Respiration (Breaths per minute)",
      date_time: "...",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Measure",
        accessor: "measure",
        align: "left",
      },
      {
        Header: "Date/Time",
        accessor: "date_time",
      },
      {
        Header: "Date/Time",
        Cell: ({ row }) => (
            "..."
        )
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
          <div className="text-[#28293B] text-xl">Medical Vital Signs <span className="italic text-xs">[from AMD]</span></div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <RemoveCircleIcon
          onClick={() => setOpen(!open)}
          className="text-[#585A60] hover:cursor-pointer"
        />
      </div>
      {open && <Content data={data} columns={columns} />}
    </div>
  );
}

export default MedicalVitalSigns;
