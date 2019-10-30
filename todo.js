document.getElementById('addTask').addEventListener('click', addTask);

// Displays current list of TODO's when the page is initially loaded.
showTasks();

// Function to show TODO's on the page.
function showTasks() {
  toDos = getTasks()
}

// Function to add a TODO to LocalStorage.
function addTask() {
  const newTask = document.getElementById('taskName').value;

  const tasks = getTasks();
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  showTasks();

  // To avoid any further action from the browser for the 'Add task' button.
  return false;
}

// Function to get TODO's from LocalStorage.
function getTasks() {
  const tasks = new Array;
  const tasksString = localStorage.getItem('tasks');

  if (tasksString != null) {
    tasks = JSON.parse(tasksString);
  }

  return tasks;
}
