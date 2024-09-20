import React, { useState, useEffect } from 'react'; 
import { dataRef } from '../utils/Firebabse';

function PoCreator() {
  const [moList, setMoList] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [products, setProducts] = useState([]);
  const [costs, setCosts] = useState([]);
  const [billedTo, setBilledTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [poNumber, setPoNumber] = useState(''); // State for PO number
  const [isEditing, setIsEditing] = useState({ product: null, cost: null });

  const MoRef = dataRef.child('MO'); // Firebase Reference to MO path
  const PoNoRef = dataRef.child('PO'); // Reference to PO path

  // Generate a unique 7-digit PO number
  const generateUniquePoNumber = () => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    return randomNumber.toString(); // Ensure it's a string
  };

  // Fetch MO names (machines) from Firebase
  useEffect(() => {
    MoRef.on('value', (snapshot) => {
      const moData = snapshot.val();
      if (moData) {
        const moArray = Object.keys(moData).map((key) => ({
          id: key,
          name: key,
          ...moData[key],
        }));
        setMoList(moArray);
      }
    });

    // Generate a PO number on mount
    setPoNumber(generateUniquePoNumber());

    return () => {
      MoRef.off();
    };
  }, []);

  const handleMachineChange = (e) => {
    const machineId = e.target.value;
    setSelectedMachine(machineId);

    MoRef.child(machineId).on('value', (snapshot) => {
      const machineData = snapshot.val();
      if (machineData) {
        setProducts(machineData.products || []);
        setCosts(machineData.costs || []);
      } else {
        setProducts([]);
        setCosts([]);
      }
    });
  };

  const handleFieldChange = (type, index, key, value) => {
    if (type === 'product') {
      const updatedItems = [...products];
      updatedItems[index][key] = value;
      setProducts(updatedItems);
    } else if (type === 'cost') {
      const updatedItems = [...costs];
      updatedItems[index][key] = value;
      setCosts(updatedItems);
    }
  };

  const toggleEdit = (type, index) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [type]: prevState[type] === index ? null : index,
    }));
  };

  // Save all data under the unique PO number
  const saveAllDataToFirebase = () => {
    if (selectedMachine) {
      const selectedMachineName = moList.find(machine => machine.id === selectedMachine)?.name || 'Unknown Machine';
      const createdAt = new Date().toISOString(); // Get the current date and time in ISO format
      const poData = {
        products,
        costs,
        billedTo,
        shipTo,
        selectedMachine: {
          id: selectedMachine,
          name: selectedMachineName,
        },
        createdAt, // Save created date and time
      };
      PoNoRef.child(poNumber).set(poData)
        .then(() => {
          alert(`Data saved successfully under PO No: ${poNumber}`);  // Alert on success
          
          // Clear text boxes except for PO number
          setBilledTo('');
          setShipTo('');
          setSelectedMachine(null);
          setProducts([]);
          setCosts([]);
          
          // Optionally reset the PO number or generate a new one
          setPoNumber(generateUniquePoNumber());
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    } else {
      console.error('Please select a machine.');
    }
  };
  
  

  const EditableRow = ({ data, index, type }) => (
    <tr key={index} className="border-b border-gray-200">
      {Object.keys(data).map((key, i) => (
        <td key={i} className="py-3 px-6">
          {isEditing[type] === index ? (
            <input
              type={key === 'quantity' || key === 'price' || key === 'cost' ? 'number' : 'text'}
              value={data[key]}
              onChange={(e) => handleFieldChange(type, index, key, e.target.value)}
              className="border rounded-md p-2"
            />
          ) : (
            data[key]
          )}
        </td>
      ))}
      <td className="py-3 px-6">
        {isEditing[type] === index ? (
          <button
            onClick={() => saveDataToFirebase(type)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => toggleEdit(type, index)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col space-y-4 h-[60vh]">
      <div className="flex justify-between items-center py-2">
        <h1 className="text-xl font-semibold">Purchase Order</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={poNumber}
            readOnly // Make PO number read-only
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
          defaultValue=""
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
                  <EditableRow
                    key={index}
                    data={product}
                    index={index}
                    type="product"
                  />
                ))}
              </tbody>
            </table>
          </div>

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
                  <EditableRow key={index} data={cost} index={index} type="cost" />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PoCreator;
