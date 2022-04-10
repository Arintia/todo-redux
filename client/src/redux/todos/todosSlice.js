import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async() => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async({id, data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async(id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return id;
});

export const deleteCompletedAsync = createAsyncThunk('todos/deleteCompletedAsync', async() => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return;
});

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items: [
            
        ],
        isLoading: false,
        error: null,
        activeFilter: 'all'
    },
    reducers: {
        setActiveFilter: (state, action) => {
            const filter = action.payload;
            if(state.activeFilter === filter) return;
            state.activeFilter = filter;
        },
        clearCompleted: (state) => {
            if(state.items.length === 0) return;
            state.items = state.items.filter(todo => !todo.completed);
        }
    },
    extraReducers: {
        // get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
            console.log(action.payload)
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        },
        // add todo
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
        },
        // toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].completed = completed; 
        },
        // delete todo
        [deleteTodoAsync.fulfilled]: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(todo => todo.id !== id); 
        },
        // delete completed
        [deleteCompletedAsync.fulfilled]: (state, action) => {
            state.items = state.items.filter(todo => !todo.completed);
        }
    }
});

export const selectTodos = state => state.todos.items;
export const selectFiltered = state => {
    if(state.todos.activeFilter === "all")
        return state.todos.items;
    return state.todos.items.filter(todo => 
        state.todos.activeFilter === "active" ? !todo.completed && todo : todo.completed && todo    
    )
}
export const {setActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;