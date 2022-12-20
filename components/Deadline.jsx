import React from "react";
import { useContext } from "react";
import { ThankContext } from "./Context";

const Deadline = () => {
  const { deadlineDisplay } = useContext(ThankContext);
  return (
    <div>
      <h1 className="text-red-600 font-semibold pb-2">{deadlineDisplay}</h1>
    </div>
  );
};

export default Deadline;
