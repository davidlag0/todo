import taskListTemplate from './task-list.template';
import taskItemTemplate from '../task-item/task-item.template';

const TaskListComponent = {
  init() {
    this.taskListElement = document.querySelector('.list');
  },

  render(model) {
    const tasksHTML = model.tasks.reduce(
      (html, task) => html + taskItemTemplate(task),
      '',
    );
    return taskListTemplate(tasksHTML);
  },

  afterRender(model) {
    const list = document.querySelector('.list');

    list.addEventListener('click', (event) => {
      if (event.target.type === 'checkbox') {
        const taskKey = event.target.parentElement.dataset.key;
        // toggleChecked(taskKey);
        console.log('toggleChecked');
      }

      if (event.target.classList.contains('list__task-button')) {
        const taskKey = event.target.parentElement.dataset.key;
        this.deleteTask(model, taskKey);
        //console.log('deleteTask');
        console.log(model);
      }
    });
  },

  deleteTask(model, taskItemDataKey) {
    model.tasks = model.tasks.filter((task) => task.id !== Number(taskItemDataKey));
    this.render(model);
  },
};

export default TaskListComponent;
