import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiURL from "../../apiConfig";

function BulkUploadComponent() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [errorReport, setErrorReport] = useState(null);
  const { tableName } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!tableName || !file) {
      setMessage("Table name and XLSX file are required");
      setErrorReport(null);
      return;
    }

    setMessage("Uploading XLSX file...");
    setErrorReport(null);

    const formData = new FormData();
    formData.append("table_name", tableName);

    // Determine correct key based on file type
    const fileType = file.name.split(".").pop().toLowerCase();
    if (fileType === "csv") {
      formData.append("csv_file", file);
    } else if (fileType === "xlsx" || fileType === "xls") {
      formData.append("xls_file", file);
    } else {
      setMessage("Unsupported file type. Please upload an xlsx or Excel file.");
      setErrorReport(null);
      return;
    }

    axios
      .post(`${apiURL}/upload_csv_to_table/`, formData, {
        responseType: "blob",
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const contentType = response.headers["content-type"];

          if (
            contentType === "text/plain" ||
            contentType === "application/json"
          ) {
            const responseData = response.data;
            setMessage(responseData.message); // Display success message to user
            setErrorReport(null); // Clear any previous error report
          } else if (
            contentType ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            const blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            setErrorReport(url); // Set error report for download
            setMessage(
              "Errors occurred during upload. Click the button below to download the error report."
            );
          } else {
            setMessage("An unexpected error occurred");
            setErrorReport(null);
          }
        } else if (response.status === 400) {
          const errorMessage = response.data.message;
          setMessage(errorMessage);
          setErrorReport(null);
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
      link.setAttribute("download", "error_report.xlsx");
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
        `${apiURL}/download_table_column_data/${tableName}/`
      );

      if (!response.ok) {
        throw new Error("Failed to download table data");
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${tableName}.xlsx`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading table data:", error);
      alert("Failed to download table data. Please try again later.");
    }
  };

  const cleanedTableName = tableName.replace("roots", "");
  const cleanedTableName1 =
    cleanedTableName.charAt(0).toUpperCase() + cleanedTableName.slice(1);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="bg-94cfcf text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">XLSX Bulk Upload</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-f6f6f6">
        <div className="container mx-auto py-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            {/* cleanedTableName = matchedTableName.replace("roots", ""); */}
            <h2
              className="text-3xl font-semibold mb-6 text-center"
              style={{ color: "#5ac2be" }}
            >
              Bulk Upload XLSX for {cleanedTableName1}
            </h2>
            <div className="mb-6">
              <label
                htmlFor="file"
                className="block mb-2 text-lg text-gray-700 font-semibold"
              >
                Select XLSX File:
              </label>
              <div className="relative border border-gray-300 rounded-lg px-4 py-2 w-full flex items-center justify-between focus-within:border-blue-500">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  accept=".csv, .xlsx"
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
