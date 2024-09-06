import React, { useState } from 'react';
import { utils, writeFile } from 'xlsx';

function MoCreator() {
  const [inputFields, setInputFields] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: ''
  });
  const [orders, setOrders] = useState([]); // Store all orders with separate tables
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  // Save a new MO table
  const handleSave = () => {
    if (
      !inputFields.field1 ||
      !inputFields.field2 ||
      !inputFields.field3 ||
      !inputFields.field4 ||
      !inputFields.field5 ||
      !inputFields.field6
    ) {
      setErrorMessage('All fields are required. Please fill in all fields.');
      return;
    }

    const newOrder = {
      orderNumber: `MO ${orders.length + 1}`,
      data: {
        heading1: inputFields.field1,
        heading2: inputFields.field2,
        heading3: inputFields.field3,
        value1: inputFields.field4,
        value2: inputFields.field5,
        value3: inputFields.field6,
      },
    };

    setOrders([...orders, newOrder]);
    setInputFields({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: ''
    });
    setShowForm(false);
  };

  // Cancel operation
  const handleCancel = () => {
    setInputFields({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: ''
    });
    setErrorMessage('');
    setShowForm(false);
  };

  // Delete a row from the table
  const handleDelete = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  // Edit a row (populates the form with existing data)
  const handleEdit = (index) => {
    const orderToEdit = orders[index];
    setInputFields({
      field1: orderToEdit.data.heading1,
      field2: orderToEdit.data.heading2,
      field3: orderToEdit.data.heading3,
      field4: orderToEdit.data.value1,
      field5: orderToEdit.data.value2,
      field6: orderToEdit.data.value3
    });
    setShowForm(true);
    setOrders(orders.filter((_, i) => i !== index)); // Remove the entry being edited
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const allData = orders.flatMap(order => ({
      [order.data.heading1]: order.data.value1,
      [order.data.heading2]: order.data.value2,
      [order.data.heading3]: order.data.value3
    }));
    const worksheet = utils.json_to_sheet(allData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Machine Order');
    writeFile(workbook, 'machine_order.xlsx');
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-semibold">Create Machine Order</h1>

        <div className="flex space-x-4">
          {/* Add New MO button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            + Add New MO
          </button>

          {/* Export to Excel button */}
          <button
            onClick={handleExportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v13a2 2 0 002 2h14a2 2 0 002-2V7M8 7V4a2 2 0 012-2h4a2 2 0 012 2v3M16 11l-4 4m0 0l-4-4m4 4V7"
              />
            </svg>
            Export to Excel
          </button>
        </div>
      </div>

      {/* Input form */}
      {showForm && (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label>Heading 1</label>
            <input
              type="text"
              name="field1"
              placeholder="Heading 1"
              value={inputFields.field1}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <label>Value 1</label>
            <input
              type="text"
              name="field4"
              placeholder="Value 1"
              value={inputFields.field4}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Heading 2</label>
            <input
              type="text"
              name="field2"
              placeholder="Heading 2"
              value={inputFields.field2}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <label>Value 2</label>
            <input
              type="text"
              name="field5"
              placeholder="Value 2"
              value={inputFields.field5}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Heading 3</label>
            <input
              type="text"
              name="field3"
              placeholder="Heading 3"
              value={inputFields.field3}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
            <label>Value 3</label>
            <input
              type="text"
              name="field6"
              placeholder="Value 3"
              value={inputFields.field6}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>

          {errorMessage && (
            <p className="col-span-3 text-red-500">{errorMessage}</p>
          )}

          {/* Save and Cancel buttons */}
          <div className="col-span-3 flex space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tables for all orders */}
      {orders.map((order, index) => (
        <div key={index} className="mt-6">
          <h2 className="font-semibold">{order.orderNumber}</h2>
          <table className="table-auto border-collapse border border-gray-300 mt-2 w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-200">{order.data.heading1}</th>
                <th className="border px-4 py-2 bg-gray-200">{order.data.heading2}</th>
                <th className="border px-4 py-2 bg-gray-200">{order.data.heading3}</th>
                <th className="border px-4 py-2 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 bg-white">{order.data.value1}</td>
                <td className="border px-4 py-2 bg-white">{order.data.value2}</td>
                <td className="border px-4 py-2 bg-white">{order.data.value3}</td>
                <td className="border px-4 py-2 bg-white">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default MoCreator;
