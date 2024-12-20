import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-t-accent border-neutral-light rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
