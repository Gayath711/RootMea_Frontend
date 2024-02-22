import React from 'react';
import './css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook ,faBuilding,faArrowUpAZ,faCheckSquare} from '@fortawesome/free-solid-svg-icons'; 
import clientProfile from './images/client_profile.png';
import clientChart from './images/client_chart.png';
import encounterNotes from './images/encounter_notes.png';

const Sidebar = () => {
  return (
    <div className="sidebar p-4" style={{  height: '100%', boxShadow: 'rgb(24 17 17 / 49%) 0px 2px 20px' }}>
      <div className="row">
        <div className="col-6 col-md-12 text-center my-4 ">
          <a href="/" className="text-decoration-none"><img src={clientProfile} class="img-thumbnail" alt="..." size="2x" /></a>
        </div>
        <div className="col-6 col-md-12 text-center my-4">
          <a href="/" className="text-decoration-none"><img src={clientChart} class="img-thumbnail" alt="..." size="2x" /></a>
        </div>
      </div>
      <div className="row">
        <div className="col-6 col-md-12 text-center my-4 ">
          <a href="/" className="text-decoration-none"><img src={encounterNotes} class="img-thumbnail" alt="..." size="2x" /></a>
        </div>
        <div className="col-6 col-md-12 text-center my-4">
          <a href="/" className="text-decoration-none"><img src={clientChart} class="img-thumbnail" alt="..." size="2x" /></a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
