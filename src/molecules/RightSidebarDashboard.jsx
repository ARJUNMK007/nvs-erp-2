import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

const RightDash = () => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const navigate=useNavigate()

  return (
    <div className="relative bg-white h-[100%] overflow-y-auto pb-4 shadow-md">
      {/* Sidebar Toggle */}
      {/* <div title="sidebar">
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-0 right-[10px] transform rotate-90 border-[#421562] border-2 rounded-full p-1 bg-white z-10"
        >
          &lt;
        </button>
      </div> */}
      <div className={`${open ? "w-[260px]" : "hidden"}`}>
        {/* Profile Section */}
        <div className="flex items-center space-x-3 p-4 bg-transparent rounded-xl ">
      {/* Profile Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-400"></div>
      
      {/* User Info */}
      <div>
        <h3 className="text-lg font-bold text-blue-700">Nabila A.</h3>
        <p className="text-gray-500">Admin</p>
      </div>
    </div>

        {/* Recent Orders Section */}
        <div className="pt-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[19px] font-bold text-[#421562]">Recent Orders</h1>
              <span className="text-gray-500 font-medium text-[13px]">You have 16 orders</span>
            </div>
            {/* <button className="h-[34px] w-[34px] text-white text-[20px] shadow-lg text-center bg-[#421562] rounded-full flex items-center justify-center">
              +
            </button> */}
          </div>

          {/* Display the orders */}
          <ul className="pt-3">
            {[...Array(2)].map((_, index) => (
              <li key={index} className="flex items-center gap-4 p-2">
                <div className="h-[34px] w-[34px] bg-[#add9ea] rounded-full"></div>
                <div>
                  <span className="font-semibold text-[#12125e] text-[16px]">Company Name</span> <br />
                  <span className="font-semibold text-gray-500 text-[11px] flex items-center gap-2">
                    ORDER STATUS
                    <span className={`text-${index % 2 === 0 ? 'red' : 'green'}-500`}>
                      {index % 2 === 0 ? 'Pending' : 'Completed'}
                    </span>
                  </span>
                </div>
              </li>
            ))}
            <div className="w-full flex justify-center pt-2">
              <button className="w-full h-[40px] text-center rounded-[28px] text-[#241154] text-[15px] font-semibold bg-[#add9ea]">
                View More
              </button>
            </div>
          </ul>
        </div>

        {/* Calendar Section */}
        <div className="pt-4 px-4">
          <Calendar/>
          </div>
      </div>
      <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800 m-2"  role="alert">
    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <div class="ms-3 text-sm font-medium">
      Low Stock alert <a href="#" class="font-semibold underline hover:no-underline" onClick={()=>{navigate("/moq")}}>Check MOQ status</a>. Try to maintain Minimum Stock.
    </div>
    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-2" aria-label="Close">
      <span class="sr-only">Dismiss</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>
</div>
    </div>
  );
};

export default RightDash;
