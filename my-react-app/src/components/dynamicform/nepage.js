import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiURL from "../../apiConfig";
import Swal from "sweetalert2";
import Select from "react-select";
import DateInput from "./FormElements/DateInput";
import HeaderElement from "./FormElements/HeaderElement";
import DividerElement from "./FormElements/DividerElement";
import InputElement from "./FormElements/InputElement";
import TextAreaElement from "./FormElements/TextAreaElement";
import SelectElement from "./FormElements/SelectElement";
import MultiSelectElement from "./FormElements/MultiSelectElement";
import { saveAs } from "file-saver";

function NewPage() {


  const { tableName } = useParams();
  console.log(tableName, "Table Name")
  const [tableColumns, setTableColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableStructure, setTableStructure] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  console.log(tableName, tableColumns)
  const [droplist, setDroplist] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      const newDroplist = {};
      for (const column of tableColumns) {
        console.log(column.type);
        console.log("column.name", column.name);

        if (
          column.type === "USER-DEFINED" ||
          ((column.type === "USER-DEFINED" || column.type === "ARRAY") &&
            (column.name.endsWith("_multiple") ||
              column.name.endsWith("_checkbox")))
        ) {
          const enumType = `enum_type_${tableName}_${column.name}_enum_type`;

          try {
            const response = await axios.get(`${apiURL}/get_enum_labels/`, {
              params: {
                enum_type: enumType,
              },
            });
            const dropdownOptions = response.data.enum_labels;
            newDroplist[enumType] = dropdownOptions;
            console.log("Dropdown options for", enumType, ":", dropdownOptions);
          } catch (error) {
            console.error(
              "Error fetching dropdown options for",
              enumType,
              ":",
              error
            );
          }
        }
      }
      setDroplist(newDroplist);
      console.log("Droplist updated:", droplist);
    };

    fetchDropdownOptions();
  }, [tableName, tableColumns]);

  useEffect(() => {
    fetchTableHeaders();
  }, [tableName]);

  useEffect(() => {
    fetchTableStructure();
  }, []);

  // const handleDropdownOptionsFetch = async (enumType) => {
  //     try {
  //         const response = await axios.get(`${apiURL}/get_enum_labels/`, {
  //             params: {
  //                 enum_type: enumType
  //             }
  //         });
  //         const dropdownOptions = response.data.enum_labels;
  //         setDroplist(dropdownOptions);
  //         console.log('Dropdown options:', dropdownOptions);
  //     } catch (error) {
  //         console.error('Error fetching dropdown options:', error);
  //     }
  // };

  const fetchTableHeaders = async () => {
    try {
      const cleanedTableName = tableName.replace("roots", "");
      const response = await axios.get(
        `${apiURL}/insert_header_get/${tableName}/`
      );
      if (response.data.headers) {
        setTableHeaders(response.data.headers);
        console.log("headr", response.data.headers);
      } else {
        console.error("No headers found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching table headers:", error);
    }
  };

  const fetchTableStructure = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/get_table_structure/${tableName}`
      );
      if (response.headers["content-type"].includes("application/json")) {
        console.log("response.data.columns", response.data.columns);
        console.log("response.data", response.data.columns);
        setTableColumns(response.data.columns);

        // Fetch column info after fetching table structure
        fetchColumnInfo();
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching table structure:", error);
    }
  };

  const fetchColumnInfo = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/get_column_info/${tableName}`
      );
      if (response.headers["content-type"].includes("application/json")) {
        console.log("response.data.columns_info", response.data.columns_info);

        // Update existing columns with additional info
        setTableColumns((prevColumns) =>
          prevColumns.map((column) => ({
            ...column,
            ...response.data.columns_info.find(
              (info) => info.name === column.name
            ),
          }))
        );
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching column info:", error);
    }
  };

  const handleInputChange = (event, columnName) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [columnName]: value,
    }));
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    // Filter out hidden columns before checking required fields
    const visibleColumns = tableColumns.filter((column) => !column.hidden);
    const requiredFieldsEmpty = visibleColumns.some(
      (column) => column.required && !formData[column.name]
    );

    if (requiredFieldsEmpty) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill all required fields.",
      });
      return;
    }

    try {
      console.log(formData);
      const response = await axios.post(
        `${apiURL}/get_table_structure/${tableName}/`,
        formData
      );

      if (response.status === 201) {
        console.log("Data inserted successfully");
        setFormData({});
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data inserted successfully",
          timer: 2000,
        });
      } else {
        console.error("Error:", response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to insert data. Please fill the required field properly.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const renderInputField = (column) => {
    if (column.hidden) return null;

    let label = column.column_fullname;
    if (column.required) {
      label += " *";
    }

    switch (column.type) {
      case "character varying":
        return (
          <div key={column.name} className={`mb-3 ${column.width} character-varying`}>
            {/* <label className="block mb-1">{label}</label>
            <input
              type="text"
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              className={`${column.width} border border-gray-300 rounded px-4 py-2`}
            /> */}
            <InputElement
              label={label}
              onChange={(event) => handleInputChange(event, column.name)}
              type="text"
              value={formData[column.name] || ""}
              required={column.is_nullable === "NO"}
            />
          </div>
        );
      case "integer":
        return (
          <div key={column.name} className={`mb-3 ${column.width} integer`}>
            {/* <label className="block mb-1">{label}</label>
            <input
              type="number"
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              className={`${column.width} border border-gray-300 rounded px-4 py-2`}
            /> */}
            <InputElement
              label={label}
              type="number"
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              required={column.is_nullable === "NO"}
            />
          </div>
        );
      case "text":
        return (
          <div key={column.name} className={`mb-3 ${column.width} text`}>
            {/* <label className="block mb-1">{label}</label>
            <textarea
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              className={`${column.width} border border-gray-300 rounded px-4 py-2`}
            /> */}
            <TextAreaElement
              label={label}
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              required={column.is_nullable === "NO"}
            />
          </div>
        );
      case "double precision":
        return (
          <div key={column.name} className={`mb-3 ${column.width} double-precision`}>
            {/* <label className="block mb-1">{label}</label>
            <input
              type="number" // Use type "number" for input validation
              step="0.01" // Allow floating-point numbers
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              className={`${column.width} border border-gray-300 rounded px-4 py-2`}
            /> */}

            <InputElement
              label={label}
              type="number" // Use type "number" for input validation
              step="0.01" // Allow floating-point numbers
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              required={column.is_nullable === "NO"}
            />
          </div>
        );
      case "boolean":
        return (
          <div key={column.name} className={`mb-3 ${column.width} boolean`}>
            {/* <label className="block mb-1">{label}</label>
            <select
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              className={`${column.width} border border-gray-300 rounded px-4 py-2`}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select> */}

            <SelectElement
              label={label}
              required={column.is_nullable === "NO"}
              options={[
                {
                  label: "Yes",
                  value: "true",
                },
                {
                  label: "No",
                  value: "false",
                },
              ]}
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
            />
          </div>
        );
      case "bytea":
        return (
          <div key={column.name} className={`mb-3 ${column.width} bytea`}>
            {/* <label className="block mb-1">{label}</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .pdf"
              onChange={(event) => handleInputChange(event, column.name)}
              className={`${column.width} border border-gray-300 rounded px-4 py-2`}
            /> */}
            <InputElement
              label={label}
              required={column.is_nullable === "NO"}
              type="file"
              accept=".png, .jpg, .jpeg, .pdf"
              onChange={(event) => handleInputChange(event, column.name)}
            />
          </div>
        );
      case "character":
        return (
          <div key={column.name} className={`mb-0 ${column.width} character`}>
            <HeaderElement type="header" label={label} />
          </div>
        );
      case "json":
        return (
          <div key={column.name} className={`mb-1 ${column.width} json`}>
            <HeaderElement label={label} />
          </div>
        );
      case "line":
        return (
          <div key={column.name} className={`mb-4 ${column.width} line`}>
            <DividerElement />
          </div>
        );

      case "timestamp without time zone":
        return (
          <div key={column.name} className={`mb-2 ${column.width} timestamp-without-time-zone`}>
            <DateInput
              label={label}
              required={column.is_nullable === "NO"}
              type="date"
              value={formData[column.name] || ""}
              onChange={(event) => handleInputChange(event, column.name)}
              className={`border border-gray-300 rounded px-4 py-2`}
              width={column.width}
            />
          </div>
        );
      default:
        console.log(column.type);

        // console.log(column.type)

        // const dropdownOptions1=[1,2,3]

        const key = `enum_type_${tableName}_${column.name}_enum_type`;

        console.log(key);

        // console.log("keykey",key)

        if (key.endsWith("multiple_enum_type")) {
          console.log("qdwewwwwwwwwwwwwwww", droplist, droplist[key]);
          return (
            <div key={column.name} className={`mb-3 ${column.width} multiple_enum_type`}>
              {/* <label className="block mb-1">{label} xxx</label>
              <Select
                options={
                  droplist[key] &&
                  droplist[key].map((option) => ({
                    value: option,
                    label: option,
                  }))
                }
                isMulti
                value={
                  formData[column.name]
                    ? formData[column.name].map((option) => ({
                        value: option,
                        label: option,
                      }))
                    : []
                }
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions
                    ? selectedOptions.map((option) => option.value.toString())
                    : [];
                  console.log(
                    column.name,
                    selectedValues,
                    "ssssssssssssssssssssssssssss"
                  );
                  setFormData((prevState) => ({
                    ...prevState,
                    [column.name]: selectedValues,
                  }));
                  console.log(
                    column.name,
                    selectedValues,
                    "ssssssssssssssssssssssssssss"
                  );
                }}
                className={`${column.width} border border-gray-300 rounded px-4 py-2`}
                placeholder="Select"
              /> */}

              <MultiSelectElement
                label={label}
                required={column.is_nullable === "NO"}
                options={
                  droplist[key]
                    ? droplist[key].map((option) => ({
                      value: option,
                      label: option,
                    }))
                    : []
                }
                value={
                  formData[column.name]
                    ? formData[column.name].map((option) => ({
                      value: option,
                      label: option,
                    }))
                    : []
                }
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions
                    ? selectedOptions.map((option) => option.value.toString())
                    : [];
                  console.log(
                    column.name,
                    selectedValues,
                    "ssssssssssssssssssssssssssss"
                  );
                  setFormData((prevState) => ({
                    ...prevState,
                    [column.name]: selectedValues,
                  }));
                  console.log(
                    column.name,
                    selectedValues,
                    "ssssssssssssssssssssssssssss"
                  );
                }}
                placeholder="Select"
              />
            </div>
          );
        }

        // else if (key.endsWith("checkbox_enum_type")){
        //     console.log('checkbox_enum_type okkk')
        //     // console.log(droplist[key])
        //     return (
        //         <div key={column.name} className="mb-1">
        //             <label className="block mb-1">{label}</label>
        //             <Select

        //                 options={droplist[key] && droplist[key].map(option => ({ value: option, label: option }))}
        //                 isMulti
        //                 value={formData[column.name] ? formData[column.name].map(option => ({ value: option, label: option })) : []}
        //                 onChange={(selectedOptions) => {
        //                     const selectedValues = selectedOptions ? selectedOptions.map(option => option.value.toString()) : [];
        //                     console.log(column.name,selectedValues,'ssssssssssssssssssssssssssss')
        //                     setFormData(prevState => ({
        //                         ...prevState,
        //                         [column.name]: selectedValues
        //                     }));
        //                     console.log(column.name,selectedValues,'ssssssssssssssssssssssssssss')
        //                 }}
        //                 className={`${column.width} border border-gray-300 rounded px-4 py-2`}
        //                 placeholder="Select"
        //             />

        //         </div>
        //     );

        // }
        else if (key.endsWith("checkbox_enum_type")) {
          console.log("checkbox_enum_type okkk");
          // console.log(droplist[key])
          return (
            <div key={column.name} className={`mb-3 ${column.width} checkbox_enum_type`}>
              {/* <label className="block mb-1">{label}</label>
              {droplist[key] &&
                droplist[key].map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      id={option}
                      value={option}
                      checked={
                        formData[column.name] &&
                        formData[column.name].includes(option)
                      }
                      onChange={(event) => {
                        const value = event.target.value;
                        setFormData((prevState) => ({
                          ...prevState,
                          [column.name]: prevState[column.name]
                            ? prevState[column.name].includes(value)
                              ? prevState[column.name].filter(
                                  (val) => val !== value
                                )
                              : [...prevState[column.name], value]
                            : [value],
                        }));
                      }}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                ))} */}
              <div className="m-1">
                <label
                  className={`block flex gap-2 text-gray-500 text-xs font-bold my-2`}
                >
                  <span>{label}</span>
                  {column.is_nullable === "NO" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <div className={`flex flex-column gap-2`}>
                  {droplist[key] &&
                    droplist[key].map((option) => (
                      <div key={option} className={`flex gap-1 items-center`}>
                        <input
                          type="checkbox"
                          id={option}
                          value={option}
                          checked={
                            formData[column.name] &&
                            formData[column.name].includes(option)
                          }
                          onChange={(event) => {
                            const value = event.target.value;
                            setFormData((prevState) => ({
                              ...prevState,
                              [column.name]: prevState[column.name]
                                ? prevState[column.name].includes(value)
                                  ? prevState[column.name].filter(
                                    (val) => val !== value
                                  )
                                  : [...prevState[column.name], value]
                                : [value],
                            }));
                          }}
                        />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          );
        } else {
          console.log("test");
          console.log("droplist", droplist);

          return (
            <div key={column.name} className={`mb-3 ${column.width} select`}>
              {/* <label className="block mb-1">{label}</label>
              <select
                value={formData[column.name] || ""}
                onChange={(event) => handleInputChange(event, column.name)}
                className={`${column.width} border border-gray-300 rounded px-4 py-2`}
              >
                <option value="">Select</option>
                {droplist[key] &&
                  droplist[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select> */}
              <SelectElement
                label={label}
                required={column.is_nullable === "NO"}
                options={
                  droplist[key]
                    ? droplist[key].map((option) => {
                      return option;
                    })
                    : []
                }
                value={formData[column.name] || ""}
                onChange={(event) => handleInputChange(event, column.name)}
              />
            </div>
          );
        }
    }
  };


  const getStylesheetContent = () => {
    const sheets = document.styleSheets;
    let cssText = "";

    for (const sheet of sheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        for (const rule of rules) {
          cssText += rule.cssText;
        }
      } catch (e) {
        console.log("Error reading stylesheet:", e);
      }
    }
    return cssText;
  };

  const downloadHTML = () => {
    console.log("downloadHTML");
    const formContainerHtml = formRef.current.outerHTML;
    const styles = getStylesheetContent();
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Data</title>
        <style>${styles}</style>
      </head>
      <body>${formContainerHtml}</body>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
                    // Initialize flatpickr on all elements with id="dateInput"
                    flatpickr("#dateInput", {
                        dateFormat: "m/d/Y"
                    });
                });
        var formData = [];
        var columnData = []
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.type = 'button';
        saveButton.setAttribute('class','bg-[#5BC4BF] text-white hover:bg-teal-700 font-bold mt-2.5 p-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500  text-xs')
        document.querySelector('form .text-center').insertAdjacentElement('afterbegin', saveButton);
        button_div = document.querySelector('form .text-center')
        button_div.style.display = 'flex'
        button_div.style.justifyContent = 'space-around' 
        document.querySelector('form [type="submit"]').style.display = 'none'

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let randomIntegerInRange = getRandomInt(1, 1000);
        console.log("randomIntegerInRange")
        console.log(randomIntegerInRange)

        // function isValidDateFormat(dateString) {
        //     const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        //     if (!regex.test(dateString)) {
        //         return false;
        //     }
        //     const [month, day, year] = dateString.split('/').map(Number);
        //     const date = new Date(year, month - 1, day);
        //     return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        // }
        saveButton.onclick = function() {
            let divs = document.querySelectorAll('form div div');
            let formdata1 = []
            let columnData1 = []
            divs.forEach(div => {
                let label = div.querySelector('label span');
                let input = div.querySelector('input');
                let textarea = div.querySelector('textarea');
                let select = div.querySelector('select');
                let checkbox = div.classList.contains('checkbox_enum_type')
                let files = div.querySelector('[type="file"]');
                if (label){
                    let label_data = label.textContent.trim()
                    columnData1.push(label_data)
                    console.log('Label:',label_data );
                }
                
                if (label && input) {
                  if (input.getAttribute('id')=='dateInput'){
                        console.log('inside date field')
                        // if (!isValidDateFormat(input)){
                        //     alert('Enter Valid Date')
                        //     return 
                        // }
                    }
                  let input_data = input.value.trim()
                  formdata1.push(input_data)
                  console.log('Input Value:',input_data );
                }
                else if (label && textarea){
                  let textarea_data = textarea.value.trim()
                  formdata1.push(textarea_data)
                  console.log('Textarea Value:',textarea_data );
                }
                else if (label && select){
                  let select_data = select.value.trim()
                  formdata1.push(select_data)
                  console.log('select Value:',select_data );
                }
                else if (files){
                  let files_data = files.files[0]
                  formdata1.push(files_data)
                  console.log('file Value:',files_data );
                }
                else if (checkbox){
                  let checkbox_data = i.querySelectorAll('[type="checkbox"]')
                  checkbox_data.forEach(checkbox_value =>{
                      if (checkbox_value.checked){
                          formdata1.push(checkbox_value.value)
                      }
                  })
                }
                else if(!input && label){
                  formdata1.push('')
                }
            });
            formData.push(formdata1)
            columnData.push(columnData1)
            localStorage.setItem('formdata'+randomIntegerInRange, JSON.stringify(formData));
            localStorage.setItem('columnData'+randomIntegerInRange, JSON.stringify(columnData));



            alert('Data saved!');
        };
        
        document.querySelector('form').onsubmit = function(event) {
            event.preventDefault(); 
            let formData1 = JSON.parse(localStorage.getItem('formdata'+randomIntegerInRange));
            let columnData1 = JSON.parse(localStorage.getItem('columnData'+randomIntegerInRange));
            console.log("columnData")
            console.log(columnData)
            console.log("formData")
            console.log(formData)
            if (formData1.length === 0) {
                alert('No data to save!');
                return;
            }
            
            const data = [
                columnData1[0],
                ...formData1
            ];
            
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Data');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'formData.xlsx';
            a.click();
            URL.revokeObjectURL(a.href);

            // Reset the form and data array
            formData = [];
            document.getElementById('myForm').reset();
        };
      </script>
      </html>

    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, "form.html");
  };


  return (
    <div className="container mt-3">
      <div
        ref={formRef}
        className="card p-4 shadow "
        style={{ width: "70%", margin: "auto", backgroundColor: "#f6f6f6" }}
      >
        <div className="card mb-3">
          {/* <img className="card-img-top" style={{ hight: '300px'}} src={Screenshot} alt="Card image cap" /> */}

          <div>
            <ul className="grid grid-cols-1 gap-4">
              {tableHeaders.map((header, index) => (
                <>
                  {/* <motion.li
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                > */}
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <h1 className="text-xl font-semibold mb-2">{header[2]}</h1>
                    <h3 className="text-base font-medium text-gray-700">
                      {header[3]}
                    </h3>
                  </div>
                  {/* </motion.li> */}
                </>
              ))}
            </ul>
          </div>
        </div>
        {/* <h2 className="text-2xl font-bold mb-4">Form Name - {tableName}</h2> */}
        {tableColumns.length > 0 && (
          <form>
          <div>
            {tableColumns.map((column) => {
              return renderInputField(column);
            })}
            <div className="text-center mt-6"  style={{display: 'flex',justifyContent: 'space-around'}}>
              <button
                type="submit"
                onClick={handleSubmitPost}
                className="bg-[#5BC4BF] text-white hover:bg-teal-700 font-bold mt-2.5 p-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500  text-xs"
              >
                Submit
              </button>
              <button
                onClick={downloadHTML} 
                className="bg-[#5BC4BF] text-white hover:bg-teal-700 font-bold mt-2.5 p-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500  text-xs"
              >
                Download
              </button>
            </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default NewPage;
