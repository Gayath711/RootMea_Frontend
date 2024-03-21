import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClientInfoAsync } from "../../store/slices/clientInfoSlice";
import SearchIcon from "@mui/icons-material/Search";
import Icon1 from "../images/ClientChartTopBarIcon1.svg";
import Icon2 from "../images/ClientChartTopBarIcon2.svg";
import { useState } from "react";
import {Link} from "react-router-dom";

function ClientChartTopBar({clientId}) {

  const dispatch = useDispatch();
  const data = useSelector(state => state.clientInfo.data);
  const dataLoading = useSelector(state => state.clientInfo.loading);

  useState(() => {
    if (!dataLoading) {
      dispatch(fetchClientInfoAsync({clientId}))
    }
  }, [])

  return (
    <div className="w-full bg-white border border-white shadow-sm rounded-md flex justify-between items-center p-3">
      <div className="flex space-x-6 items-center">
        <div className="text-[#28293B] text-xl font-medium">{data?.first_name} {data?.last_name}</div>
        <img src={Icon1} className="size-5" alt="icon1" />
        <img src={Icon2} className="size-5" alt="icon2" />
      </div>
      <div className="flex space-x-2 p-1 bg-gradient-to-b from-white to-[#EAECEB4D]">
        <SearchIcon className="text-[#00000026]" />
        <input
          type="text"
          placeholder="Search your clients"
          className="bg-transparent text-[#00000026] text-sm"
        />
      </div>
      <div className="flex items-center gap-x-8 text-sm">
        <Link to="/">
        <a href="#" className="text-[#43B09C]">Dashboard</a>
        </Link>
        <Link to={`/clientprofile/${data?.id}`}>
        <a href="#" className="text-[#43B09C]">Client Profile</a>
        </Link>
        <a href="#" className="text-[#43B09C]">Assignments & Referrals</a>
      </div>
    </div>
  );
}

export default ClientChartTopBar;
