import React, { useState } from "react";
import axios from "axios"; // Don't forget to import axios if it's not already imported
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/slices/authSlice";
import { useForm } from "react-hook-form";

import RootsLogo from "../../image/root.png";
import apiURL from "../.././apiConfig";
import PasswordReset from "./PasswordReset";
import AlertSuccess from "../common/AlertSuccess";
import AlertError from "../common/AlertError";

const LoginForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSuccessAlert, setSuccessShowAlert] = useState(false);
  const [showErrorAlert, setErrorShowAlert] = useState(false);

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const closeSuccessAlert = () => {
    setSuccessShowAlert(false);
  };

  const closeErrorAlert = () => {
    setErrorShowAlert(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    setValue: setValueLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm();

  const dispatch = useDispatch();

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const handleLogin = (loginData) => {
    console.log("Login data - 1", loginData.userEmail);
    console.log("data length", Object.keys(errorsLogin).length);
    console.log("errorsLogin", errorsLogin);
    if (Object.keys(errorsLogin).length < 1) {
      const user = {
        email: loginData.userEmail,
        password: loginData.password,
      };
      console.log("Login data - 2", user);

      // axios.post(`${apiURL}/token/`, user)
      //   .then(response => {
      //     console.log(response.data)
      //     setErrorShowAlert(false);
      //     localStorage.clear();
      //     localStorage.setItem("access_token", data.access);
      //     localStorage.setItem("refresh_token", data.refresh);
      //     // setSuccessShowAlert(true);
      //     // setSuccessMsg("Password reset email has been sent");
      //   })
      //   .catch(error => {
      //     console.error('Error fetching Client Diagnosis Data:', error.response.data);
      //     // setSuccessShowAlert(false);
      //     setErrorShowAlert(true);
      //     setErrorMsg(error?.response?.data?.error);
      //   });

      try {
        dispatch(loginAsync(user));
        // resetLogin();
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  const handlePasswordReset = (resetData) => {
    console.log(resetData);

    axios
      .post(`${apiURL}/api/password/reset/`, resetData)
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Password reset email has been sent");
        setErrorShowAlert(false);
        setSuccessShowAlert(true);
      })
      .catch((error) => {
        console.error(
          "Error fetching Client Diagnosis Data:",
          error.response.data
        );
        setErrorMsg(error?.response?.data?.error);
        setSuccessShowAlert(false);
        setErrorShowAlert(true);
      });
  };

  return (
    <div
      className="w-screen h-screen relative bg-white bg-cover bg-center"
      style={{ backgroundImage: "url('./login/background.png')" }}
    >
      <div className={`flex items-center justify-center h-screen`}>
        {isFlipped ? (
          <div
            className={`w-96 h-fit flex flex-col bg-white rounded shadow`}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.5s",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {showSuccessAlert && (
              <div style={{ transform: "rotateY(180deg)" }}>
                <AlertSuccess
                  message={successMsg}
                  handleClose={closeSuccessAlert}
                />{" "}
              </div>
            )}
            {showErrorAlert && (
              <div style={{ transform: "rotateY(180deg)" }}>
                <AlertError message={errorMsg} handleClose={closeErrorAlert} />{" "}
              </div>
            )}
            <form onSubmit={handleSubmit(handlePasswordReset)}>
              <div style={{ transform: "rotateY(180deg)" }}>
                <div
                  className={`flex flex-col items-center space-y-0 pb-5 ${
                    showSuccessAlert || showErrorAlert ? "pt-0" : "pt-5"
                  }`}
                >
                  <img className="w-24 h-20" src={RootsLogo} />
                  <div className="font-medium text-2xl pt-3">
                    Reset Password
                  </div>
                </div>
                <div className="flex flex-col items-start px-4">
                  <div className=" text-gray-800 text-opacity-50 text-xs font-normal">
                    Enter Roots Email Address
                  </div>
                  <input
                    class="border-b border-gray-800  focus:outline-none px-2 py-1 w-full mb-2"
                    {...register("email", {
                      required: "Email Address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p role="alert" className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="flex w-full justify-evenly pb-5 pt-12">
                    <div className="p-3">
                      <button
                        className="w-28 h-8 border-1 border-[#0F7235] text-md rounded-sm"
                        onClick={() => {
                          setIsFlipped(!isFlipped);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="p-3">
                      <button
                        type="submit"
                        className="w-28 h-8 border-1 bg-[#0F7235] text-white text-md rounded-sm"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div
            className={`w-96 h-fit flex flex-col bg-white rounded shadow pt-5`}
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.5s",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <form onSubmit={handleSubmitLogin(handleLogin)}>
              <div className="flex flex-col items-center space-y-0 pb-5 pt-0">
                <img className="w-24 h-20" src={RootsLogo} />
                <div className="font-medium text-2xl pt-3">Welcome</div>
              </div>
              <div className="">
                <div className="flex flex-col items-start px-4">
                  <div className="text-gray-800 text-opacity-50 text-xs font-normal">
                    Enter Roots Email Address
                  </div>
                  <input
                    className="border-b border-gray-800 focus:outline-none px-2 py-1 w-full mb-2"
                    {...registerLogin("userEmail", {
                      required: "Email Address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errorsLogin.userEmail && (
                    <p role="alert" className="text-red-500 text-xs pb-3">
                      {errorsLogin.userEmail.message}
                    </p>
                  )}
                  <div className="text-gray-800 text-opacity-50 text-xs font-normal">
                    Enter Roots Password
                  </div>
                  <input
                    className="border-b border-gray-800 focus:outline-none px-2 py-1 w-full mb-2"
                    {...registerLogin("password", {
                      required: "Password is required",
                    })}
                  />
                  {errorsLogin.password && (
                    <p role="alert" className="text-red-500 text-xs pb-3">
                      {errorsLogin.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between pt-3 px-4 pb-12">
                <div className="flex flex-row space-x-4">
                  <div className="w-6 h-3 relative">
                    <div className="w-8 h-4 left-0 top-0 absolute bg-zinc-300 rounded-xl" />
                    <div className="w-4 h-4 left-0 top-0 absolute rounded-full border border-black" />
                  </div>
                  <div className="text-black-500 text-xs font-normal">
                    Stay Signed In
                  </div>
                </div>
                <button
                  className="text-black-500 text-xs font-normal"
                  onClick={() => {
                    setIsFlipped(!isFlipped);
                    setErrorShowAlert(false);
                    setSuccessShowAlert(false);
                    reset();
                  }}
                >
                  Reset Your Password
                </button>
              </div>
              <div className="flex flex-col items-center pb-5">
                <button
                  type="submit"
                  className="w-36 h-10 border-1 bg-[#0F7235] text-white text-md rounded-sm"
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* {
        showModal && (
          <PasswordReset toggleModal={toggleModal} />
        )
      } */}
      <div className="absolute bottom-0 right-0">
        <img src="./login/flower-pot.png" className="w-44 h-72"></img>
      </div>
    </div>
  );
};

export default LoginForm;
