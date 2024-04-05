import React from "react";
import { useState } from "react";

import NextIcon from "../images/next.svg";

function SvsQAContent({
  title,
  questions,
  goToPreviousStage,
  goToNextStage,
  isStart,
  isEnd,
}) {
  const [open, setOpen] = useState({});

  const [answers, setAnswers] = useState({});

  const handleInputChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const toggleOpen = (index) => {
    setOpen((prev) => {
      return { ...prev, [index]: !prev[index] };
    });
  };

  return (
    <div className="bg-white flex flex-col border-1 border-[#5BC4BF] rounded">
      <div className="bg-[#89D6DE] bg-opacity-50 px-4 py-2 border-b border-[#5BC4BF]">
        {title}
      </div>
      {questions.map((question, index) => (
        <div className="flex flex-col border-1 border-[#5BC4BF] m-4 rounded">
          <div
            key={index}
            className={`flex flex-row justify-between items-center rounded-t ${
              open[index] ? "bg-[#89D6DE]" : ""
            } bg-opacity-50`}
          >
            <div className="p-3 text-xs text-wrap w-[80%]">
              {question.question}
            </div>
            <div>
              <img
                src={NextIcon}
                onClick={() => toggleOpen(index)}
                className={`mx-auto opacity-50 ${
                  open[index] ? "-rotate-90" : "rotate-90"
                } p-2 hover:cursor-pointer`}
                alt="next"
              />
            </div>
          </div>

          {open[index] && (
            <>
              <div className="w-[99.99%] mx-auto border-b border-[#5BC4BF] " />
              <div className="p-3 text-xs">
                <form>
                  <div className="flex flex-column gap-2">
                    {question.inputType === "Radio" &&
                      question.options.map((option) => (
                        <RadioInput
                          key={option}
                          id={`${question.id}-${option}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() =>
                            handleInputChange(question.id, option)
                          }
                          label={option}
                        />
                      ))}
                    {question.inputType === "Text" && (
                      <TextInput
                        id={question.id}
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleInputChange(question.id, e.target.value)
                        }
                        placeholder={question.question}
                      />
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="flex items-center justify-center gap-3 my-8">
        <button
          disabled={isStart}
          onClick={goToPreviousStage}
          className={`${
            isStart
              ? "bg-opacity-75 border-slate-300 text-slate-300"
              : "border-[#2F9384] text-[#2F9384]"
          } w-[152px] h-[35px] px-3 py-1 border-1 sm:border-2 rounded-sm text-[13px] font-medium leading-5`}
        >
          Previous
        </button>
        {isEnd ? (
          <button
            onClick={() => {}}
            className=" w-[152px] h-[35px] px-3 py-1 text-[13px] font-medium leading-5 bg-[#5BC4BF] text-white rounded-sm font-medium"
          >
            Submit
          </button>
        ) : (
          <button
            disabled={isEnd}
            onClick={goToNextStage}
            className=" w-[152px] h-[35px] px-3 py-1 text-[13px] font-medium leading-5 bg-[#5BC4BF] text-white rounded-sm font-medium"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default SvsQAContent;

const RadioInput = ({ id, value, checked, onChange, label }) => {
  return (
    <div className="flex gap-2 items-center accent-teal-500">
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="text-xs" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

const TextInput = ({ id, value, onChange, placeholder = "" }) => {
  return (
    <div>
      <input
        className="form-control px-3 py-2 text-xs placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-400 focus:border-teal-400"
        type="text"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
