import React from 'react';

function POCreator() {
  return (
    <div className="relative max-w-full h-screen overflow-x-scroll scrollbar-hide p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Create Products</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none">
            <span className="mr-2 text-lg">+</span>
            Add New Orders
          </button>
          <button className="flex items-center px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-md hover:bg-green-600 focus:outline-none">
            <span className="mr-2 text-lg">📊</span>
            Export Report To Excel
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-lg font-semibold">Product Details</h1>
        </div>
        <form className="flex justify-between p-6 space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="text-blue-600 font-medium mb-2">Product Name *</label>
            <input 
              type="text" 
              placeholder="Furnace" 
              className="border border-blue-200 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="text-blue-600 font-medium mb-2">PO Number *</label>
            <input 
              type="text" 
              placeholder="123456789" 
              className="border border-blue-200 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="text-blue-600 font-medium mb-2">Date *</label>
            <input 
              type="text" 
              placeholder="12-09-2024" 
              className="border border-blue-200 rounded px-4 py-2"
            />
          </div>
        </form>
      </div>

      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
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
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">
                  <select className="border rounded px-2 py-1">
                    <option>Chick Style</option>
                  </select>
                </td>
                <td className="py-3 px-6">32</td>
                <td className="py-3 px-6">42</td>
                <td className="py-3 px-6 flex items-center space-x-4">
                  <button className="text-green-500 hover:text-green-700">
                    <i className="fas fa-check"></i>
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Costing</h2>
          <div className="flex space-x-4">
            <button className="text-green-500 hover:text-green-700">
              <i className="fas fa-check"></i>
            </button>
            <button className="text-blue-500 hover:text-blue-700">
              <i className="fas fa-edit"></i>
            </button>
            <button className="text-red-500 hover:text-red-700">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div className="flex space-x-8">
          <div className="w-1/2">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6" colSpan={2}>Production Cost</th>
                </tr>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm">
                  <th className="py-3 px-6">Manufacturing Cost</th>
                  <th className="py-3 px-6">E.B Cost</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">2</td>
                  <td className="py-3 px-6">2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-3 px-6">0</td>
                  <td className="py-3 px-6">0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-1/2">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6" colSpan={2}>Labour Cost</th>
                </tr>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm">
                  <th className="py-3 px-6">Number of Labours</th>
                  <th className="py-3 px-6">Labour Cost</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">2</td>
                  <td className="py-3 px-6">2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-3 px-6">0</td>
                  <td className="py-3 px-6">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POCreator;
