import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import axios from "axios";

import ClosePNG from "../images/close.png";
import DropDown from "../common/Dropdown";
import TextBox from "../common/TextBox";
import DateInput from "../common/DateInput";
import TimeInput from "../common/TimeInput";
import apiURL from "../.././apiConfig";

const AddAppointment = ({
  toggleModal,
  savedEvents,
  setSavedEvents,
  fetchEvents,
  setShowAlert,
}) => {
  const options = [
    { value: "15 mins before time", label: "15 mins before time" },
    { value: "on time", label: "on time" },
  ];
  const [selectedTime, setSelectedTime] = useState(null);

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
      const formattedDate = format(value, "yyyy-MM-dd");
      console.log("name,value", name, formattedDate);
      setDate(formattedDate);
    } else if (name === "start_time") {
      setStartTime(value);
    } else if (name === "end_time") {
      setEndTime(value);
    }
    setValue(name, value);
  };

  console.log({
    startTime,
    endTime,
  });

  const onSubmit = (data) => {
    reset();
    toggleModal();
    console.log("data", data);

    let start_datetime = new Date(data.date);
    // Set the time part of combinedDate to match startTime
    start_datetime.setHours(data.start_time.getHours());
    start_datetime.setMinutes(data.start_time.getMinutes());
    start_datetime.setSeconds(data.start_time.getSeconds());

    let end_datetime = new Date(data.date);
    // Set the time part of combinedDate to match startTime
    end_datetime.setHours(data.end_time.getHours());
    end_datetime.setMinutes(data.end_time.getMinutes());
    end_datetime.setSeconds(data.end_time.getSeconds());

    const event = {
      summary: data.appointement_title,
      start_datetime: start_datetime.toISOString(),
      end_datetime: end_datetime.toISOString(),
    };
    console.log("event", event);

    // Save the new event
    axios
      .post(`${apiURL}/create_event/`, event)
      .then((response) => {
        // setSavedEvents(response.data.data);
        console.log(response.data);

        setShowAlert(true);
        fetchEvents();
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Error fetching Client Diagnosis Data:", error);
      });

    // setSavedEvents([...savedEvents, data]);
    // console.log("savedEvents", savedEvents);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="flex flex-col">
            <div className="border border-gray-500" />
            <div className="p-3">
              <TextBox
                name="appointement_title"
                placeholder="Appointment Title"
                register={register}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3">
              <TextBox
                name="client_name"
                placeholder="Client Name"
                register={register}
              />
            </div>
            <div className="p-3">
              <DateInput
                name="date"
                placeholder="Date"
                register={register}
                value={date}
                handleChange={(date) => handleDateChange("date", date)}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3">
              <TimeInput
                name="start_time"
                placeholder="Start Time"
                value={startTime}
                handleChange={(value) => handleDateChange("start_time", value)}
              />
            </div>
            <div className="p-3">
              <TimeInput
                name="end_time"
                placeholder="End Time"
                value={endTime}
                handleChange={(value) => handleDateChange("end_time", value)}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3 w-1/2">
              <TextBox
                name="scheduler_name"
                placeholder="Scheduler Name"
                register={register}
              />
            </div>
            <div className="p-3 w-1/2">
              {/* <DropDown placeholder="Remainder Notification" options={options} /> */}
              <TextBox
                name="remainder_notification"
                placeholder="Remainder Notification"
                register={register}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="p-3 w-full">
              <TextBox
                name="comments"
                placeholder="Comments"
                register={register}
              />
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
