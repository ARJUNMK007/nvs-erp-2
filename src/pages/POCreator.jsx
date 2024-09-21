import React, { useState, useEffect } from 'react';
import { dataRef } from '../utils/Firebabse'; // Ensure this import is correct
import EditableRow from './EditableRow'; // Component to handle each row edit

function PoCreator() {
  const [moList, setMoList] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [products, setProducts] = useState([]);
  const [costs, setCosts] = useState([]);
  const [billedTo, setBilledTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [poNumber, setPoNumber] = useState('');

  const MoRef = dataRef.child('MO');
  const PoNoRef = dataRef.child('PO');

  // Function to generate unique PO number
  const generateUniquePoNumber = () => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    return randomNumber.toString();
  };

  // Fetch machines (MO list) on mount
  useEffect(() => {
    const fetchMachines = async () => {
      const snapshot = await MoRef.once('value');
      const moData = snapshot.val();
      if (moData) {
        const moArray = Object.keys(moData).map((key) => ({
          id: key,
          name: key,
          ...moData[key],
        }));
        setMoList(moArray);
      }
    };

    fetchMachines();
    setPoNumber(generateUniquePoNumber()); // Generate PO number on load
  }, []);

  // Handle machine selection and fetch associated products/costs
  const handleMachineChange = async (e) => {
    const machineId = e.target.value;
    setSelectedMachine(machineId);

    // Fetch product and cost data for the selected machine
    const snapshot = await MoRef.child(machineId).once('value');
    const machineData = snapshot.val();
    if (machineData) {
      setProducts(machineData.products || []);
      setCosts(machineData.costs || []);
    } else {
      setProducts([]);
      setCosts([]);
    }
  };

  // Function to add an empty product row manually
  const addProductRow = () => {
    setProducts([...products, { itemName: '', price: '', quantity: '' }]); // Adds a new blank row
  };

  // Function to add an empty cost row manually
  const addCostRow = () => {
    setCosts([...costs, { costType: '', cost: '', quantity: '' }]); // Adds a new blank row
  };

  // Function to handle changes in the input fields of the products or costs
  const handleInputChange = (type, index, key, value) => {
    if (type === 'product') {
      const updatedProducts = [...products];
      updatedProducts[index][key] = value;
      setProducts(updatedProducts);
    } else if (type === 'cost') {
      const updatedCosts = [...costs];
      updatedCosts[index][key] = value;
      setCosts(updatedCosts);
    }
  };

  // Save all data to Firebase
  const saveAllDataToFirebase = () => {
    if (selectedMachine) {
      const selectedMachineName = moList.find(machine => machine.id === selectedMachine)?.name || 'Unknown Machine';
      const createdAt = new Date().toISOString();
      const poData = {
        products,
        costs,
        billedTo,
        shipTo,
        selectedMachine: {
          id: selectedMachine,
          name: selectedMachineName,
        },
        createdAt,
      };

      PoNoRef.child(poNumber).set(poData)
        .then(() => {
          alert(`Data saved successfully under PO No: ${poNumber}`);
          setPoNumber(generateUniquePoNumber()); // Reset PO number after saving
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    } else {
      console.error('Please select a machine.');
    }
  };

  return (
    <div className="flex flex-col space-y-4 h-[60vh]">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-xl font-semibold">Purchase Order</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={poNumber}
            readOnly
            className="border rounded-md p-2"
          />
          <button
            onClick={saveAllDataToFirebase}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save All
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-semibold">Billed To</label>
        <input
          type="text"
          value={billedTo}
          onChange={(e) => setBilledTo(e.target.value)}
          className="border rounded-md p-2"
        />
        <label className="text-lg font-semibold">Ship To</label>
        <input
          type="text"
          value={shipTo}
          onChange={(e) => setShipTo(e.target.value)}
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-lg font-semibold">Select Machine</label>
        <select
          onChange={handleMachineChange}
          className="border rounded-md p-2"
          value={selectedMachine}
        >
          <option value="" disabled>
            Select a machine
          </option>
          {moList.map((machine) => (
            <option key={machine.id} value={machine.id}>
              {machine.name || 'Unnamed Machine'}
            </option>
          ))}
        </select>
      </div>

      {selectedMachine && (
        <div className="space-y-6">
          {/* Product Details */}
          <div className="w-full">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <button
              onClick={addProductRow}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 mb-2"
            >
              Add Product
            </button>
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6">Item Name</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <EditableRow
                    key={index}
                    data={product}
                    index={index}
                    type="product"
                    handleInputChange={handleInputChange}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Cost Details */}
          <div className="w-full">
            <h2 className="text-lg font-semibold">Cost Details</h2>
            <button
              onClick={addCostRow}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 mb-2"
            >
              Add Cost
            </button>
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6">Cost Type</th>
                  <th className="py-3 px-6">Cost</th>
                  <th className="py-3 px-6">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost, index) => (
                  <EditableRow
                    key={index}
                    data={cost}
                    index={index}
                    type="cost"
                    handleInputChange={handleInputChange}
                  />
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
