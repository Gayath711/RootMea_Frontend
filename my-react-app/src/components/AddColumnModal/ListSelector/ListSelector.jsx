import React, { useState, useEffect } from 'react';
import './ListSelector.css';
import apiURL from "../../../apiConfig";

const ListSelector = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAvailableItems, setSelectedAvailableItems] = useState([]);
  const [selectedSelectedItems, setSelectedSelectedItems] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    // Fetch items from the API
    fetch(`${apiURL}/priority_list`) // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        
        // Initialize the expandedGroups state
        const initialExpandedGroups = data.reduce((groups, item) => {
          if (!groups[item.group]) {
            groups[item.group] = false; // Initially collapse all groups
          }
          return groups;
        }, {});
        setExpandedGroups(initialExpandedGroups);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleSelectAvailable = (item) => {
    setSelectedAvailableItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSelectSelected = (item) => {
    setSelectedSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const moveToSelected = () => {
    setSelectedItems((prev) => [...prev, ...selectedAvailableItems]);
    setItems((prev) =>
      prev.map((item) =>
        selectedAvailableItems.includes(item.name) ? { ...item, disabled: true } : item
      )
    );
    setSelectedAvailableItems([]);
  };

  const moveToAvailable = () => {
    setSelectedItems((prev) =>
      prev.filter((item) => !selectedSelectedItems.includes(item))
    );
    setItems((prev) =>
      prev.map((item) =>
        selectedSelectedItems.includes(item.name) ? { ...item, disabled: false } : item
      )
    );
    setSelectedSelectedItems([]);
  };

  const handleDoubleClickAvailable = (itemName) => {
    setSelectedItems((prev) => [...prev, itemName]);
    setItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, disabled: true } : item
      )
    );
  };

  const handleDoubleClickSelected = (itemName) => {
    setSelectedItems((prev) => prev.filter((item) => item !== itemName));
    setItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, disabled: false } : item
      )
    );
  };

  const toggleGroup = (group) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // Group items by their group property
  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.group]) {
      groups[item.group] = [];
    }
    groups[item.group].push(item);
    return groups;
  }, {});

  return (
    <div className="list-selector">
      <div className="available-items">
        <h3>Available Items</h3>
        {Object.keys(groupedItems).map((group) => (
          <div key={group}>
            <h4 onClick={() => toggleGroup(group)} style={{ cursor: 'pointer' }}>
              {group} {expandedGroups[group] ? '▲' : '▼'}
            </h4>
            {expandedGroups[group] && (
              <ul>
                {groupedItems[group].map((item) => (
                  <li
                    key={item.name}
                    onClick={() => !item.disabled && handleSelectAvailable(item.name)}
                    onDoubleClick={() => !item.disabled && handleDoubleClickAvailable(item.name)}
                    style={{
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      backgroundColor: selectedAvailableItems.includes(item.name) ? 'lightgrey' : 'white',
                      textDecoration: item.disabled ? 'line-through' : 'none',
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={moveToSelected} disabled={selectedAvailableItems.length === 0}>
          {'>>'}
        </button>
        <button onClick={moveToAvailable} disabled={selectedSelectedItems.length === 0}>
          {'<<'}
        </button>
      </div>
      <div className="selected-items">
        <h3>Selected Items</h3>
        <ul>
          {selectedItems.length === 0 ? (
            <li style={{ listStyle: 'none' }}>No items selected</li>
          ) : (
            selectedItems.map((item) => (
              <li
                key={item}
                onClick={() => handleSelectSelected(item)}
                onDoubleClick={() => handleDoubleClickSelected(item)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedSelectedItems.includes(item) ? 'lightgrey' : 'white',
                }}
              >
                {item}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListSelector;
