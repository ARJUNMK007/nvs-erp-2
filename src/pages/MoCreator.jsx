import React, { useState, useEffect } from 'react';
import { dataRef } from '../utils/Firebabse';

function MOCreator() {
  const [isOpen, setIsOpen] = useState(false);
  // State for MO Name
  const [moName, setMoName] = useState('');
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ itemName: '', quantity: '', itemPrice: '' });
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


  const [moList, setMoList] = useState([]);



  // Fetch MO names from Firebase
  useEffect(() => {
    MoRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const moEntries = Object.keys(data).map((key) => ({
          name: key,
          data: data[key],
        }));
        setMoList(moEntries);
      } else {
        setMoList([]);
      }
    });
  }, []);

  // Handle MO name input
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
    if (!newProduct.itemName || !newProduct.quantity || !newProduct.itemPrice) {
      alert('Please fill in all product fields.');
      return;
    }
    setProducts([...products, newProduct]);
    setNewProduct({ itemName: '', quantity: '', itemPrice: '' });
  };

  // Update product
  const updateProduct = () => {
    const updatedProducts = products.map((product, index) =>
      index === isEditing ? newProduct : product
    );
    setProducts(updatedProducts);
    setNewProduct({ itemName: '', quantity: '', itemPrice: '' });
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

// Save MO with itemTotalPrice saved as itemPrice
const saveMO = () => {
  if (!moName) {
    alert('Please enter a Machine Order name.');
    return;
  }

  // Overwrite itemPrice with itemTotalPrice for each product
  const updatedProducts = products.map((product) => {
    const quantity = parseFloat(product.quantity) || 0;
    const itemPrice = parseFloat(product.itemPrice) || 0;
    const itemTotalPrice = quantity * itemPrice;

    return {
      ...product,
      itemPrice: itemTotalPrice, // Save the total price into itemPrice
    };
  });

  const moData = {
    products: updatedProducts,
    costs,
    createdAt: new Date().toISOString(),
  };

  // Save data to Firebase
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

  // Set price automatically when item is selected
  const handleItemSelect = (selectedItem) => {
    setNewProduct((prevState) => ({
      ...prevState,
      itemName: selectedItem.itemName,
      itemPrice: selectedItem.itemPrice, // Automatically set the item price
    }));
  };
  const calculateTotalPrice = (product) => {
    const quantity = parseFloat(product.quantity) || 0;
    const itemPrice = parseFloat(product.itemPrice) || 0;
    return (quantity * itemPrice).toFixed(2);
  };
  // Delete MO from Firebase
  const deleteMO = (moKey) => {
    if (window.confirm('Are you sure you want to delete this Machine Order?')) {
      MoRef.child(moKey).remove((error) => {
        if (error) {
          alert('Failed to delete Machine Order. Please try again.');
        } else {
          alert('Machine Order deleted successfully!');
        }
      });
    }
  };
  return (
    <div className="relative max-w-full h-[90vh] overflow-x-scroll invent-parent scrollbar-hide p-4">
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
      {/* MO List with Delete Buttons */}
      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between cursor-pointer bg-gray-100 px-4 py-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">
          Existing Machine Orders
        </h2>
        <span
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="mt-4">
          {moList.length > 0 ? (
            <ul className="space-y-4">
              {moList.map((mo) => (
                <li
                  key={mo.name}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {mo.name}
                  </span>
                  <i
                    className="fas fa-trash-alt text-red-500 cursor-pointer"
                    onClick={() => deleteMO(mo.name)}
                  ></i>
                  {/* <button
                    onClick={() => deleteMO(mo.name)}
                    className="px-3 py-1 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No Machine Orders available.</p>
          )}
        </div>
      )}
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
                <th className="py-3 px-6">Item Price</th>
                <th className="py-3 px-6">Total Price</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {products.map((product, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{product.itemName}</td>
                  <td className="py-3 px-6">{product.quantity}</td>
                  <td className="py-3 px-6">{product.itemPrice}</td>
                  <td className="py-3 px-6">{calculateTotalPrice(product)}</td>
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
                className="border border-blue-200 rounded px-4 py-2"
              />
              <select
                name="itemName"
                value={newProduct.itemName}
                onChange={(e) => handleItemSelect(filteredStocks.find(stock => stock.itemName === e.target.value))}
                className="border border-blue-200 rounded px-4 py-2 mt-2"
              >
                <option value="">Select Item</option>
                {filteredStocks.map((stock, index) => (
                  <option key={index} value={stock.itemName}>
                    {stock.itemName}
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
              <label className="text-blue-600 font-medium mb-2">Item Price *</label>
              <input
                type="number"
                name="itemPrice"
                value={newProduct.itemPrice}
                onChange={handleProductInputChange}
                placeholder="Enter Item Price"
                className="border border-blue-200 rounded px-4 py-2"
                readOnly
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

      {/* Cost Form remains unchanged */}
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
