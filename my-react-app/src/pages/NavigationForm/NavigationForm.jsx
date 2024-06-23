import React, { useCallback, useEffect, useState } from "react";
import DropDown from "../../components/common/Dropdown";
import DateInput from "../../components/common/DateInput";
import TextAreaElement from "../../components/dynamicform/FormElements/TextAreaElement";
import InputElement from "../../components/dynamicform/FormElements/InputElement";
import { format } from "date-fns";
import TimeInput from "../../components/common/TimeInput";
import { protectedApi } from "../../services/api";
import { useParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

function NavigationForm() {
  const { clientId } = useParams();
  const [formData, setFormData] = useState({
    id: Number(clientId),
    submitted_date: format(new Date(), "yyyy-MM-dd"),
    submitted_time: format(new Date(), "HH:mm:ss"),
  });
  const [usersOptions, setUsersOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);

  const fetchAllUser = useCallback(async () => {
    try {
      const response = await protectedApi.get("/encounter-notes-users/");
      setUsersOptions(
        response.data.map((itm) => {
          return { ...itm, label: itm.username, value: itm.id };
        })
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching all users:", error);
    }
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await protectedApi.get("/api/username");
      setFormData((prev) => {
        return {
          ...prev,
          referred_by: response.data.username,
        };
      });
    } catch (error) {
      // Handle errors here
      console.error("Error fetching all users:", error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await protectedApi.get("/api/resources/all-programs");
      setProgramOptions(
        response.data.map((itm) => {
          return {
            ...itm,
            label: itm.name,
            value: itm.name,
          };
        })
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching position titles:", error);
    }
  };

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    fetchAllUser();
    fetchUsername();
    fetchPrograms();
  }, []);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div className="grid mx-4">
      <div className="bg-[#5BC4BF] text-white px-3 py-2">Navigation</div>

      <div className="bg-white border border-[#DBE0E5]">
        <div className="grid grid-cols-3 m-10 gap-x-4 gap-y-6">
          <div className="col-span-1">
            <DropDown
              label="User Name"
              className="h-[37.6px]"
              options={usersOptions}
              selectedOption={
                formData?.id
                  ? usersOptions?.find((itm) => itm.id === formData.id)?.label
                  : null
              }
              handleChange={(option) => {
                handleChange("id", option.value);
              }}
              fontSize="14px"
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>
          <div className="col-span-1">
            <DropDown
              label="Program Name"
              selectedOption={
                formData?.program
                  ? programOptions.find(
                      (program) => program?.value === formData?.program
                    )?.label
                  : ""
              }
              options={programOptions}
              handleChange={(option) => {
                handleChange("program", option.value);
              }}
              className="h-[37.6px]"
              fontSize="14px"
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>

          <div className="col-span-1">
            <DateInput
              label="Date Assigned"
              className="border-keppel h-[37.6px]"
              // value={
              //   formData?.submitted_date
              //     ? format(formData?.submitted_date, "MM-dd-yyyy")
              //     : ""
              // }
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>
          <div className="col-span-3">
            <TextAreaElement
              className="border-keppel h-32"
              value={formData?.referral_comments || ""}
              onChange={(e) =>
                handleChange("referral_comments", e.target.value)
              }
              addMargin={false}
              label="Notes"
            />
          </div>
          <div className="col-span-1">
            <DropDown
              label="Assigned by"
              selectedOption={
                formData?.program
                  ? programOptions.find(
                      (program) => program?.value === formData?.program
                    )?.label
                  : ""
              }
              // options={programOptions}
              handleChange={(option) => {
                handleChange("program", option.value);
              }}
              className="h-[37.6px]"
              fontSize="14px"
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>
          <div className="col-span-1 flex items-end pl-5 text-sm text-gray-500 fill-gray-500 ">
            <FormControlLabel
              value="start"
              control={<Checkbox />}
              label="Unassign Program"
              labelPlacement="start"
            />
          </div>
          <div className="col-span-1">
            <DropDown
              label="Closed Reason"
              selectedOption={
                formData?.program
                  ? programOptions.find(
                      (program) => program?.value === formData?.program
                    )?.label
                  : ""
              }
              // options={programOptions}
              handleChange={(option) => {
                handleChange("program", option.value);
              }}
              className="h-[37.6px]"
              fontSize="14px"
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>
          <div className="col-span-1">
            <DateInput
              label="Date Closed"
              className="border-keppel h-[37.6px]"
              // value={
              //   formData?.submitted_date
              //     ? format(formData?.submitted_date, "MM-dd-yyyy")
              //     : ""
              // }
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>
          <div className="col-span-2">
            <DropDown
              label="Closed by"
              selectedOption={
                formData?.program
                  ? programOptions.find(
                      (program) => program?.value === formData?.program
                    )?.label
                  : ""
              }
              // options={programOptions}
              handleChange={(option) => {
                handleChange("program", option.value);
              }}
              className="h-[37.6px]"
              fontSize="14px"
              height="37.6px"
              borderColor="#5BC4BF"
            />
          </div>
        </div>

        <div className="mx-auto flex justify-center items-center gap-x-4 my-8">
          <button
            // onClick={() => navigate(`/clientchart/${clientId}`)}
            className="border border-keppel rounded-[3px] text-[#5BC4BF] w-32 py-2"
          >
            Cancel
          </button>
          <button
            // disabled={disableSubmit || mode === "view"}
            // onClick={mode === "encounterMode" ? handleCreate :handleUpdate}
            className="border border-keppel rounded-[3px] disabled:cursor-not-allowed disabled:bg-[#6cd8d3] bg-[#5BC4BF] text-white w-32 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationForm;
