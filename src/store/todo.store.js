import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos : [],
    filter: Filters.All,
}

const initStore = () => {
    getTodos();
}

const loadStore = () => {
    if( !sessionStorage.getItem('todos') ) return;
    const { todos = [] , filter = Filters.All} = JSON.parse(sessionStorage.getItem('todos'));
    state.todos = todos;
    state.filter = filter; 
}

loadStore();

const saveStateToSessionStorage = () => {
    sessionStorage.setItem('todos', JSON.stringify(state));
}

const getTodos = ( filter = Filters.All ) => {
    switch (filter) {
        case Filters.All :
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${filter} is not supported`); 
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if( !description )  throw new Error(`Description is required`); 
    state.todos.push( new Todo(description) );

    saveStateToSessionStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToSessionStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleTodo = ( todoId ) => {
   state.todos = state.todos.filter( todo => todo.id !== todoId );

   saveStateToSessionStorage();
}

const deleCompletedTodos = () => {
    state.todos = getTodos(Filters.Pending);
    saveStateToSessionStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToSessionStorage();
}

/**
 * 
 * @returns {String}
 */
const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    toggleTodo,
    deleCompletedTodos,
    deleTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    getTodos,
    Filters
}