import TodoItem from "./todo_item.js";



let todoArray = [];

//Select DOM
const todoInput = document.querySelector('.todo-input');
const todoForm = document.querySelector('form');
const todoList = document.querySelector('.todo-list');
const filterTodoSelect = document.querySelector('.filter-todo');


//Event Listeners
todoForm.addEventListener('submit',addTodo);
filterTodoSelect.addEventListener('change',filterTodo);
//Functions
function addTodo(event){
  event.preventDefault();

  if (todoInput.value.trim() === '') return;

  const item = new TodoItem(todoInput.value.trim());

  todoArray.push(item);

  getTodos();


  todoInput.value = '';

}

function deleteTodo(e){

  const todoItem = e.target.closest('.todo');
  const itemId = e.target.dataset.todoid;

  todoArray = todoArray.filter(todo => todo.id !== +itemId);

  todoItem.classList.add('fall');

  setTimeout(getTodos,1000);
}

function filterTodo(e){
  getTodos();
}

function todoDone(e){
  const itemId = e.target.dataset.todoid;

  const item = todoArray.find(todo => todo.id === +itemId);

  item.done = true;

  getTodos();
}


// function removeLocalTodos(todo){}

function getTodos(){
  todoList.innerHTML = '';

  const state = filterTodoSelect.value;

  let displayItem = [];

  switch(state){
    case 'all':
      displayItem = todoArray;
      break;

    case 'completed':
      displayItem = todoArray.filter(todo => todo.done);
      break;

    case 'uncompleted':
      displayItem = todoArray.filter(todo => !todo.done);
      break;

    default:
      console.error('Worng Choice!');
      throw 'Error';
      

  }


  displayItem.forEach(item => {
    
    

      const domItem = document.createElement('li');
      domItem.classList.add('todo');

      if (item.done){
        domItem.classList.add('completed');
      }

      const html = `
        <h3 class="content">${item.content}</h3>
        <div class="btns-container">
          <button class="complete-btn" data-todoid=${item.id}><i class="fa fa-check"></i></button>
          <button class="trash-btn" data-todoid=${item.id}><i class="fa fa-trash"></i></button>
        </div>

      `;

    domItem.insertAdjacentHTML('afterbegin',html);

    const deleteBtn = domItem.querySelector('.trash-btn');
    const doneBtn = domItem.querySelector('.complete-btn');

    deleteBtn.addEventListener('click',deleteTodo);
    doneBtn.addEventListener('click',todoDone);

    todoList.insertAdjacentElement('beforeend',domItem);


  });
}


