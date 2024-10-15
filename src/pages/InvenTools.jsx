import React, { useState } from 'react';

const Inventools = () => {
  const [toolData, setToolData] = useState([
    {
      toolName: 'Hammer',
      toolQty: 50,
      employeeName: 'John Doe',
      outDate: '2023-10-01',
      outQty: 10,
      inDate: '2023-10-05',
      inQty: 5,
    },
    {
      toolName: 'Screwdriver',
      toolQty: 30,
      employeeName: 'Jane Smith',
      outDate: '2023-09-30',
      outQty: 5,
      inDate: '2023-10-04',
      inQty: 3,
    },
  ]);

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
        const updatedTools = toolData.map((tool, index) =>
          index === editIndex ? newTool : tool
        );
        setToolData(updatedTools);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setToolData([...toolData, newTool]);
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
    const updatedTools = toolData.filter((_, i) => i !== index);
    setToolData(updatedTools);
  };
  const [searchTerm, setSearchTerm] = useState('');
    // Filtering tools based on the search term
    const filteredTools = toolData.filter((tool) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        tool.toolName.toLowerCase().includes(searchLower) ||
        tool.employeeName.toLowerCase().includes(searchLower)
      );
    });

  return (
    <div className="p-4">
      <div className='flex justify-between'>
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
        <h2 className="text-xl font-semibold mb-2">{isEditing ? 'Edit Tool' : 'Add New Tool'}</h2>
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
