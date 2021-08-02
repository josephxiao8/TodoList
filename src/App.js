import React, { useEffect, useReducer, useState } from "react";
import "./index.css";
import Entry from "./Entry";
import { useParams } from "react-router-dom";

const reducer = (state, action) => {
  if (action.type === "setDefault") {
    return action.value;
  } else if (action.type === "add") {
    return {
      ...state,
      todo: [...state.todo, { id: state.cnt + 1, message: action.value }],
      cnt: state.cnt + 1,
    };
  } else if (action.type === "remove") {
    const newTodo = state.todo.filter((entry) => entry.id !== action.id);
    return { ...state, todo: newTodo };
  } else if (action.type === "clear") {
    return { ...state, todo: [], cnt: 0 };
  } else if (action.type === "changeColor") {
    return { ...state, color: action.color };
  }
};

function App({ activeLists, setActiveLists }) {
  //state.todo maintains a list of entries in the todo list
  //state.cnt generates a new value for the key attribute in elements in 'todo'
  //state.color is the current color theme
  const [state, dispatch] = useReducer(reducer, {
    todo: [],
    cnt: 0,
    color: "red",
  });

  //setting deafult state for reducer
  const { id } = useParams();
  useEffect(() => {
    for (let i = 0; i < activeLists.length; i++) {
      if (activeLists[i].id === parseInt(id)) {
        dispatch({ type: "setDefault", value: activeLists[i].todoListState });
      }
    }
  }, []);

  //updating activeLists as new entries are added
  useEffect(() => {
    setActiveLists([
      ...activeLists.filter((list) => list.id !== parseInt(id)),
      { id: parseInt(id), todoListState: state },
    ]);
  }, [state]);

  const [entryText, setEntryText] = useState(""); //maintains the text inside the form for new entries
  const [showForm, setShowForm] = useState(false); //true-show form, false-hide form
  const [showColorOptions, setShowColorOptions] = useState(false); //true-show popup, false-hide pop-up

  //adds new element to 'todo'
  const add = (event) => {
    event.preventDefault();
    if (entryText) {
      dispatch({ type: "add", value: entryText });
      setEntryText("");
    }
    setShowForm(false);
  };

  //removes element in 'todo'
  const remove = (id) => {
    dispatch({ type: "remove", id: id });
  };

  //clear todo list
  const clear = () => {
    dispatch({ type: "clear" });
  };

  //changes the color theme
  const changeColor = (col) => {
    dispatch({ type: "changeColor", color: col });
    setShowColorOptions(false);
  };

  return (
    <div className="h-full font-mono">
      {/* popup for color options */}
      {showColorOptions && (
        <div id="popup" className="flex w-8/12 mx-auto my-8 space-x-4">
          <div
            className="animate-bounce flex-1 p-2 text-center rounded-full bg-red-200 shadow-sm"
            onClick={() => changeColor("red")}
          >
            red
          </div>
          <div
            className="animate-bounce flex-1 p-2 text-center rounded-full bg-blue-200 shadow-sm"
            onClick={() => changeColor("blue")}
          >
            blue
          </div>
          <div
            className="animate-bounce flex-1 p-2 text-center rounded-full bg-green-200 shadow-sm"
            onClick={() => changeColor("green")}
          >
            green
          </div>
          <div
            className="animate-bounce flex-1 p-2 text-center rounded-full bg-yellow-200 shadow-sm"
            onClick={() => changeColor("yellow")}
          >
            yellow
          </div>
          <div
            className="animate-bounce flex-1 p-2 text-center rounded-full bg-purple-200 shadow-sm"
            onClick={() => changeColor("purple")}
          >
            purple
          </div>
        </div>
      )}

      {/* todo-list */}
      <div
        className={`w-3/6 h-auto mx-auto my-8 p-12 rounded-lg bg-${state.color}-50 shadow`}
      >
        <div className="mx-auto">
          <div className="py-3">Todo List</div>
          <div className="pb-8 text-sm">
            Instructions: Click entry to remove from list
          </div>
        </div>
        <div className={`space-y-8 bg-${state.color}`}>
          {state.todo.map((activity) => {
            return (
              <Entry
                key={activity.id}
                message={activity.message}
                onClick={() => remove(activity.id)}
                color={state.color}
              ></Entry>
            );
          })}
        </div>
      </div>

      {/* buttons for commands */}
      <div className="flex w-3/6 mx-auto">
        <button
          id="btn1"
          type="button"
          className={`flex-1 rounded-lg bg-${state.color}-200 shadow-sm p-4 mx-2 transform hover:scale-105`}
          onClick={() => setShowForm(!showForm)}
        >
          Add
        </button>
        <button
          id="btn2"
          type="button"
          className={`flex-1 rounded-lg bg-${state.color}-200 shadow-sm p-4 mx-2 transform hover:scale-105`}
          onClick={clear}
        >
          Clear
        </button>
        <button
          id="btn3"
          type="button"
          className={`flex-1 rounded-lg bg-${state.color}-200 shadow-sm p-4 mx-2 transform hover:scale-105`}
          onClick={() => setShowColorOptions(true)}
        >
          Change Color
        </button>
      </div>

      {/* popup for new entry submissions */}
      {showForm && (
        <div>
          <form
            className={`my-8 p-6 w-3/6 mx-auto bg-${state.color}-100 rounded-md shadow`}
            onSubmit={add}
          >
            <label>
              New Entry:
              <textarea
                className="w-full rounded-md p-8"
                value={entryText}
                onChange={(event) => setEntryText(event.target.value)}
              >
                {" "}
              </textarea>
            </label>
            <button
              type="submit"
              className={`p-2 mt-2 rounded-md bg-${state.color}-300 transform hover:bg-${state.color}-400`}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      <br></br>
    </div>
  );
}

export default App;
