"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import CautionIcon from "../images/cautionIcon.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LineUpTeal from "../images/lineUpTeal.svg"

const data = [
  { value: 10, label: "High", color: "#1F4B51" },
  { value: 10, label: "Low", color: "#89D6DE" },
  { value: 15, label: "Medium", color: "#2F9384" },
];

const size = {
  width: 360,
  height: 100,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 15,
  color: "#1F4B51",
  fontWeight: "500",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const SocialVital = () => {
  return (
    <div className="bg-white w-full rounded-md shadow-md">
      <div className="flex justify-between items-center px-4 my-2">
        <div className="text-lg font-medium">Social Vital Signs</div>
        <button className="flex justify-center items-center space-x-2 border border-[#2F9384] px-2 py-0.5 rounded-sm">
          <span className="text-[#2F9384] text-sm ">Year</span>
          <ExpandMoreIcon className="text-[#2F9384]" />
        </button>
      </div>
      <hr className="w-11/12 mx-auto my-2" />
      <div className="mt-4 flex justify-around">
        <PieChart
          series={[{ data, innerRadius: 30, startAngle: 0 }]}
          {...size}
          margin={{ top: 0, right: 180, bottom: 0, left: 0 }}
          sx={{
            width: "100% !important",
            height: "auto",
          }}
        >
          <PieCenterLabel>100%</PieCenterLabel>
        </PieChart>
      </div>
      <div className="flex justify-around items-center mx-6 my-3">
        <div className="flex items-center">
          <img src={LineUpTeal} className="size-4 mx-1" alt="lineup" />
          <div className="text-xs">
            <span className="text-[#43B09C]">28% </span>vs Last Year
          </div>
          <img src={CautionIcon} className="size-5 mx-2" alt="client" />
        </div>
            <button className="px-3 text-white py-1 font-medium text-sm bg-[#7397B5] rounded-sm">View Details</button>
      </div>
    </div>
  );
};

export default SocialVital;
