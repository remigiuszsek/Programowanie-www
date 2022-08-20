const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();
});// What .preventDefault() do and read documentation about .addEventListener, (e); vs code keyboard shotcurts; JSON read in documentation; co to jest contextmenu zamiast click, what will happen if you create a function with a parameter and then you execute this function without passing any parameter


function addTodo(todo) {
    let todoText = input.value;

    if(todo) {
        todoText = todo.text; 
    }

    if(todoText) {
         const todoEl = document.createElement('li');
         if(todo && todo.completed) {
            todoEl.classList.add('completed');
         }
 
         todoEl.innerText = todoText;

         todoEl.addEventListener('click', () => {
             todoEl.classList.toggle('completed');

             updateLS();
         });

         todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
         });

         todosUL.appendChild(todoEl);

         input.value = '';

         updateLS();
    }

    
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');
    
    const todos = [];
    
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        })
    });

    localStorage.setItem('todos', JSON.stringify(todos)); 
}