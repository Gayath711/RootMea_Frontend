import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputElement from "../../components/dynamicform/FormElements/InputElement";
import ProfilePicture from "../../image/profile_picture.svg";
import SelectElement from "../../components/dynamicform/FormElements/SelectElement";
import TextAreaElement from "../../components/dynamicform/FormElements/TextAreaElement";
import DateInput from "../../components/common/DateInput";
import FormLabel from "../../components/dynamicform/FormElements/FormLabel";
import { protectedApi } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { notifyError } from "../../helper/toastNotication";
import { format } from "date-fns";
import BasicTable from "../../components/react-table/BasicTable";
import ThreeDotsIcon from "../../image/threedots.svg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CancelRoundedIcon from "../../image/Cancel.svg";
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
function AddNewElement({ label, button, required, className ,onclick}) {
  return (
    <div
      className={`flex rounded-[5px] justify-between items-center p-3 m-1 ${className}`}
    >
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <button className="px-4 py-2 bg-[#2F9384] text-sm text-white rounded-[3px]" onClick={onclick}>
        {button}
      </button>
    </div>
  );
}

function FormButtonWrapper({
  children,
  label,
  button,
  className,
  onclick,
  img,
}) {
  return (
    <div className={`rounded-[6px] bg-white shadow ${className}`}>
      <div className="w-full px-3 py-2.5 border-b border-spacing-1 text-xl font-medium flex justify-between">
        {label}
        {img ? (
          <img src={img} onClick={onclick} className="cursor-pointer" />
        ) : (
          ""
        )}
        {button ? (
          <button
            className="px-4 py-2 bg-[#2F9384] text-sm text-white rounded-[3px]"
            onClick={onclick}
          >
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
function AlertDialog({ open, handleClose }) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormButtonWrapper
              label={"Interventions"}
              img={CancelRoundedIcon}
              className={"text-black my-3"}
              onclick={handleClose}
            >
              <div className="col-span-12">
                <TextAreaElement
                  className="border-keppel"
                  value={""}
                  onChange={() => {}}
                  label="Interventions"
                />
              </div>
              <div className="col-span-6">
                <DateInput
                  value={""}
                  dateFormat="MM-dd-yyyy"
                  className="m-1 h-[37.6px] border-keppel"
                  height="37.6px"
                  label={"Completed Date"}
                />
              </div>
              <div className="col-span-6">
                <DateInput
                  value={""}
                  dateFormat="MM-dd-yyyy"
                  className="m-1 h-[37.6px] border-keppel"
                  height="37.6px"
                  label={"Due Date"}
                />
              </div>
              <div className="col-span-12">
                <TextAreaElement
                  className="border-keppel"
                  value={""}
                  onChange={() => {}}
                  label="Notes"
                />
              </div>
            </FormButtonWrapper>
            <div className="flex items-center justify-center mt-4 gap-2">
              <button
                onClick={handleClose}
                className="border border-[#5BC4BF] w-[150px] font-normal text-base text-black rounded-[3px] p-2 mr-3"
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className="bg-[#5BC4BF] text-black p-2 w-[150px] font-normal text-base rounded-[3px] "
              >
                Add New
              </button>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
const TheNewCarePlan = () => {
  const { clientId } = useParams();
  const [status, setStatus] = useState(true);
  const [clientDetails, setClientDetails] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [data, setdata] = useState([
    {
      user: "Marcus",
      action: "Lorem ipsum dolor sit .....",
      date: "1/3/2022",
      time: "4:00 PM",
    },
    {
      user: "Kioni",
      action: "Lorem ipsum dolor sit .....",
      date: "1/2/2000",
      time: "8:00 AM",
    },
    {
      user: "Marcus",
      action: "Lorem ipsum dolor sit .....",
      date: "1/2/2000",
      time: "4:00 PM",
    },
  ]);
  const [interventionData, setInterventionData] = useState([
    {
      id: 1,
      name: "John",
      dueDate: "08/12/2024",
      completedDate: "08/18/2024",
      notes: "Lorem ipsum dolor sit .....",
    },
    {
      id: 2,
      name: "Jane",
      dueDate: "08/12/2024",
      completedDate: "08/18/2024",
      notes: "Lorem ipsum dolor sit .....",
    },
    {
      id: 3,
      name: "Doe",
      dueDate: "08/12/2024",
      completedDate: "08/18/2024",
      notes: "Lorem ipsum dolor sit .....",
    },
    {
      id: 4,
      name: "Mark",
      dueDate: "08/12/2024",
      completedDate: "08/18/2024",
      notes: "Lorem ipsum dolor sit .....",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchClientDetails({ clientId })
      .then((clientDetailsResponse) => {
        setClientDetails(clientDetailsResponse);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  useEffect(() => {
    console.log(clientDetails, "clientDetails");
  }, [clientDetails]);

  const handleButtonClick = (component) => {
    if (component === "goal_1") {
      setStatus(true);
    } else if (component === "carePlanStatus") {
      setStatus(false);
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "User",
        accessor: "user",
        align: "left",
      },
      {
        Header: "Action",
        accessor: "action",
        align: "left",
      },
      {
        Header: "Date",
        accessor: "date",
        align: "left",
      },
      {
        Header: "Time",
        accessor: "time",
        align: "left",
      },
    ],
    []
  );

  const intervention_columns = useMemo(
    () => [
      { Header: "#", accessor: "id" },
      { Header: "Intervention", accessor: "name" },
      { Header: "Due Date", accessor: "dueDate" },
      { Header: "Completed Date", accessor: "completedDate" },
      { Header: "Notes", accessor: "notes" },
      {
        Header: "Add section",
        accessor: "addSection",
        Cell: () => (
          <img
            src={ThreeDotsIcon}
            alt="Add Section"
            className="cursor-pointer mx-auto"
          />
        ),
      },
    ],
    []
  );
  return (
    <div className="mx-1" style={{ fontFamily: "poppins" }}>
      <PageTitle
        title="Care Plan"
        clientId={clientId}
        onClick={() => navigate(`/clientchart/${clientId}`)}
      />
      {open ? (
        <AlertDialog open={open} handleClose={handleClose} />
      ) : (
        <>
          <div className="rounded-[5px] my-6">
            <div className="grid gap-y-8">
              <FormWrapper label="Client care plan details">
                <div className="col-span-3">
                  <InputElement
                    type="text"
                    value={
                      (clientDetails?.first_name || "") +
                      " " +
                      (clientDetails?.last_name || "")
                    }
                    disabled
                    className=""
                    placeholder="Enter Client Name"
                    label={"Client Name"}
                  />
                </div>
                <div className="col-span-3">
                  <InputElement
                    type="text"
                    value={clientDetails?.preferred_pronouns || ""}
                    disabled
                    className=""
                    placeholder="Enter Preferred pronouns"
                    label={"Preferred pronouns"}
                  />
                </div>
                <div className="col-span-3">
                  <DateInput
                    value={
                      clientDetails?.date_of_birth
                        ? format(clientDetails?.date_of_birth, "MM-dd-yyyy")
                        : ""
                    }
                    dateFormat="MM-dd-yyyy"
                    className=" h-[37.6px]"
                    isEdittable
                    height="37.6px"
                    label="Date of birth"
                  />
                </div>
                <div className="col-span-2 row-span-4 ml-8 flex justify-center items-center">
                  <img
                    src={ProfilePicture}
                    className="w-full"
                    alt="profile_picture"
                  />
                </div>
                <div className="col-span-3">
                  <InputElement
                    type="text"
                    value={clientDetails?.system_id || "12345"}
                    disabled
                    className=""
                    placeholder="Enter System Id"
                    label={"System Id"}
                  />
                </div>
                <div className="col-span-3">
                  <InputElement
                    type="text"
                    value={clientDetails?.primary_phone || ""}
                    disabled
                    className=""
                    placeholder="Enter Primary phone"
                    label={"Primary phone"}
                  />
                </div>
                <div className="col-span-3">
                  <InputElement
                    type="text"
                    value={clientDetails?.email_address || ""}
                    disabled
                    className=""
                    placeholder="Enter Email"
                    label={"Email"}
                  />
                </div>
                <div className="col-span-3">
                  <SelectElement
                    placeholder="54321a"
                    className=""
                    label={"User Name"}
                    value={""}
                    options={[]}
                  />
                </div>
                <div className="col-span-3">
                  <SelectElement
                    placeholder="Facility"
                    className=""
                    label={"Facility"}
                    value={""}
                    options={[]}
                  />
                </div>
                <div className="col-span-3">
                  <SelectElement
                    placeholder="Program"
                    className=""
                    label={"Program"}
                    value={""}
                    options={[]}
                  />
                </div>
                <div className="col-span-6">
                  <SelectElement
                    placeholder="Care Plan Template"
                    className=""
                    label={"Care Plan Template"}
                    value={""}
                    options={[]}
                  />
                </div>
                <div className="col-span-3">
                  <DateInput
                    value={
                      clientDetails?.date_of_birth
                        ? format(clientDetails?.date_of_birth, "MM-dd-yyyy")
                        : ""
                    }
                    dateFormat="MM-dd-yyyy"
                    className=" h-[37.6px]"
                    height="37.6px"
                    label="Created Date"
                  />
                </div>
              </FormWrapper>
            </div>
          </div>
          <div className="rounded-[5px] my-6 bg-white">
            <div className="flex gap-3 p-4 flex-wrap">
              <button
                className={`p-2 w-[200px] font-normal text-base rounded-sm ${
                  status
                    ? "bg-[#5BC4BF] text-white"
                    : "bg-white border border-[#5BC4BF]"
                }`}
                onClick={() => handleButtonClick("goal_1")}
              >
                GOAL 1
              </button>
              <button
                className={` w-[200px] font-normal text-base rounded-sm ${
                  !status
                    ? "bg-[#5BC4BF] text-white"
                    : "bg-white border border-[#5BC4BF]"
                }`}
                onClick={() => handleButtonClick("carePlanStatus")}
              >
                CARE PLAN STATUS
              </button>
            </div>
            {status ? (
              <>
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
                        className="border border-[#5BC4BF] border-keppel text-[#858585]"
                        value={""}
                        options={[
                          { label: "High", value: "High" },
                          { label: "Medium", value: "Medium" },
                          { label: "Low", value: "Low" },
                        ]}
                      />
                    </div>
                    <div className="col-span-6">
                      <SelectElement
                        placeholder="Stage of Readiness"
                        className="border border-[#5BC4BF] border-keppel text-[#858585]"
                        value={""}
                        options={[
                          {
                            label: "Precontemplation",
                            value: "Precontemplation",
                          },
                          { label: "Contemplation", value: "Contemplation" },
                          { label: "Preparation", value: "Preparation" },
                          { label: "Action", value: "Action" },
                          { label: "Maintenance", value: "Maintenance" },
                        ]}
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
                    {!interventionData.length ? (
                      <div className="col-span-12">
                        <AddNewElement
                          className="border border-keppel"
                          label="Interventions"
                          button={"Add new"}
                          onclick={handleClickOpen}
                        />
                      </div>
                    ) : (
                      <div className="col-span-12">
                        <FormButtonWrapper
                          label="Interventions"
                          button={"Add new"}
                          className={"mt-6"}
                          onclick={handleClickOpen}
                        >
                          <div className="col-span-12">
                            <BasicTable
                              type={"intervention"}
                              columns={intervention_columns}
                              data={interventionData}
                            />
                          </div>
                        </FormButtonWrapper>
                      </div>
                    )}
                  </FormButtonWrapper>
                </div>
                <div className="grid m-6">
                  <FormButtonWrapper label={"Goal 1 Outcome"}>
                    <div className="col-span-6">
                      <SelectElement
                        placeholder="Status"
                        className="border border-[#5BC4BF] border-keppel text-[#858585]"
                        value={""}
                        options={[
                          { label: "Not Started", value: "Not Started" },
                          { label: "In Progress", value: "In Progress" },
                          { label: "Completed", value: "Completed" },
                          { label: "Not Completed", value: "Not Completed" },
                        ]}
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
              </>
            ) : (
              <>
                <div className="m-6">
                  <FormButtonWrapper
                    label="Care plan status"
                    button={"View history"}
                  >
                    <div className="col-span-12">
                      <BasicTable
                        type={"carePlanStatus"}
                        columns={columns}
                        data={data}
                      />
                    </div>
                    <div className="col-span-12 m-auto">
                      <button className="border border-[#5BC4BF] w-[150px] font-normal text-base rounded-sm p-2 mr-3">
                        Cancel
                      </button>
                      <button className="bg-[#5BC4BF] text-white p-2 w-[150px] font-normal text-base rounded-sm ">
                        Save/edit
                      </button>
                    </div>
                  </FormButtonWrapper>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TheNewCarePlan;
