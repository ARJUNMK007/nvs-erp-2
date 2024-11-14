import React, { useState, useEffect } from 'react';
import { dataRef } from '../utils/Firebabse';

const Inventools = () => {
  const toolsRef = dataRef.child('Tools');
  const [toolData, setToolData] = useState([]);
  const [newTool, setNewTool] = useState({
    toolName: '',
    toolQty: '',
    employeeName: '',
    outDate: '',
    outQty: '',
    inDate: '',
    inQty: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tools from Firebase when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await toolsRef.get();
      if (snapshot.exists()) {
        const data = snapshot.val();
        const toolsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setToolData(toolsArray);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTool((prevTool) => ({
      ...prevTool,
      [name]: value,
    }));
  };

  const handleAddTool = () => {
    if (
      newTool.toolName &&
      newTool.toolQty &&
      newTool.employeeName &&
      newTool.outDate &&
      newTool.outQty &&
      newTool.inDate &&
      newTool.inQty
    ) {
      if (isEditing) {
        const updatedToolRef = toolsRef.child(toolData[editIndex].id);
        updatedToolRef.set(newTool);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        toolsRef.push(newTool);
      }
      setNewTool({
        toolName: '',
        toolQty: '',
        employeeName: '',
        outDate: '',
        outQty: '',
        inDate: '',
        inQty: '',
      });
    }
  };

  const handleEditTool = (index) => {
    setNewTool(toolData[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteTool = (index) => {
    const toolId = toolData[index].id;
    toolsRef.child(toolId).remove();
    setToolData(toolData.filter((_, i) => i !== index));
  };

  const filteredTools = toolData.filter((tool) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      tool.toolName.toLowerCase().includes(searchLower) ||
      tool.employeeName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-4 invent-parents overflow-scroll h-[85vh]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Tools Management</h1>
        <input
          type="text"
          placeholder="Search Tools"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-2 py-1 mb-2"
        />
      </div>

      {/* Add New Tool or Edit Tool */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {isEditing ? 'Edit Tool' : 'Add New Tool'}
        </h2>
        <input
          type="text"
          name="toolName"
          value={newTool.toolName}
          onChange={handleInputChange}
          placeholder="Tool Name"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="toolQty"
          value={newTool.toolQty}
          onChange={handleInputChange}
          placeholder="Tool Quantity"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="employeeName"
          value={newTool.employeeName}
          onChange={handleInputChange}
          placeholder="Employee Name"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="outDate"
          value={newTool.outDate}
          onChange={handleInputChange}
          placeholder="Out Date"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="outQty"
          value={newTool.outQty}
          onChange={handleInputChange}
          placeholder="Out Quantity"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="date"
          name="inDate"
          value={newTool.inDate}
          onChange={handleInputChange}
          placeholder="In Date"
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="inQty"
          value={newTool.inQty}
          onChange={handleInputChange}
          placeholder="In Quantity"
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddTool}
          className="px-4 py-2 bg-blue-500 text-white mt-[4px]"
        >
          {isEditing ? 'Update Tool' : 'Add Tool'}
        </button>
      </div>

      {/* Tool Table */}
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Tool Name</th>
            <th className="border px-4 py-2">Tool Quantity</th>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Out Date</th>
            <th className="border px-4 py-2">Out Quantity</th>
            <th className="border px-4 py-2">In Date</th>
            <th className="border px-4 py-2">In Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTools.map((tool, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{tool.toolName}</td>
              <td className="border px-4 py-2">{tool.toolQty}</td>
              <td className="border px-4 py-2">{tool.employeeName}</td>
              <td className="border px-4 py-2">{tool.outDate}</td>
              <td className="border px-4 py-2">{tool.outQty}</td>
              <td className="border px-4 py-2">{tool.inDate}</td>
              <td className="border px-4 py-2">{tool.inQty}</td>
              <td className="border px-4 py-2">
                <i
                  className="fas fa-edit text-blue-500 cursor-pointer"
                  onClick={() => handleEditTool(index)}
                ></i>
                <i
                  className="fas fa-trash-alt text-red-500 cursor-pointer ml-[4px]"
                  onClick={() => handleDeleteTool(index)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventools;
