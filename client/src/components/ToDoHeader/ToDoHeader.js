import React from 'react';
import ToDoForm from '../ToDoForm/ToDoForm';
function ToDoHeader() {
  return (
    <header className="header">
        <h1>todos</h1>
        <ToDoForm />
    </header>
  );
}

export default ToDoHeader;