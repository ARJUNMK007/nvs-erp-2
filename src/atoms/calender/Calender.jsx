// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalender.css";

export const MyCalendar = () => {
  const [date, setDate] = useState(new Date() + 1);

  return (
    <div className="calendar-container !mt-2 !mb-2 w-5/6">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            if (
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear()
            ) {
              return "highlight-current-date";
            }
          }
          return null;
        }}
      />
    </div>
  );
};
