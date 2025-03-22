import React, { useEffect, useState } from "react";
import { dataRef } from "../utils/Firebabse"; // Import your Firebase config
import * as XLSX from "xlsx"; 

const MoqStock = () => {
  const SalesRef = dataRef.child('Stock'); // Reference to Sales in Firebase
  const StkCategoryRef = dataRef.child('StkCategory'); // Reference to StkCategory in Firebase

  const [deals, setDeals] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter
  const [uniqueCategories, setUniqueCategories] = useState([]); // List of unique categories
  const [categoryMapping, setCategoryMapping] = useState({}); // Mapping for category IDs to names
  
  // Fetch StkCategory data
  useEffect(() => {
    StkCategoryRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoryMap = Object.keys(data).reduce((acc, key) => {
          acc[key] = data[key]; // Map category ID to category name
          return acc;
        }, {});
        setCategoryMapping(categoryMap);
      }
    });
  }, []);

  // Fetch stock data
  useEffect(() => {
    SalesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dealsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDeals(dealsArray);
        const categories = [...new Set(dealsArray.map(item => item.itemCategory))];
        setUniqueCategories(categories);
      }
    });
  }, []);

  const lowStockItems = deals.filter(
    (item) => parseInt(item.currentStock, 10) < parseInt(item.moq, 10)
  );

  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const filteredItems = lowStockItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? item.itemCategory === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleExportToExcel = () => {
    const orderedDeals = lowStockItems.map((deal, index) => ({
      SL_NO: index + 1,
      ITEM_NAME: deal.itemName,
      ITEM_CATEGORY: categoryMapping[deal.itemCategory] || "Unknown", // Use category name instead of ID
      CURRENT_STOCK: deal.currentStock,
      UNIT: deal.unit,
      RACK_NO: deal.RackNo,
      MOVING_STOCK: deal.movingStock,
      MINIMUM_ORDER_QTY: deal.moq,
      ITEM_PRICE: deal.itemPrice,
      SUPPLIER: deal.supplier
    }));
   
    const ws = XLSX.utils.json_to_sheet(orderedDeals);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Data");
    XLSX.writeFile(wb, "StockData.xlsx");
  };
  const handleDelete = (id) => {
    SalesRef.child(id).remove()
      .then(() => setDeals((prevDeals) => prevDeals.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className=" h-[80vh] overflow-y-scroll invent-parent">  
      <h1 className="text-2xl font-bold text-left mb-6">Low Stock Items</h1>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Moq Stock"
          className="w-[200px] px-4 py-2 border rounded-lg text-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleExportToExcel} // Export to Excel on click
        >
          <i className="fas fa-download mr-1"></i>
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto landscape:sm:overflow-x-auto"> {/* Ensures horizontal scroll on landscape */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-x-auto">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left">Sl. No.</th>
              <th className="py-3 px-4 text-left">Item Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Current Stock</th>
              <th className="py-3 px-4 text-left">MOQ</th>
              <th className="py-3 px-4 text-left">Rack No.</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Supplier</th>
              <th className="py-3 px-4 text-left">Unit</th>
              <th className="py-3 px-4 text-left">Moving Stock</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td> {/* Serial number */}
                  <td className="py-3 px-4">{item.itemName || "N/A"}</td>
                  <td className="py-3 px-4">{categoryMapping[item.itemCategory] || "Unknown"}</td> {/* Category name */}
                  <td className="py-3 px-4">{item.currentStock || "N/A"}</td>
                  <td className="py-3 px-4">{item.moq || "N/A"}</td>
                  <td className="py-3 px-4">{item.RackNo || "N/A"}</td>
                  <td className="py-3 px-4">{item.itemPrice || "N/A"}</td>
                  <td className="py-3 px-4">{item.supplier || "N/A"}</td>
                  <td className="py-3 px-4">{item.unit || "N/A"}</td>
                  <td className="py-3 px-4">{item.movingStock || "N/A"}</td>
                  <td className="py-3 px-4">  <i
                    className="fas fa-trash-alt text-red-500 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  ></i></td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-4 text-center" colSpan="12">
                  No items with stock below the minimum quantity.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoqStock;
