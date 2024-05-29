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
import DnDCustomFields from "../DnDCustomFields";

import CollapseOpenSvg from "../../components/images/collpase-open.svg";
import CollapseCloseSvg from "../../components/images/collapse-close.svg";

export default function ClientReferral() {
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

  const [usersData, setUsersData] = useState({});
  const [positionTitleOptions, setPositionTitleOptions] = useState([]);
  const [primaryFaculityOptions, setPrimaryFaculityOptions] = useState([]);
  const [supervisorOptions, setSupervisorOptions] = useState([]);
  const [programsOptions, setProgramsOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  //   useEffect(() => {
  //     fetchPositionTitles();
  //     fetchPrimaryFaculity();
  //     fetchSupervisor();
  //     fetchPrograms();

  //     // Clean up effect
  //     return () => {
  //       // Optionally do any cleanup here
  //     };
  //   }, []); // Empty dependency array means this effect runs only once after the component mounts

  //   useEffect(() => {
  //     if (JSON.stringify(errFields) !== "{}") {
  //       fieldValidation();
  //     }
  //   }, [formDetail]);

  //   useEffect(() => {
  //     if (paramid) {
  //       fetchData();
  //       fetchUser();
  //     }
  //   }, [paramid]);

  //   useEffect(() => {
  //     if (paramid && JSON.stringify(usersData) !== "{}") {
  //       let PositionTitleData = usersData?.profile?.position
  //         ? {
  //             ...formDetail.PositionTitle,
  //             label: usersData.profile.position,
  //           }
  //         : {};
  //       let PrimaryFaculityData = usersData?.profile?.facility
  //         ? {
  //             ...formDetail.PrimaryFaculity,
  //             label: usersData.profile.facility,
  //           }
  //         : {};
  //       let SupervisorData = {
  //         ...formDetail.Supervisor,
  //         label:
  //           usersData?.profile?.supervisor_first_name ||
  //           "" + " " + usersData?.profile?.supervisor_last_name ||
  //           "",
  //       };

  //       setFormDetail((prev) => {
  //         return {
  //           ...prev,
  //           PositionTitle: {
  //             ...formDetail.PositionTitle,
  //             ...PositionTitleData,
  //           },
  //           PrimaryFaculity: {
  //             ...formDetail.PrimaryFaculity,
  //             ...PrimaryFaculityData,
  //           },
  //           Supervisor: {
  //             ...formDetail.Supervisor,
  //             ...SupervisorData,
  //           },
  //           SupervisorEmail: usersData?.profile?.supervisor_email || "",
  //         };
  //       });
  //     }
  //   }, [usersData, paramid]);

  //   const isEdit = useMemo(() => {
  //     const { pathname } = location;
  //     const splittedPath = pathname.split("/");
  //     if (paramid && splittedPath.includes("update-staff-directory")) {
  //       return true;
  //     }
  //     return false;
  //   }, [paramid, location]);

  const isEdit = false;

  //   const fetchData = () => {
  //     axios
  //       .get(`/api/users/${paramid}`)
  //       .then((response) => {
  //         setLoadingData(true);
  //         const { data } = response;
  //         setFormDetail((prev) => {
  //           return {
  //             LastName: data.last_name || "",
  //             FirstName: data.first_name || "",
  //             PhoneNumber: data.profile.phone_no || "",
  //             EmailId: data.email || "",
  //             AdditionalContactInformation: "",
  //             PositionTitle: data?.profile?.position
  //               ? {
  //                   id: data.profile.position,
  //                   value: data.profile.position,
  //                 }
  //               : null,
  //             PrimaryFaculity: data?.profile?.facility
  //               ? {
  //                   id: data.profile.facility,
  //                   value: data.profile.facility,
  //                 }
  //               : null,
  //             Supervisor: data?.profile?.supervisor
  //               ? {
  //                   id: data.profile.supervisor,
  //                   value: data.profile.supervisor,
  //                 }
  //               : null,
  //             SupervisorEmail: data?.profile?.supervisor_email || "",
  //             Programs: data?.profile?.program
  //               ? data.profile.program.map((item) => {
  //                   return {
  //                     ...item,
  //                     label: item.program,
  //                     value: item.program,
  //                   };
  //                 })
  //               : [],
  //             NavigationClients: "",
  //           };
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching program details:", error);
  //       })
  //       .finally(() => {
  //         setLoadingData(false);
  //       });
  //   };

  //   const fetchUser = async () => {
  //     try {
  //       const { data } = await axios.get("/api/users");
  //       const foundUser = data.find((user) => +user.id === +paramid);
  //       if (foundUser) {
  //         setUsersData(foundUser);
  //       } else {
  //         throw new Error("User not found");
  //       }
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error fetching users list:", error);
  //     }
  //   };

  //   const fetchPositionTitles = async () => {
  //     try {
  //       const response = await axios.get("/api/resources/position");
  //       setPositionTitleOptions(
  //         response.data.map((itm) => {
  //           return { ...itm, label: itm.name, value: itm.id };
  //         })
  //       );
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error fetching position titles:", error);
  //     }
  //   };
  //   const fetchPrimaryFaculity = async () => {
  //     try {
  //       const response = await axios.get("/api/resources/facilities");
  //       setPrimaryFaculityOptions(
  //         response.data.map((itm) => {
  //           return { ...itm, label: itm.name, value: itm.id };
  //         })
  //       );
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error fetching position titles:", error);
  //     }
  //   };
  //   const fetchSupervisor = async () => {
  //     try {
  //       const response = await axios.get("/api/users");
  //       setSupervisorOptions(
  //         response.data.map((itm) => {
  //           return {
  //             ...itm,
  //             label: itm.first_name + " " + itm.last_name,
  //             value: itm.id,
  //           };
  //         })
  //       );
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error fetching position titles:", error);
  //     }
  //   };
  //   const fetchPrograms = async () => {
  //     try {
  //       const response = await axios.get("/api/resources/program");
  //       setProgramsOptions(
  //         response.data.map((itm) => {
  //           return {
  //             ...itm,
  //             program: itm.name,
  //             label: itm.name,
  //             value: itm.name,
  //           };
  //         })
  //       );
  //     } catch (error) {
  //       // Handle errors here
  //       console.error("Error fetching position titles:", error);
  //     }
  //   };

  const fieldValidation = () => {
    let errorFields = {};

    if (!formDetail.FirstName) {
      errorFields.FirstName = "Please fill the first name";
    }

    if (!formDetail.LastName) {
      errorFields.LastName = "Please fill the last name";
    }

    // if (!formDetail.PhoneNumber) {
    //   errorFields.PhoneNumber = "Please fill the phone number";
    // }

    if (!formDetail.EmailId) {
      errorFields.EmailId = "Please fill the email id";
    }

    // if (!formDetail.PositionTitle) {
    //   errorFields.PositionTitle = "Please select the position";
    // }

    // if (!formDetail.PrimaryFaculity) {
    //   errorFields.PrimaryFaculity = "Please select the faculty";
    // }
    // if (!formDetail.Supervisor) {
    //   errorFields.Supervisor = "Please select the supervisor";
    // }

    // if (formDetail.Programs.length === 0) {
    //   errorFields.Programs = "Please select minimum one Programs";
    // }
    setErrFields(errorFields);

    if (JSON.stringify(errorFields) === "{}") {
      return true; // true when validation success
    }

    return false; // false when validation fails
  };

  const handleSubmit = async () => {
    if (fieldValidation()) {
      setIsSubmitting(true);
      try {
        // Concatenate first name and last name, remove spaces, and keep alphanumeric characters
        const username = `${formDetail.FirstName}${formDetail.LastName}`
          .replace(/\s+/g, "") // Remove spaces
          .replace(/[^\w]+/g, "");

        let data = {
          first_name: formDetail.FirstName,
          last_name: formDetail.LastName,
          email: formDetail.EmailId,
          username: username,
        };

        let phone_no = formDetail.PhoneNumber || "";
        let position = formDetail.PositionTitle?.id || "";
        let facility = formDetail.PrimaryFaculity?.id || "";
        let supervisor = formDetail.Supervisor?.id || "";
        let program = formDetail.Programs.map((each) => {
          return isEdit ? { id: each.id, program: each.program } : each.id;
        });

        let profile = {};

        if (phone_no !== "") {
          profile.phone_no = phone_no;
        }

        if (position !== "") {
          profile.position = position;
        }

        if (facility !== "") {
          profile.facility = facility;
        }

        if (supervisor !== "") {
          profile.supervisor = supervisor;
        }

        if (program.length > 0) {
          profile.program = program;
        } else {
          if (JSON.stringify(profile) !== "{}") {
            profile.program = [];
          }
        }

        if (JSON.stringify(profile) !== "{}") {
          data.profile = profile;
        }

        // const data = {
        //   first_name: formDetail.FirstName,
        //   last_name: formDetail.LastName,
        //   email: formDetail.EmailId,
        //   username: username,
        //   profile: {
        //     phone_no: formDetail.PhoneNumber || "",
        //     position: formDetail.PositionTitle?.id || "",
        //     facility: formDetail.PrimaryFaculity?.id || "",
        //     supervisor: formDetail.Supervisor?.id || "",
        //     program: formDetail.Programs.map((each) => {
        //       return isEdit ? { id: each.id, program: each.program } : each.id;
        //     }),
        //   },
        // };

        console.log({ data });

        let apiCall = axios.post;
        let endpoint = "/api/users";

        if (isEdit) {
          apiCall = axios.put;
          endpoint = `${endpoint}/${paramid}`;
        }

        const response = await apiCall(endpoint, data);
        notifySuccess(`Staff ${isEdit ? "Updated" : "Added"} successfully`);
        navigate(`/staff-directory/${response.data.id}`, { replace: true });
      } catch (error) {
        if (error.response.status === 400) {
          if (error?.response?.data) {
            Object.keys(error.response.data).map((itm) => {
              error.response.data[itm].map((errMsg) => notifyError(errMsg));
            });
          }
        } else {
          notifyError(
            `Error ${isEdit ? "Updating" : "Adding"} staff, try after sometime`
          );
        }

        console.error(`Error ${isEdit ? "Updating" : "Adding"} staff:`, error);
      } finally {
        setIsSubmitting(false);
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

  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [customFields, setCustomFields] = useState([]);
  const onChange = (dndItems) => {
    setCustomFields(dndItems);
  };

  let viewMode = true;
  let editMode = true;

  return (
    <>
      <div className="flex flex-column gap-2 items-center">
        <PageHeader title={`Client Referral`} />
        <div className="flex flex-column gap-2 w-100 shadow-md rounded-md relative">
          <div className="w-100 bg-[#5BC4BF] text-white p-2.5 px-4">
            Client Referral
          </div>
          <div className="flex flex-column gap-1 p-3">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-3">
                <FormField label="Client Name" error={errFields.Programs}>
                  <Select
                    name={"ClientName"}
                    options={
                      programsOptions /* You need to provide options for Programs */
                    }
                    placeholder="Select Client Name"
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
              <div className="w-full md:w-1/2 p-3">
                <FormField label="Program Name" error={errFields.Programs}>
                  <Select
                    name={"ProgramName"}
                    options={
                      programsOptions /* You need to provide options for Programs */
                    }
                    placeholder="Select Program Name"
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
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-3">
                <FormField label="DOB" error={errFields.EmailId}>
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.EmailId ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"DOB"}
                    placeholder="DOB"
                    value={formDetail.EmailId}
                    onChange={(e) =>
                      handleInputChange("EmailId", e.target.value)
                    }
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <FormField
                  label="Referred By"
                  error={errFields.LastName}
                  required={false}
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.LastName ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"ReferredBy"}
                    placeholder="Referred By"
                    value={formDetail.LastName}
                    onChange={(e) =>
                      handleInputChange("LastName", e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-3">
                <FormField label="Submitted Date" error={errFields.EmailId}>
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.EmailId ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"SubmittedDate"}
                    placeholder="Submitted Date"
                    value={formDetail.EmailId}
                    onChange={(e) =>
                      handleInputChange("EmailId", e.target.value)
                    }
                  />
                </FormField>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <FormField
                  label="Submitted Time"
                  error={errFields.LastName}
                  required={false}
                >
                  <input
                    className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                    style={{
                      border: `1px solid ${
                        !errFields.LastName ? "#5BC4BF" : "red"
                      }`,
                      fontSize: "14px",
                    }}
                    name={"SubmittedTime"}
                    placeholder="Submitted Time"
                    value={formDetail.LastName}
                    onChange={(e) =>
                      handleInputChange("LastName", e.target.value)
                    }
                  />
                </FormField>
              </div>
            </div>

            <div className="mx-[20px] my-[15px]">
              <div className="rounded-[6px] border border-keppel">
                <div
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                  }}
                  className="w-full px-3 py-2.5 border-b border-keppel text-xl font-medium flex justify-between items-center gap-2 cursor-pointer"
                >
                  <span className="text-base">Custom Fields</span>
                  <img
                    src={isOpen ? CollapseCloseSvg : CollapseOpenSvg}
                    alt="collapse-icon"
                    className="w-[16px] h-[16px]"
                  />
                </div>
                {isOpen && (
                  <div className="px-4 py-3">
                    <DnDCustomFields
                      onChange={onChange}
                      dndItems={customFields}
                      //   viewMode={viewMode}
                      //   editMode={editMode}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mx-[20px] my-[15px]">
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
          </div>
          <div className="flex gap-2 items-center justify-center mb-[35px]">
            <button className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[13px] font-medium leading-5 text-[#2F9384] hover:bg-[#2F9384] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2F9384] focus:ring-opacity-50 transition-colors duration-300">
              Cancel
            </button>

            <button
              className="px-3 py-1 text-[13px] font-medium leading-5 bg-[#5BC4BF] border-1 border-[#5BC4BF] text-white rounded-sm font-medium hover:bg-[#429e97] focus:outline-none focus:ring-2 focus:ring-[#429e97] focus:ring-opacity-50 transition-colors duration-300"
              //   onClick={handleSubmit}
            >
              {`${isEdit ? "Update" : "Submit"}`}
            </button>
          </div>

          {isSubmitting && (
            <div className="flex flex-column absolute top-0 left-0 items-center justify-center gap-2 w-100 h-100 bg-gray-100/80">
              <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-base">
                {isEdit ? "Updating..." : "Creating.."}
              </p>
            </div>
          )}
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
