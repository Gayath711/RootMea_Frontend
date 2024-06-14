import React, { useState } from "react";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  

  const onBlur = () => {
    setIsEditing(false);
    updateMyData(index, id, value);
  };

  return (
    <div
      onClick={toggleEditing}
      onBlur={onBlur}
      style={{  padding: "4px", width:"120px" }}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={onChange}
          autoFocus
          style={{ outline:"none", border: "1px solid gray" }}
        />
      ) : (
        value
      )}
    </div>
  );
};

export default EditableCell;