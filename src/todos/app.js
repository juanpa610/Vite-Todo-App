import todoStore from "../store/todo.store";
import html  from "./app.html?raw";
import { renderTodos, renderPending } from "./use-Cases";

const elementIds = {
    BtnClearCompleted : '.clear-completed',
    TodoList : '.todo-list',
    NewTodoInput : '#new-todo-input',
    filters : '.filtro',
    CountPendingTodos : '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
      const todos = todoStore.getTodos( todoStore.getCurrentFilter());
      renderTodos( elementIds.TodoList , todos);
      UpdatePendingCount();
    };

    const UpdatePendingCount = () => {
        renderPending(elementIds.CountPendingTodos);
    }

    // Función auto invocada que se ejecutara cuando se haga el llamado a App()
    (() => {
        document.querySelector(elementId).innerHTML = html;
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(elementIds.NewTodoInput);
    const todoListUl = document.querySelector(elementIds.TodoList);
    const btnDeleteTodo = document.querySelector(elementIds.BtnClearCompleted);
    const allFiltersTodos = document.querySelectorAll(elementIds.filters);
    

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
            todoStore.deleTodo(element.getAttribute('data-id'));
            displayTodos();
        } 
    });

    btnDeleteTodo.addEventListener('click', () => {
        todoStore.deleCompletedTodos();
        displayTodos();
    });

    allFiltersTodos.forEach( filter => {
        switch (todoStore.getCurrentFilter()) {
            case todoStore.Filters.All :
                filter.textContent == 'Todos' && filter.classList.toggle('selected');
                break;
            case todoStore.Filters.Pending:
                filter.textContent == 'Pendientes' && filter.classList.toggle('selected');
                break;
            case todoStore.Filters.Completed:
                filter.textContent == 'Completados' && filter.classList.toggle('selected');
                break;
        }

        filter.addEventListener('click', (event) => {
            allFiltersTodos.forEach( e => {
                e.classList.remove('selected');
            });

            event.target.classList.toggle('selected');

            switch (event.target.textContent) {
                case 'Todos':
                    todoStore.setFilter(todoStore.Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter(todoStore.Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(todoStore.Filters.Completed);
                    break;
            }
            displayTodos();
        });

    });

}