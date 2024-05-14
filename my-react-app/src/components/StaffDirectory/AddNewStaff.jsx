import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import BackArrowIcon from "../images/back-arrow.svg";
import Select from "react-select";
import axios from "../../helper/axiosInstance";
import {
  notify,
  notifyError,
  notifySuccess,
} from "../../helper/toastNotication";

export default function AddNewStaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paramid } = useParams();

  const [formDetail, setFormDetail] = useState({
    LastName: "",
    FirstName: "",
    PhoneNumber: "",
    EmailId: "",
    AdditionalContactInformation: "",
    PositionTitle: null,
    PrimaryFaculity: null,
    Supervisor: null,
    SupervisorEmail: "",
    Programs: [],
    NavigationClients: "",
  });

  const [errFields, setErrFields] = useState({});

  const [positionTitleOptions, setPositionTitleOptions] = useState([]);
  const [primaryFaculityOptions, setPrimaryFaculityOptions] = useState([]);
  const [supervisorOptions, setSupervisorOptions] = useState([]);
  const [programsOptions, setProgramsOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchPositionTitles();
    fetchPrimaryFaculity();
    fetchSupervisor();
    fetchPrograms();
    // Clean up effect
    return () => {
      // Optionally do any cleanup here
    };
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  useEffect(() => {
    if (JSON.stringify(errFields) !== "{}") {
      fieldValidation();
    }
  }, [formDetail]);

  useEffect(() => {
    if (paramid) {
      fetchData();
    }
  }, [paramid]);

  useEffect(() => {
    if (paramid) {
      if (!formDetail.Supervisor) {
        if (formDetail.SupervisorEmail) {
          let supervisorData = supervisorOptions.find(
            (item) => item.email === formDetail.SupervisorEmail
          );
          if (supervisorData) {
            setFormDetail((prev) => {
              return {
                ...prev,
                Supervisor: {
                  ...supervisorData,
                  label:
                    supervisorData.first_name + " " + supervisorData.last_name,
                  value: supervisorData.id,
                },
              };
            });
          }
        }
      }
    }
  }, [supervisorOptions, formDetail, paramid]);

  const isEdit = useMemo(() => {
    const { pathname } = location;
    const splittedPath = pathname.split("/");
    if (paramid && splittedPath.includes("update-staff-directory")) {
      return true;
    }
    return false;
  }, [paramid, location]);

  const fetchData = () => {
    axios
      .get(`/api/users/${paramid}`)
      .then((response) => {
        setLoadingData(true);
        const { data } = response;
        setFormDetail({
          LastName: data.last_name || "",
          FirstName: data.first_name || "",
          PhoneNumber: data.profile.phone_no || "",
          EmailId: data.email || "",
          AdditionalContactInformation: "",
          PositionTitle: data.profile.position
            ? {
                label: data.profile.position,
                value: data.profile.position,
              }
            : null,
          PrimaryFaculity: data.profile.facility
            ? {
                label: data.profile.facility,
                value: data.profile.facility,
              }
            : null,
          Supervisor: null,
          SupervisorEmail: data.profile.supervisor_email || "",
          Programs: data.profile.program
            ? data.profile.program.map((item) => {
                return {
                  ...item,
                  label: item.program,
                  value: item.program,
                };
              })
            : [],
          NavigationClients: "",
        });
      })
      .catch((error) => {
        console.error("Error fetching program details:", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const fetchPositionTitles = async () => {
    try {
      const response = await axios.get("/api/resources/position");
      setPositionTitleOptions(
        response.data.map((itm) => {
          return { ...itm, label: itm.name, value: itm.name };
        })
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching position titles:", error);
    }
  };
  const fetchPrimaryFaculity = async () => {
    try {
      const response = await axios.get("/api/resources/facilities");
      setPrimaryFaculityOptions(
        response.data.map((itm) => {
          return { ...itm, label: itm.name, value: itm.name };
        })
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching position titles:", error);
    }
  };
  const fetchSupervisor = async () => {
    try {
      const response = await axios.get("/api/users");
      setSupervisorOptions(
        response.data.map((itm) => {
          return {
            ...itm,
            label: itm.first_name + " " + itm.last_name,
            value: itm.id,
          };
        })
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching position titles:", error);
    }
  };
  const fetchPrograms = async () => {
    try {
      const response = await axios.get("/api/resources/program");
      setProgramsOptions(
        response.data.map((itm) => {
          return { ...itm, label: itm.name, value: itm.name };
        })
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching position titles:", error);
    }
  };

  const fieldValidation = () => {
    let errorFields = {};

    if (!formDetail.FirstName) {
      errorFields.FirstName = "Please fill the first name";
    }

    if (!formDetail.LastName) {
      errorFields.LastName = "Please fill the last name";
    }

    if (!formDetail.PhoneNumber) {
      errorFields.PhoneNumber = "Please fill the phone number";
    }

    if (!formDetail.EmailId) {
      errorFields.EmailId = "Please fill the email id";
    }

    if (!formDetail.PositionTitle) {
      errorFields.PositionTitle = "Please select the position";
    }

    if (!formDetail.PrimaryFaculity) {
      errorFields.PrimaryFaculity = "Please select the faculty";
    }
    if (!formDetail.Supervisor) {
      errorFields.Supervisor = "Please select the supervisor";
    }

    if (formDetail.Programs.length === 0) {
      errorFields.Programs = "Please select minimum one Programs";
    }
    setErrFields(errorFields);

    if (JSON.stringify(errorFields) === "{}") {
      return true; // true when validation success
    }

    return false; // false when validation fails
  };

  const handleSubmit = async () => {
    if (fieldValidation()) {
      try {
        // Concatenate first name and last name, remove spaces, and keep alphanumeric characters
        const username = `${formDetail.FirstName}${formDetail.LastName}`
          .replace(/\s+/g, "") // Remove spaces
          .replace(/[^\w]+/g, "");

        const data = {
          first_name: formDetail.FirstName,
          last_name: formDetail.LastName,
          email: formDetail.EmailId,
          username: username,
          profile: {
            phone_no: formDetail.PhoneNumber,
            position: formDetail.PositionTitle.id,
            facility: formDetail.PrimaryFaculity.id,
            supervisor: formDetail.Supervisor.id,
            program: formDetail.Programs.map((each) => each.id),
          },
        };

        const response = await axios.post("/api/users", data);
        notifySuccess(`Staff ${isEdit ? "Updated" : "Added"} successfully`);
        navigate(`/staff-directory/${response.data.id}`, { replace: true });
      } catch (error) {
        console.error(`Error ${isEdit ? "Updating" : "Adding"} staff:`, error);
        notifyError(
          `Error ${isEdit ? "Updating" : "Adding"} staff, try after sometime`
        );
      }
    } else {
      notifyError("Please check all required fields are filled");
    }
  };

  const handleInputChange = (key, value) => {
    if (value !== " ") {
      setFormDetail((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    }
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormDetail((prevDetails) => ({
      ...prevDetails,
      Programs: selectedOptions,
    }));
  };

  console.log({ formDetail });

  return (
    <>
      <div className="flex flex-column gap-2 items-center">
        <PageHeader title={`${isEdit ? "Update" : "Add New"} Staff`} />
        <div className="flex flex-column gap-2 w-100 shadow-md rounded-md">
          <div className="flex flex-column gap-1 p-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Last Name"
                  error={errFields.LastName}
                  required
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.LastName ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"LastName"}
                    placeholder="Last Name"
                    value={formDetail.LastName}
                    onChange={(e) =>
                      handleInputChange("LastName", e.target.value)
                    }
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="First Name"
                  error={errFields.FirstName}
                  required
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.FirstName ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"FirstName"}
                    placeholder="First Name"
                    value={formDetail.FirstName}
                    onChange={(e) =>
                      handleInputChange("FirstName", e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Phone Number"
                  error={errFields.PhoneNumber}
                  required
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.PhoneNumber ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"PhoneNumber"}
                    placeholder="Phone Number"
                    value={formDetail.PhoneNumber}
                    onChange={(e) =>
                      handleInputChange("PhoneNumber", e.target.value)
                    }
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-4">
                <FormField label="Email Id" error={errFields.EmailId} required>
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.EmailId ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"EmailId"}
                    placeholder="Email Id"
                    value={formDetail.EmailId}
                    onChange={(e) =>
                      handleInputChange("EmailId", e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>
            <div className="mx-[25px] my-[15px]">
              <FormField
                label="Additional Contact Information"
                error={errFields.AdditionalContactInformation}
              >
                <textarea
                  rows={5}
                  name={"AdditionalContactInformation"}
                  placeholder="Additional Contact Information"
                  value={formDetail.AdditionalContactInformation}
                  onChange={(e) =>
                    handleInputChange(
                      "AdditionalContactInformation",
                      e.target.value
                    )
                  }
                  className="w-100 rounded-[2px]"
                  style={{
                    padding: "15px",
                    border: `1px solid ${
                      !errFields.AdditionalContactInformation
                        ? "#5BC4BF"
                        : "red"
                    }`,
                    fontSize: "14px",
                  }}
                />
              </FormField>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Position Title"
                  error={errFields.PositionTitle}
                  required
                >
                  <Select
                    name={"PositionTitle"}
                    options={positionTitleOptions}
                    placeholder="Position Title"
                    value={formDetail.PositionTitle}
                    onChange={(selectedOption) =>
                      handleInputChange("PositionTitle", selectedOption)
                    }
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",

                        border: `1px solid ${
                          !errFields.PositionTitle ? "#5BC4BF" : "red"
                        }`,

                        fontSize: "14px",
                      }),
                      menu: (styles) => ({
                        ...styles,
                        background: "white",
                        zIndex: 9999,
                      }),
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    menuPortalTarget={document.body}
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Primary Faculity"
                  error={errFields.PrimaryFaculity}
                  required
                >
                  <Select
                    name={"PrimaryFaculity"}
                    options={primaryFaculityOptions}
                    placeholder="Primary Faculity"
                    value={formDetail.PrimaryFaculity}
                    onChange={(selectedOption) =>
                      handleInputChange("PrimaryFaculity", selectedOption)
                    }
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",

                        border: `1px solid ${
                          !errFields.PrimaryFaculity ? "#5BC4BF" : "red"
                        }`,

                        fontSize: "14px",
                      }),
                      menu: (styles) => ({
                        ...styles,
                        background: "white",
                        zIndex: 9999,
                      }),
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    menuPortalTarget={document.body}
                  />
                </FormField>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Supervisor"
                  error={errFields.Supervisor}
                  required
                >
                  <Select
                    name={"Supervisor"}
                    options={supervisorOptions}
                    placeholder="Supervisor"
                    value={formDetail.Supervisor}
                    onChange={(selectedOption) => {
                      handleInputChange("Supervisor", selectedOption);
                      handleInputChange(
                        "SupervisorEmail",
                        selectedOption?.email
                      );
                    }}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",

                        border: `1px solid ${
                          !errFields.Supervisor ? "#5BC4BF" : "red"
                        }`,

                        fontSize: "14px",
                      }),
                      menu: (styles) => ({
                        ...styles,
                        background: "white",
                        zIndex: 9999,
                      }),
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    menuPortalTarget={document.body}
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Supervisor Email"
                  error={errFields.SupervisorEmail}
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.SupervisorEmail ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    disabled
                    name={"SupervisorEmail"}
                    placeholder="Supervisor Email"
                    value={formDetail.SupervisorEmail}
                    onChange={(e) =>
                      handleInputChange("SupervisorEmail", e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <FormField label="Programs" required error={errFields.Programs}>
                  <Select
                    name={"Programs"}
                    options={
                      programsOptions /* You need to provide options for Programs */
                    }
                    placeholder="Programs"
                    value={formDetail.Programs}
                    onChange={handleMultiSelectChange}
                    isMulti
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",
                        border: `1px solid ${
                          !errFields.Programs ? "#5BC4BF" : "red"
                        }`,

                        fontSize: "14px",
                      }),
                      menu: (styles) => ({
                        ...styles,
                        background: "white",
                        zIndex: 9999,
                      }),
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    menuPortalTarget={document.body}
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-4">
                <FormField
                  label="Navigation Clients"
                  error={errFields.NavigationClients}
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.NavigationClients ? "#5BC4BF" : "red"
                      }`,

                      fontSize: "14px",
                    }}
                    name={"NavigationClients"}
                    placeholder="Navigation Clients"
                    value={formDetail.NavigationClients}
                    onChange={(e) =>
                      handleInputChange("NavigationClients", e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center mb-[35px]">
            <button className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[13px] font-medium leading-5 text-[#2F9384] hover:bg-[#2F9384] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2F9384] focus:ring-opacity-50 transition-colors duration-300">
              Cancel
            </button>

            <button
              className="px-3 py-1 text-[13px] font-medium leading-5 bg-[#5BC4BF] border-1 border-[#5BC4BF] text-white rounded-sm font-medium hover:bg-[#429e97] focus:outline-none focus:ring-2 focus:ring-[#429e97] focus:ring-opacity-50 transition-colors duration-300"
              onClick={handleSubmit}
            >
              {`${isEdit ? "Update" : "Save"}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PageHeader({ title }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-100 mb-4">
      <p className="m-0 p-0 text-[20px] font-medium">{title}</p>
      <Link
        className="p-2 bg-[#EAECEB]"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        <img
          src={BackArrowIcon}
          alt="back arrow"
          className="h-[15px] w-[100%]"
        />
      </Link>
    </div>
  );
}

function FormField({ required = false, label = "", error, children }) {
  return (
    <>
      <div className="flex flex-column gap-1 w-100">
        {label && (
          <p className="mb-1 ms-1 text-base flex gap-2 items-center font-medium">
            <span>{label}</span>
            {required && <span className="text-red-400">*</span>}
          </p>
        )}
        {children}
        {error && <p className="mt-1 ms-1 text-xs text-red-400">{error}</p>}
      </div>
    </>
  );
}
