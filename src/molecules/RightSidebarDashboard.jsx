import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const RightDash = () => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState(new Date());

  return (
    <div className="relative bg-white h-[100vh] overflow-y-auto pb-4 shadow-md">
      {/* Sidebar Toggle */}
      <div title="sidebar">
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-0 right-[10px] transform rotate-90 border-[#421562] border-2 rounded-full p-1 bg-white z-10"
        >
          &lt;
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`${open ? "w-[320px]" : "hidden"}`}>
        {/* Profile Section */}
        <div className="flex gap-5 items-center justify-center pt-6">
          <div className="h-[44px] w-[44px] bg-gray-300 rounded-full"></div>
          <div className="flex flex-col items-start">
            <span className="text-[#421562] font-semibold text-[18px]">Nabila A.</span>
            <span className="font-medium text-gray-500 text-[13px]">Admin</span>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="pt-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[19px] font-bold text-[#421562]">Recent Orders</h1>
              <span className="text-gray-500 font-medium text-[13px]">You have 16 orders</span>
            </div>
            <button className="h-[34px] w-[34px] text-white text-[20px] shadow-lg text-center bg-[#421562] rounded-full flex items-center justify-center">
              +
            </button>
          </div>

          {/* Display the orders */}
          <ul className="pt-3">
            {[...Array(5)].map((_, index) => (
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
              <button className="p-3 px-7 rounded-[28px] text-[#241154] text-[19px] font-semibold bg-[#add9ea]">
                View More
              </button>
            </div>
          </ul>
        </div>

        {/* Calendar Section */}
        <div className="pt-4 px-4">
          <h1 className="text-[#421562] text-[19px] font-bold">Calendar</h1>
          <div className="border-[1px] border-gray-300 rounded-lg p-4 mt-3">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName="text-blue-900 text-sm p-2 text-center rounded-md"
            />
          </div>

          <div className="flex justify-between mt-4 px-2">
            <button className="p-2 px-4 rounded-[28px] text-[16px] font-semibold bg-gray-200">
              Cancel
            </button>
            <button className="p-2 px-4 rounded-[28px] text-[16px] font-semibold bg-[#421562] text-white">
              Set date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightDash;
