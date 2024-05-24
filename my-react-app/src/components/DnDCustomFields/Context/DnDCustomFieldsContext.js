import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const DnDCustomFieldsContext = createContext();

// Create a provider component
export const DnDCustomFieldsContextProvider = ({ children }) => {
  // State to hold elements array
  const [elements, setElements] = useState([]);

  // State to hold index of selected element
  const [selectedElement, setSelectedElement] = useState(null);

  // Function to remove an element
  const removeElement = (index) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      const filteredElements = updatedElements.toSpliced(index, 1);
      return filteredElements;
    });
    if (selectedElement === index) setSelectedElement(null);
    else if (selectedElement > index) setSelectedElement(selectedElement - 1);
  };

  // Function to update an element
  const updateElement = (index, updatedElement) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements[index] = updatedElement;
      return updatedElements;
    });
  };

  // Function to add an element
  const addElement = (index, newElement) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements.splice(index, 0, newElement);
      return updatedElements;
    });
  };

  const cloneElement = (index) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      const newElement = [...prevElements];
      updatedElements.splice(index, 0, newElement[index]);
      return updatedElements;
    });
  };

  const resetElements = () => {
    setSelectedElement(null);
    setElements([]);
  };

  // Value to be provided by the context
  const contextValue = {
    elements,
    selectedElement,
    selectedFieldElement:
      selectedElement !== null ? elements[selectedElement] : null,
    setSelectedElement,
    cloneElement,
    removeElement,
    updateElement,
    addElement,
    setElements,
    resetElements,
  };

  // Provide the context value to the children components
  return (
    <DnDCustomFieldsContext.Provider value={contextValue}>
      {children}
    </DnDCustomFieldsContext.Provider>
  );
};

// Custom hook to consume the ElementContext
export const useDnDCustomFieldsContext = () =>
  useContext(DnDCustomFieldsContext);
