import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import App from "./App";

const Start = () => {
  const [activeLists, setActiveLists] = useState([]);
  const [activeListGrid, setActiveListGrid] = useState({
    allLists: [],
    cnt: 0,
  });

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Navbar />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/">
          <Home
            activeListGrid={activeListGrid}
            setActiveListGrid={setActiveListGrid}
          />
        </Route>
        <Route path="/list/:id">
          <App activeLists={activeLists} setActiveLists={setActiveLists} />
        </Route>
        <Route path="*">Error, page does not exist</Route>
      </Switch>
    </Router>
  );
};

export default Start;
