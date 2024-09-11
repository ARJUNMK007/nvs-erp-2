import React, { useState } from 'react';

const machines = [
  { id: 1, name: 'Machine 1' },
  { id: 2, name: 'Machine 2' },
  { id: 3, name: 'Machine 3' },
];

// Sample product details and cost details for each machine
const machineDetails = {
  1: {
    products: [
      { id: 1, itemName: 'Product A', quantity: 10, price: 100 },
      { id: 2, itemName: 'Product B', quantity: 5, price: 200 },
    ],
    costs: [
      { id: 1, costType: 'Labor', quantity: 5, cost: 500 },
      { id: 2, costType: 'Material', quantity: 20, cost: 1000 },
    ],
  },
  2: {
    products: [
      { id: 3, itemName: 'Product C', quantity: 3, price: 150 },
      { id: 4, itemName: 'Product D', quantity: 8, price: 400 },
    ],
    costs: [
      { id: 3, costType: 'Labor', quantity: 10, cost: 750 },
      { id: 4, costType: 'Material', quantity: 15, cost: 1200 },
    ],
  },
};

function PoCreator() {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [products, setProducts] = useState([]);
  const [costs, setCosts] = useState([]);
  const [billedTo, setBilledTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [isEditingProduct, setIsEditingProduct] = useState(null); // Tracks the currently editing product row
  const [isEditingCost, setIsEditingCost] = useState(null); // Tracks the currently editing cost row

  const handleMachineChange = (e) => {
    const machineId = parseInt(e.target.value);
    setSelectedMachine(machineId);
    if (machineDetails[machineId]) {
      setProducts(machineDetails[machineId].products);
      setCosts(machineDetails[machineId].costs);
    } else {
      setProducts([]);
      setCosts([]);
    }
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  const handleCostChange = (index, key, value) => {
    const updatedCosts = [...costs];
    updatedCosts[index][key] = value;
    setCosts(updatedCosts);
  };

  const handleEditProduct = (index) => {
    if (isEditingProduct !== null) {
      setIsEditingProduct(null); // Save previous row if another is clicked
    }
    setIsEditingProduct(index); // Set the current row to editable
  };

  const handleEditCost = (index) => {
    if (isEditingCost !== null) {
      setIsEditingCost(null); // Save previous row if another is clicked
    }
    setIsEditingCost(index); // Set the current row to editable
  };

  const handleSaveProduct = () => {
    setIsEditingProduct(null); // Save and exit edit mode for product
  };

  const handleSaveCost = () => {
    setIsEditingCost(null); // Save and exit edit mode for cost
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl font-semibold">Purchase Order</h1>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-600 transition duration-300"
          >
            Generate Invoice
          </button>
        </div>
      </div>

      {/* Billed To and Ship To Section */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-semibold">Billed To</label>
        <input
          type="text"
          value={billedTo}
          onChange={(e) => setBilledTo(e.target.value)}
          placeholder="Enter billed to details"
          className="border rounded-md p-2"
        />
        <label className="text-lg font-semibold">Ship To</label>
        <input
          type="text"
          value={shipTo}
          onChange={(e) => setShipTo(e.target.value)}
          placeholder="Enter ship to details"
          className="border rounded-md p-2"
        />
      </div>

      {/* Machine Selection */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-semibold">Select Machine</label>
        <select
          onChange={handleMachineChange}
          className="border rounded-md p-2"
          defaultValue=""
        >
          <option value="" disabled>Select a machine</option>
          {machines.map((machine) => (
            <option key={machine.id} value={machine.id}>
              {machine.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Product and Cost Tables if a machine is selected */}
      {selectedMachine && (
        <div className="space-y-6">
          {/* Product Table */}
          <div className="w-full">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6">Item Name</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-200">
                    <td className="py-3 px-6">
                      {isEditingProduct === index ? (
                        <input
                          type="text"
                          value={product.itemName}
                          onChange={(e) => handleProductChange(index, 'itemName', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      ) : (
                        product.itemName
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {isEditingProduct === index ? (
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      ) : (
                        product.quantity
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {isEditingProduct === index ? (
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      ) : (
                        product.price
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {isEditingProduct === index ? (
                        <button
                          onClick={handleSaveProduct}
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditProduct(index)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cost Table */}
          <div className="w-full">
            <h2 className="text-lg font-semibold">Cost Details</h2>
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6">Cost Type</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Cost</th>
                  <th className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost, index) => (
                  <tr key={cost.id} className="border-b border-gray-200">
                    <td className="py-3 px-6">
                      {isEditingCost === index ? (
                        <input
                          type="text"
                          value={cost.costType}
                          onChange={(e) => handleCostChange(index, 'costType', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      ) : (
                        cost.costType
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {isEditingCost === index ? (
                        <input
                          type="number"
                          value={cost.quantity}
                          onChange={(e) => handleCostChange(index, 'quantity', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      ) : (
                        cost.quantity
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {isEditingCost === index ? (
                        <input
                          type="number"
                          value={cost.cost}
                          onChange={(e) => handleCostChange(index, 'cost', e.target.value)}
                          className="border rounded-md p-2"
                        />
                      ) : (
                        cost.cost
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {isEditingCost === index ? (
                        <button
                          onClick={handleSaveCost}
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditCost(index)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PoCreator;
