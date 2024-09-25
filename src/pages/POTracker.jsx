import React, { useState, useEffect } from 'react';   
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse'; 
import Loading from "../assets/loding.gif";
const POTracker = () => {
  const PoNoRef = dataRef.child('PO');
  const [poData, setPoData] = useState([]);
  const [status, setStatus] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [newProduct, setNewProduct] = useState({ itemName: '', quantity: '', price: '' });
  const [newCost, setNewCost] = useState({ name: '', quantity: '', cost: '' });
  const [editingProduct, setEditingProduct] = useState({});
  const [editingCost, setEditingCost] = useState({});
  const [productEditValues, setProductEditValues] = useState({});
  const [costEditValues, setCostEditValues] = useState({});
  const stocksRef = dataRef.child('Stock'); 
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
          
          const initialStatus = {};
          poArray.forEach(({ poNumber, status }) => {
            initialStatus[poNumber] = status || 'Pending';
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

  const handleStatusChange = async (poNumber, newStatus) => {
    setStatus((prevState) => ({
      ...prevState,
      [poNumber]: newStatus,
    }));
  
    try {
      // Update the PO status
      await PoNoRef.child(poNumber).update({ status: newStatus });
      console.log(`Status for ${poNumber} updated to ${newStatus}`);
  
      if ( newStatus === 'On Progress') {
        // Fetch the products for the PO
        const poSnapshot = await PoNoRef.child(poNumber).once('value');
        const poData = poSnapshot.val();
  
        if (poData && poData.products) {
          // Iterate through each product in the PO and update the stock
          const updateStockPromises = poData.products.map(async (product) => {
            const { itemName, quantity } = product;
  
            // Fetch the stock details for the product
            const stockSnapshot = await stocksRef.orderByChild('itemName').equalTo(itemName).once('value');
            const stockData = stockSnapshot.val();
  
            if (stockData) {
              const stockKey = Object.keys(stockData)[0];
              const stockItem = stockData[stockKey];
              const currentStock = parseInt(stockItem.currentStock, 10);
              const moveQuantity = parseInt(quantity, 10);
              const newStock = currentStock - moveQuantity;
  
              // Update the stock and movingStock
              await stocksRef.child(stockKey).update({
                currentStock: newStock,
                movingStock: (parseInt(stockItem.movingStock || '0', 10) + moveQuantity).toString(),
              });
  
              console.log(`Stock for ${itemName} updated: ${currentStock} -> ${newStock}`);
            }
          });
  
          // Wait for all stock updates to complete
          await Promise.all(updateStockPromises);
          console.log('Stock updated for all products.');
        }
      }
      if (newStatus === 'Completed') {
        // Fetch the products for the PO
        const poSnapshot = await PoNoRef.child(poNumber).once('value');
        const poData = poSnapshot.val();
  
        if (poData && poData.products) {
          // Iterate through each product in the PO and update the stock
          const updateStockPromises = poData.products.map(async (product) => {
            const { itemName, quantity } = product;
  
            // Fetch the stock details for the product
            const stockSnapshot = await stocksRef.orderByChild('itemName').equalTo(itemName).once('value');
            const stockData = stockSnapshot.val();
  
            if (stockData) {
              const stockKey = Object.keys(stockData)[0];
              const stockItem = stockData[stockKey];
              const currentStock = parseInt(stockItem.currentStock, 10);
              const moveQuantity = parseInt(quantity, 10);
              const newStock = moveQuantity - moveQuantity;
  
              // Update the stock and movingStock
              await stocksRef.child(stockKey).update({
           
                movingStock: (parseInt(stockItem.movingStock || '0', 10) - moveQuantity).toString(),
              });
  
              console.log(`Stock for ${itemName} updated: ${currentStock} `);
            }
          });
  
          // Wait for all stock updates to complete
          await Promise.all(updateStockPromises);
          console.log('Stock updated for all products.');
        }
      }
    } catch (error) {
      console.error("Error updating status or stock:", error);
    }
  };

  const toggleExpandRow = (poNumber) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [poNumber]: !prevState[poNumber],
    }));
  };

  const handleDeletePO = (poNumber) => {
    PoNoRef.child(poNumber).remove()
      .then(() => {
        console.log(`PO ${poNumber} deleted`);
        setPoData((prev) => prev.filter(po => po.poNumber !== poNumber));
      })
      .catch((error) => {
        console.error("Error deleting PO:", error);
      });
  };

  const handleDeleteProduct = (poNumber, productIndex) => {
    const updatedProducts = [...poData.find(po => po.poNumber === poNumber).products];
    updatedProducts.splice(productIndex, 1);
    PoNoRef.child(poNumber).update({ products: updatedProducts })
      .then(() => {
        console.log('Product deleted');
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleDeleteCost = (poNumber, costIndex) => {
    const updatedCosts = [...poData.find(po => po.poNumber === poNumber).costs];
    updatedCosts.splice(costIndex, 1);
    PoNoRef.child(poNumber).update({ costs: updatedCosts })
      .then(() => {
        console.log('Cost deleted');
      })
      .catch((error) => {
        console.error("Error deleting cost:", error);
      });
  };

  const handleAddProduct = (poNumber) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const updatedProducts = po.products ? [...po.products, newProduct] : [newProduct];
    PoNoRef.child(poNumber).update({ products: updatedProducts })
      .then(() => {
        console.log('Product added');
        setNewProduct({ itemName: '', quantity: '', price: '' });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };
  
  const handleAddCost = (poNumber) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const updatedCosts = po.costs ? [...po.costs, newCost] : [newCost];
    PoNoRef.child(poNumber).update({ costs: updatedCosts })
      .then(() => {
        console.log('Cost added');
        setNewCost({ name: '', quantity: '', cost: '' });
      })
      .catch((error) => {
        console.error("Error adding cost:", error);
      });
  };
  
  const handleEditProduct = (poNumber, productIndex) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const productToEdit = po.products[productIndex];
    setProductEditValues({ itemName: productToEdit.itemName, quantity: productToEdit.quantity, price: productToEdit.price });
    setEditingProduct((prev) => ({
      ...prev,
      [poNumber]: productIndex
    }));
  };

  const handleSaveProduct = (poNumber, productIndex) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const updatedProducts = [...po.products];
    updatedProducts[productIndex] = { ...productEditValues }; // use edited values
    PoNoRef.child(poNumber).update({ products: updatedProducts })
      .then(() => {
        console.log('Product updated');
        setEditingProduct((prev) => ({
          ...prev,
          [poNumber]: null
        }));
        setProductEditValues({});
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleEditCost = (poNumber, costIndex) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const costToEdit = po.costs[costIndex];
    setCostEditValues({ name: costToEdit.name, quantity: costToEdit.quantity, cost: costToEdit.cost });
    setEditingCost((prev) => ({
      ...prev,
      [poNumber]: costIndex
    }));
  };

  const handleSaveCost = (poNumber, costIndex) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const updatedCosts = [...po.costs];
    updatedCosts[costIndex] = { ...costEditValues }; // use edited values
    PoNoRef.child(poNumber).update({ costs: updatedCosts })
      .then(() => {
        console.log('Cost updated');
        setEditingCost((prev) => ({
          ...prev,
          [poNumber]: null
        }));
        setCostEditValues({});
      })
      .catch((error) => {
        console.error("Error updating cost:", error);
      });
  };

  return (
    <div className="relative max-w-full h-[85vh] overflow-x-scroll scrollbar-hide p-4">
      <h1 className="text-lg font-semibold mb-6">
        Here You Can See The Tracking Details
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">PO NO</th>
              <th className="py-3 px-6">Product Name</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Details</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {poData.map(({ poNumber, selectedMachine, createdAt, products = [], costs = [] }) => (
              <React.Fragment key={poNumber}>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{poNumber}</td>
                  <td className="py-3 px-6">{selectedMachine?.name || 'N/A'}</td>
                  <td className="py-3 px-6">{new Date(createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6">
                    <select
                      value={status[poNumber] || 'Pending'}
                      onChange={(e) => handleStatusChange(poNumber, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="On Progress">On Progress</option>
                    </select>
                  </td>
                  <td className="py-3 px-6">
                    <button onClick={() => toggleExpandRow(poNumber)} className="text-blue-500">
                      {expandedRows[poNumber] ? 'Hide' : 'Show'} Details
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    <button onClick={() => handleDeletePO(poNumber)} className="text-red-500">Delete</button>
                  </td>
                </tr>
                {expandedRows[poNumber] && (
                  <tr>
                    <td colSpan="6" className="py-3 px-6">
                      <div>
                        <h3 className="font-semibold mb-2">Products</h3>
                        <table className="min-w-full bg-gray-100 rounded-lg">
                          <thead className='text-left'>
                            <tr>
                              <th className="py-3 px-6">Product Name</th>
                              <th className="py-3 px-6">Quantity</th>
                              <th className="py-3 px-6">Price</th>
                              <th className="py-3 px-6">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="py-3 px-6">
                                  {editingProduct[poNumber] === index ? (
                                    <input
                                      type="text"
                                      value={productEditValues.itemName || product.itemName} // retain original value if editing
                                      onChange={(e) => setProductEditValues({ ...productEditValues, itemName: e.target.value })}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    product.itemName
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingProduct[poNumber] === index ? (
                                    <input
                                      type="number"
                                      value={productEditValues.quantity || product.quantity} // retain original value if editing
                                      onChange={(e) => setProductEditValues({ ...productEditValues, quantity: e.target.value })}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    product.quantity
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingProduct[poNumber] === index ? (
                                    <input
                                      type="number"
                                      value={productEditValues.price || product.price} // retain original value if editing
                                      onChange={(e) => setProductEditValues({ ...productEditValues, price: e.target.value })}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    product.price
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingProduct[poNumber] === index ? (
                                    <>
                                      <button onClick={() => handleSaveProduct(poNumber, index)} className="text-green-500">Save</button> &nbsp;
                                      <button onClick={() => setEditingProduct((prev) => ({ ...prev, [poNumber]: null }))} className="text-red-500 ">Cancel</button>
                                    </>
                                  ) : (
                                    <>
                                      <button onClick={() => handleEditProduct(poNumber, index)} className="text-blue-500">Edit</button>&nbsp;
                                      <button onClick={() => handleDeleteProduct(poNumber, index)} className="text-red-500">Delete</button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.itemName}
                            onChange={(e) => setNewProduct({ ...newProduct, itemName: e.target.value })}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <input
                            type="number"
                            placeholder="Quantity"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <button onClick={() => handleAddProduct(poNumber)} className="bg-blue-500 text-white rounded px-4 py-1">Add Product</button>
                        </div>
                        <h3 className="font-semibold mt-4 mb-2">Cost Table</h3>
                        <table className="min-w-full bg-gray-100 rounded-lg">
                          <thead className='text-left'>
                            <tr>
                              <th className="py-3 px-6">Cost Name</th>
                              <th className="py-3 px-6">Quantity</th>
                              <th className="py-3 px-6">Cost</th>
                              <th className="py-3 px-6">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {costs.map((cost, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="py-3 px-6">
                                  {editingCost[poNumber] === index ? (
                                    <input
                                      type="text"
                                      value={costEditValues.name || cost.name} // retain original value if editing
                                      onChange={(e) => setCostEditValues({ ...costEditValues, name: e.target.value })}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    cost.name
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingCost[poNumber] === index ? (
                                    <input
                                      type="number"
                                      value={costEditValues.quantity || cost.quantity} // retain original value if editing
                                      onChange={(e) => setCostEditValues({ ...costEditValues, quantity: e.target.value })}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    cost.quantity
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingCost[poNumber] === index ? (
                                    <input
                                      type="number"
                                      value={costEditValues.cost || cost.cost} // retain original value if editing
                                      onChange={(e) => setCostEditValues({ ...costEditValues, cost: e.target.value })}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    cost.cost
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingCost[poNumber] === index ? (
                                    <>
                                      <button onClick={() => handleSaveCost(poNumber, index)} className="text-green-500">Save</button>&nbsp;
                                      <button onClick={() => setEditingCost((prev) => ({ ...prev, [poNumber]: null }))} className="text-red-500">Cancel</button>
                                    </>
                                  ) : (
                                    <>
                                      <button onClick={() => handleEditCost(poNumber, index)} className="text-blue-500">Edit</button>&nbsp;
                                      <button onClick={() => handleDeleteCost(poNumber, index)} className="text-red-500">Delete</button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Cost Name"
                            value={newCost.name}
                            onChange={(e) => setNewCost({ ...newCost, name: e.target.value })}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <input
                            type="number"
                            placeholder="Quantity"
                            value={newCost.quantity}
                            onChange={(e) => setNewCost({ ...newCost, quantity: e.target.value })}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <input
                            type="number"
                            placeholder="Cost"
                            value={newCost.cost}
                            onChange={(e) => setNewCost({ ...newCost, cost: e.target.value })}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <button onClick={() => handleAddCost(poNumber)} className="bg-blue-500 text-white rounded px-4 py-1">Add Cost</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default POTracker;
