import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

const Sidebar = () => {
  const [notes, setNotes] = useState(''); // State for sticky notes
  const [date, setDate] = useState(new Date()); // State for calendar date

  // Handle sticky note change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className=" bg-gray-100 h-screen p-4 flex flex-col">
      {/* Admin Section */}
      <div className="flex w-screen space-x-4 mb-2 items-end">
      <div>
          <h2 className="text-lg font-semibold">Admin Name</h2>
          <p className="text-gray-500 text-sm">Admin</p>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
          A {/* First letter of the admin name */}
        </div>
       
      </div>

      {/* Sticky Notes Section */}
      <div className="mb-8">
        <h3 className="text-md font-semibold mb-2">Sticky Notes</h3>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Write your notes here..."
          value={notes}
          onChange={handleNotesChange}
        />
      </div>

      {/* Calendar Section */}
      <div className="mb-8 ">
        <h3 className="text-md font-semibold mb-2">Calendar</h3>
        <Calendar
          className="rounded-md border border-gray-300"
          onChange={setDate}
          value={date}
        />
      </div>
    </div>
  );
};

export default Sidebar;
