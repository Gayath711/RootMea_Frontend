import React, { useState, useEffect } from "react";
import axios from "axios";
import apiURL from "../../apiConfig";

function AlterTable({ onAddColumn }) {
  const [tableName, setTableName] = useState("");
  const [tableColumns, setTableColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [matchingTables, setMatchingTables] = useState([]);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newColumnType, setNewColumnType] = useState("VARCHAR(250)");
  const [newColumnOptions, setNewColumnOptions] = useState([]);
  const [newColumnWidth, setNewColumnWidth] = useState("");

  const fetchTableStructure = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/get_table_structure/${tableName}`
      );
      if (response.headers["content-type"].includes("application/json")) {
        setTableColumns(response.data.columns);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching table structure:", error);
    }
  };

  const handleInputChange = (event, columnName) => {
    if (columnName === "width") {
      // If the input is for width, update the width state
      setNewColumnWidth(event.target.value);
    } else {
      // For other inputs, update the formData state
      setFormData({
        ...formData,
        [columnName]: event.target.value,
      });
    }
  };

  const handleFetchStructure = async (clickedTableName) => {
    try {
      setTableName(clickedTableName);
      const response = await axios.get(
        `${apiURL}/get_table_structure/${clickedTableName}`
      );
      if (response.headers["content-type"].includes("application/json")) {
        setTableColumns(response.data.columns);
        // Scroll to the table form heading
        const tableFormHeading = document.getElementById("tableFormHeading");
        if (tableFormHeading) {
          tableFormHeading.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching table structure:", error);
    }
  };

  const handleDeleteTable = async (tableName) => {
    try {
      await axios.delete(`${apiURL}/get_table_structure/${tableName}`);
      const updatedMatchingTables = matchingTables.filter(
        (table) => table !== tableName
      );
      setMatchingTables(updatedMatchingTables);
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchTableStructure();
  };

  const handleDropColumn = async (columnName) => {
    try {
      await axios.patch(`${apiURL}/get_table_structure/${tableName}/`, {
        column_name: columnName,
      });
      const updatedColumns = tableColumns.filter(
        (column) => column.name !== columnName
      );
      setTableColumns(updatedColumns);
    } catch (error) {
      console.error("Error dropping column:", error);
    }
  };

  const handleAddColumn = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * 1000000);
      const newColumnName = `new_column_${randomNumber}`;
      const response = await axios.put(
        `${apiURL}/get_table_structure/${tableName}/`,
        {
          column_name: newColumnName,
          data_type: newColumnType,
          nullable: true,
          name: newColumnTitle,
          options:
            newColumnType === "DROPDOWN" ||
            newColumnType === "MULTIPLESELECT" ||
            newColumnType === "CHECKBOX"
              ? newColumnOptions
              : undefined,
          width: newColumnWidth,
        }
      );

      if (response.status === 200) {
        await fetchTableStructure();
        const newColumn = {
          columnName: newColumnName,
          columnTitle: newColumnTitle,
          columnType: newColumnType,
          columnWidth: newColumnWidth,
        };
        onAddColumn(newColumn);
        setNewColumnTitle("");
        setNewColumnType("VARCHAR(250)");
        setNewColumnOptions([]);
        setNewColumnWidth("");
      } else {
        console.error("Failed to add column:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/get_matching_tables/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMatchingTables(data.matching_tables);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <form>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6">
            Form Structure Modification Page
          </h1>
          <ul>
            {matchingTables.map((tableName, index) => {
              const cleanedTableName = tableName.replace("roots", "");

              return (
                <li
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <span className="text-lg mr-4">
                    {cleanedTableName.charAt(0).toUpperCase() +
                      cleanedTableName.slice(1)}
                  </span>
                  <div className="flex">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                      onClick={() => handleFetchStructure(tableName)}
                    >
                      <svg
                        className="h-5 w-5 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h5a2 2 0 002-2V7a1 1 0 10-2 0v8a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 011 1v2a1 1 0 102 0V5a2 2 0 00-2-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Modify Form Structure
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                      onClick={() => handleDeleteTable(tableName)}
                    >
                      <svg
                        className="h-5 w-5 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 14.293a1 1 0 011.414 0L10 17.586l3.293-3.293a1 1 0 111.414 1.414L11.414 19A1 1 0 0110 19l-4.707-.707a1 1 0 01-.707-1.707L8.586 15l-3.293-3.293a1 1 0 010-1.414zm10.414-8.586a1 1 0 00-1.414 0L10 6.414 6.707 3.121a1 1 0 00-1.414 1.414L8.586 8 5.293 11.293a1 1 0 001.414 1.414L10 9.414l3.293 3.293a1 1 0 001.414-1.414L11.414 8l3.293-3.293a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </form>

      <div className="container mx-auto px-4">
        <hr className="my-6" style={{ borderTop: "1px solid #ccc" }} />
        <h2
          id="tableFormHeading"
          className="text-xl font-bold mb-4"
          style={{ color: "#333", borderBottom: "2px solid #333" }}
        >
          {tableName ? `Table Form - ${tableName}` : "Table Form"}
        </h2>

        {tableColumns.length > 0 && (
          <form onSubmit={handleSubmit} className="mt-6">
            {tableColumns.map((column, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-1 text-gray-700">
                  {column.column_fullname}
                </label>
                {column.type === "TEXT" ? (
                  <textarea
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  />
                ) : column.type === "TEXTAREA" ? (
                  <textarea
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  />
                ) : column.type === "DECIMAL" || column.type === "INTEGER" ? (
                  <input
                    type={column.type === "DECIMAL" ? "number" : "text"}
                    step={column.type === "DECIMAL" ? "0.1" : undefined}
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  />
                ) : column.type === "BOOLEAN" ? (
                  <select
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  >
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : column.type === "FILE" || column.type === "IMAGE" ? (
                  <input
                    type="file"
                    accept={column.type === "IMAGE" ? "image/*" : "*/*"}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  />
                ) : column.type === "DATETIME" ? (
                  <input
                    type="datetime-local"
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  />
                ) : column.type === "DROPDOWN" ||
                  column.type === "MULTIPLESELECT" ||
                  column.type === "CHECKBOX" ? (
                  <select
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  >
                    <option value="">Select</option>
                    {column.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData[column.name] || ""}
                    onChange={(event) => handleInputChange(event, column.name)}
                    className={`border border-gray-300 rounded px-4 py-2 w-full ${
                      column.width || ""
                    } focus:outline-none focus:border-blue-500`}
                  />
                )}

                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleDropColumn(column.name)}
                >
                  Drop Column
                </button>
              </div>
            ))}

            <div className="mb-4">
              <label className="block mb-1 text-gray-700">
                New Column Title
              </label>
              <input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">
                New Column Type
              </label>
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              >
                <option value="VARCHAR(250)">Text</option>
                <option value="TEXTAREA">Text Area</option>
                <option value="DECIMAL">Decimal</option>
                <option value="INTEGER">Integer</option>
                <option value="BOOLEAN">Boolean</option>
                <option value="FILE">File</option>
                <option value="IMAGE">Image</option>
                <option value="DATETIME">DateTime</option>
                <option value="DROPDOWN">Dropdown</option>
                <option value="MULTIPLESELECT">Multiple Select</option>
                <option value="CHECKBOX">Checkbox</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Column Width</label>
              <select
                value={newColumnWidth}
                onChange={(event) => handleInputChange(event, "width")}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="w-1/2">w-1/2</option>
                <option value="w-1/4">w-1/4</option>
                <option value="w-3/4">w-3/4</option>
                <option value="w-full">w-full</option>
              </select>
            </div>
            {(newColumnType === "DROPDOWN" ||
              newColumnType === "MULTIPLESELECT" ||
              newColumnType === "CHECKBOX") && (
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">
                  Options (comma separated)
                </label>
                <input
                  type="text"
                  value={newColumnOptions.join(",")}
                  onChange={(e) =>
                    setNewColumnOptions(e.target.value.split(","))
                  }
                  className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            <button
              type="button"
              onClick={handleAddColumn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Column
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AlterTable;
