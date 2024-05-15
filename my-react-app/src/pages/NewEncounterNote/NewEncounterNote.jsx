import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useParams } from "react-router-dom";
import InputElement from "../../components/dynamicform/FormElements/InputElement";
import DateInput from "../../components/common/DateInput";
import SelectElement from "../../components/dynamicform/FormElements/SelectElement";
import TimeInput from "../../components/common/TimeInput";
import "./NewEncounterNoteStyles.css";
import TextAreaElement from "../../components/dynamicform/FormElements/TextAreaElement";
import MultiSelectElement from "../../components/dynamicform/FormElements/MultiSelectElement";
import FileInput from "../../components/dynamicform/FormElements/FileInput";
import SignInput from "../../components/dynamicform/FormElements/SignInput";

function FormWrapper({ children, label }) {
  return (
    <div className="rounded-[6px] border border-keppel">
      <div className="w-full px-3 py-2.5 border-b border-keppel text-xl font-medium">
        {label}
      </div>
      <div className="px-4 py-3 grid grid-cols-12 gap-x-3 gap-y-3">
        {children}
      </div>
    </div>
  );
}

function NewEncounterNote() {
  const { clientId } = useParams();
  return (
    <div className="mx-1" style={{ fontFamily: "poppins" }}>
      <PageTitle clientId={clientId} title="Encounter" />
      <div className="border border-keppel rounded-[5px] my-6 bg-white !important">
        {/* Component Header */}
        <div className="flex justify-between items-center px-6 font-medium text-xl text-white bg-[#5bc4bf] py-3">
          <div>Encounter CLient Profile</div>
          <div>System ID:1234568</div>
        </div>

        {/* Component Body */}
        <div className="px-4 py-4 grid gap-y-8">
          <FormWrapper label="Client Details">
            <div className="col-span-6">
              <InputElement
                type="text"
                value="Anthony"
                className="border-keppel"
                placeholder="Enter Client Name"
              />
            </div>
            <div className="col-span-6">
              <DateInput
                value="07/05/2022"
                placeholder="DOB"
                className="m-1 border-keppel h-[37.6px]"
                height="37.6px"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Preferred Pronouns"
                className="border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-6">
              <InputElement
                type="text"
                value="987 654 3210"
                className="border-keppel w-full"
                placeholder="Enter a phone number"
              />
            </div>
            <div className="col-span-6">
              <InputElement
                type="text"
                className="border-keppel"
                placeholder="Enter Email"
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Encounter Details">
            <div className="col-span-6">
              <InputElement
                type="text"
                className="border-keppel"
                placeholder="User Name"
              />
            </div>
            <div className="col-span-6">
              <DateInput
                placeholder="Encounter Date"
                className="m-1 border-keppel"
                height="37.6px"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Facility"
                className="border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="Start Time"
                className="m-1 w-full border-keppel"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Encounter Mode"
                className="border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="End Time"
                className="m-1 w-full border-keppel"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Program"
                className="border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Note Template"
                className="border-keppel"
                value={""}
                options={[]}
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Custom Fields">
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                placeholder="Loreipusum..."
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Encounter Summary">
            <div className="col-span-12">
              <SelectElement
                placeholder="Select note text Template"
                className="border-keppel"
                value={""}
                options={[]}
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                placeholder="Enter Encounter Summary"
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Forms and Authority">
            <div className="col-span-6">
              <MultiSelectElement
                className="border-keppel"
                placeholder="Select forms"
                options={[]}
                value={[]}
              />
            </div>
            <div className="col-span-6">
              <MultiSelectElement
                className="border-keppel"
                placeholder="Care Plans"
                options={[]}
                value={[]}
              />
            </div>
            <div className="col-span-12">
              <FileInput title="Upload Documents" className="border-keppel m-1 w-full" />
            </div>
            <div className="col-span-12">
              <SignInput className="border-keppel m-1" />
            </div>
          </FormWrapper>

          <FormWrapper label="Billing Details">
            <div className="col-span-4">
                <InputElement
                    type="text"
                    className="border-keppel"
                    placeholder="Billing Status"
                />
            </div>
            <div className="col-span-4">
                <InputElement
                    type="text"
                    className="border-keppel"
                    placeholder="Username"
                />
            </div>
            <div className="col-span-4">
                <InputElement
                    type="text"
                    className="border-keppel"
                    placeholder="date/time"
                />
            </div>
            <div className="col-span-4">
                <InputElement
                    type="text"
                    className="border-keppel"
                    placeholder="Billing Status Comments"
                />
            </div>
            <div className="col-span-4">
                <InputElement
                    type="text"
                    className="border-keppel"
                    placeholder="Username"
                />
            </div>
            <div className="col-span-4">
                <InputElement
                    type="text"
                    className="border-keppel"
                    placeholder="date/time"
                />
            </div>
            </FormWrapper>
        </div>
      <div className="mx-auto flex justify-center items-center gap-x-4 my-8">
        <button className="border border-keppel rounded-[3px] text-[#5BC4BF] w-32 py-2">
          Cancel
        </button>
        <button className="border border-keppel rounded-[3px] bg-[#5BC4BF] text-white w-32 py-2">
          Save
        </button>
      </div>
      </div>
    </div>
  );
}

export default NewEncounterNote;
