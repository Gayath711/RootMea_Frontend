import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link } from "react-router-dom";

function PageTitle({ clientId, title }) {
  return (
    <div className="flex justify-between">
      <div className="text-2xl font-medium">{title}</div>
      <button className="p-1 bg-[#EAECEB]">
        <Link to="/">
          <ReplyIcon className="px-auto py-auto" />
        </Link>
      </button>
    </div>
  );
}

export default PageTitle;
