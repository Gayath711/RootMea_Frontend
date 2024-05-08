import { toast } from "react-toastify";

export const notify = (msg, type = "default") => {
  toast(msg, {
    type: type,
    position: "bottom-right",
    autoClose: 4000,
  });
};

export const notifyError = (msg) => {
  toast(msg, {
    type: "error",
    position: "bottom-right",
    autoClose: 4000,
  });
};

export const notifyWarn = (msg) => {
  toast(msg, {
    type: "warning",
    position: "bottom-right",
    autoClose: 4000,
  });
};

export const notifySuccess = (msg) => {
  toast(msg, {
    type: "success",
    position: "bottom-right",
    autoClose: 4000,
  });
};
