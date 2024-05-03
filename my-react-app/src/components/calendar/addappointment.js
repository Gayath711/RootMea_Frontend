import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import axios from "axios";

import ClosePNG from "../images/close.png";
import DropDown from "../common/Dropdown";
import TextBox from "../common/TextBox";
import DateInput from "../common/DateInput";
import TimeInput from "../common/TimeInput";
import apiURL from "../.././apiConfig";

const AddAppointment = ({ toggleModal, fetchEvents, setShowAlert }) => {
  const options = [
    { value: "15 mins before time", label: "15 mins before time" },
    { value: "on time", label: "on time" },
  ];
  const [selectedTime, setSelectedTime] = useState(null);

  const [isExternal, setIsExternal] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleDateChange = (name, value) => {
    if (name === "date") {
      const formattedDate = format(value, "MM-dd-yyyy");
      setDate(formattedDate);
    } else if (name === "start_time") {
      setStartTime(value);
    } else if (name === "end_time") {
      setEndTime(value);
    }
    setValue(name, value);
  };

  const onSubmit = (data) => {
    reset();
    toggleModal();

    let start_datetime = new Date(data.date);
    start_datetime.setHours(data.start_time.getHours());
    start_datetime.setMinutes(data.start_time.getMinutes());
    start_datetime.setSeconds(data.start_time.getSeconds());

    let end_datetime = new Date(data.date);
    end_datetime.setHours(data.end_time.getHours());
    end_datetime.setMinutes(data.end_time.getMinutes());
    end_datetime.setSeconds(data.end_time.getSeconds());

    let endpoint = isExternal ? "/create_event/" : "/django/create_event/";

    let splittedAttendees = data.attendees.split(",").map((email) => {
      return {
        email,
      };
    });

    let event = {
      summary: data.appointement_title,
      start_datetime: start_datetime.toISOString(),
      end_datetime: end_datetime.toISOString(),
      attendees: splittedAttendees,
    };

    axios
      .post(`${apiURL}${endpoint}`, event)
      .then((response) => {
        setShowAlert(true);
        fetchEvents();
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Error fetching Client Diagnosis Data:", error);
      });
  };

  const handleToggle = (value) => {
    setIsExternal(value === "external");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col border bg-white border-gray-500 rounded-md">
          <div className=" bg-white rounded-lg">
            <header className="flex flex-row justify-between items-start px-3 pt-3">
              <p className="text-gray-600 font-semibold">Add New Appointment</p>
              <button onClick={toggleModal} className="">
                <img src={ClosePNG} className="w-4 h-4"></img>
              </button>
            </header>
          </div>
          <div className="my-1 border border-gray-500" />
          <div className="flex flex-col">
            <div className="p-3">
              <TextBox
                name="appointement_title"
                placeholder="Appointment Title"
                register={register}
                registerProps={{ required: true }}
              />
              {errors.appointement_title && (
                <span className="text-xs ms-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3">
              <TextBox
                name="client_name"
                placeholder="Client Name"
                register={register}
                registerProps={{ required: true }}
              />
              {errors.client_name && (
                <span className="text-xs ms-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="p-3">
              <DateInput
                name="date"
                placeholder="Date"
                register={register}
                registerProps={{ required: true }}
                value={date}
                handleChange={(date) => handleDateChange("date", date)}
              />

              {errors.date && (
                <span className="text-xs ms-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3">
              <TimeInput
                name="start_time"
                placeholder="Start Time"
                value={startTime}
                handleChange={(value) => handleDateChange("start_time", value)}
                register={register}
                selectedDate={date}
                registerProps={{ required: true }}
              />
              {errors.start_time && (
                <span className="text-xs ms-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="p-3">
              <TimeInput
                name="end_time"
                placeholder="End Time"
                value={endTime}
                handleChange={(value) => handleDateChange("end_time", value)}
                register={register}
                selectedDate={date}
                registerProps={{ required: true }}
              />
              {errors.end_time && (
                <span className="text-xs ms-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3 w-full">
              <TextBox
                name="attendees"
                placeholder="Attendees (comma separated)"
                register={register}
                registerProps={{
                  required: true,
                  validate: (value) => {
                    const emailPattern = /\S+@\S+\.\S+/;
                    const emails = value
                      .split(",")
                      .map((email) => email.trim());
                    return (
                      emails.every((email) => emailPattern.test(email)) ||
                      "Invalid email format"
                    );
                  },
                }}
              />
              {errors.attendees && (
                <span className="text-xs ms-1 text-red-500">
                  {errors.attendees.message}
                </span>
              )}
              {errors.attendees && errors.attendees.type === "required" && (
                <span className="text-xs ms-1 text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center py-3 px-1 gap-3">
            <div className="">
              <label className="inline-flex items-center text-xs">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-[#43B09C] accent-teal-600"
                  name="toggleType"
                  value="external"
                  checked={isExternal}
                  onChange={() => handleToggle("external")}
                />
                <span className="ml-2 text-gray-700">External (Google)</span>
              </label>
            </div>
            <div className="">
              <label className="inline-flex items-center text-xs">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-[#43B09C] accent-teal-600"
                  name="toggleType"
                  value="internal"
                  checked={!isExternal}
                  onChange={() => handleToggle("internal")}
                />
                <span className="ml-2 text-gray-700">Internal</span>
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center pb-4">
            <div className="p-3">
              <div className="text-gray-400 text-xs">Save to Draft</div>
            </div>
            <div className="p-3">
              <button
                type="submit"
                className="w-54 h-10 bg-[#43B09C] rounded text-xs text-white p-2"
              >
                Submit Your appointment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
