import todoStore from "../store/todo.store";
import html  from "./app.html?raw";
import { renderTodos } from "./use-Cases";

const elementIds = {
    TodoList : '.todo-list',
    NewTodoInput : '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
      const todos = todoStore.getTodos();
      renderTodos( elementIds.TodoList , todos);
    };

    // Función auto invocada que se ejecutara cuando se haga el llamado a App()
    (() => {
        const app = document.createElement('h1');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(elementIds.NewTodoInput);
    const todoListUl = document.querySelector(elementIds.TodoList);
    

    // Listeners 
    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13 ) return;
        if(event.target.value.trim().length === 0)  return;
       
        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });


    todoListUl.addEventListener('click', (event) => {
        //el closest('[data-id]') lo que hace es que busca dentro del target de  
        //elemento al que se lee esta haciendo click el primer atributo mas cerca 
        // con ese atributo y devuelve el target;
        const element = event.target.closest('[data-id]');

        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    
    todoListUl.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.className === 'destroy' ) {
            const element = event.target.closest('[data-id]');
            console.debug(`💎🤑  element`, element)
            todoStore.deleTodo(element.getAttribute('data-id'));
            displayTodos();
        } 
    });





}