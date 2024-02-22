import React from 'react';



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '40px', boxShadow: 'rgb(24 17 17 / 49%) 0px 2px 20px' }}>

      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img src="./root.png" alt="Profile" className="profile-img" style={{ width: '50px', height: '50px' }} /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/Home">Organization Dashboard </a>
            </li>
          </ul>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/clientprofile">clientprofile</a>
            </li>
          </ul>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/clientprofile">Encounter Notes</a>
            </li>
          </ul>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/clientprofile">Export Items</a>
            </li>
          </ul>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/clientchart">Client Chart</a>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0 mx-auto"> {/* Changed mr-auto to mx-auto */}
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        
          </form>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
             


              <a href="/UserProfile">
  <img src="./test.jpg" alt="Profile" className="profile-img" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
</a>
      
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;




