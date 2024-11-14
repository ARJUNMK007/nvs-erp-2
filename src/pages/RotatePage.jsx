import React from "react";
import rotat from "../assets/rotate.gif";

const RotatePage = () => {
  return (
    <div className="rotate-page bg-black h-screen flex justify-center items-center">
      <div className="message flex items-center">
        <img src={rotat} alt="Rotate to landscape" className="w-[100%] h-auto" /> {/* Adjust size as needed */}
      </div>
    </div>
  );
};

export default RotatePage;
