import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {selectFiltered, getTodosAsync, toggleTodoAsync, deleteTodoAsync } from '../../redux/todos/todosSlice';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

function ToDoList() {
    const dispatch = useDispatch();
    const filteredItems = useSelector(selectFiltered);
    const isLoading = useSelector(state => state.todos.isLoading);
    const error = useSelector(state => state.todos.error);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    if(isLoading) {
        return <Loading/>;
    }

    if(error) {
        return <Error message={error} />
    }

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({ id, data: { completed }}))
    }

    return (
        <ul className="todo-list">
            {
                filteredItems.map(item => 
                <li key={item.id} className={item.completed ? "completed" : undefined}>
                    <div className="view">
                        <input 
                            className="toggle" 
                            type="checkbox"
                            checked={item.completed} 
                            onChange={() => handleToggle(item.id, !item.completed)} 
                        />
                        <label>{item.name}</label>
                        <button className="destroy" onClick={() => dispatch(deleteTodoAsync(item.id))}></button>
                    </div>
                </li>
                )
            }
            
        </ul>
    );
}

export default ToDoList;