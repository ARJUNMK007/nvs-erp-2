import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function InventoryPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: '',
    itemName: '',
    category: '',
    stock: '',
    price: '',
    averagePrice: '',
    supplier: '',
  });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Stock Computation', 'Sales Alert'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value,
    });
    setError(''); // Clear the error message when the user starts typing
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleAddOrder = () => {
    setIsAdding(true);
    setIsEditing(false); // Ensure we are not in edit mode when adding a new order
    setNewOrder({
      id: orders.length + 1,
      itemName: '',
      category: '',
      stock: '',
      price: '',
      averagePrice: '',
      supplier: '',
    });
  };

  const handleSaveOrder = () => {
    const { itemName, category, stock, price, averagePrice, supplier } = newOrder;

    // Check if any of the fields are empty
    if (!itemName || !category || !stock || !price || !averagePrice || !supplier) {
      setError('Please fill in all fields before saving.');
      return; // Prevent saving the order
    }

    if (isEditing) {
      // Update the existing order
      setOrders(
        orders.map((order) =>
          order.id === editingOrderId ? newOrder : order
        )
      );
      setIsEditing(false);
    } else {
      // Save the new order
      setOrders([...orders, newOrder]);
    }

    setIsAdding(false);
  };

  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find((order) => order.id === orderId);
    setNewOrder(orderToEdit);
    setEditingOrderId(orderId);
    setIsEditing(true);
    setIsAdding(true); // Open the form with current values
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "InventoryOrders.xlsx");
  };

  const filteredOrders = orders.filter((order) =>
    order.itemName.toLowerCase().includes(searchQuery) ||
    order.category.toLowerCase().includes(searchQuery) ||
    order.supplier.toLowerCase().includes(searchQuery)
  );

  return (
    <div className='mt-30'>
      <div className="relative w-full max-w-md mx-auto">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 text-center py-2 font-semibold ${activeTab === index ? 'text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          className="absolute bottom-0 h-1 bg-black transition-all duration-300"
          style={{ left: `${(activeTab / tabs.length) * 100}%`, width: `${100 / tabs.length}%` }}
        />
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-medium mb-2 md:mb-0">Manage Your Inventory Details</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search here..."
              className="border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearchChange}
            />
            <button className="border-t border-b border-r border-gray-300 bg-gray-100 text-gray-700 py-2 px-4 rounded-r-md">
              Filter
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleAddOrder}
          >
            + Add New Orders
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleExportToExcel}
          >
            Export Report to Excel
          </button>
        </div>
      </div>

      <div className="p-6">
        {(isAdding || isEditing) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Order' : 'Add New Order'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={newOrder.itemName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                type="text"
                name="category"
                placeholder="Item Category"
                value={newOrder.category}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                type="number"
                name="stock"
                placeholder="Current Stock"
                value={newOrder.stock}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                type="number"
                name="price"
                placeholder="Item Price"
                value={newOrder.price}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                type="number"
                name="averagePrice"
                placeholder="Average Price"
                value={newOrder.averagePrice}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                type="text"
                name="supplier"
                placeholder="Supplier"
                value={newOrder.supplier}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={handleSaveOrder}
              >
                Save
              </button>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">STOCK STATUS</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">S NO</th>
                <th className="px-4 py-2 text-left">ITEM NAME</th>
                <th className="px-4 py-2 text-left">ITEM CATEGORY</th>
                <th className="px-4 py-2 text-left">CURRENT STOCK</th>
                <th className="px-4 py-2 text-left">ITEM PRICE</th>
                <th className="px-4 py-2 text-left">AVERAGE PRICE</th>
                <th className="px-4 py-2 text-left">SUPPLIER</th>
                <th className="px-4 py-2 text-left"></th> {/* For icons */}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr className="border-b" key={order.id}>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.itemName}</td>
                  <td className="px-4 py-2">{order.category}</td>
                  <td className="px-4 py-2">{order.stock}</td>
                  <td className="px-4 py-2">{order.price}</td>
                  <td className="px-4 py-2">{order.averagePrice}</td>
                  <td className="px-4 py-2">{order.supplier}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditOrder(order.id)}
                    >
                      <i className="fas fa-edit"></i> {/* Edit icon */}
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
