import React, { useState, useEffect } from "react";
import {getAll,  removeAll, findByTitle} from "../services/TodosService";
import { Link } from "react-router-dom";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTodos();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTodos = () => {
    getAll()
      .then(response => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTodos();
    setCurrentTodo(null);
    setCurrentIndex(-1);
  };

  const setActiveTodo = (item, index) => {
    setCurrentTodo(item);
    setCurrentIndex(index);
  };

  const removeAllTodos = () => {
   removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findBy = () => {
   findByTitle(searchTitle)
      .then(response => {
        setTodos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findBy}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>To Do List</h4>

      <ul className="list-group">
        {todos &&
          todos.map((item, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveTodo(item, index)}
              key={index}
            >
              {item.title}
            </li>
          ))}
      </ul>

      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={removeAllTodos}
      >
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentTodo ? (
        <div>
          <h4>{currentTodo.isDone ? "It is Done! " : "Waiting for done.."}</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentTodo.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentTodo.description}
          </div>
         
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentTodo.isDone ? "Done! " : "Waiting.."}
          </div>

          <Link
            to={"/todos/" + currentTodo.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default ToDoList;