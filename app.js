  // selectors
  const todoInput = document.getElementById("todo-input");
  const todoButton = document.getElementById("todo-button");
  const todoList = document.getElementById("todo-list");
  const filterOption = document.getElementById("filter-todo");
  // Event Listener
  document.addEventListener("DOMContentLoaded", getTodos);
  todoButton.addEventListener("click", todo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("click", filterTodo);
  // functions
  function todo(event) {
      event.preventDefault();
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //   create li
      const newItem = document.createElement("li");
      newItem.innerHTML = todoInput.value;
      todoDiv.appendChild(newItem);

      //   add todo to localstorage
      saveLocalTodo(todoInput.value);
      //   completed
      const completed = document.createElement("button");
      completed.innerHTML = '<i class="bi bi-check2"></i>';
      completed.classList.add("completed-btn");
      todoDiv.appendChild(completed);
      // trash
      const trash = document.createElement("button");
      trash.innerHTML = '<i class="bi bi-trash-fill"></i>';
      trash.classList.add("trash-btn");
      todoDiv.appendChild(trash);
      // append to list
      todoList.appendChild(todoDiv);
      //   clear inputtodo value
      todoInput.value = "";
  }
  function deleteCheck(e) {
      const item = e.target;
      if (item.classList[0] === "trash-btn") {
          const todo = item.parentElement;
          todo.classList.add("removing");
          removeLocal(todo);
          todo.addEventListener("transitionend", function () {
              todo.remove();
          });
      }
      if (item.classList[0] === "completed-btn") {
          todo = item.parentElement;
          todo.classList.toggle("completed");
      }
  }
  function filterTodo(e) {
      const todos = todoList.childNodes;
      todos.forEach(function (todo) {
          switch (e.target.value) {
              case "all":
                  todo.style.display = "flex";
                  break;
              case "completed":
                  if (todo.classList.contains("completed")) {
                      todo.style.display = "flex";
                  } else {
                      todo.style.display = "none";
                  }
                  break;
              case "uncompleted":
                  if (!todo.classList.contains("completed")) {
                      todo.style.display = "flex";
                  } else {
                      todo.style.display = "none";
                  }
                  break;
          }
      });
  }
  function saveLocalTodo(todo) {
      // do i already have thing in there?
      let todos;
      if (localStorage.getItem("todos") === null) {
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
  }
  function getTodos() {
      // do i already have thing in there?
      let todos;
      if (localStorage.getItem("todos") === null) {
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.forEach(function (todo) {
          event.preventDefault();
          const todoDiv = document.createElement("div");
          todoDiv.classList.add("todo");
          //   create li
          const newItem = document.createElement("li");
          newItem.innerHTML = todo;
          todoDiv.appendChild(newItem);
          //   completed
          const completed = document.createElement("button");
          completed.innerHTML = '<i class="bi bi-check2"></i>';
          completed.classList.add("completed-btn");
          todoDiv.appendChild(completed);
          // trash
          const trash = document.createElement("button");
          trash.innerHTML = '<i class="bi bi-trash-fill"></i>';
          trash.classList.add("trash-btn");
          todoDiv.appendChild(trash);
          // append to list
          todoList.appendChild(todoDiv);
      });
  }
  function removeLocal(todo) {
      // do i already have thing in there?
      let todos;
      if (localStorage.getItem("todos") === null) {
          todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem("todos", JSON.stringify(todos));
  }
