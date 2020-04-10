const template = document.createElement('template');

template.innerHTML = /* html */`
  <link rel="stylesheet" type="text/css" href="styles.css">

  <form class="task-form">
    <input type="text" aria-label="Enter a new task" placeholder="Add a task..." class="task-form__input">
  </form>

  <ul>
    <slot>
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
    </slot>
  </ul>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    // Add a shadow DOM
    const shadowDOM = this.attachShadow({ mode: 'open' });

    // render
    shadowDOM.appendChild(template.content.cloneNode(true));

    // method binding
    this.addItem = this.addItem.bind(this);
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector('button');
    button.onclick = this.addItem;
  }

  addItem() {
    const input = this.shadowRoot.querySelector('#new-item');
    const item = document.createElement('list-item');

    item.innerHTML = input.value;

    this.appendChild(item);
  }
}

export default TodoList;

customElements.define('todo-list', TodoList);
