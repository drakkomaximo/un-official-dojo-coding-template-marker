import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-4 border-t-4 border-gray-300 border-solid rounded-full h-16 w-16 animate-spin border-t-blue-500"></div>
    </div>
  );
};

export default Spinner;