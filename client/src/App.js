import React from 'react';
import './App.css';
import ContentFooter from './components/ContentFooter/ContentFooter';
import Footer from './components/Footer/Footer';
import ToDoHeader from './components/ToDoHeader/ToDoHeader';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  return (
    <>
      <section className="todoapp">
        <ToDoHeader />
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ToDoList />
        </section>
        <ContentFooter />
      </section>
      <Footer />
    </>
  );
}

export default App;
