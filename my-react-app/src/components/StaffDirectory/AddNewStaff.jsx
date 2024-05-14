import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [formDetails, setFormDetails] = useState({
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
  }, [formDetails]);

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

    if (!formDetails.FirstName) {
      errorFields.FirstName = "Please fill the first name";
    }

    if (!formDetails.LastName) {
      errorFields.LastName = "Please fill the last name";
    }

    if (!formDetails.PhoneNumber) {
      errorFields.PhoneNumber = "Please fill the phone number";
    }

    if (!formDetails.EmailId) {
      errorFields.EmailId = "Please fill the email id";
    }

    if (!formDetails.PositionTitle) {
      errorFields.PositionTitle = "Please select the position";
    }

    if (!formDetails.PrimaryFaculity) {
      errorFields.PrimaryFaculity = "Please select the faculty";
    }
    if (!formDetails.Supervisor) {
      errorFields.Supervisor = "Please select the supervisor";
    }

    if (formDetails.Programs.length === 0) {
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
        let data = {
          first_name: formDetails.FirstName,
          last_name: formDetails.LastName,
          email: formDetails.EmailId,
          username: `${formDetails.FirstName}${formDetails.LastName}`,
          profile: {
            phone_no: `${formDetails.PhoneNumber}`,
            position: formDetails.PositionTitle.id,
            facility: formDetails.PrimaryFaculity.id,
            supervisor: formDetails.Supervisor.id,
            program: formDetails.Programs.map((each) => each.id),
          },
        };
        // POST DATA
        const response = await axios.post("/api/users", data);
        notifySuccess("Staff added successfully");
        navigate("/staff-directory/" + response.data.id, { replace: true });
        // Handle successful submission here, such as showing a success message
        // console.log("Staff added successfully:", response.data);
      } catch (error) {
        // Handle errors here
        console.error("Error adding staff:", error);
        notifyError("Error adding staff, try after sometime");
      }
    } else {
      notifyError("Please check all required fields are filled");
    }
  };

  const handleInputChange = (key, value) => {
    if (value !== " ") {
      setFormDetails((prevDetails) => ({
        ...prevDetails,
        [key]: value,
      }));
    }
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      Programs: selectedOptions,
    }));
  };

  return (
    <>
      <div className="flex flex-column gap-2 items-center">
        <PageHeader title="Add New Staff" />
        <div className="flex flex-column gap-2 w-100 shadow-md rounded-md">
          <div className="flex flex-column gap-1 p-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
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
                  value={formDetails.LastName}
                  onChange={(e) =>
                    handleInputChange("LastName", e.target.value)
                  }
                />
                {errFields.LastName && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.LastName}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 p-4">
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
                  value={formDetails.FirstName}
                  onChange={(e) =>
                    handleInputChange("FirstName", e.target.value)
                  }
                />
                {errFields.FirstName && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.FirstName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
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
                  value={formDetails.PhoneNumber}
                  onChange={(e) =>
                    handleInputChange("PhoneNumber", e.target.value)
                  }
                />
                {errFields.PhoneNumber && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.PhoneNumber}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 p-4">
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
                  value={formDetails.EmailId}
                  onChange={(e) => handleInputChange("EmailId", e.target.value)}
                />
                {errFields.EmailId && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.EmailId}
                  </p>
                )}
              </div>
            </div>
            <div className="mx-[25px] my-[15px]">
              <textarea
                rows={5}
                name={"AdditionalContactInformation"}
                placeholder="Additional Contact Information"
                value={formDetails.AdditionalContactInformation}
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
                    !errFields.AdditionalContactInformation ? "#5BC4BF" : "red"
                  }`,
                  fontSize: "14px",
                }}
              />
              {errFields.AdditionalContactInformation && (
                <p className="mt-1 ms-1 text-xs text-red-400">
                  {errFields.AdditionalContactInformation}
                </p>
              )}
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <Select
                  name={"PositionTitle"}
                  options={positionTitleOptions}
                  placeholder="Position Title"
                  value={formDetails.PositionTitle}
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
                {errFields.PositionTitle && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.PositionTitle}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 p-4">
                <Select
                  name={"PrimaryFaculity"}
                  options={primaryFaculityOptions}
                  placeholder="Primary Faculity"
                  value={formDetails.PrimaryFaculity}
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
                {errFields.PrimaryFaculity && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.PrimaryFaculity}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <Select
                  name={"Supervisor"}
                  options={supervisorOptions}
                  placeholder="Supervisor"
                  value={formDetails.Supervisor}
                  onChange={(selectedOption) => {
                    handleInputChange("Supervisor", selectedOption);
                    handleInputChange("SupervisorEmail", selectedOption?.email);
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
                {errFields.Supervisor && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.Supervisor}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 p-4">
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
                  value={formDetails.SupervisorEmail}
                  onChange={(e) =>
                    handleInputChange("SupervisorEmail", e.target.value)
                  }
                />{" "}
                {errFields.SupervisorEmail && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.SupervisorEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 p-4">
                <Select
                  name={"Programs"}
                  options={
                    programsOptions /* You need to provide options for Programs */
                  }
                  placeholder="Programs"
                  value={formDetails.Programs}
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
                />{" "}
                {errFields.Programs && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.Programs}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 p-4">
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
                  value={formDetails.NavigationClients}
                  onChange={(e) =>
                    handleInputChange("NavigationClients", e.target.value)
                  }
                />
                {errFields.NavigationClients && (
                  <p className="mt-1 ms-1 text-xs text-red-400">
                    {errFields.NavigationClients}
                  </p>
                )}
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
              Save
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
      <Link className="p-2 bg-[#EAECEB]" to="/staff-directory">
        <img
          src={BackArrowIcon}
          alt="back arrow"
          className="h-[15px] w-[100%]"
        />
      </Link>
    </div>
  );
}
