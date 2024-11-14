import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { dataRef } from '../utils/Firebabse';

const RightDash = () => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [poData, setPoData] = useState([]); // State for storing PO data
  const navigate = useNavigate();
  const SalesRef = dataRef.child('Stock');
  const PoNoRef = dataRef.child('PO');
  

  // Check stock levels on component mount
  useEffect(() => {
    SalesRef.once('value', (snapshot) => {
      const stockData = snapshot.val();
      let lowStockExists = false;

      // Check if any item's currentStock is below its moq
      for (let key in stockData) {
        const item = stockData[key];
        if (parseInt(item.currentStock) < parseInt(item.moq)) {
          lowStockExists = true;
          break;
        }
      }

      setShowAlert(lowStockExists);
    });
  }, [SalesRef]);
  useEffect(() => {
    PoNoRef.once('value', (snapshot) => {
      const poDataArray = [];
      snapshot.forEach((childSnapshot) => {
        poDataArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setPoData(poDataArray); // Store PO data in state
    });
  }, [PoNoRef]);

  return (
    <div className="relative bg-white h-[100vh] overflow-y-auto pb-4 shadow-md">
      <div className={`${open ? "w-[260px]" : "hidden"}`}>
        {/* Profile Section */}
        <div className="flex items-center space-x-3 p-4 bg-transparent rounded-xl ">
          <div className="w-12 h-12 rounded-full bg-gray-400"></div>
          <div>
            <h3 className="text-lg font-bold text-blue-700">Nabila A.</h3>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="pt-3 px-4 h-[200px] overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[19px] font-bold text-[#421562]">Recent Orders</h1>
              <span className="text-gray-500 font-medium text-[13px]">You have 16 orders</span>
            </div>
          </div>
           <div>
           <ul className="pt-3">
  {poData.map((po) => ( // Display all orders
    <li key={po.id} className="flex items-center gap-4 p-2">
      <div className="h-[34px] w-[34px] bg-[#add9ea] rounded-full"></div>
      <div>
        {/* Check if billedTo is an object and access its name field */}
        <span className="font-semibold text-[#12125e] text-[16px]">
          {po.billedTo?.name || 'No Name'}
        </span> <br />
        {/* <span className="font-semibold text-gray-500 text-[11px] flex items-center gap-2">
          Deal Status:
          <span className={po.orderStatus === 'Pending' ? 'text-red-500' : 'text-green-500'}>
            {po.orderStatus}
          </span>
        </span> */}
      </div>
    </li>
  ))}
</ul>



        </div>
</div>
        {/* Calendar Section */}
        <div className="pt-4 px-4">
          <Calendar />
        </div>
      </div>

      {/* Conditionally render alert if low stock exists */}
      {showAlert && (
        <div id="alert-border-2" className="fixed  bottom-0 right-0 w-[150px] h-[200px] p-4 m-4 text-red-800 border-t-4 border-red-300 bg-red-50 shadow-lg rounded-lg flex items-center" role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div className="ms-3 text-sm font-medium">
            Low Stock alert <a href="#" className="font-semibold underline hover:no-underline" onClick={() => navigate("/moq")}>Check MOQ status</a>. Try to maintain Minimum Stock.
          </div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8" aria-label="Close" onClick={() => setShowAlert(false)}>
            <span className="sr-only">Dismiss</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default RightDash;
