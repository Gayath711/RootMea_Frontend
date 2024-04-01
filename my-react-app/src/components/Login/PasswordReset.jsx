import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import ClosePNG from "../images/close.png";
import TextBox from "../common/TextBox";
import apiURL from "../../apiConfig";

const PasswordReset = ({ toggleModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [date, setDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDateChange = (name, value) => {
    data[name] = value;
  };

  const onSubmit = (data) => {
    reset();
    toggleModal();
    console.log("data", data);
    const event = {
      summary: data.appointement_title,
      start_datetime: data.date,
      end_datetime: data.date,
    };
    console.log("event", event);

    // Save the new event
    // axios
    //   .post(`${apiURL}/create_event/`, event)
    //   .then((response) => {
    //     // setSavedEvents(response.data.data);
    //     console.log(response.data);

    //     setShowAlert(true);
    //     fetchEvents();
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching Client Diagnosis Data:", error);
    //   });

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
              <p className="text-gray-600 font-semibold">Reset Password</p>
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
          <div className="flex flex-row justify-between items-center pb-4">
            <div className="p-3">
              <button
                type="submit"
                className="w-54 h-10 border-1 border-[#43B09C] rounded text-xs p-2"
              >
                Cancel
              </button>
            </div>
            <div className="p-3">
              <button
                type="submit"
                className="w-54 h-10 bg-[#43B09C] rounded text-xs text-white p-2"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
