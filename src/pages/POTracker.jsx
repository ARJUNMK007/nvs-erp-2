import React, { useState, useEffect } from 'react';   
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse'; 

const POTracker = () => {
  const PoNoRef = dataRef.child('PO');
  const stocksRef = dataRef.child('stocks'); 
  const [poData, setPoData] = useState([]);
  const [status, setStatus] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [newProduct, setNewProduct] = useState({ itemName: '', quantity: '', price: '' });
  const [newCost, setNewCost] = useState({ name: '', quantity: '', cost: '' });
  const [editingProduct, setEditingProduct] = useState({}); // Track editing state for products
  const [editingCost, setEditingCost] = useState({}); // Track editing state for costs

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

  const handleStatusChange = (poNumber, newStatus) => {
    setStatus((prevState) => ({
      ...prevState,
      [poNumber]: newStatus,
    }));

    PoNoRef.child(poNumber).update({ status: newStatus })
      .then(() => {
        console.log(`Status for ${poNumber} updated to ${newStatus}`);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const toggleExpandRow = (poNumber) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [poNumber]: !prevState[poNumber],
    }));
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
    const updatedProducts = [...po.products, newProduct];
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
    const updatedCosts = [...po.costs, newCost];
    PoNoRef.child(poNumber).update({ costs: updatedCosts })
      .then(() => {
        console.log('Cost added');
        setNewCost({ name: '', quantity: '', cost: '' });
      })
      .catch((error) => {
        console.error("Error adding cost:", error);
      });
  };

  const handleEditProduct = (poNumber, index) => {
    setEditingProduct((prev) => ({ ...prev, [poNumber]: index }));
  };

  const handleSaveProduct = (poNumber, index) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const updatedProducts = [...po.products];
    const product = updatedProducts[index];
    updatedProducts[index] = { ...product }; // Keep the existing product
    PoNoRef.child(poNumber).update({ products: updatedProducts })
      .then(() => {
        setEditingProduct((prev) => ({ ...prev, [poNumber]: null }));
        console.log('Product updated');
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleEditCost = (poNumber, index) => {
    setEditingCost((prev) => ({ ...prev, [poNumber]: index }));
  };

  const handleSaveCost = (poNumber, index) => {
    const po = poData.find(po => po.poNumber === poNumber);
    const updatedCosts = [...po.costs];
    const cost = updatedCosts[index];
    updatedCosts[index] = { ...cost }; // Keep the existing cost
    PoNoRef.child(poNumber).update({ costs: updatedCosts })
      .then(() => {
        setEditingCost((prev) => ({ ...prev, [poNumber]: null }));
        console.log('Cost updated');
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
                    <button onClick={() => toggleExpandRow(poNumber)}>
                      <i className={`fas fa-chevron-${expandedRows[poNumber] ? 'up' : 'down'}`}></i>
                    </button>
                  </td>
                </tr>

                {expandedRows[poNumber] && (
                  <tr>
                    <td colSpan={5}>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Product Table</h3>
                        <table className="min-w-full bg-gray-100 rounded-lg">
                          <thead className='text-left'>
                            <tr>
                              <th className="py-3 px-6">Item Name</th>
                              <th className="py-3 px-6">Quantity</th>
                              <th className="py-3 px-6">Price</th>
                              <th className="py-3 px-6">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, index) => (
                              <tr key={index}>
                                <td className="py-3 px-6">
                                  {editingProduct[poNumber] === index ? (
                                    <input
                                      type="text"
                                      defaultValue={product.itemName}
                                      onChange={(e) => {
                                        const updatedProducts = [...products];
                                        updatedProducts[index].itemName = e.target.value;
                                        setPoData(poData.map(po => po.poNumber === poNumber ? { ...po, products: updatedProducts
                                        } : po));
                                      }}
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
                                      defaultValue={product.quantity}
                                      onChange={(e) => {
                                        const updatedProducts = [...products];
                                        updatedProducts[index].quantity = e.target.value;
                                        setPoData(poData.map(po => po.poNumber === poNumber ? { ...po, products: updatedProducts } : po));
                                      }}
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
                                      defaultValue={product.price}
                                      onChange={(e) => {
                                        const updatedProducts = [...products];
                                        updatedProducts[index].price = e.target.value;
                                        setPoData(poData.map(po => po.poNumber === poNumber ? { ...po, products: updatedProducts } : po));
                                      }}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    product.price
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingProduct[poNumber] === index ? (
                                    <button onClick={() => handleSaveProduct(poNumber, index)} className="text-green-500">
                                      Save
                                    </button>
                                  ) : (
                                    <>
                                      <button onClick={() => handleEditProduct(poNumber, index)} className="text-blue-500">
                                        Edit
                                      </button>
                                      <button onClick={() => handleDeleteProduct(poNumber, index)} className="text-red-500 ml-2">
                                        Delete
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td className="py-3 px-6">
                                <input 
                                  value={newProduct.itemName} 
                                  onChange={(e) => setNewProduct({ ...newProduct, itemName: e.target.value })} 
                                  placeholder="Item Name"
                                  className="border rounded px-2 py-1"
                                />
                              </td>
                              <td className="py-3 px-6">
                                <input 
                                  value={newProduct.quantity} 
                                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} 
                                  placeholder="Quantity"
                                  className="border rounded px-2 py-1"
                                />
                              </td>
                              <td className="py-3 px-6">
                                <input 
                                  value={newProduct.price} 
                                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                                  placeholder="Price"
                                  className="border rounded px-2 py-1"
                                />
                              </td>
                              <td className="py-3 px-6">
                                <button onClick={() => handleAddProduct(poNumber)} className="text-green-500">
                                  Add
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h3 className="font-semibold mb-2 mt-4">Cost Table</h3>
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
                              <tr key={index}>
                                <td className="py-3 px-6">
                                  {editingCost[poNumber] === index ? (
                                    <input
                                      type="text"
                                      defaultValue={cost.name}
                                      onChange={(e) => {
                                        const updatedCosts = [...costs];
                                        updatedCosts[index].name = e.target.value;
                                        setPoData(poData.map(po => po.poNumber === poNumber ? { ...po, costs: updatedCosts } : po));
                                      }}
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
                                      defaultValue={cost.quantity}
                                      onChange={(e) => {
                                        const updatedCosts = [...costs];
                                        updatedCosts[index].quantity = e.target.value;
                                        setPoData(poData.map(po => po.poNumber === poNumber ? { ...po, costs: updatedCosts } : po));
                                      }}
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
                                      defaultValue={cost.cost}
                                      onChange={(e) => {
                                        const updatedCosts = [...costs];
                                        updatedCosts[index].cost = e.target.value;
                                        setPoData(poData.map(po => po.poNumber === poNumber ? { ...po, costs: updatedCosts } : po));
                                      }}
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    cost.cost
                                  )}
                                </td>
                                <td className="py-3 px-6">
                                  {editingCost[poNumber] === index ? (
                                    <button onClick={() => handleSaveCost(poNumber, index)} className="text-green-500">
                                      Save
                                    </button>
                                  ) : (
                                    <>
                                      <button onClick={() => handleEditCost(poNumber, index)} className="text-blue-500">
                                        Edit
                                      </button>
                                      <button onClick={() => handleDeleteCost(poNumber, index)} className="text-red-500 ml-2">
                                        Delete
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td className="py-3 px-6">
                                <input 
                                  value={newCost.name} 
                                  onChange={(e) => setNewCost({ ...newCost, name: e.target.value })} 
                                  placeholder="Cost Name"
                                  className="border rounded px-2 py-1"
                                />
                              </td>
                              <td className="py-3 px-6">
                                <input 
                                  value={newCost.quantity} 
                                  onChange={(e) => setNewCost({ ...newCost, quantity: e.target.value })} 
                                  placeholder="Quantity"
                                  className="border rounded px-2 py-1"
                                />
                              </td>
                              <td className="py-3 px-6">
                                <input 
                                  value={newCost.cost} 
                                  onChange={(e) => setNewCost({ ...newCost, cost: e.target.value })} 
                                  placeholder="Cost"
                                  className="border rounded px-2 py-1"
                                />
                              </td>
                              <td className="py-3 px-6">
                                <button onClick={() => handleAddCost(poNumber)} className="text-green-500">
                                  Add
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
