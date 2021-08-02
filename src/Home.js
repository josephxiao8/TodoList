import React, { useEffect, useState } from "react";
import "./index.css";
import List from "./List";
import { Link } from "react-router-dom";

const Home = ({ activeListGrid, setActiveListGrid }) => {
  const [lists, setLists] = useState({ allLists: [], cnt: 0 }); //maintains information in each 'list' component
  const [showForm, setShowForm] = useState(false); //true-show form, false-hide form
  const [entryText, setEntryText] = useState(""); //text inside form

  useEffect(() => {
    setLists(activeListGrid);
  }, [activeListGrid]);

  useEffect(() => {
    setActiveListGrid(lists);
  }, [lists, setActiveListGrid]);

  //creates a new 'list' component
  const createNewList = (e) => {
    e.preventDefault();
    setShowForm(false);
    setLists((prevLists) => {
      const { allLists, cnt } = prevLists;
      const obj = {
        allLists: [
          ...allLists,
          {
            id: cnt + 1,
            date: `${new Date()
              .toISOString()
              .slice(0, 10)} ${new Date().toLocaleTimeString()}`,
            text: entryText,
          },
        ],
        cnt: cnt + 1,
      };
      return obj;
    });
    setEntryText("");
  };

  return (
    <div className="font-sans">
      {/* button to create new 'list' */}
      <button
        className="block  rounded-md p-4 shadow-md border-2 bg-gray-50 hover:bg-gray-200 hover:border-gray-300 mx-auto"
        onClick={() => setShowForm(!showForm)}
      >
        create new list
      </button>

      {/* popup form */}
      {showForm && (
        <div>
          <form
            className="my-8 p-6 w-3/6 mx-auto bg-gray-50 rounded-md shadow"
            onSubmit={createNewList}
          >
            <label>
              Title:
              <textarea
                className="w-full rounded-md p-8"
                value={entryText}
                onChange={(event) => setEntryText(event.target.value)}
              ></textarea>
            </label>
            <button
              type="submit"
              className={
                "p-2 mt-2 rounded-md bg-gray-300 transform hover:bg-gray-400"
              }
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* displays the 'list' components */}
      <div class="grid grid-cols-3 gap-4 w-2/3 mx-auto my-16">
        {lists.allLists.map((singleList) => {
          return (
            <div key={singleList.id}>
              <Link to={`/list/${singleList.id}`}>
                <List {...singleList} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
