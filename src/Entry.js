//component to represent the entries inside a todolist

import React from "react";
import "./index.css";

const Entry = (props) => {
  return (
    <div>
      <span
        className={`flex-1 block w-11/12 mx-auto bg-${props.color}-200 rounded-full p-4 shadow-lg hover:bg-${props.color}-300`}
        onClick={props.onClick}
      >
        {props.message}
      </span>
    </div>
  );
};

export default Entry;
