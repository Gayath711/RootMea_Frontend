import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputElement from "../../components/dynamicform/FormElements/InputElement";
import DateInput from "../../components/common/DateInput";
import SelectElement from "../../components/dynamicform/FormElements/SelectElement";
import TimeInput from "../../components/common/TimeInput";
import TextAreaElement from "../../components/dynamicform/FormElements/TextAreaElement";
import MultiSelectElement from "../../components/dynamicform/FormElements/MultiSelectElement";
import FileInput from "../../components/dynamicform/FormElements/FileInput";
import SignInput from "../../components/dynamicform/FormElements/SignInput";
import { protectedApi } from "../../services/api";
import { notifyError, notifySuccess } from "../../helper/toastNotication";
import DropDown from "../../components/common/Dropdown";
import BasicTable from "../../components/react-table/BasicTable";
import DnDCustomFields from "../../components/DnDCustomFields";
import axios from "axios";
import CollapseOpenSvg from "../../components/images/collpase-open.svg";
import CollapseCloseSvg from "../../components/images/collapse-close.svg";
import apiURL from "../../apiConfig";
import { format } from "date-fns";
import "./EncounterNoteFormStyles.css";

function FormWrapper({
  children,
  label,
  isCollapsable,
  gridClass = "grid-cols-12",
  initialState = true,
}) {
  const [show, setShow] = useState(initialState);

  useEffect(() => {
    if (!show) {
      setShow(initialState);
    }
  }, [initialState]);

  return (
    <div className="rounded-[6px] border border-keppel">
      <div
        onClick={() => {
          isCollapsable && setShow((prev) => !prev);
        }}
        className="w-full px-3 py-2.5 border-b border-keppel text-xl font-medium flex justify-between items-center gap-2 cursor-pointer"
      >
        <span>{label}</span>
        {isCollapsable && (
          <img
            src={show ? CollapseCloseSvg : CollapseOpenSvg}
            alt="collapse-icon"
          />
        )}
      </div>
      {show && (
        <div className={`px-4 py-3 grid ${gridClass} gap-x-3 gap-y-3`}>
          {children}
        </div>
      )}
    </div>
  );
}

function convertToTimeString(date) {
  console.log(date);
  return (
    date?.getHours() +
    ":" +
    date?.getMinutes() +
    ":" +
    (date?.getSeconds() < 9 ? date?.getSeconds() : "0" + date?.getSeconds())
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

async function fetchFormOptions() {
  try {
    const response = await protectedApi.get("/encounter-note-form-options/");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchClientOptions() {
  try {
    const response = await protectedApi.get("/get_matching_tables/  ");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchCarePlanOptions() {
  try {
    const response = await protectedApi.get(
      "/encounter-note-careplan-options/"
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchFacilityOptions() {
  try {
    const response = await protectedApi.get("/api/resources/facilities");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchProgramOptions() {
  try {
    const response = await protectedApi.get("/api/resources/program");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchUsers() {
  try {
    const response = await protectedApi.get("/encounter-notes-users/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchUserInfo() {
  try {
    const response = await protectedApi.get("/user-details/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function convertTimeToISOString(data, timeString) {
  // Get the current date in 'YYYY-MM-DD' format
  var timeParts = timeString.split(":");
  var hours = parseInt(timeParts?.[0], 10);
  var minutes = parseInt(timeParts?.[1], 10);
  var seconds = parseInt(timeParts?.[2], 10);

  // Create a new Date object and set the time
  var convertedDate = new Date();
  convertedDate.setHours(hours);
  convertedDate.setMinutes(minutes);
  convertedDate.setSeconds(seconds);
  // Convert to ISO string
  return convertedDate;
}

function BillingStatus({ mode, handleFormDataChange, formData, userInfo }) {
  const [billingStatus, setBillingStatus] = useState({});

  const handleAddBillingStatus = useCallback(() => {
    if (!userInfo?.user_id) {
      notifyError("Can't find logged in user information");
      return;
    }
    const data = {
      status: billingStatus?.status,
      user_name: { ...userInfo },
      date_time: new Date().getTime(),
    };
    handleFormDataChange("billing_status", [...formData?.billing_status, data]);
    setBillingStatus({});
  }, [billingStatus, formData]);

  const columnDefinition = useMemo(() => {
    return [
      {
        Header: "Billing Status",
        accessor: "status",
        align: "left",
      },
      {
        Header: "User name",
        accessor: "user_name",
        align: "left",
        Cell: ({ value }) => value?.user_name || value || "NaN",
      },
      {
        Header: "Date & Time",
        accessor: "date_time",
        align: "left",
        Cell: ({ value }) =>
          value ? format(new Date(Number(value)), "MM-dd-yyyy hh:mm a") : "NaN",
      },
    ];
  }, []);

  return (
    <>
      <div className="col-span-11">
        <DropDown
          name="status"
          placeholder="Billing Status"
          handleChange={(data) =>
            setBillingStatus((prev) => ({
              ...prev,
              status: data.value,
            }))
          }
          isEdittable={mode !== "edit"}
          className="border-keppel m-1 h-[37.6px]"
          height="37.6px"
          fontSize="14px"
          borderColor="#5bc4bf"
          options={[
            {
              label: "ECM Enabling Service",
              value: "ECM Enabling Service",
            },
            { label: "Submitted via AMD*", value: "Submitted via AMD*" },
            {
              label: "Submitted via invoice",
              value: "Submitted via invoice",
            },
            { label: "Missing Insurance", value: "Missing Insurance" },
            {
              label: "Missing/Insufficient Notes",
              value: "Missing/Insufficient Notes",
            },
          ]}
          selectedOption={billingStatus?.status || ""}
        />
      </div>
      <div className="col-span-1 m-1">
        <button
          onClick={handleAddBillingStatus}
          disabled={!billingStatus?.status}
          className="w-full h-100 bg-[#5BC4BF] rounded-md text-white font-semibold text-lg disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      <div className="col-span-12 mx-1">
        <BasicTable
          type={"billing"}
          noMargin
          defaultPageSize={5}
          columns={columnDefinition}
          data={formData?.billing_status || []}
        />
      </div>
    </>
  );
}

function BillingComments({ mode, handleFormDataChange, formData, userInfo }) {
  const [billingComments, setBillingComments] = useState({});

  const handleAddBillingComment = useCallback(() => {
    if (!userInfo?.user_id) {
      notifyError("Can't find logged in user information");
      return;
    }
    const data = {
      comment: billingComments?.comment,
      user_name: { ...userInfo },
      date_time: new Date().getTime(),
    };
    handleFormDataChange("billing_comments", [
      ...formData?.billing_comments,
      data,
    ]);
    setBillingComments({});
  }, [billingComments, formData]);

  const columnDefinition = useMemo(() => {
    return [
      {
        Header: "Billing status Comments",
        accessor: "comment",
        align: "left",
      },
      {
        Header: "User name",
        accessor: "user_name",
        align: "left",
        Cell: ({ value }) => value?.user_name || value || "NaN",
      },
      {
        Header: "Date & Time",
        accessor: "date_time",
        align: "left",
        Cell: ({ value }) =>
          value ? format(new Date(Number(value)), "MM-dd-yyyy hh:mm a") : "NaN",
      },
    ];
  }, []);

  return (
    <>
      <div className="col-span-11">
        <InputElement
          type="text"
          name="comment"
          disabled={mode !== "edit"}
          placeholder="Billing Status Comment"
          value={billingComments?.comment || ""}
          onChange={(e) =>
            setBillingComments((prev) => ({
              ...prev,
              comment: e.target.value,
            }))
          }
          isEdittable={mode !== "edit"}
          className="border-keppel"
        />
      </div>
      <div className="col-span-1 m-1">
        <button
          onClick={handleAddBillingComment}
          disabled={!billingComments?.comment}
          className="w-full h-100 bg-[#5BC4BF] rounded-md text-white font-semibold text-lg disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      <div className="col-span-12 mx-1">
        <BasicTable
          type={"billing"}
          noMargin
          defaultPageSize={5}
          columns={columnDefinition}
          data={formData?.billing_comments || []}
        />
      </div>
    </>
  );
}

function EncounterNoteForm() {
  const [mode, setMode] = useState("new");

  const { clientId } = useParams();
  const [clientDetails, setClientDetails] = useState({});
  const [formOptions, setFormOptions] = useState([]);
  const [carePlanOptions, setCarePlanOptions] = useState([]);
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const [Client_Type, setClient_Type] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsBackup, setFormsBackup] = useState([]);
  const [carePlans, setCarePlans] = useState([]);
  const [carePlansBackup, setCarePlansBackup] = useState([]);
  const [signedByBackup, setSignedByBackup] = useState([]);
  const [formData, setFormData] = useState({
    client_id: clientId,
    staff_name: 2,
  });

  const [customFields, setCustomFields] = useState([]);
  const [deletedCustomFields, setDeletedCustomFields] = useState([]);

  let customFieldsTags = useMemo(() => {
    return customFields.map((field) => {
      let cf = {
        datatype: field.type,
        question: field.props.label,
        answer: "",
      };

      if (field.type === "imageupload" || field.type === "fileupload") {
        cf.answer = field.props.base64;
      } else {
        cf.answer = field.props.value;
      }

      if (mode === "edit") {
        if (field.id) {
          cf.id = field.id;
        }
      }

      return cf;
    });
  }, [customFields]);

  let deletedcustomFieldsID = useMemo(() => {
    return deletedCustomFields
      .map((field) => {
        if (field.id) {
          return field.id;
        }
        return null;
      })
      .filter(Boolean);
  }, [deletedCustomFields]);

  console.log({ customFieldsTags, deletedCustomFields, deletedcustomFieldsID });

  const parseToDnDCustomFields = (items) => {
    return items.map((itm) => {
      let constructField = {
        type: itm.datatype,
        props: {
          label: itm.question,
          value: itm.answer,
          width: "w-full",
        },
        ...itm,
      };

      if (itm.datatype === "text" || itm.datatype === "textarea") {
        constructField.props = {
          ...constructField.props,
          type: "text",
        };
      }

      if (itm.datatype === "datetime") {
        constructField.props = {
          ...constructField.props,
          type: "date",
          width: "w-1/4",
        };
      }

      if (itm.datatype === "imageupload") {
        constructField.props = {
          ...constructField.props,
          type: "file",
          accept: "image/*",
          base64: itm.answer,
        };
      }

      if (itm.datatype === "imageupload") {
        constructField.props = {
          ...constructField.props,
          type: "file",
          accept:
            ".png, .jpg, .jpeg, .pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          type: "file",
          isFile: true,
          base64: itm.answer,
        };
      }

      return constructField;
    });
  };

  const [showCutomFields, setShowCustomFields] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encounterId = queryParams.get("encounterId");
  useEffect(() => {
    const mode = queryParams.get("mode");
    setMode(mode);

    if (
      (mode === "edit" || mode === "view") &&
      queryParams.get("encounterId")
    ) {
      const fetchClientEncounterDetails = async () => {
        try {
          const response = await protectedApi.get(
            `/encounter-notes/${encounterId}`
          );
          const data = response.data;
          data.custom_fields = JSON.stringify(data.custom_fields);
          setStartTime(
            convertTimeToISOString(data.encounter_date, data.start_time)
          );
          setEndTime(
            convertTimeToISOString(data.encounter_date, data.end_time)
          );
          const convertedForms = data.forms.map((form) => {
            return { label: form.form_name, value: form.form_id };
          });
          setForms(convertedForms);
          setFormsBackup(data.forms.map((form) => form.form_id));
          data.forms = data.forms.map((form) => form.form_id);
          const convertedCarePlans = data.care_plans.map((carePlan) => {
            return {
              label: carePlan.care_plan_name,
              value: carePlan.care_plan_id,
            };
          });
          setCarePlans(convertedCarePlans);
          setCarePlansBackup(
            data.care_plans.map((carePlan) => carePlan.care_plan_id)
          );
          data.forms_deleted = [];
          data.care_plans_deleted = [];
          data.uploaded_documents_deleted = [];
          data.signed_by_deleted = [];
          data.care_plans = data.care_plans.map(
            (carePlan) => carePlan.care_plan_id
          );
          if (!data?.billing_status) {
            data.billing_status = [];
          }
          if (!data?.billing_comments) {
            data.billing_comments = [];
          }
          setFormData(data);

          // CustomFields
          setCustomFields(parseToDnDCustomFields(data.tags || []));
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchClientEncounterDetails();
    }
  }, []);

  

  const fetchDropdownOptions = async (tableName,tableColumns) => {
    const newDroplist = {};
    for (const column of tableColumns) {
      console.log(column.type);
      console.log("column.name", column.name);

      if (
        column.type === "USER-DEFINED" ||
        ((column.type === "USER-DEFINED" || column.type === "ARRAY") &&
          (column.name.endsWith("_multiple") ||
            column.name.endsWith("_checkbox")))
      ) {
        const enumType = `enum_type_${tableName}_${column.name}_enum_type`;

        try {
          const response = await axios.get(`${apiURL}/get_enum_labels/`, {
            params: {
              enum_type: enumType,
            },
          });
          const dropdownOptions = response.data.enum_labels;
          newDroplist[enumType] = dropdownOptions;
          console.log("Dropdown options for", enumType, ":", dropdownOptions);
        } catch (error) {
          console.error(
            "Error fetching dropdown options for",
            enumType,
            ":",
            error
          );
        }
      }
    }
   
  };


  const fetchTableHeaders = async (value) => {
    const access_token = localStorage.getItem("access_token");
    try {
      // Create an array of promises for the API calls
      const promises = [
        
        axios.get(`${apiURL}/get_table_structure/${value}/`),
        
        fetch(`${apiURL}/profile-type/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }).then((response) => response.json()), 
      ];

      // Use Promise.all to fetch all data simultaneously
      const [header_response, profile_type_Response] =
        await Promise.all(promises);

      // Log the responses
      console.log("from promise all",
        
        header_response,
        profile_type_Response
      );
      console.log("data.columns",  header_response,)
      fetchDropdownOptions(header_response?.data.table_name, header_response?.data.columns)
     
      
    } catch (error) {
      console.error("Error fetching table headers:", error);
    }
  };

  const handleFormDataChange = useCallback(
    (fieldName, value) => {
      fieldName === "Client_Type" && fetchTableHeaders(value);
      console.log("callback called", fieldName, value);
      setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    },

    [formData]
  );
  

  console.log(formData, "from formdata")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (!mode)
      setFormData((prev) => ({
        ...prev,
        staff_name: userOptions?.find(
          (user) => user.value === userInfo?.user_id
        )?.value,
      }));
  }, [userOptions, userInfo]);

  useEffect(() => {
    fetchClientDetails({ clientId })
      .then((clientDetailsResponse) => {
        if (clientDetails?.date_of_birth) {
          const splitDate = clientDetailsResponse.date_of_birth.split("-");
          if (splitDate.length === 3) {
            clientDetailsResponse.date_of_birth = `${splitDate?.[1]}/${splitDate?.[2]}/${splitDate?.[0]}`;
          }
        }
        setClientDetails(clientDetailsResponse);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchFormOptions()
      .then((formOptionsResponse) => {
        const convertedFormOptions = formOptionsResponse.map((form) => ({
          label: form.form_name,
          value: form.id,
        }));
        setFormOptions(convertedFormOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchClientOptions()
      .then((fetchClientOptions) => {
        console.log("from_client", fetchClientOptions?.matching_tables);

        const convertedFormOptions = fetchClientOptions.matching_tables.map(
          (formName) => ({
            label: formName,
            value: formName,
          })
        );

        setClient_Type(convertedFormOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchCarePlanOptions()
      .then((carePlanOptionsResponse) => {
        const convertedCarePlanOptions = carePlanOptionsResponse.map(
          (carePlan) => ({ label: carePlan.care_plan_name, value: carePlan.id })
        );
        setCarePlanOptions(convertedCarePlanOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchFacilityOptions()
      .then((facilityOptionsResponse) => {
        const convertedFacilityOptions = facilityOptionsResponse.map(
          (facility) => ({ label: facility.name, value: facility.id })
        );
        setFacilityOptions(convertedFacilityOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchProgramOptions()
      .then((programOptionsResponse) => {
        const convertedProgramOptions = programOptionsResponse?.map(
          (program) => ({ label: program.name, value: program.id })
        );
        setProgramOptions(convertedProgramOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchUsers()
      .then((fetchUsersResponse) => {
        const convertedUserOptions = fetchUsersResponse.map((user) => ({
          label: user.username,
          value: user.id,
        }));
        setUserOptions(convertedUserOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchUserInfo()
      .then((userInfoResponse) => {
        setUserInfo(userInfoResponse);
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

  const handleCreatePayload = () => {
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
      encounter_summary_text_template,
      encounter_summary,
      forms,
      forms_deleted,
      care_plans,
      care_plans_deleted,
      uploaded_documents_deleted,
      signed_by_deleted,
      signed_by,
      uploaded_documents,
      billing_status,
      billing_comments,
    } = formData;
    const formDataPayload = new FormData();
    console.log(formData, "inside payloaded")
    clientId && formDataPayload.append("client_id", Number(clientId));
    formDataPayload.append("system_id", 12345);
    staff_name && formDataPayload.append("staff_name", staff_name);
    facility && formDataPayload.append("facility", facility);
    encounter_date && formDataPayload.append("encounter_date", encounter_date);

    start_time && formDataPayload.append("start_time", start_time);
    end_time && formDataPayload.append("end_time", end_time);

    encounter_status &&
      formDataPayload.append("encounter_status", encounter_status);
    encounter_type && formDataPayload.append("encounter_type", encounter_type);
    program && formDataPayload.append("program", program);
    note_template && formDataPayload.append("note_template", note_template);
    // custom_fields !== undefined &&
    //   formDataPayload.append(
    //     "custom_fields",
    //     JSON.stringify(custom_fields || [])
    //   );
    encounter_summary_text_template &&
      formDataPayload.append(
        "encounter_summary_text_template",
        encounter_summary_text_template
      );
    encounter_summary &&
      formDataPayload.append("encounter_summary", encounter_summary);
    forms &&
      formDataPayload.append(
        "forms",
        JSON.stringify(
          forms?.filter((formId) => !formsBackup.includes(formId)) || []
        )
      );
    forms_deleted &&
      formDataPayload.append(
        "forms_deleted",
        JSON.stringify([...new Set(forms_deleted)] || [])
      );
    care_plans &&
      formDataPayload.append(
        "care_plans",
        JSON.stringify(
          care_plans?.filter(
            (carePlanId) => !carePlansBackup?.includes(carePlanId)
          ) || []
        )
      );
    care_plans_deleted &&
      formDataPayload.append(
        "care_plans_deleted",
        JSON.stringify([...new Set(care_plans_deleted)] || [])
      );
    uploaded_documents_deleted &&
      formDataPayload.append(
        "uploaded_documents_deleted",
        JSON.stringify(uploaded_documents_deleted)
      );
    signed_by_deleted &&
      formDataPayload.append(
        "signed_by_deleted",
        JSON.stringify(signed_by_deleted)
      );
    signed_by &&
      formDataPayload.append(
        "signed_by",
        JSON.stringify(
          signed_by.filter(
            (sign) =>
              !signedByBackup.find(
                (signBackup) =>
                  signBackup?.id === sign?.id &&
                  signBackup?.timestamp === sign?.timestamp
              )
          ) || []
        )
      );
    console.log(billing_status, billing_comments);
    billing_status?.length
      ? formDataPayload.append(
          "billing_status",
          JSON.stringify(
            billing_status?.map((bs) => ({
              ...bs,
              user_name:
                bs?.user_id !== undefined
                  ? bs?.user_id
                  : bs?.user_name?.user_id || bs?.user_name,
            }))
          )
        )
      : formDataPayload.append("billing_status", JSON.stringify([]));
    billing_comments?.length
      ? formDataPayload.append(
          "billing_comments",
          JSON.stringify(
            billing_comments?.map((bc) => ({
              ...bc,
              user_name:
                bc?.user_id !== undefined
                  ? bc?.user_id
                  : bc?.user_name?.user_id || bc?.user_name,
            }))
          )
        )
      : formDataPayload.append("billing_comments", JSON.stringify([]));
    for (let i = 0; i < uploaded_documents?.length; i++) {
      if (uploaded_documents[i] instanceof File) {
        formDataPayload.append("uploaded_documents", uploaded_documents[i]);
      }
    }

    // DND Custom Fields

    // let tags = customFields.map((field) => {
    //   console.log({ xx_field: field });
    //   let answer = "";
    //   if (field.type === "imageupload" || field.type === "fileupload") {
    //     answer = field.props.base64;
    //   } else {
    //     answer = field.props.value;
    //   }

    //   console.log({
    //     xx_rEle: {
    //       datatype: field.type,
    //       question: field.props.label,
    //       answer: answer,
    //     },
    //   });
    //   return {
    //     datatype: field.type,
    //     question: field.props.label,
    //     answer: answer,
    //   };
    // });

    console.log("--- Payload Start ----");
    console.log({ customFieldsTags, deletedcustomFieldsID });
    console.log("--- Payload End ----");

    formDataPayload.append("tags", JSON.stringify([]));
    formDataPayload.append(
      "custom_fields",
      JSON.stringify( custom_fields || [])
    );
    formDataPayload.append(
      "tags_deleted",
      JSON.stringify([])
    );
    return formDataPayload;
  };

  const handleCreate = async () => {
    try {
      const formDataPayload = await handleCreatePayload();
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
  };

  const handleUpdate = async () => {
    console.log("updated called");
    try {
      const formDataPayload = handleCreatePayload();
      console.log({ formDataPayload });
      const response = await protectedApi.put(
        `/encounter-notes-update/${encounterId}/`,
        formDataPayload
      );
      if (response.status === 200) {
        notifySuccess("Encounter Note updated successfully");
        navigate(`/clientchart/${clientId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <div>Encounter Client Profile</div>
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
                value={
                  clientDetails?.date_of_birth
                    ? format(clientDetails?.date_of_birth, "MM-dd-yyyy")
                    : ""
                }
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
              <DropDown
                name="staff_name"
                placeholder="User Name *"
                handleChange={(data) =>
                  handleFormDataChange("staff_name", data.value)
                }
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                isEdittable={mode === "view"}
                fontSize="14px"
                borderColor="#5bc4bf"
                options={userOptions}
                selectedOption={
                  userOptions.find(
                    (user) => formData?.staff_name === user.value
                  )?.label || ""
                }
              />
            </div>
            <div className="col-span-6">
              <DateInput
                placeholder="Encounter Date *"
                className="m-1 border-keppel"
                dateFormat="MM-dd-yyyy"
                isEdittable={mode === "view"}
                value={
                  formData?.encounter_date
                    ? format(formData?.encounter_date, "MM-dd-yyyy")
                    : ""
                }
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
                isEdittable={mode === "view"}
                fontSize="14px"
                borderColor="#5bc4bf"
                options={facilityOptions}
                selectedOption={
                  facilityOptions?.find(
                    (option) => option.value === formData?.facility
                  )?.label || ""
                }
              />
            </div>
            <div className="col-span-6">
              <TimeInput
                width="100%"
                height="37.6px"
                placeholder="Start Time *"
                value={startTime}
                isEdittable={mode === "view"}
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
                isEdittable={mode === "view"}
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
                isEdittable={mode === "view"}
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
                isEdittable={mode === "view"}
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
                isEdittable={mode === "view"}
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={programOptions}
                selectedOption={
                  programOptions?.find(
                    (option) => option.value === formData?.program
                  )?.label || ""
                }
              />
            </div>
            <div className="col-span-6">
              <DropDown
                name="note_template"
                placeholder="Note Template *"
                handleChange={(data) =>
                  handleFormDataChange("note_template", data.value)
                }
                isEdittable={mode === "view"}
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
            <div className="col-span-6">
              <DropDown
                name="Client_Type"
                placeholder="Client_Type *"
                handleChange={(data) =>
                  handleFormDataChange("Client_Type", data.value)
                }
                isEdittable={mode === "view"}
                className="border-keppel m-1 h-[37.6px]"
                height="37.6px"
                fontSize="14px"
                borderColor="#5bc4bf"
                options={Client_Type}
                selectedOption={formData?.Client_Type || ""}
              />
            </div>
          </FormWrapper>

          <FormWrapper
            label="Custom Fields"
            isCollapsable={true}
            initialState={customFields.length > 0}
          >
            <div className="col-span-12">
              <DnDCustomFields
                onChange={(dndItms) => {
                  setCustomFields(dndItms);
                }}
                onDelete={(dndItms) => {
                  console.log({ onDelItm: dndItms });
                  setDeletedCustomFields(dndItms);
                }}
                deletedItems={deletedCustomFields}
                dndItems={customFields}
                viewMode={mode === "view"}
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
                isEdittable={mode === "view"}
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
                disabled={mode === "view"}
                placeholder="Enter Encounter Summary"
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Forms and Authority">
            <div className="col-span-6">
              <MultiSelectElement
                name={"forms"}
                className="border-keppel"
                placeholder="Select forms"
                value={forms || []}
                disabled={mode === "view"}
                onChange={(data) => {
                  setForms(data);
                  const updatedData = [];
                  if (mode === "edit") {
                    let forms_deleted = [
                      ...formData?.forms_deleted,
                      ...formData?.forms,
                    ];
                    data.forEach((d) => {
                      const old_length = formData?.forms_deleted?.length;
                      forms_deleted = forms_deleted.filter(
                        (formId) => formId !== d.value
                      );
                      if (forms_deleted.length !== old_length) {
                        updatedData.push(d.value);
                      } else {
                        updatedData.push(d.value);
                      }
                    });
                    handleFormDataChange("forms_deleted", forms_deleted);
                    handleFormDataChange("forms", updatedData);
                  } else {
                    handleFormDataChange(
                      "forms",
                      data.map((d) => d.value)
                    );
                  }
                }}
                options={formOptions}
              />
            </div>
            <div className="col-span-6">
              <MultiSelectElement
                name={"care_plans"}
                className="border-keppel"
                placeholder="Care Plans"
                value={carePlans || []}
                disabled={mode === "view"}
                onChange={(data) => {
                  setCarePlans(data);
                  const updatedData = [];
                  if (mode === "edit") {
                    let care_plans_deleted = [
                      ...formData?.care_plans_deleted,
                      ...formData?.care_plans,
                    ];
                    data.forEach((d) => {
                      const old_length = formData?.care_plans_deleted?.length;
                      care_plans_deleted = care_plans_deleted.filter(
                        (carePlanId) => carePlanId !== d.value
                      );
                      if (care_plans_deleted.length !== old_length) {
                        updatedData.push(d.value);
                      } else {
                        updatedData.push(d.value);
                      }
                    });
                    handleFormDataChange(
                      "care_plans_deleted",
                      care_plans_deleted
                    );
                    handleFormDataChange("care_plans", updatedData);
                  } else {
                    handleFormDataChange(
                      "care_plans",
                      data.map((d) => d.value)
                    );
                  }
                }}
                options={carePlanOptions}
              />
            </div>
            <div className="col-span-12">
              <FileInput
                title="Upload Documents"
                className="border-keppel m-1 w-full"
                formData={formData}
                setFormData={setFormData}
                disabled={mode === "view"}
                mode={mode}
                deletedFilesKey="uploaded_documents_deleted"
                files={formData?.uploaded_documents || []}
                setFiles={useCallback(
                  (files) => {
                    setFormData({ ...formData, uploaded_documents: files });
                  },
                  [formData]
                )}
              />
            </div>
            <div className="col-span-12">
              <SignInput
                signs={formData?.signed_by || []}
                user={userInfo}
                disabled={mode === "view"}
                mode={mode}
                setSigns={(signs) => {
                  handleFormDataChange("signed_by", signs);
                }}
                setFormData={setFormData}
                className="border-keppel m-1"
              />
            </div>
          </FormWrapper>

          <FormWrapper label="Billing Details">
            <BillingStatus
              mode={mode}
              handleFormDataChange={handleFormDataChange}
              formData={formData}
              userInfo={userInfo}
            />
            <BillingComments
              mode={mode}
              handleFormDataChange={handleFormDataChange}
              formData={formData}
              userInfo={userInfo}
            />
          </FormWrapper>
        </div>
        <div className="mx-auto flex justify-center items-center gap-x-4 my-8">
          <button
            onClick={() => navigate(`/clientchart/${clientId}`)}
            className="border border-keppel rounded-[3px] text-[#5BC4BF] w-32 py-2"
          >
            Cancel
          </button>
          <button
            // disabled={disableSubmit || mode === "view"}
            onClick={mode === "edit" ? handleUpdate : handleCreate}
            className="border border-keppel rounded-[3px] disabled:cursor-not-allowed disabled:bg-[#6cd8d3] bg-[#5BC4BF] text-white w-32 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
  

export default EncounterNoteForm;
