import React, { useState, useEffect } from "react";
import axios from "axios";
import apiURL from "../../apiConfig";

function BulkUploadComponent() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [errorReport, setErrorReport] = useState(null);
  const [tableNames, setTableNames] = useState([]);
  const [selectedTableName, setSelectedTableName] = useState("");

  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const response = await axios.get(`${apiURL}/get_matching_tables/`);
        setTableNames(response.data.matching_tables);
      } catch (error) {
        console.error("Error fetching table names:", error);
      }
    };

    fetchTableNames();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTableNameChange = (event) => {
    setSelectedTableName(event.target.value);
  };

  const handleUpload = () => {
    if (!selectedTableName || !file) {
      setMessage("Table name and XLS file are required");
      setErrorReport(null);
      return;
    }

    setMessage("Uploading XLS file...");
    setErrorReport(null);

    const formData = new FormData();
    formData.append("table_name", selectedTableName);
    formData.append("xls_file", file); // Change 'csv_file' to 'xls_file'

    axios
      .post(`${apiURL}/upload_csv_to_table/`, formData, {
        // Change the endpoint URL
        responseType: "blob",
      })
      .then((response) => {
        if (response.status === 201) {
          setMessage(response.data.message);
          setErrorReport(null);
        } else if (response.status === 400) {
          const errorMessage = response.data.message;
          setMessage(errorMessage);
          setErrorReport(null);
        } else if (
          response.headers["content-type"] ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          setErrorReport(url);
          setMessage(
            "Some rows contained errors and were not processed. The valid rows have been uploaded successfully. Click the button below to download a report of the errors."
          );
        } else {
          setMessage("An unexpected error occurred");
          setErrorReport(null);
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.message;
          setMessage(errorMessage);
          setErrorReport(null);
        } else {
          setMessage("Error occurred during upload");
          setErrorReport(null);
          console.error(error);
        }
      });
  };

  const downloadErrorReport = () => {
    if (errorReport) {
      const link = document.createElement("a");
      link.href = errorReport;
      link.setAttribute("download", "error_report.xlsx"); // Change the file extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(errorReport);
      setErrorReport(null);
    }
  };

  const handleformdownload = async () => {
    try {
      const response = await fetch(
        `${apiURL}/download_table_column_data/${selectedTableName}/`
      );

      if (!response.ok) {
        throw new Error("Failed to download table data");
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedTableName}.xlsx`; // Change the file extension
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading table data:", error);
      alert("Failed to download table data. Please try again later.");
    }
  };

  const cleanedTableName = selectedTableName.replace("roots", "");
  const cleanedTableName1 =
    cleanedTableName.charAt(0).toUpperCase() + cleanedTableName.slice(1);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="bg-94cfcf text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">CSV Bulk Upload</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-f6f6f6">
        <div className="container mx-auto py-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2
              className="text-3xl font-semibold mb-6 text-center"
              style={{ color: "#5ac2be" }}
            >
              Bulk Upload CSV for {cleanedTableName1}
            </h2>
            <div className="mb-6">
              <label
                htmlFor="table"
                className="block mb-2 text-lg text-gray-700 font-semibold"
              >
                Select Table:
              </label>
              <select
                id="table"
                value={selectedTableName}
                onChange={handleTableNameChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a table</option>
                {tableNames.map((tableName) => (
                  <option key={tableName} value={tableName}>
                    {tableName.replace("roots", "").charAt(0).toUpperCase() +
                      tableName.replace("roots", "").slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="file"
                className="block mb-2 text-lg text-gray-700 font-semibold"
              >
                Select CSV File:
              </label>
              <div className="relative border border-gray-300 rounded-lg px-4 py-2 w-full flex items-center justify-between focus-within:border-blue-500">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  accept=".xls, .xlsx" // Update this line
                />
                <span className="text-gray-600 mr-2">Upload your file</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <button
                onClick={handleUpload}
                className="bg-Teal-500 hover:bg-Teal-700 text-block font-bold py-2 px-4 rounded mb-4 mr-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-Teal-500"
                style={{ borderRadius: "3px", background: "#9CDADA" }}
              >
                Upload
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleformdownload}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Download Form Structure
              </button>
            </div>
            {message && (
              <div className="mt-6 text-lg text-red-500">{message}</div>
            )}
            {errorReport && (
              <div className="mt-6">
                <button
                  onClick={downloadErrorReport}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Download Error Report
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-94cfcf text-white py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default BulkUploadComponent;
