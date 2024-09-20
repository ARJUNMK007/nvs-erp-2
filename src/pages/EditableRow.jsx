import React, { useState } from 'react';

const EditableRow = ({ data, index, type, handleInputChange }) => {
  const [localData, setLocalData] = useState({ ...data });

  // Handle local input change without losing focus
  const handleLocalInputChange = (key, value) => {
    const updatedData = { ...localData, [key]: value };
    setLocalData(updatedData);
    handleInputChange(type, index, key, value);
  };

  return (
    <tr key={index} className="border-b border-gray-200">
      {Object.keys(localData).map((key, i) => (
        <td key={i} className="py-3 px-6">
          <input
            type={key === 'quantity' || key === 'price' || key === 'cost' ? 'number' : 'text'}
            value={localData[key] || ''}
            onChange={(e) => handleLocalInputChange(key, e.target.value)}
            className="border rounded-md p-2"
            onFocus={(e) => e.target.select()} // Optional: Select text on focus
          />
        </td>
      ))}
    </tr>
  );
};

export default EditableRow;
