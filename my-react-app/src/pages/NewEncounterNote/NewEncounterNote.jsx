import React, { useCallback, useEffect, useState } from "react";
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
import { protectedApi } from "../../services/api";
import { notifyError } from "../../helper/toastNotication";
import { set, useForm } from "react-hook-form";

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

function convertToTimeString(date) {
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    (date.getSeconds() < 9 ? date.getSeconds() : "0" + date.getSeconds())
  );
}

async function fetchClientDetails({ clientId }) {
  try {
    if (clientId === undefined) {
      notifyError("Client ID is required");
    }
    const respone = await protectedApi.get(
      `/encounter-note-client-details/?id=${clientId}`
    );

    if (respone.status === 200) {
      return respone.data;
    }
  } catch (error) {
    console.error(error.message);
  }
}

function NewEncounterNote() {
  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [forms, setForms] = useState([]);
  const [carePlans, setCarePlans] = useState([]);
  const [formData, setFormData] = useState({ client_id: clientId });

  const handleFormDataChange = useCallback(
    (fieldName, value) => {
      setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    },
    [formData]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    fetchClientDetails({ clientId })
      .then((clientDetailsResponse) => {
        if (clientDetails?.date_of_birth) {
          const splitDate = clientDetailsResponse.date_of_birth.split("-");
          if (splitDate.length === 3) {
            clientDetailsResponse.date_of_birth = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
          }
        }
        setClientDetails(clientDetailsResponse);
        console.log(clientDetailsResponse);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleCreate = useCallback(async () => {
    const {
      staff_name,
      facility,
      encounter_date,
      start_time,
      end_time,
      encounter_type,
      program,
      note_template,
      custom_fields,
      encounter_summary,
      forms,
      care_plans,
      signed_by,
      uploaded_documents,
    } = formData;
    const formDataPayload = new FormData();
    formDataPayload.append("client_id", Number(clientId));
    formDataPayload.append("system_id", 12345);
    formDataPayload.append("staff_name", staff_name);
    formDataPayload.append("facility", facility);
    formDataPayload.append("encounter_date", encounter_date);
    formDataPayload.append("start_time", start_time);
    formDataPayload.append("end_time", end_time);
    formDataPayload.append("encounter_type", encounter_type);
    formDataPayload.append("program", program);
    formDataPayload.append("note_template", note_template);
    formDataPayload.append("custom_fields", custom_fields);
    formDataPayload.append("encounter_summary", encounter_summary);
    formDataPayload.append("forms", forms);
    formDataPayload.append("care_plans", care_plans);
    formDataPayload.append("signed_by", signed_by);
    formDataPayload.append("uploaded_documents", uploaded_documents);

    try {
      const response = await protectedApi.post("/encounter-notes/", formDataPayload);
      console.log(response.status, response.data);
    } catch (error) {
      console.error(error);
    }
  }, [formData]);

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
                value={
                  clientDetails?.first_name + " " + clientDetails?.last_name
                }
                disabled
                className="border-keppel"
                placeholder="Enter Client Name"
              />
            </div>
            <div className="col-span-6">
              <DateInput
                value={clientDetails?.date_of_birth | ""}
                placeholder="DOB"
                isEdittable
                className="m-1 border-keppel h-[37.6px]"
                height="37.6px"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Preferred Pronouns"
                className="border-keppel"
                disabled
                value={clientDetails?.preferred_pronouns || ""}
                options={[clientDetails?.preferred_pronouns || ""]}
              />
            </div>
            <div className="col-span-6">
              <InputElement
                type="text"
                value={clientDetails?.primary_phone || ""}
                disabled
                className="border-keppel w-full"
                placeholder="Enter a phone number"
              />
            </div>
            <div className="col-span-6">
              <InputElement
                type="text"
                value={clientDetails?.email_address || ""}
                disabled
                className="border-keppel"
                placeholder="Enter Email"
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Encounter Details">
            <div className="col-span-6">
              <InputElement
                type="text"
                value={"Temporary User"}
                className="border-keppel"
                placeholder="User Name"
                disabled
              />
            </div>
            <div className="col-span-6">
              <DateInput
                placeholder="Encounter Date"
                className="m-1 border-keppel"
                value={formData?.encounter_date || ""}
                handleChange={(date) =>
                  handleFormDataChange("encounter_date", date)
                }
                height="37.6px"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Facility"
                onChange={(e) =>
                  handleFormDataChange("facility", e.target.value)
                }
                className="border-keppel"
                value={formData?.facility || ""}
                options={["Facility 1", "Facility 2", "Facility 3"]}
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="Start Time"
                value={startTime}
                selectedDate={formData?.encounter_date || null}
                handleChange={(value) => {
                  setStartTime(value);
                  handleFormDataChange(
                    "start_time",
                    convertToTimeString(value)
                  );
                }}
                className="m-1 w-full border-keppel"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Encounter Mode"
                className="border-keppel"
                value={formData?.encounter_type || ""}
                onChange={(e) =>
                  handleFormDataChange("encounter_type", e.target.value)
                }
                options={[
                  "Office Encounter",
                  "Video Encounter",
                  "Phone Encounter",
                  "Street Visit for Unhoused Client",
                  "Street Visit for Housed Client",
                  "Home Visit",
                  "Hospital/Shelter/Other Facility Visit",
                  "Care Coordination (client not involved)",
                  "Case Conference/Review (client not involved)",
                  "E-mail",
                  "Letter",
                ]}
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="End Time"
                value={endTime}
                selectedDate={formData?.encounter_date || null}
                handleChange={(value) => {
                  setEndTime(value);
                  handleFormDataChange("end_time", convertToTimeString(value));
                }}
                className="m-1 w-full border-keppel"
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Program"
                className="border-keppel"
                value={formData?.program || ""}
                onChange={(e) =>
                  handleFormDataChange("program", e.target.value)
                }
                options={["STOMP", "ECM", "Diabetes"]}
              />
            </div>
            <div className="col-span-6">
              <SelectElement
                placeholder="Note Template"
                className="border-keppel"
                value={formData?.note_template || ""}
                onChange={(e) =>
                  handleFormDataChange("note_template", e.target.value)
                }
                options={[
                  "ECM Enabling Service",
                  "Program Intake",
                  "Progress Note",
                  "Reassessment",
                  "A1c Outreach",
                  "STRIVE Encounter",
                ]}
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Custom Fields">
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={formData?.custom_fields || ""}
                onChange={(e) =>
                  handleFormDataChange("custom_fields", e.target.value)
                }
                placeholder="Loreipusum..."
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Encounter Summary">
            <div className="col-span-12">
              <SelectElement
                placeholder="Select note text Template"
                className="border-keppel"
                value={formData?.encounter_summary_text_template || ""}
                onChange={(e) =>
                  handleFormDataChange(
                    "encounter_summary_text_template",
                    e.target.value
                  )
                }
                options={["Template 1", "Template 2", "Template 3"]}
              />
            </div>
            <div className="col-span-12">
              <TextAreaElement
                className="h-32 border-keppel"
                value={formData?.encounter_summary || ""}
                onChange={(e) =>
                  handleFormDataChange("encounter_summary", e.target.value)
                }
                placeholder="Enter Encounter Summary"
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Forms and Authority">
            <div className="col-span-6">
              <MultiSelectElement
                className="border-keppel"
                placeholder="Select forms"
                value={forms || []}
                onChange={(data) => {
                  setForms(data);
                  handleFormDataChange(
                    "forms",
                    data.map((d) => d.value)
                  );
                }}
                options={["Form 1", "Form 2", "Form 3"]}
              />
            </div>
            <div className="col-span-6">
              <MultiSelectElement
                className="border-keppel"
                placeholder="Care Plans"
                value={carePlans || []}
                onChange={(data) => {
                  setCarePlans(data);
                  handleFormDataChange(
                    "care_plans",
                    data.map((d) => d.value)
                  );
                }}
                options={["Care Plan 1", "Care Plan 2", "Care Plan 3"]}
              />
            </div>
            <div className="col-span-12">
              <FileInput
                title="Upload Documents"
                className="border-keppel m-1 w-full"
                formData={formData}
                files={formData?.uploaded_documents || []}
                setFiles={useCallback(
                  (files) => {
                    console.log(formData, files);
                    setFormData({ ...formData, uploaded_documents: files });
                  },
                  [formData]
                )}
              />
            </div>
            <div className="col-span-12">
              <SignInput
                signs={formData?.signed_by || []}
                user={"User 1"}
                setSigns={(signs) => handleFormDataChange("signed_by", signs)}
                className="border-keppel m-1"
              />
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
          <button onClick={handleCreate} className="border border-keppel rounded-[3px] bg-[#5BC4BF] text-white w-32 py-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEncounterNote;
