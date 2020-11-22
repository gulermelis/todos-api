import React, { useState, useEffect } from "react";
import {get, update, remove } from "../services/TodosService";

const TodoApp = props => {
  const initialTodoState = {
    id: null,
    title: "",
    description:"",
    isDone: false
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [message, setMessage] = useState("");

  const getTodo = id => {
    get(id)
      .then(response => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateTodo = () => {
    update(currentTodo.id, currentTodo)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    remove(currentTodo.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/todos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {currentTodo ? (
      <div className="edit-form">
   
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentTodo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentTodo.description}
              onChange={handleInputChange}
            />
          </div>

        </form>

        <button className="badge badge-danger mr-2" onClick={deleteTodo}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateTodo}
        >
          Update
        </button>
        <p>{message}</p>
      
      </div>
    ) : (
      <div>
        <br />
        
      </div>
    )}
  </div>
  );
};

export default TodoApp;