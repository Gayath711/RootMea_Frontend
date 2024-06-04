import React from "react";
import Modal from 'react-bootstrap/Modal';
import ListSelector from "./ListSelector/ListSelector";
import { useState, useMemo } from "react";
function AddColumnModal() {

    const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    const handleSaveChanges = () => {
        console.log("Clicked button")
        fetch('https://api.example.com/data', {method: 'POST'}).then(response => {        }).catch(error => {   });
         handleClose();
    }

    return (
        <>
            <Modal.Body>
                <ListSelector/>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>
                    Close
                </button>
                <button onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </Modal.Footer>
        </>
    );
}

export default AddColumnModal;
