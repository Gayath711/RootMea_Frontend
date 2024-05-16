import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
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
import { notifyError, notifySuccess } from "../../helper/toastNotication";
import DropDown from "../../components/common/Dropdown";
import { format } from "date-fns";

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
  const [formData, setFormData] = useState({
    client_id: clientId,
    staff_name: "Temporary User",
  });

  const navigate = useNavigate();

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

  const disableSubmit = useMemo(() => {
    return (
      !formData?.staff_name ||
      !formData?.encounter_date ||
      !formData?.facility ||
      !formData?.start_time ||
      !formData?.encounter_type ||
      !formData?.end_time ||
      !formData?.encounter_status ||
      !formData?.program ||
      !formData?.note_template
    );
  }, [formData]);

  const handleCreate = useCallback(async () => {
    const {
      staff_name,
      facility,
      encounter_date,
      start_time,
      end_time,
      encounter_status,
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
    clientId && formDataPayload.append("client_id", Number(clientId));
    formDataPayload.append("system_id", 12345);
    staff_name && formDataPayload.append("staff_name", staff_name);
    facility && formDataPayload.append("facility", facility);
    encounter_date && formDataPayload.append("encounter_date", encounter_date);
    startTime && formDataPayload.append("start_time", start_time);
    endTime && formDataPayload.append("end_time", end_time);
    encounter_status && formDataPayload.append("encounter_status", encounter_status);
    encounter_type && formDataPayload.append("encounter_type", encounter_type);
    program && formDataPayload.append("program", program);
    note_template && formDataPayload.append("note_template", note_template);
    custom_fields &&
      formDataPayload.append(
        "custom_fields",
        JSON.stringify(custom_fields || [])
      );
    encounter_summary &&
      formDataPayload.append("encounter_summary", encounter_summary);
    forms && formDataPayload.append("forms", JSON.stringify(forms));
    care_plans &&
      formDataPayload.append("care_plans", JSON.stringify(care_plans || []));
    signed_by &&
      formDataPayload.append("signed_by", JSON.stringify(signed_by || []));
    for (let i = 0; i < uploaded_documents?.length; i++) {
      formDataPayload.append("uploaded_documents", uploaded_documents[i]);
    }

    try {
      const response = await protectedApi.post(
        "/encounter-notes/",
        formDataPayload
      );
      if (response.status === 201) {
        setFormData({ client_id: clientId, staff_name: "Temporary User" });
        setCarePlans([]);
        setForms([]);
        setStartTime(null);
        setEndTime(null);
        notifySuccess("Encounter Note created successfully");
        navigate(`/clientchart/${clientId}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [formData]);

  return (
    <div className="mx-1" style={{ fontFamily: "poppins" }}>
      <PageTitle
        clientId={clientId}
        title="Encounter"
        onClick={() => navigate(`/clientchart/${clientId}`)}
      />
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
                value={clientDetails?.date_of_birth ? format(clientDetails?.date_of_birth, "MM-dd-yyyy") : ""}
                placeholder="DOB"
                dateFormat="MM-dd-yyyy"
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
                value={formData?.staff_name || ""}
                className="border-keppel"
                placeholder="User Name *"
                disabled
              />
            </div>
            <div className="col-span-6">
              <DateInput
                placeholder="Encounter Date *"
                className="m-1 border-keppel"
                dateFormat="MM-dd-yyyy"
                value={formData?.encounter_date ? format(formData?.encounter_date, "MM-dd-yyyy") : ""}
                handleChange={(date) =>
                  handleFormDataChange("encounter_date", date)
                }
                height="37.6px"
              />
            </div>
            <div className="col-span-6">
              <DropDown
                name="facility"
                placeholder="Facility *"
                handleChange={(data) =>
                  handleFormDataChange("facility", data.value)
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={[
                  { label: "Facility 1", value: "Facility 1" },
                  { label: "Facility 2", value: "Facility 2" },
                  { label: "Facility 3", value: "Facility 3" },
                ]}
                selectedOption={formData?.facility || ""}
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="Start Time *"
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
              <DropDown
                name="encounter_type"
                placeholder="Encounter Mode *"
                handleChange={(data) =>
                  handleFormDataChange("encounter_type", data.value)
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={[
                  { label: "Office Encounter", value: "Office Encounter" },
                  { label: "Video Encounter", value: "Video Encounter" },
                  { label: "Phone Encounter", value: "Phone Encounter" },
                  {
                    label: "Street Visit for Unhoused Client",
                    value: "Street Visit for Unhoused Client",
                  },
                  {
                    label: "Street Visit for Housed Client",
                    value: "Street Visit for Housed Client",
                  },
                  { label: "Home Visit", value: "Home Visit" },
                  {
                    label: "Hospital/Shelter/Other Facility Visit",
                    value: "Hospital/Shelter/Other Facility Visit",
                  },
                  {
                    label: "Care Coordination (client not involved)",
                    value: "Care Coordination (client not involved)",
                  },
                  {
                    label: "Case Conference/Review (client not involved)",
                    value: "Case Conference/Review (client not involved)",
                  },
                  { label: "E-mail", value: "E-mail" },
                  { label: "Letter", value: "Letter" },
                ]}
                selectedOption={formData?.encounter_type || ""}
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="End Time *"
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
              <DropDown
                name="encounter_status"
                placeholder="Encounter Status *"
                handleChange={(data) =>
                  handleFormDataChange("encounter_status", data.value)
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={[
                  { label: "Complete", value: "Complete" },
                  {
                    label: "Partial or Interrupted",
                    value: "Partial or Interrupted",
                  },
                  {
                    label: "No answer or bad number",
                    value: "No answer or bad number",
                  },
                  {
                    label: "No-Show or did not find client",
                    value: "No-Show or did not find client",
                  },
                ]}
                selectedOption={formData?.encounter_status || ""}
              />
            </div>
            <div className="col-span-6">
              <DropDown
                name="program"
                placeholder="Program *"
                handleChange={(data) =>
                  handleFormDataChange("program", data.value)
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={[
                  { label: "STOMP", value: "STOMP" },
                  { label: "ECM", value: "ECM" },
                  { label: "Diabetes", value: "Diabetes" },
                ]}
                selectedOption={formData?.program || ""}
              />
            </div>
            <div className="col-span-6">
              <DropDown
                name="note_template"
                placeholder="Note Template *"
                handleChange={(data) =>
                  handleFormDataChange("note_template", data.value)
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={[
                  {
                    label: "ECM Enabling Service",
                    value: "ECM Enabling Service",
                  },
                  { label: "Program Intake", value: "Program Intake" },
                  { label: "Progress Note", value: "Progress Note" },
                  { label: "Reassessment", value: "Reassessment" },
                  { label: "A1c Outreach", value: "A1c Outreach" },
                  { label: "STRIVE Encounter", value: "STRIVE Encounter" },
                ]}
                selectedOption={formData?.note_template || ""}
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
              <DropDown
                name="encounter_summary_text_template"
                placeholder="Select note text Template *"
                handleChange={(data) =>
                  handleFormDataChange(
                    "encounter_summary_text_template",
                    data.value
                  )
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={[
                  { label: "Template 1", value: "Template 1" },
                  { label: "Template 2", value: "Template 2" },
                  { label: "Template 3", value: "Template 3" },
                ]}
                selectedOption={formData?.encounter_summary_text_template || ""}
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
          <button onClick={() => navigate(`/clientchart/${clientId}`)} className="border border-keppel rounded-[3px] text-[#5BC4BF] w-32 py-2">
            Cancel
          </button>
          <button
            disabled={disableSubmit}
            onClick={handleCreate}
            className="border border-keppel rounded-[3px] disabled:cursor-not-allowed disabled:bg-[#6cd8d3] bg-[#5BC4BF] text-white w-32 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEncounterNote;
