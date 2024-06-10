import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../../components/common/Dropdown";
import InputElement from "../../components/dynamicform/FormElements/InputElement";
import DateInput from "../../components/common/DateInput";
import FileInput from "../../components/dynamicform/FormElements/FileInput";
import { protectedApi } from "../../services/api";

async function fetchProgramOptions() {
    try {
      const response = await protectedApi.get("/api/resources/program");
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

function AddDocument() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [programOptions, setProgramOptions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchProgramOptions()
      .then((programOptionsResponse) => {
        const convertedProgramOptions = programOptionsResponse.map(
          (program) => ({ label: program.name, value: program.id })
        );
        setProgramOptions(convertedProgramOptions);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div className="mx-1" style={{ fontFamily: "poppins" }}>
      <PageTitle
        title="Add New Document"
        clientId={clientId}
        onClick={() => navigate(`/clientchart/${clientId}`)}
      />

      <div className="bg-white shadow rounded-[5px] my-6 py-8 px-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <DropDown
              label="Client Name"
              borderColor="#5BC4BF"
              rounded={false}
              fontSize="14px"
              selectedOption={"Option 1"}
              options={[
                { value: "Option 1", label: "Option 1" },
                { value: "Option 2", label: "Option 2" },
                { value: "Option 3", label: "Option 3" },
                { value: "Option 4", label: "Option 4" },
              ]}
              height="16px"
            />
          </div>
          <div className="col-span-1">
            <DropDown
              label="Document Type"
              borderColor="#5BC4BF"
              rounded={false}
              fontSize="14px"
              selectedOption={"Type 1"}
              options={[
                { value: "Type 1", label: "Type 1" },
                { value: "Type 2", label: "Type 2" },
                { value: "Type 3", label: "Type 3" },
                { value: "Type 4", label: "Type 4" },
              ]}
              height="16px"
            />
          </div>
          <div className="col-span-1">
            <InputElement
              type="text"
              addMargin={false}
              label={"Document Name"}
              rounded={false}
              // value={formData?.goals?.[goalIndex]?.problem || ""}
              width={"w-full"}
              className="border-keppel"
              // placeholder="Problem"
              // disabled={mode === "view"}
              // handleChange={(value) =>
              //   handleGoalDataUpdate(goalIndex, "problem", value)
              // }
            />
          </div>
          <div className="col-span-1">
            <DateInput
              label={"Document Date"}
              rounded={false}
              dateFormat="MM-dd-yyyy"
              className="h-[38px] border-keppel"
              height="38px"
              // isEdittable={mode === "view"}
              // value={
              // formData?.goals?.[goalIndex]?.goal_date
              //     ? format(
              //         formData?.goals?.[goalIndex]?.goal_date,
              //         "MM-dd-yyyy"
              //     )
              //     : ""
              // }
              // handleChange={(date) =>
              // handleGoalDataUpdate(goalIndex, "goal_date", date)
              // }
            />
          </div>
          <div className="col-span-2">
            <DropDown
              label="Program"
              borderColor="#5BC4BF"
              rounded={false}
              fontSize="14px"
              selectedOption={"Program 1"}
              options={programOptions}
              height="16px"
            />
          </div>
          <div className="col-span-2">
            <FileInput
              title="Select Document"
              label="Document Upload"
              rounded={false}
              multiple={false}
              className="border-keppel w-full"
              // formData={formData}
              // setFormData={setFormData}
              // disabled={mode === "view"}
              // mode={mode}
              deletedFilesKey="uploaded_documents_deleted"
              // files={formData?.uploaded_documents || []}
              // setFiles={useCallback(
              // (files) => {
              //     setFormData({ ...formData, uploaded_documents: files });
              // },
              // [formData]
              // )}
            />
          </div>
        </div>

        <div className="mx-auto flex justify-center items-center gap-x-4 my-8">
          <button
            onClick={() => navigate(`/clientchart/${clientId}`)}
            className="border border-keppel rounded-[3px] text-[#5BC4BF] w-32 py-2"
          >
            Cancel
          </button>
          <button
            // disabled={disableSubmit || mode === "view"}
            // onClick={mode === "edit" ? handleUpdate : handleCreate}
            className="border border-keppel rounded-[3px] disabled:cursor-not-allowed disabled:bg-[#6cd8d3] bg-[#5BC4BF] text-white w-32 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDocument;
