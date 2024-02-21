import React from 'react';
import './css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook ,faBuilding,faArrowUpAZ,faCheckSquare} from '@fortawesome/free-solid-svg-icons'; 

const Sidebar = () => {
  return (
    <div className="sidebar p-4" style={{ boxShadow: 'rgb(24 17 17 / 49%) 0px 2px 20px' }}>
      <div className="row">
        <div className="col text-center my-4">
          <a href="/" className="text-decoration-none"><FontAwesomeIcon icon={faBuilding} style={{ color: '#474648' }} size="2x" /></a>
        </div>
        <div className="col text-center my-4">
          <a href="/" className="text-decoration-none"><FontAwesomeIcon icon={faBook} size="2x" style={{ color: '#474648' }} /></a>
        </div>
      </div>
      <div className="row">
        <div className="col text-center my-4">
          <a href="/" className="text-decoration-none"><FontAwesomeIcon icon={faArrowUpAZ} size="2x" style={{ color: '#474648' }} /></a>
        </div>
        <div className="col text-center my-4">
          <a href="/" className="text-decoration-none"><FontAwesomeIcon icon={faCheckSquare} size="2x" style={{ color: '#474648' }} /></a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
