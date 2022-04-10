import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter, deleteCompletedAsync, selectTodos } from '../../redux/todos/todosSlice';

function ContentFooter() {
    const items = useSelector(selectTodos);
    const activeFilter = useSelector(state => state.todos.activeFilter);
    const itemsLeft = items.filter(item => !item.completed).length;
    const dispatch = useDispatch();

    return (
        <footer className="footer">
            <span className="todo-count">
            <strong>{itemsLeft} </strong>
            {itemsLeft > 1 ? "items" : "item"} left
            </span>

            <ul className="filters">
                <li>
                    <a 
                        className={activeFilter === "all" ? "selected" : undefined}
                        onClick={() => dispatch(setActiveFilter("all"))}
                    >
                        All
                    </a>
                </li>
                <li>
                    <a 
                        className={activeFilter === "active" ? "selected" : undefined}
                        onClick={() => dispatch(setActiveFilter("active"))}
                    >
                        Active
                    </a>
                </li>
                <li>
                    <a 
                        className={activeFilter === "completed" ? "selected" : undefined}
                        onClick={() => dispatch(setActiveFilter("completed"))}
                    >
                        Completed
                    </a>
                </li>
            </ul>
            <button className="clear-completed" onClick={() => dispatch(deleteCompletedAsync())}>
                Clear completed
            </button>
        </footer>
    );
}

export default ContentFooter;