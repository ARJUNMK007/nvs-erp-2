import React, { useState } from 'react';
import { dataRef } from '../utils/Firebabse';

function MOCreator() {
  // State for MO Name
  const [moName, setMoName] = useState('');

  // State for Products
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ itemName: '', quantity: '', price: '' });
  const [isEditing, setIsEditing] = useState(null);

  const MoRef = dataRef.child('MO');

  // State for Costs
  const [costs, setCosts] = useState([]);
  const [newCost, setNewCost] = useState({ name: '', quantity: '', cost: '' });

  // Handle input changes for MO Name
  const handleMoNameChange = (e) => {
    setMoName(e.target.value);
  };

  // Handle input changes for adding/editing products
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle input changes for adding/editing costs
  const handleCostInputChange = (e) => {
    const { name, value } = e.target;
    setNewCost({ ...newCost, [name]: value });
  };

  // Add Product
  const addProduct = () => {
    if (!newProduct.itemName || !newProduct.quantity || !newProduct.price) {
      alert('Please fill in all product fields.');
      return;
    }
    setProducts([...products, newProduct]);
    setNewProduct({ itemName: '', quantity: '', price: '' });
  };

  // Update Product
  const updateProduct = () => {
    const updatedProducts = products.map((product, index) => 
      index === isEditing ? newProduct : product
    );
    setProducts(updatedProducts);
    setNewProduct({ itemName: '', quantity: '', price: '' });
    setIsEditing(null);
  };

  // Edit Product
  const editProduct = (index) => {
    setNewProduct(products[index]);
    setIsEditing(index);
  };

  // Delete Product
  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Add Cost
  const addCost = () => {
    if (!newCost.name || !newCost.quantity || !newCost.cost) {
      alert('Please fill in all cost fields.');
      return;
    }
    setCosts([...costs, newCost]);
    setNewCost({ name: '', quantity: '', cost: '' });
  };

  // Edit Cost
  const editCost = (id) => {
    const costToEdit = costs.find(cost => cost.id === id);
    setNewCost(costToEdit);
  };

  // Delete Cost
  const deleteCost = (id) => {
    setCosts(costs.filter(cost => cost.id !== id));
  };

  // Handle Save MO
  const saveMO = () => {
    if (!moName) {
      alert('Please enter a Machine Order name.');
      return;
    }

    // Prepare the data to be saved
    const moData = {
      products,
      costs,
      createdAt: new Date().toISOString(),
    };

    // Save under MO/moName
    MoRef.child(moName).set(moData, (error) => {
      if (error) {
        alert('Failed to save Machine Order. Please try again.');
      } else {
        alert('Machine Order saved successfully!');
        // Clear the form
        setMoName('');
        setProducts([]);
        setCosts([]);
      }
    });
  };

  return (
    <div className="relative max-w-full h-[90vh] overflow-x-scroll scrollbar-hide p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Create Machine Order</h1>
        <div className="flex space-x-2">
          <button
            onClick={addProduct}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none"
          >
            <span className="mr-2 text-lg">+</span>
            Add Product
          </button>
          <button
            onClick={saveMO}
            className="flex items-center px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 focus:outline-none"
          >
            Save MO
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-lg font-semibold">Machine Order Details</h1>
        </div>
        <form className="flex flex-col p-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-blue-600 font-medium mb-2">MO Name *</label>
            <input
              type="text"
              placeholder="Enter MO Name"
              value={moName}
              onChange={handleMoNameChange}
              className="border border-blue-200 rounded px-4 py-2"
            />
          </div>
        </form>
      </div>

      {/* Product Details Section */}
      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>

        {/* Product Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Item Name</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {products.map((product, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{product.itemName}</td>
                  <td className="py-3 px-6">{product.quantity}</td>
                  <td className="py-3 px-6">{product.price}</td>
                  <td className="py-3 px-6 flex space-x-4">
                    <button
                      onClick={() => editProduct(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Form */}
        <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold">{isEditing !== null ? 'Edit Product' : 'Add Product'}</h3>
          <div className="flex justify-between p-6 space-x-4">
            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Item Name *</label>
              <input
                type="text"
                name="itemName"
                value={newProduct.itemName}
                onChange={handleProductInputChange}
                placeholder="Enter Item Name"
                className="border border-blue-200 rounded px-4 py-2"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleProductInputChange}
                placeholder="Enter Quantity"
                className="border border-blue-200 rounded px-4 py-2"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleProductInputChange}
                placeholder="Enter Price"
                className="border border-blue-200 rounded px-4 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            {isEditing !== null ? (
              <button
                onClick={updateProduct}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update Product
              </button>
            ) : (
              <button
                onClick={addProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Costing Section */}
      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Costing</h2>

        {/* Cost Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Name of the Costing</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Cost</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {costs.map((cost) => (
                <tr key={cost.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{cost.name}</td>
                  <td className="py-3 px-6">{cost.quantity}</td>
                  <td className="py-3 px-6">{cost.cost}</td>
                  <td className="py-3 px-6 flex items-center space-x-4">
                    <button
                      onClick={() => editCost(cost.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCost(cost.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Form */}
        <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Add Cost</h3>
          <div className="flex justify-between p-6 space-x-4">
            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Cost Name *</label>
              <input
                type="text"
                name="name"
                value={newCost.name}
                onChange={handleCostInputChange}
                placeholder="Enter Cost Name"
                className="border border-blue-200 rounded px-4 py-2"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={newCost.quantity}
                onChange={handleCostInputChange}
                placeholder="Enter Quantity"
                className="border border-blue-200 rounded px-4 py-2"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Cost *</label>
              <input
                type="number"
                name="cost"
                value={newCost.cost}
                onChange={handleCostInputChange}
                placeholder="Enter Cost"
                className="border border-blue-200 rounded px-4 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={addCost}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Cost
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MOCreator;
