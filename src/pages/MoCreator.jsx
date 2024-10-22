import React, { useState, useEffect } from 'react';
import { dataRef } from '../utils/Firebabse';

function MOCreator() {
  // State for MO Name
  const [moName, setMoName] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ itemName: '', quantity: '', price: '' });
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  const MoRef = dataRef.child('MO');
  const stocksRef = dataRef.child('Stock');

  const [costs, setCosts] = useState([]);
  const [newCost, setNewCost] = useState({ name: '', quantity: '', cost: '' });

  // Fetch stocks from Firebase
  useEffect(() => {
    stocksRef.on('value', (snapshot) => {
      const stockData = snapshot.val();
      if (stockData) {
        const stockList = Object.values(stockData);
        setStocks(stockList);
      }
    });
  }, []);

  const handleMoNameChange = (e) => {
    setMoName(e.target.value);
  };

  // Handle input changes for products
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle input changes for costs
  const handleCostInputChange = (e) => {
    const { name, value } = e.target;
    setNewCost({ ...newCost, [name]: value });
  };

  // Add product
  const addProduct = () => {
    if (!newProduct.itemName || !newProduct.quantity || !newProduct.price) {
      alert('Please fill in all product fields.');
      return;
    }
    setProducts([...products, newProduct]);
    setNewProduct({ itemName: '', quantity: '', price: '' });
  };

  // Update product
  const updateProduct = () => {
    const updatedProducts = products.map((product, index) =>
      index === isEditing ? newProduct : product
    );
    setProducts(updatedProducts);
    setNewProduct({ itemName: '', quantity: '', price: '' });
    setIsEditing(null);
  };

  // Edit product
  const editProduct = (index) => {
    setNewProduct(products[index]);
    setIsEditing(index);
  };

  // Delete product
  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Add cost
  const addCost = () => {
    if (!newCost.name || !newCost.quantity || !newCost.cost) {
      alert('Please fill in all cost fields.');
      return;
    }
    setCosts([...costs, newCost]);
    setNewCost({ name: '', quantity: '', cost: '' });
  };

  // Save MO
  const saveMO = () => {
    if (!moName) {
      alert('Please enter a Machine Order name.');
      return;
    }

    const moData = {
      products,
      costs,
      createdAt: new Date().toISOString(),
    };

    MoRef.child(moName).set(moData, (error) => {
      if (error) {
        alert('Failed to save Machine Order. Please try again.');
      } else {
        alert('Machine Order saved successfully!');
        setMoName('');
        setProducts([]);
        setCosts([]);
      }
    });
  };

  // Filter stocks based on search term
  const filteredStocks = stocks.filter((stock) =>
    stock.itemName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="relative max-w-full h-[90vh] overflow-x-scroll scrollbar-hide p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Create Machine Order</h1>
        <div className="flex space-x-2">
          <button
            onClick={addProduct}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-[15px] font-medium rounded-md hover:bg-blue-700 focus:outline-none w-[150px] h-[35px] "
          >
            <span className="mr-2 text-lg">+</span>
            Add Product
          </button>
          <button
            onClick={saveMO}
            className="flex items-center px-3 py-1 bg-green-600 text-white text-[15px] font-medium rounded-md hover:bg-green-700 focus:outline-none w-[150px] h-[35px]"
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
                <th className="py-3 px-6"></th>
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

        {/* Product Form with Dropdown and Search */}
        <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold">{isEditing !== null ? 'Edit Product' : 'Add Product'}</h3>
          <div className="flex justify-between p-6 space-x-4">
            <div className="flex flex-col w-1/3">
              <label className="text-blue-600 font-medium mb-2">Search and Select Item *</label>
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-blue-200 rounded px-4 py-2 mb-2"
              />
              <select
                name="itemName"
                value={newProduct.itemName}
                onChange={handleProductInputChange}
                className="border border-blue-200 rounded px-4 py-2"
              >
                <option value="">Select Item</option>
                {filteredStocks.map((stock, index) => (
                  <option key={index} value={stock.itemName}>
                    {stock.itemName} (Qty: {stock.currentStock})
                  </option>
                ))}
              </select>
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

          <div className="flex justify-end space-x-4">
            <button
              onClick={isEditing !== null ? updateProduct : addProduct}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
            >
              {isEditing !== null ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>

      {/* Cost Form */}
      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Cost Details</h2>

        {/* Cost Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Cost Name</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Cost</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {costs.map((cost, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{cost.name}</td>
                  <td className="py-3 px-6">{cost.quantity}</td>
                  <td className="py-3 px-6">{cost.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Form */}
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

        <div className="flex justify-end space-x-4">
          <button
            onClick={addCost}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
          >
            Add Cost
          </button>
        </div>
      </div>
    </div>
  );
}

export default MOCreator;
