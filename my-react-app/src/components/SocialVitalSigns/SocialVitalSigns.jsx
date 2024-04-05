import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSocialVitalSignsAsync } from "../../store/slices/socialVitalSignsSlice";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EyeIcon from "../images/eye.svg";

const options = {
  High: "bg-[#FFE5E5] text-[#E0382D]",
  Medium: "bg-[#FEE4D0] text-[#F79421]",
  Low: "bg-[#FEFAE5] text-[#F5D11E]",
  No: "bg-[#E9FEFB] text-[#2F9384]",
  Yes: "bg-[#FFE5E5] text-[#FF0A0A]",
};

const Tag = ({ text }) => {
  return (
    <div
      className={`${options[text]} text-center text-xs px-3 py-0.5 mx-auto w-fit`}
    >
      {text}
    </div>
  );
};

const Content = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <div className="flex-grow flex flex-col">
      <hr className="w-[99%] mx-auto text-[#bababa] flex-grow-0" />
      <BasicTable
        type={"socialVitalSigns"}
        defaultPageSize={10}
        columns={columns}
        data={data}
      />
    </div>
  );
};

function SocialVitalSigns({ clientId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.socialVitalSigns.data);
  const dataLoading = useSelector((state) => state.socialVitalSigns.loading);

  useState(() => {
    if (!dataLoading) {
      dispatch(fetchSocialVitalSignsAsync({ clientId }));
    }
  }, []);

  const [open, setOpen] = useState(true);
  // const [data, setData] = useState([
  //   {
  //     domain: "Housing",
  //     risk: "high",
  //     last_assessed: "1-1-2000",
  //   },
  //   {
  //     domain: "Communication and Mobility",
  //     risk: "medium",
  //     last_assessed: "5-1-2000",
  //   },
  //   {
  //     domain: "Education/Employment",
  //     risk: "high",
  //     last_assessed: "4-1-2000",
  //   },
  //   {
  //     domain: "Housing",
  //     risk: "high",
  //     last_assessed: "1-1-2000",
  //   },
  //   {
  //     domain: "Communication and Mobility",
  //     risk: "medium",
  //     last_assessed: "5-1-2000",
  //   },
  //   {
  //     domain: "Education/Employment",
  //     risk: "low",
  //     last_assessed: "4-1-2000",
  //   },
  //   {
  //     domain: "Housing",
  //     risk: "high",
  //     last_assessed: "1-1-2000",
  //   },
  //   {
  //     domain: "Communication and Mobility",
  //     risk: "medium",
  //     last_assessed: "5-1-2000",
  //   },
  //   {
  //     domain: "Education/Employment",
  //     risk: "low",
  //     last_assessed: "4-1-2000",
  //   },
  //   {
  //     domain: "Communication and Mobility",
  //     risk: "medium",
  //     last_assessed: "5-1-2000",
  //   },
  // ]);

  const columns = useMemo(
    () => [
      {
        Header: "Domain",
        accessor: "domain",
        align: "left",
      },
      {
        Header: "Risk",
        Cell: ({ row }) => <Tag text={row.original.risk} />,
      },
      {
        Header: "Last Assessed",
        accessor: "last_assessed",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <Link
            to={`/socialvitalsigns/${row.original.id}`}
            state={`${row.original.domain}`}
          >
            <img src={EyeIcon} className="size-4 mx-auto" alt="view" />
          </Link>
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
          <div className="text-[#28293B] text-xl">Social Vital Signs</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <Link
            to={"/add-new-socialvitalsigns"}
            className="px-3 py-2 text-sm bg-[#5BC4BF] text-white rounded-sm
            font-medium"
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

export default SocialVitalSigns;
