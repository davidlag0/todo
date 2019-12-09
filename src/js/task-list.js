import '../css/styles.css';
import taskItemTemplate from './task-item/task-item.template';

let tasks = [];

// Function to add a task in the task list.
function addTask(text) {
  const newTask = {
    text,
    checked: false,
    id: Date.now(),
  };

  tasks.push(newTask);

  const list = document.querySelector('.list');

  list.insertAdjacentHTML(
    'afterbegin',
    taskItemTemplate(newTask),
  );
}

function toggleChecked(taskItemDataKey) {
  const taskIndex = tasks.findIndex((task) => task.id === Number(taskItemDataKey));
  tasks[taskIndex].checked = !tasks[taskIndex].checked;

  const taskItem = document.querySelector(`[data-key='${taskItemDataKey}']`);
  const taskCheckmark = taskItem.querySelector('.list__task-checkmark');
  const taskText = taskItem.querySelector('.list__task-text');
  if (tasks[taskIndex].checked) {
    taskCheckmark.classList.add('list__task-checkmark_checked');
    taskText.classList.add('list__task-text_crossed');
  } else {
    taskCheckmark.classList.remove('list__task-checkmark_checked');
    taskText.classList.remove('list__task-text_crossed');
  }
}

function deleteTask(taskItemDataKey) {
  // Keep all existing items in the list except the one we want to delete.
  tasks = tasks.filter((task) => task.id !== Number(taskItemDataKey));

  const taskToDelete = document.querySelector(`[data-key='${taskItemDataKey}']`);
  taskToDelete.remove();

  // To remove all HTML content of the list to avoid a bug with CSS
  // and the empty state of the list.
  const taskList = document.querySelector('.list');
  if (tasks.length === 0) taskList.innerHTML = '';
}

const form = document.querySelector('.task-form');
form.addEventListener('submit', (event) => {
  // To avoid the default form behavior of sending the content to the web server.
  event.preventDefault();

  const input = document.querySelector('.task-form__input');

  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
  }
});

const list = document.querySelector('.list');
list.addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    const taskKey = event.target.parentElement.dataset.key;
    toggleChecked(taskKey);
  }

  if (event.target.classList.contains('list__task-button')) {
    const taskKey = event.target.parentElement.dataset.key;
    deleteTask(taskKey);
  }
});
