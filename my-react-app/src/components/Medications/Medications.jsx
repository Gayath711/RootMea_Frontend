import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMedicationInfoAsync } from "../../store/slices/medicationSlice";
import ExternalLinkIcon from "../images/externalLink.svg";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicTable from "../react-table/BasicTable";
import EditIcon from "../images/edit.svg";
import SearchIcon from "@mui/icons-material/Search";
import MedicationsModal from "./MedicationsModal";
import TextBox from "../common/TextBox";

const options = {
  Pending: "bg-[#FFE5E5] text-[#E0382D]",
  Active: "bg-[#FEE4D0] text-[#F79421]",
  Done: "bg-[#E9FEFB] text-[#2F9384]",
};

const Tag = ({ text }) => {
  return (
    <div
      className={`${options[text]} text-center text-xs px-3 py-0.5 mx-auto w-fit`}
    >
      {text?.charAt(0)?.toUpperCase() + text?.slice(1)}
    </div>
  );
};

const Content = ({ data, columns }) => {
  return (
    <>
      <hr className="w-[99%] mx-auto text-[#bababa]" />
      <BasicTable
        type={"medications"}
        defaultPageSize={3}
        columns={columns}
        data={data}
      />
    </>
  );
};

function Medications({ clientId, setShowModal, showModal }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.medication.data);
  const dataLoading = useSelector((state) => state.medication.loading);

  const [id, setId] = useState(null);

  function fetchData() {
    if (!dataLoading) {
      dispatch(fetchMedicationInfoAsync({ clientId }));
    }
  }

  useState(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(true);
  const [update, setUpdate] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Medication",
        accessor: "medication",
        align: "left",
      },
      {
        Header: "Comment",
        accessor: "comments",
      },
      {
        Header: "Updated By",
        accessor: "last_updated_by",
      },
      {
        Header: "Updated Date",
        accessor: "last_updated_date",
      },
      {
        Header: "Start Date",
        accessor: "start_date",
      },
      {
        Header: "Stop Date",
        accessor: "stop_date",
      },
      {
        Header: "status",
        Cell: ({ row }) => <Tag text={row.original.status} />,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <img
            src={EditIcon}
            className="size-4 mx-auto"
            alt="view"
            onClick={() => {
              setUpdate(true);
              setId(row.original.id);
              toggleModal();
            }}
          />
        ),
      },
    ],
    []
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      id="clientChartClientProfile"
      className={`bg-white rounded-md shadow-sm flex flex-col ${
        open ? "h-full" : ""
      }`}
    >
      <div className="flex justify-between p-3">
        <div className="flex gap-4 items-center">
          <div className="text-[#28293B] text-xl">Medications</div>
          <img src={ExternalLinkIcon} className="size-4" alt="link" />
        </div>
        <div className="flex items-center gap-x-10">
          <SearchIcon className="text-[#585A60] hover:cursor-pointer" />
          <button
            className="px-3 py-2 text-sm bg-[#E4C3B1] text-white rounded-sm font-medium"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add New
          </button>
          <RemoveCircleIcon
            onClick={() => setOpen(!open)}
            className="text-[#585A60] hover:cursor-pointer"
          />
        </div>
      </div>
      {open && <Content data={data} columns={columns} />}
      {showModal && (
        <MedicationsModal
          toggleModal={toggleModal}
          clientId={clientId}
          fetchData={fetchData}
          data={data}
          id={id}
          update={update}
        />
      )}
    </div>
  );
}

export default Medications;
