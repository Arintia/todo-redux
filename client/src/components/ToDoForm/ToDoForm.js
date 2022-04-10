import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../redux/todos/todosSlice';

function ToDoForm() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!todo) return;
    await dispatch(addTodoAsync({ name: todo }));
    setTodo("");
  }
  return (
    <form onSubmit={handleSubmit}>
        <input 
          className="new-todo" 
          value={todo} 
          placeholder="What needs to be done?" 
          onChange={(e) => setTodo(e.target.value)} 
          autoFocus 
        />
    </form>
  );
}

export default ToDoForm;