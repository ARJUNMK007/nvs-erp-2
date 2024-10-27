import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { dataRef } from '../utils/Firebabse';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gstNumber: "",
    contactNumber: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const CustomerRef = dataRef.child('Customers');

  // Load customers from Firebase on component mount
  useEffect(() => {
    CustomerRef.on("value", (snapshot) => {
      const customerData = snapshot.val();
      const customerList = customerData
        ? Object.keys(customerData).map((key) => ({
            ...customerData[key],
            key
          }))
        : [];
      setCustomers(customerList);
    });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle adding or updating a customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing customer in Firebase
      CustomerRef.child(editKey).set(formData);
      setIsEditing(false);
      setEditKey(null);
    } else {
      // Add new customer to Firebase
      CustomerRef.push(formData);
    }
    setFormData({ name: "", address: "", gstNumber: "", contactNumber: "" });
  };

  // Handle editing a customer
  const handleEditCustomer = (key) => {
    const customerToEdit = customers.find((customer) => customer.key === key);
    setFormData(customerToEdit);
    setIsEditing(true);
    setEditKey(key);
  };

  // Handle deleting a customer
  const handleDeleteCustomer = (key) => {
    CustomerRef.child(key).remove();
  };

  return (
    <div className="p-6 bg-[#f0f4f8] w-full h-[95vh] overflow-y-scroll overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      {/* Customer Form */}
      <form onSubmit={handleAddCustomer} className="mb-8 p-4 bg-white shadow rounded-md">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Customer" : "Add Customer"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleInputChange}
            placeholder="GST Number"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      {/* Customer Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">GST Number</th>
            <th className="py-2 px-4 border-b">Contact Number</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.key} className="border-b">
                <td className="text-center py-2 px-4">{customer.name}</td>
                <td className="text-center py-2 px-4">{customer.address}</td>
                <td className="text-center py-2 px-4">{customer.gstNumber}</td>
                <td className="text-center py-2 px-4">{customer.contactNumber}</td>
                <td className="text-center py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEditCustomer(customer.key)}
                    className="p-1 text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.key)}
                    className="p-1 text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No customers added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPage;
