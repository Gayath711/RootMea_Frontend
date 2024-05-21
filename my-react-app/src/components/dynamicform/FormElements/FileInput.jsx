import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { protectedApi } from "../../../services/api";

function FileInput({
  title,
  className,
  files,
  setFiles,
  formData,
  setFormData,
  mode,
  deletedFilesKey,
  disabled,
  ...rest
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [formData, files]
  );

  const handleRemove = useCallback(
    (filePath, file_id) => {
      console.log(files.filter((file) => file.path !== filePath));
      setFiles(files.filter((file) => file.path !== filePath));
      if (formData && mode === "edit") {
        setFormData((prev) => {
          const newFormData = { ...prev };
          if (typeof newFormData[deletedFilesKey] !== Array) {
            newFormData[deletedFilesKey] = [];
          }
          if (file_id) {
            newFormData[deletedFilesKey].push(file_id);
          }
          return newFormData;
        });
      }
    },
    [files, formData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    // accept: {
    // "application/pdf": [".pdf"],
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    //   [".docx"],
    // },
  });

  const extractFilenameFromHeader = useCallback((response) => {
    console.log(response.headers);
    const contentDisposition = response.headers.get("Content-Disposition");
    const matches = contentDisposition.match(/filename="(.+)"/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
  }, []);

  const downloadFile = useCallback(async (fileId) => {
    try {
      if (!fileId) return;
      const response = await protectedApi.get(`/download_document/${fileId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", extractFilenameFromHeader(response));

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, []);

  return (
    <div
      className={`border flex rounded-[6px] justify-between items-center pl-2 pr-2 ${className}`}
      {...getRootProps()}
    >
      <input {...getInputProps({ disabled })} />
      {!files?.length && <div className="text-[#8C8C8C]">{title}</div>}
      {files?.length > 0 && (
        <div className="flex items-center gap-x-2 overflow-x-auto mr-3">
          {files.map((file) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadFile(file?.file_id);
              }}
              key={file.path}
              className="bg-[#D4EDEC] my-1 p-1 flex gap-x-2 rounded-sm justify-center items-center"
            >
              <div className="text-nowrap">{file.path || file.file_name}</div>
              <button
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleRemove(file.path, file?.file_id);
                }}
                className="size-4 disabled:cursor-not-allowed"
              >
                <img src="/close.svg" className="size-4" alt="" />
              </button>
            </button>
          ))}
        </div>
      )}
      <img src="/attach.svg" className="size-8 my-0.5" alt="" />
    </div>
  );
}

export default FileInput;
