import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { dataRef } from '../utils/Firebabse';
import * as XLSX from "xlsx"; // Import XLSX library
import "./General.css"

const SalesPage = () => {
  const [options, setOptions] = useState([]);

  const [newOption, setNewOption] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null); // For popup
  const [rakOptions, setRakOptions] = useState([]);
  const [newRakOption, setNewRakOption] = useState("");
  const [showRakInput, setShowRakInput] = useState(false);
  const [selectedRak, setSelectedRak] = useState("");
  const RackRef = dataRef.child('StkRack'); 
  const UnitRef = dataRef.child('StkUnit'); 
  const CategoryRef = dataRef.child('StkCategory'); 
  const DailyStkRef = dataRef.child('Daily Stock');
  // Fetch existing unit options
  useEffect(() => {
    UnitRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const unitArray = Object.keys(data).map((key) => ({
          value: data[key].toLowerCase(),
          label: data[key],
        }));
        setOptions(unitArray);
      }
    });
  }, []);
  
  // Fetch existing rack options
  useEffect(() => {
    RackRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const rackArray = Object.keys(data).map((key) => ({
          value: data[key].toLowerCase(),
          label: data[key],
        }));
        setRakOptions(rackArray);
      }
    });
  }, []);
  
  // Add new unit option to Firebase
  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOption && !options.some((option) => option.value === newOption.toLowerCase())) {
      const newUnit = newOption.toLowerCase();
      UnitRef.push(newUnit); // Save to Firebase
      setOptions([...options, { value: newUnit, label: newOption }]);
      setNewOption("");
      setShowInput(false);
      setSelectedValue(newUnit);
    }
  };

  // Add new rack option to Firebase
  const handleAddRakOption = (e) => {
    e.preventDefault();
    if (newRakOption && !rakOptions.some((option) => option.value === newRakOption.toLowerCase())) {
      const newRack = newRakOption.toLowerCase();
      RackRef.push(newRack); // Save to Firebase
      setRakOptions([...rakOptions, { value: newRack, label: newRakOption }]);
      setNewRakOption("");
      setShowRakInput(false);
      setSelectedRak(newRack);
    }
  };

  // Handle unit dropdown change
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add-new") {
      setShowInput(true);
    } else {
      setSelectedValue(value);
      setNewDeal((prevDeal) => ({
        ...prevDeal,
        unit: value,
      }));
      setShowInput(false);
    }
  };

  // Handle rack dropdown change
  const handleRakSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add-new-rak") {
      setShowRakInput(true);
    } else {
      setSelectedRak(value);
      setNewDeal((prevDeal) => ({
        ...prevDeal,
        RackNo: value,
      }));
      setShowRakInput(false);
    }
  };
  
  const [deals, setDeals] = useState([]); // Initialize deals array
  const SalesRef = dataRef.child('Stock'); // Reference to Sales in Firebase

  const [newDeal, setNewDeal] = useState({
    itemName: '',
    itemSize:'',
    itemDesc:'',
    moveInDate: '',
    itemCategory: '',
    currentStock: '',
    unit: '', // Unit (Dropdown selection)
    RackNo: '',
    movingStock: '',
    moq:'',
    itemPrice: '',
    averagePrice: '',
    supplier: '',
    itemImage:'',
  });
  const [editId, setEditId] = useState(null);

  // Fetch deals from Firebase on component mount
  useEffect(() => {
    SalesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dealsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDeals(dealsArray);
      }
    });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  const handleAddOrEditDeal = () => {
    if (!newDeal.itemName) {
        alert('Item Name is required.');
        return;
    }
    // if (!newDeal.supplier) {
    //   alert('Supplier is required.');
    //   return;
    // }
    // if (!newDeal.itemSize) {
    //     alert('Item Size is required.');
    //     return;
    // }
    // if (!newDeal.itemDesc) {
    //     alert('Item Description is required.');
    //     return;
    // }
    // if (!newDeal.itemCategory) {
    //     alert('Item Category is required.');
    //     return;
    // }
    // if (!newDeal.currentStock) {
    //     alert('Current Stock is required.');
    //     return;
    // }
    // if (!newDeal.unit) {
    //     alert('Unit is required.');
    //     return;
    // }
    // if (!newDeal.RackNo) {
    //     alert('Rack Number is required.');
    //     return;
    // }
    // if (!newDeal.movingStock) {
    //   alert('Moving Stock is required.');
    //   return;
    // }
    // if (!newDeal.moq) {
    //     alert('MOQ is required.');
    //     return;
    // }
    // if (!newDeal.itemPrice) {
    //   alert('Item Price is required.');
    //   return;
    // }
    // if (!newDeal.itemImage) {
    //   alert('Item Image is required.');
    //   return;
    // }

    // Proceed with add or update operation
    if (editId !== null) {
        SalesRef.child(editId)
            .update(newDeal)
            .then(() => {
                setEditId(null); // Reset edit ID after updating
                setNewDeal({
                    itemName: '',
                    itemSize: '',
                    itemDesc: '',
                    moveInQty: '',
                    itemCategory: '',
                    currentStock: '',
                    unit: '',
                    RackNo: '',
                    movingStock: '',
                    moq: '',
                    itemPrice: '',
                    averagePrice: '',
                    supplier: '',
                    itemImage: '',
                });
            })
            .catch(error => {
                console.error('Error updating deal:', error);
            });
    } else {
        const newDealRef = SalesRef.push();
        newDealRef
            .set(newDeal)
            .then(() => {
                setNewDeal({
                    itemName: '',
                    itemSize: '',
                    itemDesc: '',
                    moveInQty: '',
                    itemCategory: '',
                    currentStock: '',
                    unit: '',
                    RackNo: '',
                    movingStock: '',
                    moq: '',
                    itemPrice: '',
                    averagePrice: '',
                    supplier: '',
                    itemImage: '',
                });
            })
            .catch(error => {
                console.error('Error adding deal:', error);
            });
    }
};

  // Delete deal from Firebase
  const handleDelete = (id) => {
    SalesRef.child(id).remove();
  };

  // Set edit mode
  const handleEdit = (deal) => {
    setEditId(deal.id);
    setNewDeal(deal); // Populate form with deal data for editing
  };

  // Open Popup with deal details
  const handleRowClick = (deal) => {
    setSelectedDeal(deal);
  };

  const handleExportToExcel = () => {
    const orderedDeals = deals.map(deal => ({
      SL_NO: deals.indexOf(deal) + 1,
      ITEM_NAME: deal.itemName,
      ITEM_SIZE: deal.itemSize,
      ITEM_DESC: deal.itemDesc,
      MOVE_IN_QTY: deal.moveInQty,
      ITEM_CATEGORY: deal.itemCategory,
      CURRENT_STOCK: deal.currentStock,
      UNIT: deal.unit,
      RACK_NO: deal.RackNo,
      MOVING_STOCK: deal.movingStock,
      MINIMUM_ORDER_QTY:deal.moq,
      ITEM_PRICE: deal.itemPrice,
      SUPPLIER: deal.supplier
    }));
   
    const ws = XLSX.utils.json_to_sheet(orderedDeals);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Data");
    XLSX.writeFile(wb, "StockData.xlsx");
  };
// Handle delete unit option
const handleDeleteUnit = (value) => {
  setOptions(options.filter(option => option.value !== value));
};

// Handle delete rack option
const handleDeleteRak = (value) => {
  setRakOptions(rakOptions.filter(option => option.value !== value));
};
const [openUnit, setopenUnit] = useState(false);

const handleOpenUnit =()=>{
  setopenUnit(!openUnit);
}

const [openRack, setopenRack] = useState(false)

const handleOpenRack =()=>{
  setopenRack(!openRack)
}
const [categoryOptions, setCategoryOptions] = useState([]);
const [openCategory, setOpenCategory] = useState(false);
const [newCategory, setNewCategory] = useState('');
const [showCategoryInput, setShowCategoryInput] = useState(false);
const handleOpenCategory = () => setOpenCategory(!openCategory);

// Fetch categories from Firebase when the component mounts
useEffect(() => {
  CategoryRef.on('value', (snapshot) => {
    const categoriesData = snapshot.val();
    if (categoriesData) {
      const categoriesArray = Object.keys(categoriesData).map((key) => ({
        label: categoriesData[key],
        value: key
      }));
      setCategoryOptions(categoriesArray);
    }
  });

  // Clean up the Firebase listener on component unmount
  return () => {
    CategoryRef.off();
  };
}, []);


// Handle select changes
const handleSelectChanges = (e) => {
  const { value } = e.target;
  setNewDeal({ ...newDeal, itemCategory: value });

  if (value === 'add-new') {
    setShowCategoryInput(true); // Show input field to add a new category
  } else {
    setShowCategoryInput(false); // Hide input if "add-new" is not selected
  }
};

// Add a new category to both Firebase and local state
const handleAddCategory = () => {
  if (newCategory) {
    // Generate a unique key for the new category
    const newCategoryKey = CategoryRef.push().key;
    
    // Update Firebase
    CategoryRef.child(newCategoryKey).set(newCategory, (error) => {
      if (!error) {
        // Update the local state
        setCategoryOptions([...categoryOptions, { label: newCategory, value: newCategoryKey }]);
        setNewDeal({ ...newDeal, itemCategory: newCategory }); // Set new category in the select
        setNewCategory(''); // Clear the input
        setShowCategoryInput(false); // Hide input after adding
      } else {
        console.error('Error adding category: ', error);
      }
    });
  }
};

// Delete a category from both Firebase and local state
const handleDeleteCategory = (value) => {
  // Remove the category from Firebase
  CategoryRef.child(value).remove((error) => {
    if (!error) {
      // Update the local state
      setCategoryOptions(categoryOptions.filter((category) => category.value !== value));
    } else {
      console.error('Error deleting category: ', error);
    }
  });
};

const [dailyStockData, setDailyStockData] = useState({});
  // Fetch daily stock data
  useEffect(() => {
    DailyStkRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dailyStockArray = Object.keys(data).reduce((acc, key) => {
          const { itemName, moveInQty, moveOutQty } = data[key];
          const balanceQty = (moveInQty || 0) - (moveOutQty || 0); // Calculate balanceQty
          acc[itemName] = balanceQty; // Store balanceQty by itemName
          return acc;
        }, {});
        setDailyStockData(dailyStockArray); // Set the daily stock data
      }
    });
    
    // Clean up the Firebase listener on component unmount
    return () => {
      DailyStkRef.off();
    };
  }, []);
  // Calculate total stock and add daily stock to the display
  const getTotalStock = (currentStock, itemName) => {
    const balanceQty = dailyStockData[itemName] || 0; // Get balanceQty
    return Number(currentStock) + Number(balanceQty); // Calculate total stock
  };
  const [searchTerm, setSearchTerm] = useState("")
   // Filter deals by search term (item name or category)

  const [showMinimumStock, setShowMinimumStock] = useState(false);
  const filteredmoqDeals = showMinimumStock 
  ? deals.filter(deal => Number(deal.currentStock) < Number(deal.moq)) 
  : deals;

  const [openMoq,setOpenMoq]=useState(false)

  const handleOpenMoq =()=>{
    setOpenMoq(!openMoq)
  }
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredDeals = deals.filter((deal) => {
    const itemName = deal.itemName || ""; // Default to an empty string if undefined
    const itemDesc = deal.itemDesc || ""; // Default to an empty string if undefined
  
    return (
      (itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemDesc.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || deal.itemCategory === selectedCategory)
    );
  });
  

  return (
    <div className="p-6 bg-[#f0f4f8]  h-[80vh] overflow-y-scroll overflow-x-scroll invent-parents"> 
      <div className="flex justify-between items-center mb-2">
       <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
       <div className="flex flex-row">
       <input
            type="text"
            placeholder="Search Item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-2 py-1 mb-2"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-2 py-1 mb-2 ml-2"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        <button onClick={handleExportToExcel} className="bg-green-500 w-[150px] h-[35px] text-[13px] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none flex items-center ml-[4px]">
          <i className="fas fa-download mr-1"></i>
          Export to Excel
        </button>
        </div>
      </div>

      {/* Input Form */}
         {/* Input Form */}
         <div className="mb-4">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={newDeal.itemName}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
         <input
          type="text"
          name="itemSize"
          placeholder="Item Size"
          value={newDeal.itemSize}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
         <input
          type="text"
          name="itemDesc"
          placeholder="Item Description"
          value={newDeal.itemDesc}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
 <input
          type="date"
          name="moveInDate"
          value={newDeal.moveInDate}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />

        <input
          type="number"
          name="currentStock"
          placeholder="Current Stock"
          value={newDeal.currentStock}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
         <input
          type="number"
          name="movingStock"
          placeholder="Moving Stock"
          value={newDeal.movingStock}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
          hidden
        />
         <input
          type="number"
          name="moq"
          placeholder="Minimum order qty"
          value={newDeal.moq}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="number"
          name="itemPrice"
          placeholder="Item Price"
          value={newDeal.itemPrice}
          onChange={handleChange}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={newDeal.supplier}
          onChange={handleChange}
          className="border px-2 py-1 mr-2 mt-[4px]"
        />
          {/* <input
          type="file"
          name="itemImage"
          accept="image/*"
          value={newDeal.itemImage}
          onChange={handleChange}
          className="border px-2 py-1 mr-2 mt-[4px]"
        /> */}
        <div className="flex flex-row">
           <div className="relative">
  <select
    name="itemCategory"
    value={newDeal.itemCategory}
    onChange={handleSelectChanges}
    className="border px-2 py-1 mr-2 mt-[4px]"
  >
    <option value="">Select Category</option>
    {categoryOptions.map((category) => (
      <option key={category.value} value={category.value}>
        {category.label}
      </option>
    ))}
    <option value="add-new">Add New Category</option> {/* Option to add new category */}
  </select>

  <i
    className="fas fa-edit text-blue-500 cursor-pointer"
    onClick={() => handleOpenCategory(!openCategory)}
  ></i>

  {/* List of categories with delete option */}
  {openCategory && (
    <div className="w-[255px] h-[100px] overflow-auto bg-white m-[5px]">
      <ul>
        {categoryOptions.map((category) => (
          <li key={category.value} className="flex items-center">
            <span>{category.label}</span>
            <button
              onClick={() => handleDeleteCategory(category.value)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}

  {/* Conditional input to add a new category */}
  {newDeal.itemCategory === "add-new" && (
    <div>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter new category"
        className="border px-2 py-1 mr-2 mt-2"
      />
      <button onClick={handleAddCategory} className="px-2 py-1 bg-blue-500 text-white">
        Add
      </button>
    </div>
  )}
</div>
     <div className="relative">
    <select
      name="unit"
      value={newDeal.unit}
      onChange={handleSelectChange}
      className="border px-2 py-1 mr-2 mt-[4px] ml-[4px]"
    >
      <option value="">Select Unit</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label} 
        </option>
      ))}
      <option value="add-new">Add New Unit</option>
    </select><i
    className="fas fa-edit text-blue-500 cursor-pointer"
    onClick={() => handleOpenUnit(!openUnit)}
  ></i>

    {/* List of units with delete option */}
   {openUnit && <div className="w-[255px] h-[100px] overflow-auto bg-white m-[5px]">
    <ul >
      {options.map((option) => (
        <li key={option.value} className="flex items-center">
          <span>{option.label}</span>
          <button
            onClick={() => handleDeleteUnit(option.value)}
            className="ml-2 text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>}
  </div>

  {/* Conditional input to add a new unit */}
  {showInput && (
    <div>
      <input
        type="text"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        placeholder="Enter new unit"
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleAddOption} className="px-2 py-1 bg-blue-500 text-white">
        Add
      </button>
    </div>
  )}

  {/* Rack Number Selection Dropdown */}
  <div className="relative">
    <select
      name="rakNo"
      value={newDeal.RackNo}
      onChange={handleRakSelectChange}
      className="border px-2 py-1 mr-2 mt-[4px] ml-[4px]"
    > 
      <option value="">Select RAK No</option>
      {rakOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      <option value="add-new-rak">Add New RAK No</option>
    </select><i
    className="fas fa-edit text-blue-500 cursor-pointer"
    onClick={() => handleOpenRack(!openRack)}
  ></i>

    {/* List of rack numbers with delete option */}
    {openRack&&<div className="w-[255px] h-[100px] overflow-auto bg-white m-[5px]">
    <ul>
      {rakOptions.map((option) => (
        <li key={option.value} className="flex items-center">
          <span>{option.label}</span>
          <button
            onClick={() => handleDeleteRak(option.value)}
            className="ml-2 text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>}
  </div>

  {/* Conditional input to add a new rack */}
  {showRakInput && (
    <div>
      <input
        type="text"
        value={newRakOption}
        onChange={(e) => setNewRakOption(e.target.value)}
        placeholder="Enter new RAK No"
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleAddRakOption} className="px-2 py-1 bg-blue-500 text-white">
        Add
      </button>
    </div>
  )}
   


   <button
  onClick={handleAddOrEditDeal}
  className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group bg-green-500 text-white"
>
  <span className="w-29 h-29 rotate-45 translate-x-12 -translate-y-2 absolute left-10 top-0 bg-white opacity-[3%]"></span>
  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
    {editId !== null ? 'Update Stock' : 'Add Stock'}
  </span>
  <span className="absolute inset-0 border-2 border-white rounded-full"></span>
</button>


       
      </div>
      </div>
      {/* Table */}
<div className="overflow-x-scroll">   
     <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
          
              <th className="px-4 py-2 text-left">SL NO</th>
              <th className="px-4 py-2 text-left">ITEM NAME</th>
              <th className="px-4 py-2 text-left">ITEM SIZE</th>
              <th className="px-4 py-2 text-left">ITEM DESCRIPTION</th>
               <th className="px-4 py-2 text-left">MOVE-IN DATE</th>
              <th className="px-4 py-2 text-left">ITEM CATEGORY</th>
              <th className="px-4 py-2 text-left">UNIT</th>
              <th className="px-4 py-2 text-left">CURRENT STOCK</th>
              {/* <th className="px-4 py-2 text-left">DAILY STOCK</th> */}
              <th className="px-4 py-2 text-left">TOTAL STOCK</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
          {filteredDeals.map((deal, index) => (
              <tr key={deal.id} className="border-b cursor-pointer" >
                {/* <td  className="px-4 py-2">{index + 1}</td> */}
                <td onClick={() => handleRowClick(deal)} className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{deal.itemName}</td>
                <td className="px-4 py-2">{deal.itemSize}</td>
                <td className="px-4 py-2">{deal.itemDesc}</td>
                <td className="px-4 py-2">{deal.moveInDate}</td>
                <td className="px-4 py-2">
          {categoryOptions.find(cat => cat.value === deal.itemCategory)?.label || deal.itemCategory}
        </td>
                <td className="px-4 py-2">{deal.unit}</td>
                <td className="px-4 py-2">{deal.currentStock}</td>
                {/* <td className="px-4 py-2">{dailyStockData[deal.itemName] || 0}</td> */}
                <td className="px-4 py-2">{getTotalStock(deal.currentStock, deal.itemName)}</td>
                <td className="px-4 py-2 flex space-x-4">
                  <i
                    className="fas fa-edit text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(deal)}
                  ></i>
                  <i
                    className="fas fa-trash-alt text-red-500 cursor-pointer"
                    onClick={() => handleDelete(deal.id)}
                  ></i>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
     
      </div>
  

      {/* Popup/Modal */}
      {selectedDeal && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Deal Details</h2>
      <img src={selectedDeal.itemImage} alt="itemimage" />
      <table className="min-w-full bg-white border border-black">
        <tbody>
          <tr>
            <td className="px-4  py-2 font-semibold border  border-black">Rack No:</td>
            <td className="px-4 py-2 border  border-black">{selectedDeal.RackNo}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Daily Stock:</td>
            <td className="px-4 py-2 border">
              {dailyStockData[selectedDeal.itemName] || 0}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Moving Stock:</td>
            <td className="px-4 py-2 border">{selectedDeal.movingStock}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">MOQ:</td>
            <td className="px-4 py-2 border">{selectedDeal.moq}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Item Price:</td>
            <td className="px-4 py-2 border">{selectedDeal.itemPrice}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold border">Item Description</td>
            <td className="px-4 py-2 border">{selectedDeal.itemDesc}</td>
          </tr>
          {/* <tr>
            <td className="px-4 py-2 font-semibold border">Average Price:</td>
            <td className="px-4 py-2 border">{selectedDeal.averagePrice}</td>
          </tr> */}
          <tr>
            <td className="px-4 py-2 font-semibold border">Supplier:</td>
            <td className="px-4 py-2 border">{selectedDeal.supplier}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setSelectedDeal(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SalesPage;
