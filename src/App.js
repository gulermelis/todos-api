import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/AddTodo";
import ToDoApp from "./components/ToDoApp";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/todos" className="navbar-brand">
         Home
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/todos"} className="nav-link">
              To do List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/todos"]} component={ToDoList} />
          <Route exact path="/add" component={AddTodo} />
          <Route path="/todos/:id" component={ToDoApp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
