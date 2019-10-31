let tasks = []

// Function to add a task in the task list.
function addTask(text) {
  const newTask = {
    text,
    checked: false,
    id: Date.now(),
  };

  tasks.push(newTask);

  const list = document.querySelector('.list');

  list.insertAdjacentHTML('afterbegin', `
    <li class="list__task" data-key="${newTask.id}">
      <input id="${newTask.id}" type="checkbox" />
      <label for="${newTask.id}" class="list__task-label">
        <svg><use xlink:href="#checkbox-unchecked"></use></svg>
      </label>
      <span>${newTask.text}</span>
      <button class="list__task-button">
        <svg><use xlink:href="#cancel"></use></svg>
      </button>
    </li>
  `);
}

const form = document.querySelector('.task-form');
form.addEventListener('submit', event => {
  // To avoid the default form behavior of sending the content to the web server.
  event.preventDefault();

  const input = document.querySelector('.task-form__input');

  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
  }
});
