import TaskItem from "./task-item/task-item";

const template = document.createElement("template");

template.innerHTML = /* html */ `
  <!-- <link rel="stylesheet" type="text/css" href="styles.css"> -->
  <style>
    * {
      box-sizing: inherit;
    }

    .task-form__input {
      display: inline-block;
      color: var(--background-color);
      background-color: var(--primary-color);
      width: 100%;
      border-radius: var(--border-radius);
      padding: 15px 10px 15px 10px;
      border: none;
      outline: none;
      font-size: 16px;
      font-weight: normal;
    }

    .task-form__input::placeholder {
      color: var(--background-color);
    }

    ul {
      padding: 0;
      list-style-type: none;
    }

    .empty-state {
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      margin-top: 10px;
      padding-bottom: 1px;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
      color: var(--primary-color);
    }

    .empty-state svg {
      width: 120px;
      height: 120px;
      stroke: var(--primary-color);
      stroke-width: 0.4;
      stroke-linecap: square;
      stroke-linejoin: miter;
      fill: none;
      color: var(--primary-color);
    }
  </style>
  <form class="task-form">
    <input type="text" aria-label="Enter a new task" placeholder="Add a task..." class="task-form__input">
  </form>

  <ul>
    <slot>
      <li>
        <div class="empty-state">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            aria-labelledby="tasklistIconTitle">
            <title id="tasklistIconTitle">Task List</title>
            <rect width="20" height="20" x="2" y="2"></rect>
            <path d="M11 7L17 7M11 12L17 12M11 17L17 17"></path>
            <line x1="7" y1="7" x2="7" y2="7"></line>
            <line x1="7" y1="12" x2="7" y2="12"></line>
            <line x1="7" y1="17" x2="7" y2="17"></line>
          </svg>
          <h2 class="empty-state__title">Add your first task</h2>
          <p class="empty-state__description">What will you work on today?</p>
        </div>
      </li>
    </slot>
  </ul>
`;

class TaskList extends HTMLElement {
  constructor() {
    super();

    this.tasks = [];

    this.attachShadow({
      mode: "open",
    }).appendChild(template.content.cloneNode(true));

    // Method Binding
    //
    // This is to bind the 'this' of the addItem method to the 'this' of the class
    // itself because otherwise, as we use the addItem function with a callback,
    // the 'this' would be the one of the HTML element clicked instead of the class itself.
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".task-form")
      .addEventListener("submit", this.formCallback);
    this.addEventListener("deleteTask", (event) =>
      this.deleteTask(event.detail)
    );
  }

  // Function to prepare the addition of a task after clicking
  // on the button to add a task.
  formCallback(event) {
    // To avoid the default form behavior of sending the content to the web server.
    event.preventDefault();

    const input = this.querySelector(".task-form__input");

    const text = input.value.trim();
    if (text !== "") {
      this.parentNode.host.addTask(text);
      input.value = "";
    }
  }

  // Function to add a task in the task list.
  addTask(text) {
    const newTask = {
      text,
      checked: false,
      id: Date.now(),
    };

    this.tasks.push(newTask);

    this.appendChild(new TaskItem(newTask));
  }

  deleteTask(taskId) {
    // Remove task-item element from the DOM.
    this.removeChild(this.querySelector(`task-item[taskid='${taskId}']`));

    // Keep all existing items in the list except the one we want to delete.
    this.tasks = this.tasks.filter((task) => task.id !== Number(taskId));
  }
}

export default TaskList;

customElements.define("task-list", TaskList);
