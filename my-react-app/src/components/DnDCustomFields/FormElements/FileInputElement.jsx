import React from "react";
import FormLabel from "./FormLabel";

import Attachments_Icon from "../../images/form_builder/attachments.svg";
import Image_upload_Icon from "../../images/form_builder/image_upload.svg";

const FileInputElement = ({
  className,
  type,
  label,
  required,
  value,
  placeholder,
  disabled = false,
  width,
  isFile,
  base64,
  accept,
  ...rest
}) => {
  let IconSrc = isFile ? Attachments_Icon : Image_upload_Icon;

  return (
    <div className={`m-1 ${width}`}>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      {base64 ? (
        <div className="flex gap-2 items-center">
          {isFile ? (
            <a
              className="border border-keppel rounded-[3px] disabled:cursor-not-allowed disabled:bg-[#6cd8d3] bg-[#5BC4BF] text-white p-1 px-2 text-xs"
              href={base64}
              download={label}
            >
              Download File
            </a>
          ) : (
            <img
              src={base64}
              style={{
                width: "100px",
                height: "auto",
              }}
            />
          )}
        </div>
      ) : (
        <div className="rounded flex items-center gap-2 w-100 p-2 py-2.5 hover:bg-teal-400 cursor-pointer">
          <img src={IconSrc} alt="Icon" className="h-[14.06px] w-[14.06px]" />
          <span className="text-xs font-medium">{`No ${
            isFile ? "File" : "Image"
          } Choosen`}</span>
        </div>
      )}
    </div>
  );
};

export default FileInputElement;
