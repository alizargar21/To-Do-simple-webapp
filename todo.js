// constants 
const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add");
const todoList = document.querySelector(".todo-list");
const select = document.getElementById("select");


//event handlers ----
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", completeTodo);
todoList.addEventListener("dblclick", deleteTodo);
select.addEventListener("click", filterTodos);
window.addEventListener("DOMContentLoaded", getTodo);

// A task is created when you type in the input field and click the button
function addTodo(e) {
  e.preventDefault();
  if (input.value.length !== 0) {
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-li");
    newTodo.innerText = input.value;

    todoList.appendChild(newTodo);

    saveLocalTodo(input.value);

    input.value = "";
  }
}
// delete element when dbl click on todo element (li)
function deleteTodo(e) {
  let item = e.target;
  removeLocalTodo(item);
  item.remove();
}
// add complete style when click on todo element (li)
function completeTodo(e) {
  let item = e.target;
  if (item.classList !== "complete") {
    item.classList.toggle("complete");
  }
  saveLocalTodo();
}

// save input value in the role a task or todo
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (input.value.length !== 0) {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// remove elements when dblclick on todo element (li)

function removeLocalTodo(todo) {
  let todos;

  todos = JSON.parse(localStorage.getItem("todos"));

  const todoIndex = todo.innerText;
  console.log(todoIndex);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// get data from local storage when refresh web page and rebuilding li elements and show in DOM
function getTodo() {
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    let newTodo = document.createElement("li");
    newTodo.classList.add("todo-li");
    newTodo.innerText = todo;
    if (newTodo.classList.contains("complete") === true) {
      console.log(completeTask);
    }
    todoList.appendChild(newTodo);
  });
}
// filter status todos by class name
function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("complete")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}
