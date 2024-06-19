import React, { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "react-select";
import SearchIcon from "../../components/images/search.svg";
import axios from "../../helper/axiosInstance";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ViewPNG from "../../components/images/view.png";
import EditPNG from "../../components/images/edit.png";
// import GroupIcon from "../../components/images/group.svg";
import DeactivatePNG from "../../components/images/deactivate.png";
import MUIDataGridWrapper from "../../components/HOC/MUIDataGridWrapper";

import { notifySuccess, notifyError } from "../../helper/toastNotication";
import PermissionsView from "./ViewPermissions";

export default function CreateGroup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paramid } = useParams();

  const [loadingData, setLoadingData] = useState(true);
  const [recordData, setRecordData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [formDetail, setFormDetail] = useState({
    groupName: "",
    users: [],
  });
  const [errFields, setErrFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isUpdate = useMemo(() => {
    const { pathname } = location;
    const splittedPath = pathname.split("/");
    if (paramid && splittedPath.includes("update-permission-group")) {
      return true;
    }
    return false;
  }, [paramid, location]);

  const handleGroupName = (e) => {
    const {
      target: { value },
    } = e;
    setFormDetail((prev) => {
      return { ...prev, groupName: value };
    });
  };

  const handleUsers = (value) => {
    setFormDetail((prev) => {
      return { ...prev, users: value };
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (JSON.stringify(errFields) !== "{}") {
      fieldValidation();
    }
  }, [formDetail]);

  useEffect(() => {
    if (paramid && isUpdate) {
      fetchGroupPermission();
    }
  }, [paramid, isUpdate]);

  useEffect(() => {
    if (
      paramid &&
      isUpdate &&
      JSON.stringify(recordData) !== "{}" &&
      usersData.length > 0
    ) {
      let usersInPermission = recordData.users.map((user) => {
        return user.id;
      });
      let selectedUsers = usersData.filter((user) => {
        return usersInPermission.includes(user.id);
      });
      setFormDetail((prev) => {
        return { ...prev, users: selectedUsers };
      });
    }
  }, [paramid, isUpdate, recordData, usersData]);

  console.log({ formDetail });

  const fetchGroupPermission = () => {
    axios
      .get(`/api/groups/${paramid}`)
      .then((response) => {
        const { data } = response;
        setLoadingData(true);
        setRecordData(data);
        setFormDetail((prev) => {
          return {
            ...prev,
            groupName: data.name,
          };
        });
        setPermissionsState(response.data?.permissions || []);
      })
      .catch((error) => {
        console.error("Error fetching group permissions:", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const fetchData = () => {
    axios
      .get(`api/groups`)
      .then((response) => {
        setLoadingData(true);
        setRecordData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/users");
      const optiondata = data.map((itm) => {
        return {
          label: itm.first_name || "" + itm.last_name || "",
          value: itm.id,
          ...itm,
        };
      });
      setUsersData(optiondata);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching users list:", error);
    }
  };

  const fieldValidation = () => {
    let errorFields = {};

    if (!formDetail.groupName) {
      errorFields.groupName = "Please fill the group name";
    }

    // if (formDetail.users.length === 0) {
    //   errorFields.LastName = "Please select min one user";
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
        let data = {
          name: formDetail.groupName,
          users: formDetail.users.map((itm) => {
            return itm.id;
          }),
          permissions: permissionsState.map((itm) => {
            return itm.id;
          }),
        };

        console.log({ data });

        let apiCall = axios.post;
        let endpoint = "/api/groups";

        if (isUpdate) {
          apiCall = axios.put;
          endpoint = `${endpoint}/${paramid}`;
        }

        const response = await apiCall(endpoint, data);
        notifySuccess(`Group ${isUpdate ? "Updated" : "Added"} successfully`);
        navigate(`/master`, { replace: true });
      } catch (error) {
        console.error(
          `Error ${isUpdate ? "Updating" : "Adding New"} Group:`,
          error
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      notifyError("Please check all required fields are filled");
    }
  };

  const [permissionsState, setPermissionsState] = useState([]);

  return (
    <div className="flex flex-column gap-2 items-center">
      <PageHeader title={`${isUpdate ? "Update" : "Create"} Group`} />

      <div className="flex flex-column gap-2 w-100 shadow-md rounded-md relative">
        <div className="flex flex-column gap-1 p-4">
          <div className="mx-[25px] my-[15px]">
            <FormField label="Group Name" error={errFields.groupName} required>
              <input
                className="w-100 p-[0.725rem] rounded-[2px] border-[#5BC4BF] text-base"
                style={{
                  border: `1px solid ${
                    !errFields.groupName ? "#5BC4BF" : "red"
                  }`,
                  fontSize: "14px",
                }}
                name={"groupName"}
                placeholder="Enter Group Name"
                value={formDetail.groupName}
                onChange={handleGroupName}
              />
            </FormField>
          </div>

          <div className="mx-[25px] my-[15px]">
            <FormField label="Users" error={errFields.users}>
              <Select
                name={"Users"}
                options={usersData}
                placeholder="Select Users"
                value={formDetail.users}
                onChange={(selectedOption) => {
                  handleUsers(selectedOption);
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
                isMulti
                components={{
                  IndicatorSeparator: () => null,
                }}
                menuPortalTarget={document.body}
              />
            </FormField>
          </div>

          <div className="mx-[25px] my-[15px]">
            <PermissionsView
              permissionsState={permissionsState}
              setPermissionsState={setPermissionsState}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center justify-center mb-[35px]">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[13px] font-medium leading-5 text-[#2F9384] hover:bg-[#2F9384] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2F9384] focus:ring-opacity-50 transition-colors duration-300"
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 text-[13px] font-medium leading-5 bg-[#5BC4BF] border-1 border-[#5BC4BF] text-white rounded-sm font-medium hover:bg-[#429e97] focus:outline-none focus:ring-2 focus:ring-[#429e97] focus:ring-opacity-50 transition-colors duration-300"
            onClick={handleSubmit}
          >
            {`${isUpdate ? "Update" : "Save"}`}
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
              {isUpdate ? "Updating..." : "Creating.."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PageHeader({ title }) {
  return (
    <div className="flex justify-start items-center w-100 mb-4">
      <p className="m-0 p-0 text-[20px] font-medium">{title}</p>
      {/* <Link className="p-2 bg-[#EAECEB]" to="/">
          <img
            src={BackArrowIcon}
            alt="back arrow"
            className="h-[15px] w-[100%]"
          />
        </Link> */}
    </div>
  );
}

function TableActions({
  selectorList,
  selectedValue,
  handleSelectorValue,
  searchText,
  handleSearchText,
}) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 justify-between gap-2 w-100 mt-1 mb-4">
      {/* <div className="col-start-1 col-span-1">
        <Select
            name={"selector"}
            options={selectorList}
            placeholder="Program Name"
            value={selectedValue}
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
            isClearable
            onChange={(item) => {
              handleSelectorValue(item);
            }}
            menuPortalTarget={document.body}
          />
        </div> */}
      <div className="col-end-5 col-span-2 flex gap-2 items-center justify-end">
        <div className="flex gap-1 items-center border-b-2 border-[#5BC4BF]">
          <img src={SearchIcon} className="w-[20px] h-100" />
          <input
            type={"text"}
            value={searchText}
            onChange={handleSearchText}
            placeholder="Search here"
            className={`appearance-none w-full p-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="ms-3">
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 text-[13px] font-medium leading-5 bg-[#5BC4BF] border-1 border-[#5BC4BF] text-white rounded-sm font-medium hover:bg-[#429e97] focus:outline-none focus:ring-2 focus:ring-[#429e97] focus:ring-opacity-50 transition-colors duration-300"
            onClick={() => {
              navigate("/create-new-group/");
            }}
          >
            {/* <img src={GroupIcon} className="w-[auto] h-4" /> */}
            Create New Group
          </button>
        </div>
      </div>
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
