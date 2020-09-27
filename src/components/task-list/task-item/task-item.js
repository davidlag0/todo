const template = document.createElement("template");

template.innerHTML = /* html */ `
  <!-- <link rel="stylesheet" type="text/css" href="styles.css"> -->
  <style>
    * {
      box-sizing: inherit;
    }

    input[type="checkbox"] {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      stroke: var(--primary-color);
      stroke-width: 2;
      stroke-linecap: square;
      stroke-linejoin: miter;
      fill: none;
      color: var(--primary-color);
    }

    .list__task-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--border-radius);
      padding: 8px 10px 8px 10px;
      background-color: var(--background-color);
      color: #000000;
      font-size: 16px;
      font-weight: normal;
      margin: 3px 0 3px 0;
    }

    .list__task-label {
      border: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }

    .list__task-checkmark {
      transition: stroke-dashoffset 0.1s linear;
    }

    .list__task-checkmark_checked {
      stroke-dashoffset: 0;
    }

    .list__task-text {
      width: 100%;
      padding-left: 7px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .list__task-text_crossed {
      text-decoration: line-through;
    }

    .list__task-button {
      border: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      padding: 0;
    }

    .list__task-button svg {
      pointer-events: none;
    }
  </style>
  <li class="list__task-item" data-key="id">
    <input id="id" type="checkbox" />
    <label for="id" class="list__task-label">
      <svg class="list__task-checkbox">
        <!-- Seems to be an empty checkbox. -->
        <!-- <rect class="checkmark" x="21" y="3" width="18" height="18" rx="1" transform="rotate(90 21 3)" /> -->
        <rect class="list__task-box" width="18" height="18" x="3" y="3" />
        <path class="list__task-checkmark" d="M6.66666 12.6667L9.99999 16L17.3333 8.66669" stroke-dasharray="16" stroke-dashoffset="16" />
      </svg>
    </label>
    <span class="list__task-text"><slot></slot></span>
    <button class="list__task-button">
      <svg>
        <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339" />
        <path
        d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z" />
      </svg>
    </button>
  </li>
`;

class TaskItem extends HTMLElement {
  constructor(task) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.taskText = this.shadowRoot.querySelector(".list__task-text");
    this.taskCheckmark = this.shadowRoot.querySelector(".list__task-checkmark");
    this.taskInput = this.shadowRoot.querySelector("input");

    // Method Binding
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);

    this.innerHTML = task.text;
    this.taskid = task.id;
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", this.deleteTask);
    this.taskInput.addEventListener("click", this.toggleTask);

    // Useful method to set missing attributes.

    this.shadowRoot.querySelector("li").setAttribute("data-key", this.taskid);
    this.taskInput.setAttribute("id", this.taskid);
    this.shadowRoot.querySelector("label").setAttribute("for", this.taskid);
  }

  static get observedAttributes() {
    return ["checked"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== null) {
      this.taskText.classList.add("list__task-text_crossed");
      this.taskCheckmark.classList.add("list__task-checkmark_checked");
    } else {
      this.taskText.classList.remove("list__task-text_crossed");
      this.taskCheckmark.classList.remove("list__task-checkmark_checked");
    }
  }

  get taskid() {
    return this.getAttribute("taskid");
  }

  set taskid(newValue) {
    this.setAttribute("taskid", newValue);
  }

  deleteTask() {
    this.dispatchEvent(
      new CustomEvent("deleteTask", { detail: this.taskid, bubbles: true })
    );
  }

  toggleTask() {
    if (!this.hasAttribute("checked")) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }
}

export default TaskItem;

customElements.define("task-item", TaskItem);
