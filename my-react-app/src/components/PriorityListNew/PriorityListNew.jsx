import React from "react";
import { useState, useMemo } from "react";
import ExternalLinkIcon from "../images/externalLink.svg";
import BasicTable from "../react-table/BasicTable";
import "./PriorityListNew.css";
import Modal from 'react-bootstrap/Modal'
import AddColumnModal from "../AddColumnModal/AddColumnModal";

function PriorityListNew() {

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const columns = useMemo(
            () => [
              {
                Header: "Program",
                accessor: "program_name",
                align: "left",
              },
              {
                Header: "List Name",
                accessor: "priority_list_name",
                align: "left",
              },
              {
                Header: "Total Clients",
                accessor: "total_clients",
              },
              {
                Header: "Assigned Staff",
                accessor: "other_assigned_staff",
                align: "left",
              },
            ],
            []
          );
        const data = []
        return (
            <div className="bg-white rounded-md shadow-md flex flex-col min-[320px]:w-full">
              <div
                id="priority-list-2"
                className="flex justify-between items-center mx-3 sm:mx-8 mt-6"
              >
                <div className="flex items-center space-x-4">
                  <span id="priority-list-3" className="text-lg font-medium">
                    Priority Lists
                  </span>
                  <img
                    id="priority-list-4"
                    src={ExternalLinkIcon}
                    className="size-3 sm:size-4"
                    alt="link"
                  />
                </div>
                <div>
                  <button
                    id="priority-list-5"
                    className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5"
                  >
                    View all
                  </button>

                  <button
                    id="priority-list-5"
                    className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5" onClick={handleShow}>
                Customize view
                </button>
                

                <Modal show={show} onHide={handleClose}>
                <AddColumnModal/>
                </Modal>
            
                </div>
              </div>
              <hr id="priority-list-6" className="w-[98%] mx-auto my-2" />
              <div className="w-full flex-grow flex flex-col">
                <BasicTable type={"priorityList"} columns={columns} data={data} />
              </div>
            </div>
          );
   
   
}

export default PriorityListNew;
