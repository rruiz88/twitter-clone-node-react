import React from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
      <div>
        <Link />
      </div>
    </div>
  );
};

export default LeftSidebar;
