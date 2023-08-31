import todoStore from "../../store/todo.store";

let element;

/**
 * 
 * @param {String} elementoIdHTML 
 * @param {Array<Todo>} todos 
 */
export const  renderPending = ( elementoIdHTML) => {
    
    if( !element) element = document.querySelector(elementoIdHTML);
    if( !element) throw new Error(`Element ${element} not found`);
     
    element.innerHTML = todoStore.getTodos( todoStore.Filters.Pending).length;
}