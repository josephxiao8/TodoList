//List component to represent active todolists on home page

import React from "react";
import "./index.css";

const List = ({ id, date, text }) => {
  return (
    <div className="rounded-md p-4 shadow-md border-2 bg-gray-50 hover:bg-gray-200 hover:border-gray-300">
      <h1 className="font-bold">{text}</h1>
      <h3 className="font-light">{date}</h3>
      <h3>{`Todo list #${id}`}</h3>
    </div>
  );
};

export default List;
