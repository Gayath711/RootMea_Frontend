import React from 'react';
import './create.css'; // Importing the custom CSS file

const RectangleComponent = () => {
  return (
    <div className="container">
      <h1 className="row my-4" > All Forms</h1>
      
   
      <div className="container">
      <h1>Forms</h1>
        <div className="row row my-4">

        <div className="col-9">

        <nav className="navbar navbar-light bg-light justify-content-between">
  <a className="navbar-brand">Available forms</a>
  <form className="form-inline">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />

  </form>
</nav>

</div>

        </div>
      </div>
    </div>
  );
};

export default RectangleComponent;
