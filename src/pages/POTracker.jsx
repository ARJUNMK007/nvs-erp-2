import React, { useState, useEffect } from 'react';  
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse'; 

const POTracker = () => {
  const PoNoRef = dataRef.child('PO');
  const stocksRef = dataRef.child('stocks'); // Reference to the stocks path
  const [poData, setPoData] = useState([]);
  const [status, setStatus] = useState({}); // To store status for each PO number

  useEffect(() => {
    const fetchData = async () => {
      PoNoRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const poArray = Object.keys(data).map((poNumber) => ({
            poNumber,
            ...data[poNumber],
          }));

          setPoData(poArray);

          // Initialize status state from fetched data
          const initialStatus = {};
          poArray.forEach(({ poNumber, status }) => {
            initialStatus[poNumber] = status || 'Pending'; // Default to 'Pending' if no status
          });
          setStatus(initialStatus);
        }
      });

      return () => {
        PoNoRef.off();
      };
    };

    fetchData();
  }, [PoNoRef]);

  const handleStatusChange = (poNumber, newStatus) => {
    // Update local state
    setStatus((prevState) => ({
      ...prevState,
      [poNumber]: newStatus,
    }));

    // Update status in Firebase
    PoNoRef.child(poNumber).update({ status: newStatus })
      .then(() => {
        console.log(`Status for ${poNumber} updated to ${newStatus}`);

        // Check if the new status is "On Progress" or "Completed"
        if (newStatus === 'On Progress' || newStatus === 'Completed') {
          // Fetch the PO data
          PoNoRef.child(poNumber).once('value', (snapshot) => {
            const poData = snapshot.val();
            console.log(`Data for PO NO: ${poNumber}`, poData);

            // Compare itemName in products with stocks
            poData.products.forEach((product) => {
              const { itemName, quantity } = product;

              // Fetch stock data from stocksRef
              stocksRef.once('value', (stockSnapshot) => {
                const stocks = stockSnapshot.val();
                
                // Find the matching stock item by itemName
                const stockItemKey = Object.keys(stocks).find(key => stocks[key].itemName === itemName);

                if (stockItemKey) {
                  const currentStock = parseInt(stocks[stockItemKey].stock, 10);
                  const quantityToSubtract = parseInt(quantity, 10);

                  if (currentStock >= quantityToSubtract) {
                    const updatedStock = currentStock - quantityToSubtract;

                    // Update stock in Firebase
                    stocksRef.child(stockItemKey).update({ stock: updatedStock.toString() })
                      .then(() => {
                        console.log(`Stock for ${itemName} updated to ${updatedStock}`);
                      })
                      .catch((error) => {
                        console.error("Error updating stock:", error);
                      });
                  } else {
                    console.warn(`Not enough stock for ${itemName} to fulfill quantity ${quantity}`);
                  }
                } else {
                  console.warn(`Item ${itemName} not found in stocks`);
                }
              });
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="relative max-w-full h-[85vh] overflow-x-scroll scrollbar-hide p-4">
      <h1 className="text-lg font-semibold mb-6">
        Here You Can See The Tracking Details
      </h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Current Stock here..."
          className="border rounded px-4 py-2 w-full max-w-sm"
        />
        <button className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none">
          <i className="fas fa-filter mr-2"></i> Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">PO NO</th>
              <th className="py-3 px-6">Product Name</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {poData.map(({ poNumber, selectedMachine, createdAt }) => (
              <tr key={poNumber} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{poNumber}</td>
                <td className="py-3 px-6">{selectedMachine.name}</td>
                <td className="py-3 px-6">{new Date(createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6">
                  <select
                    value={status[poNumber] || 'Pending'} // Default to 'Pending' if no status is set
                    onChange={(e) => handleStatusChange(poNumber, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="On Progress">On Progress</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default POTracker;
