// document
//   .getElementById("addEventButton")
//   .addEventListener("click", function () {
//     const table = document.getElementById("tableBody");
//     let row = table.insertRow(-1);

//     let cell1 = row.insertCell(0);
//     let cell2 = row.insertCell(1);
//     let cell3 = row.insertCell(2);
//     let cell4 = row.insertCell(3);

//     let event = document.createElement("input");
//     event.type = "text";
//     cell1.appendChild(event);

//     let startDate = document.createElement("input");
//     startDate.type = "date";
//     cell2.appendChild(startDate);

//     let endDate = document.createElement("input");
//     endDate.type = "date";
//     cell3.appendChild(endDate);

//     const plusBtn = document.createElement("button");
//     plusBtn.innerHTML = "Plus";
//     plusBtn.classList.add("plusBtn");
//     plusBtn.addEventListener("click", function () {
//       console.log("Event: " + event.value);
//       console.log("Start: " + startDate.value);
//       console.log("End: " + endDate.value);
//     });

//     cell4.appendChild(plusBtn);
//   });

// Define an API module using an IIFE (Immediately Invoked Function Expression).
const API = (function () {
  // Define the URL for the API endpoint.
  const API_URL = "http://localhost:3000/events";

  // Define a method to get the list of to-dos from the API.(GET)
  const getTodos = async () => {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      return await res.json();
    }
  };

  // Define a method to add a new to-do via the API.(POST)
  const postTodo = async (newTodo) => {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newTodo),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      return await res.json();
    }
  };

  // Define a method to delete a to-do via the API.(DELETE)
  const deleteTodo = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      return await res.json();
    }
  };

  // Define a method to update a to-do via the API.(PUT)
  const putTodo = async (id, updatedTodo) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(updatedTodo),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    } else {
      return await res.json();
    }
  };

  return {
    getTodos,
    postTodo,
    putTodo,
    deleteTodo,
  };
})();

// Define a model for the to-do list.
class TodoModel {
  #todos = [];
  constructor() {}
  getTodos() {
    return this.#todos;
  }
  async fetchTodos() {
    this.#todos = await API.getTodos();
  }
  async addTodo(newTodo) {
    const todo = await API.postTodo(newTodo);
    this.#todos.push(todo);
    return todo;
  }

  async updateTodo(id, updatedFields) {
    const updatedTodo = await API.putTodo(id, updatedFields);
    const index = this.#todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.#todos[index] = updatedTodo;
    }
    return updatedTodo;
  }

  async removeTodo(id) {
    const removedId = await API.deleteTodo(id);
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
    return removedId;
  }
}

// Define a view for the to-do list.

class TodoView {
  // When the view is constructed, get references to the form and list in the HTML.
  constructor() {
    // this.form = document.querySelector(".todo-app__form");
    // this.input = document.getElementById("todo-app__input");
    // this.todolist = document.querySelector(".todolist");
    this.todolist = document.getElementById("tableBody");
  }

  // Define a method to render the to-do list.

  initRenderTodos(todos) {
    this.todolist.innerHTML = "";
    todos.forEach((todo) => {
      this.appendTodo(todo);
    });
  }

  // Remove a to-do from the list.
  removeTodo(id) {
    const element = document.getElementById(`todo-${id}`);
    element.remove();
  }

  // Append a to-do to the list.
  appendTodo(todo) {
    const todoElem = this.createTodoElem(todo);
    this.todolist.append(todoElem);
  }

  // Create a to-do element.
  createTodoElem(todo) {
    // The container row  for the to-do element.
    const todoElem = document.createElement("tr");
    todoElem.classList.add("todo");
    todoElem.setAttribute("id", `todo-${todo.id}`);

    const title = document.createElement("td");
    title.classList.add("eventName");
    title.textContent = todo.eventName;

    const startDate = document.createElement("td");
    startDate.classList.add("startDate");
    startDate.textContent = todo.startDate;
    //Date format
    const endDate = document.createElement("td");
    endDate.classList.add("endDate");
    endDate.textContent = todo.endDate;
    //Date format
    const actions = document.createElement("td");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("edit-id", todo.id);  // Set the id as a data attribute

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("remove-id", todo.id); // Set the id as a data attribute

    actions.append(editBtn, deleteBtn);
    todoElem.append(title, startDate, endDate, actions);

    return todoElem;
  }
}

// Define a controller for the to-do list.
class TodoController {
  // When the controller is constructed, get references to the model and view.
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

    // After the controller is constructed, set up event handlers and fetch the initial list of to-dos.
    async init() {
      this.setUpEvents();
      await this.model.fetchTodos();
      this.view.initRenderTodos(this.model.getTodos());
    }

  // Setup events
  setUpEvents() {
    // Add the button event listener for delete button
    this.setUpDeleteEvent();

    // Add the button event listener for plus button
    document
      .getElementById("addEventButton")
      .addEventListener("click", this.handleAddEvent.bind(this));
  }

  setUpDeleteEvent() {
    this.view.todolist.addEventListener("click", (event) => {
      const isDeleteBtn = event.target.classList.contains("deleteBtn");
      if (isDeleteBtn) {
        const removeId = event.target.getAttribute("remove-id"); // Retrieve the id
        this.model
          .removeTodo(removeId)
          .then(() => {
            this.view.removeTodo(removeId);
          })
          .catch((error) => console.log(error));
      }
    });
  }

  
 

  handleAddEvent() {
    const table = document.getElementById("tableBody");
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    let event = document.createElement("input");
    event.type = "text";
    cell1.appendChild(event);

    let startDate = document.createElement("input");
    startDate.type = "date";
    cell2.appendChild(startDate);

    let endDate = document.createElement("input");
    endDate.type = "date";
    cell3.appendChild(endDate);

    const plusBtn = document.createElement("button");
    plusBtn.innerHTML = "Plus";
    plusBtn.classList.add("plusBtn");

    plusBtn.addEventListener("click", () => {
      const newTodo = {
        eventName: event.value,
        startDate: startDate.value,
        endDate: endDate.value,
      };

      console.log(newTodo);

      this.model.addTodo(newTodo).then((todo) => {
        this.view.appendTodo(todo);
        // remove the input fields or input line
        row.remove();
      });
    });

    cell4.appendChild(plusBtn);
  }


}

// Create a new model, view, and controller for the to-do list.
const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);
