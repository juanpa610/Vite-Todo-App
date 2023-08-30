import { Todo } from '../todos/models/todo.model';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos : [
        new Todo('Jugar al voleibol'),
        new Todo('Jugar al Basquetbol'),
        new Todo('Jugar al futbol'),
        new Todo('Jugar al POLL'),
        new Todo('Jugar al GTA-V'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    getTodos();
}

const loadStore = () => {
   throw new Error('Not implemented ');
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
}

/**
 * 
 * @param {String} todoId 
 */
const changeStateTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })
}

/**
 * 
 * @param {String} todoId 
 */
const deleTodo = ( todoId ) => {
   state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleCompletedTodos = () => {
    state.todos = getTodos(Filters.Pending);
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
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
    changeStateTodo,
    deleCompletedTodos,
    deleTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    getTodos
}