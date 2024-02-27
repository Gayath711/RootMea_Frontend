import React, { useState,useEffect,useRef } from 'react';
import './css/encounternote.css';

const EncounterNote = () => {

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };


  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [files4, setFiles4] = useState([]);

  const handleFileChange1 = (event) => {
    const fileList = event.target.files;
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      id: Math.random().toString(36).substring(7),
      file
    }));
    setFiles1(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileChange2 = (event) => {
    const fileList = event.target.files;
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      id: Math.random().toString(36).substring(7),
      file
    }));
    setFiles2(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileChange3 = (event) => {
    const fileList = event.target.files;
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      id: Math.random().toString(36).substring(7),
      file
    }));
    setFiles3(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileChange4 = (event) => {
    const fileList = event.target.files;
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      id: Math.random().toString(36).substring(7),
      file
    }));
    setFiles4(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile1 = (id) => {
    setFiles1(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const handleRemoveFile2 = (id) => {
    setFiles2(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const handleRemoveFile3 = (id) => {
    setFiles3(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const handleRemoveFile4 = (id) => {
    setFiles4(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container pt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="text-left">Client Encounter Note</h2>
          </div>
        </div>
      </div>

      <div className="container pt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Client Name</span>
              </div>
              <input type="text" className="form-control" id="basic-url1" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">DOB</span>
              </div>
              <input type="text" className="form-control" id="basic-url2" aria-describedby="basic-addon2" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">Preferred Name</span>
              </div>
              <input type="text" className="form-control" id="basic-url3" aria-describedby="basic-addon3" />
            </div>
          </div>
        </div>


   

        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Primary Phonenumber</span>
              </div>
              <input type="text" className="form-control" id="basic-url1" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Email</span>
              </div>
              <input type="text" className="form-control" id="basic-url2" aria-describedby="basic-addon2" />
            </div>
          </div>
        </div>
      
     {/* <>--------------------------------next section-----------------------------------------</> */}
        

        <hr />

        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Staff Name <span style={{ color: 'red' }}>*</span> </span>
              </div>
              <input type="text" className="form-control" id="basic-url1" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Encounter Date <span style={{ color: 'red' }}>*</span>  </span>
              </div>
              <input type="text" className="form-control" id="basic-url2" aria-describedby="basic-addon2" />
            </div>
          </div>

          
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Facility <span style={{ color: 'red' }}>*</span> </span>
              </div>
              <input type="text" className="form-control" id="basic-url1" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Program <span style={{ color: 'red' }}>*</span> </span>
              </div>
              <input type="text" className="form-control" id="basic-url2" aria-describedby="basic-addon2" />
            </div>
          </div>

          
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Note Type <span style={{ color: 'red' }}>*</span> </span>
              </div>
              <input type="text" className="form-control" id="basic-url1" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Encounter Type <span style={{ color: 'red' }}>*</span> </span>
              </div>
              <input type="text" className="form-control" id="basic-url2" aria-describedby="basic-addon2" />
            </div>
          </div>

          
        </div>

        <div className="row pt-4">

        <div className="col-md-12">

        

        <div className="form-group shadow-textarea">
        <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Custom Fields</span>
              </div>
           
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
          </div>

          </div>

        </div>

        <div className="row pt-4">
      <div className="col-md-12">
        <div className="card shadow-textarea">
          <div className="card-body">
            <div className="input-group-prepend mb-3">
              <span className="input-group-text" id="basic-addon1">Encounter Summary</span>
              <select id="enabledSelect" value={selectedOption} className="form-select" onChange={handleSelectChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            
            {selectedOption === "option1" && (
              <textarea className="form-control z-depth-1" rows="3" placeholder="Write something for Option 1..."></textarea>
            )}
            {selectedOption === "option2" && (
              <textarea className="form-control z-depth-1" rows="3" placeholder="Write something for Option 2..."></textarea>
            )}
            {selectedOption === "option3" && (
              <textarea className="form-control z-depth-1" rows="3" placeholder="Write something for Option 3..."></textarea>
            )}
          </div>
        </div>
      </div>
    </div>


      

    <div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="formFileMultiple1" className="form-label">Multiple files input example 1</label>
                <input className="form-control" type="file" id="formFileMultiple1" multiple onChange={handleFileChange1} autoComplete="off" />
              </div>
              <ul className="file-list" style={{ maxHeight: '200px', overflowY: 'auto', padding: '15px' }}>
                {/* Added styling for scroll */}
                {files1.map(file => (
                  <li className="file-item" key={file.id}>
                    {file.name}
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFile1(file.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="formFileMultiple2" className="form-label">Multiple files input example 2</label>
                <input className="form-control" type="file" id="formFileMultiple2" multiple onChange={handleFileChange2} autoComplete="off" />
              </div>
              <ul className="file-list" style={{ maxHeight: '200px', overflowY: 'auto', padding: '15px' }}> {/* Added styling for scroll */}
                {files2.map(file => (
                  <li className="file-item" key={file.id}>
                    {file.name}
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFile2(file.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="formFileMultiple3" className="form-label">Multiple files input example 3</label>
                <input className="form-control" type="file" id="formFileMultiple3" multiple onChange={handleFileChange3} autoComplete="off" />
              </div>
              <ul className="file-list" style={{ maxHeight: '200px', overflowY: 'auto', padding: '15px' }}>
                {/* Added styling for scroll */}
                {files3.map(file => (
                  <li className="file-item" key={file.id}>
                    {file.name}
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRemoveFile3(file.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

  

<div className="col-md-6">
  <div className="card" >
    <div className="card-body">
      <div className="row">
        <div className="col-md-6 border-left">
          <p >Signed By</p>
        </div>

        <div className="col-md-6">
        <p><span className="dot">•</span> dummy data 1</p>
        <p><span className="dot">•</span> dummy data 2</p>
        <p><span className="dot">•</span> dummy data 3</p>
       

          <button className="btn btn-success">signature</button>
        </div>
      </div>
    </div>
  </div>
</div>




</div>
  
</div>
</div>
  
    </form>
  );
};

export default EncounterNote;
