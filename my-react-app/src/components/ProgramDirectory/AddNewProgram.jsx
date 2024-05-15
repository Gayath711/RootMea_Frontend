import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import BackArrowIcon from "../images/back-arrow.svg";
import Select from "react-select";
import axios from "../../helper/axiosInstance";
import {
  notify,
  notifyError,
  notifySuccess,
} from "../../helper/toastNotication";

export default function AddNewProgram() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paramid } = useParams();

  const [formDetail, setFormDetail] = useState({
    teamMembers: [],
    DepartmentName: null,
    ProgramName: "",
    ProgramDescription: "",
    Eligibility: "",
    ManagementAdminContacts: [],
    ClientMattersContacts: [],
  });

  const [errFields, setErrFields] = useState({});
  const [departmentNameOptions, setDepartmentNameOptions] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchDepartment();
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

  const isEdit = useMemo(() => {
    const { pathname } = location;
    const splittedPath = pathname.split("/");
    if (paramid && splittedPath.includes("update-program-directory")) {
      return true;
    }
    return false;
  }, [paramid, location]);

  const fetchData = () => {
    axios
      .get(`/api/resources/program/${paramid}`)
      .then((response) => {
        setLoadingData(true);
        const { data } = response;
        setFormDetail({
          teamMembers: data.team_members
            ? data.team_members.map((item) => {
                return {
                  ...item,
                  label: item.first_name + " " + item.last_name,
                  value: item.id,
                };
              })
            : [],
          DepartmentName: data.department_name
            ? {
                label: data.department_name,
                value: data.department_name,
              }
            : null,
          ProgramName: data.name || "",
          ProgramDescription: data.description || "",
          Eligibility: data.eligibility || "",
          ManagementAdminContacts: data.primary_contact
            ? data.primary_contact.map((item) => {
                return {
                  ...item,
                  label: item.first_name + " " + item.last_name,
                  value: item.id,
                };
              })
            : [],
          ClientMattersContacts: data.client_matter_contact
            ? data.client_matter_contact.map((item) => {
                return {
                  ...item,
                  label: item.first_name + " " + item.last_name,
                  value: item.id,
                };
              })
            : [],
        });
      })
      .catch((error) => {
        console.error("Error fetching program details:", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsersList(
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

  const fetchDepartment = async () => {
    // try {
    //   const response = await axios.get("/api/users");
    //   setDepartmentNameOptions(
    //     response.data.map((itm) => {
    //       return {
    //         ...itm,
    //         label: itm.name,
    //         value: itm.name,
    //       };
    //     })
    //   );
    // } catch (error) {
    //   // Handle errors here
    //   console.error("Error fetching department:", error);
    // }
  };

  const fieldValidation = () => {
    let errorFields = {};

    if (!formDetail.DepartmentName) {
      errorFields.DepartmentName = "Please select the department name";
    }

    if (!formDetail.ProgramName) {
      errorFields.ProgramName = "Please fill the program name";
    }

    if (!formDetail.ProgramDescription) {
      errorFields.ProgramDescription = "Please fill the program description";
    }

    if (!formDetail.Eligibility) {
      errorFields.Eligibility = "Please fill the eligibility";
    }

    if (formDetail.teamMembers.length === 0) {
      errorFields.teamMembers = "Please select minimum one team member";
    }

    if (formDetail.ManagementAdminContacts.length === 0) {
      errorFields.ManagementAdminContacts =
        "Please select minimum one Management Admin Contact";
    }

    if (formDetail.ClientMattersContacts.length === 0) {
      errorFields.ClientMattersContacts =
        "Please select minimum one Client Matters Contact";
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
        let data = {
          name: formDetail.ProgramName,
          department_name: formDetail.DepartmentName.value,
          description: formDetail.ProgramDescription,
          eligibility: formDetail.Eligibility,
          primary_contact: formDetail.ManagementAdminContacts.map(
            (each) => each.id
          ),
          client_matter_contact: formDetail.ClientMattersContacts.map(
            (each) => each.id
          ),
          team_members: formDetail.teamMembers.map((each) => each.id),
        };

        let apiCall = axios.post;

        if (isEdit) {
          apiCall = axios.put;
        }

        const response = await apiCall("/api/resources/program", data);
        notifySuccess(`Program ${isEdit ? "updated" : "added"} successfully`);
        navigate(`/program-directory/${response.data.id}`, { replace: true });
      } catch (error) {
        console.error(
          `Error ${isEdit ? "updating" : "adding"} program:`,
          error
        );
        notifyError(
          `Error ${isEdit ? "updating" : "adding"} program, try after sometime`
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

  const handleMultiSelectChange = (key, selectedOptions) => {
    setFormDetail((prevDetails) => ({
      ...prevDetails,
      [key]: selectedOptions,
    }));
  };

  return (
    <>
      <div className="flex flex-column gap-2 items-center">
        <PageHeader title={`${isEdit ? "Update" : "Add new"} program staff`} />
        <div className="flex flex-column gap-2 w-100 shadow-md rounded-md">
          <div className="flex flex-column gap-1 p-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 p-4">
                <FormField
                  label="Department Name"
                  error={errFields.DepartmentName}
                  required
                >
                  <Select
                    isClearable={false}
                    name={"DepartmentName"}
                    options={departmentNameOptions}
                    placeholder="Department Name"
                    value={formDetail.DepartmentName}
                    onChange={(item) => {
                      handleInputChange("DepartmentName", item);
                    }}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",

                        border: `1px solid ${
                          !errFields.DepartmentName ? "#5BC4BF" : "red"
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
              <div className="w-full md:w-1/3 p-4">
                <FormField
                  label="Program Name"
                  error={errFields.ProgramName}
                  required
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px]"
                    name={"ProgramName"}
                    placeholder="Program Name"
                    value={formDetail.ProgramName}
                    style={{
                      border: `1px solid ${
                        !errFields.ProgramName ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    onChange={(item) => {
                      handleInputChange("ProgramName", item.target.value);
                    }}
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <FormField
                  label="Eligibility"
                  error={errFields.Eligibility}
                  required
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px]"
                    name={"Eligibility"}
                    placeholder="Eligibility"
                    value={formDetail.Eligibility}
                    style={{
                      border: `1px solid ${
                        !errFields.Eligibility ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    onChange={(item) => {
                      handleInputChange("Eligibility", item.target.value);
                    }}
                  />
                </FormField>
              </div>
            </div>
            <div className="mx-[25px] my-[15px]">
              <FormField
                label="Program Description"
                error={errFields.ProgramDescription}
                required
              >
                <textarea
                  rows={5}
                  name={"ProgramDescription"}
                  placeholder="Program Description"
                  value={formDetail.ProgramDescription}
                  className="w-100 rounded-[2px]"
                  style={{
                    padding: "15px",
                    border: `1px solid ${
                      !errFields.ProgramDescription ? "#5BC4BF" : "red"
                    }`,
                    fontSize: "14px",
                  }}
                  onChange={(item) => {
                    handleInputChange("ProgramDescription", item.target.value);
                  }}
                />
              </FormField>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 p-4">
                <FormField
                  label="Team Members"
                  error={errFields.teamMembers}
                  required
                >
                  <Select
                    isClearable={false}
                    name={"teamMembers"}
                    options={usersList}
                    placeholder="Team Members"
                    value={formDetail.teamMembers}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",
                        // height: `${height}`,
                        border: `1px solid #5BC4BF`,
                        // background: `${bgDisabled}`,
                        fontSize: "14px",
                        // borderRadius: "0.375rem",
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
                    onChange={(item) => {
                      handleMultiSelectChange("teamMembers", item);
                    }}
                    isMulti
                    menuPortalTarget={document.body}
                  />
                </FormField>
              </div>

              <div className="w-full md:w-1/3 p-4">
                <FormField
                  label="Management / Admin Contacts"
                  error={errFields.ManagementAdminContacts}
                  required
                >
                  <Select
                    isClearable={false}
                    name={"ManagementAdminContacts"}
                    options={usersList}
                    placeholder="Management / Admin Contacts"
                    value={formDetail.ManagementAdminContacts}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",

                        border: `1px solid ${
                          !errFields.ManagementAdminContacts ? "#5BC4BF" : "red"
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
                    onChange={(item) => {
                      handleMultiSelectChange("ManagementAdminContacts", item);
                    }}
                    isMulti
                    menuPortalTarget={document.body}
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/3 p-4">
                <FormField
                  label="Client Matters Contacts"
                  error={errFields.ClientMattersContacts}
                  required
                >
                  {" "}
                  <Select
                    isClearable={false}
                    name={"ClientMattersContacts"}
                    options={usersList}
                    placeholder="Client Matters Contacts"
                    value={formDetail.ClientMattersContacts}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        padding: "5px",

                        border: `1px solid ${
                          !errFields.ClientMattersContacts ? "#5BC4BF" : "red"
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
                    onChange={(item) => {
                      handleMultiSelectChange("ClientMattersContacts", item);
                    }}
                    isMulti
                    menuPortalTarget={document.body}
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
              {isEdit ? "Update" : "Save"}
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
