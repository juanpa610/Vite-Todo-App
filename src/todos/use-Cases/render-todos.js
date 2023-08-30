import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo";


let element;

/**
 * 
 * @param {String} elementoIdHTML 
 * @param {Array<Todo>} todos 
 */
export const renderTodos = ( elementoIdHTML, todos = []) => {
    
    if( !element) element = document.querySelector(elementoIdHTML);
    
    if( !element) throw new Error(`Element ${element} not found`);
     
    element.innerHTML = '';
    
    todos.forEach(todo => {
       element.append(createTodoHTML(todo));
    });
    
}