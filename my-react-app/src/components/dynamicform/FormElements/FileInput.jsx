import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileInput({ title, className, setFiles, ...rest }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    // setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  return (
    <div
      className={`border flex rounded-[6px] justify-between items-center pl-4 pr-2 ${className}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="text-[#8C8C8C]">{title}</div>
      <img src="/attach.svg" className="size-8 my-0.5" alt="" />
    </div>
  );
}

export default FileInput;

