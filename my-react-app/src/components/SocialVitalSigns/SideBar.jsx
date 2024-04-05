import React from "react";

import NextIcon from "../images/next.svg";

function SideBar({
  contentToShow,
  setContentToShow,
  currentStage,
  stages,
  handleStage,
}) {
  return (
    <div className="bg-white flex flex-col border-1 border-[#5BC4BF] py-2 rounded">
      {stages.map((stage, idx) => {
        return (
          <div
            key={idx}
            id={stage.stageIndex}
            className={`flex flex-row justify-between items-center p-3 hover:cursor-pointer ${
              currentStage.title === stage.title ? "text-[#5BC4BF]" : ""
            }`}
            onClick={() => handleStage(stage.stageIndex)}
          >
            <div className="text-xs font-normal">{stage.title}</div>
            <div>
              <img src={NextIcon} className="mx-auto opacity-50" alt="next" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
