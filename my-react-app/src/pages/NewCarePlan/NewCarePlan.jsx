import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputElement from "../../components/dynamicform/FormElements/InputElement";
import ProfilePicture from "../../image/profile_picture.svg";
import SelectElement from "../../components/dynamicform/FormElements/SelectElement";
import TextAreaElement from "../../components/dynamicform/FormElements/TextAreaElement";
import DateInput from "../../components/common/DateInput";
import FormLabel from "../../components/dynamicform/FormElements/FormLabel";
function FormWrapper({ children, label }) {
  return (
    <div className="rounded-[6px] bg-white">
      <div className="w-full px-3 py-2.5 border-b border-spacing-1 text-xl font-medium">
        {label}
      </div>
      <div className="px-4 py-3 grid grid-cols-11 gap-x-3">{children}</div>
    </div>
  );
}
function AddNewElement({ label, button, required, className }) {
  return (
    <div
      className={`flex rounded-[5px] justify-between items-center p-3 m-1 ${className}`}
    >
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <button className="px-4 py-2 bg-[#2F9384] text-sm text-white rounded-[3px]">
        {button}
      </button>
    </div>
  );
}

function FormButtonWrapper({ children, label, button }) {
  return (
    <div className="rounded-[6px] bg-white shadow">
      <div className="w-full px-3 py-2.5 border-b border-spacing-1 text-xl font-medium flex justify-between">
        {label}
        {button ? (
          <button className="px-4 py-2 bg-[#2F9384] text-sm text-white rounded-[3px]">
            {button}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="px-4 py-3 grid grid-cols-12 gap-x-3">{children}</div>
    </div>
  );
}

const TheNewCarePlan = () => {
  return (
    <div className="mx-1" style={{ fontFamily: "poppins" }}>
      <PageTitle title="Care Plan" onClick={() => {}} />
      <div className="rounded-[5px] my-6">
        <div className="grid gap-y-8">
          <FormWrapper label="Client care plan details">
            <div className="col-span-3">
              <InputElement
                type="text"
                value={"Lucas David"}
                disabled
                className=""
                placeholder="Enter Client Name"
                label={"Client Name"}
              />
            </div>
            <div className="col-span-3">
              <InputElement
                type="text"
                value={"He"}
                disabled
                className=""
                placeholder="Enter Preferred pronouns"
                label={"Preferred pronouns"}
              />
            </div>
            <div className="col-span-3">
              <DateInput
                value={""}
                dateFormat="MM-dd-yyyy"
                className=" h-[37.6px]"
                isEdittable
                height="37.6px"
                label="Date of birth"
              />
            </div>
            <div className="col-span-2 row-span-2 ml-8 flex justify-center items-center">
              <img
                src={ProfilePicture}
                className="w-full"
                alt="profile_picture"
              />
            </div>
            <div className="col-span-3">
              <InputElement
                type="text"
                value={"54321a"}
                disabled
                className=""
                placeholder="Enter System Id"
                label={"System Id"}
              />
            </div>
            <div className="col-span-3">
              <InputElement
                type="text"
                value={"807811280"}
                disabled
                className=""
                placeholder="Enter Primary phone"
                label={"Primary phone"}
              />
            </div>
            <div className="col-span-3">
              <InputElement
                type="text"
                value={"Lucas1@roots.org"}
                disabled
                className=""
                placeholder="Enter Email"
                label={"Email"}
              />
            </div>
          </FormWrapper>
        </div>
      </div>
      <div className="rounded-[5px] my-6 bg-white">
        <div className="flex gap-3 p-4 flex-wrap">
          <button className="bg-[#5BC4BF] text-white p-2 w-[200px] font-normal text-base rounded-sm">
            GOAL 1
          </button>
          <button className="border border-[#5BC4BF] w-[200px] font-normal text-base rounded-sm">
            CARE PLAN STATUS
          </button>
        </div>
        <div className="grid m-6">
          <FormButtonWrapper label="Goal 1" button={"Add new"}>
            <div className="col-span-6">
              <DateInput
                value={""}
                dateFormat="MM-dd-yyyy"
                className="m-1 h-[37.6px] border-keppel"
                height="37.6px"
                label={"Start Date"}
                // placeholder="DOB"
              />
            </div>
            <div className="col-span-6 flex items-end">
              <InputElement
                type="text"
                value={""}
                width={"w-full"}
                className="border-keppel "
                placeholder="Problem"
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={""}
                onChange={() => {}}
                placeholder="SMART Goal Summary"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Goal Priority"
                className="border border-[#5BC4BF] border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Stage of Readiness"
                className="border border-[#5BC4BF] border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={""}
                onChange={() => {}}
                placeholder="Client Strengths"
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={""}
                onChange={() => {}}
                placeholder="Potential Barriers"
              />
            </div>
            <div className="col-span-12">
              <AddNewElement
                className="border border-keppel"
                label="Interventions"
                button={"Add new"}
              />
            </div>
          </FormButtonWrapper>
        </div>
        <div className="grid m-6">
          <FormButtonWrapper label={"Goal 1 Outcome"}>
            <div className="col-span-6">
              <SelectElement
                placeholder="Status"
                className="border border-[#5BC4BF] border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-6">
              <DateInput
                value={""}
                placeholder="Stage of Readiness"
                dateFormat="MM-dd-yyyy"
                className="m-1  h-[37.6px] border-keppel"
                height="37.6px"
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={""}
                onChange={() => {}}
                placeholder="Custom Sections / Fields"
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={""}
                onChange={() => {}}
                placeholder="Comments"
              />
            </div>
          </FormButtonWrapper>
          <div className="text-center my-3">
            <button className="bg-[#C4EBEF] px-5 py-3 m-2 rounded-sm text-lg">
              Request Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheNewCarePlan;
