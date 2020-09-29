/* eslint-disable no-undef */
import TaskList from "../src/components/task-list/task-list";

describe("component-task-list", () => {
  beforeEach(() => {
    // Create element
    document.body.appendChild(new TaskList());
  });

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should have a form with an input for a new task", () => {
    const taskList = document.querySelector("task-list");
    const input = taskList.shadowRoot.querySelector("input");
    expect(input.placeholder).toBe("Add a task...");
  });

  it("should display a message to add a new task", () => {
    const taskList = document.querySelector("task-list");
    expect(taskList.shadowRoot.querySelector("div.empty-state"));
    expect(
      taskList.shadowRoot.querySelector("h2.empty-state__title").innerHTML
    ).toBe("Add your first task");
    expect(
      taskList.shadowRoot.querySelector("p.empty-state__description").innerHTML
    ).toBe("What will you work on today?");
  });

  it("should create a new task", () => {
    // Add a task
    const taskList = document.querySelector("task-list");
    taskList.shadowRoot.querySelector("input").value = "test task";
    taskList.shadowRoot
      .querySelector("form")
      .dispatchEvent(new Event("submit"));

    const taskItem = document.querySelector("task-item");
    expect(taskItem.getAttribute("taskid"));
    expect(taskItem.innerHTML).toBe("test task");
    expect(taskList.hasChildNodes()).toBe(true);
  });

  it("should not create a new task if the input box is empty", () => {
    const taskList = document.querySelector("task-list");
    taskList.shadowRoot.querySelector("input").value = "";
    taskList.shadowRoot
      .querySelector("form")
      .dispatchEvent(new Event("submit"));

    expect(taskList.hasChildNodes()).toBe(false);
  });

  it("should delete an existing task when it receives a deleteTask even", () => {
    // Add a task
    const taskList = document.querySelector("task-list");
    taskList.shadowRoot.querySelector("input").value = "test task";
    taskList.shadowRoot
      .querySelector("form")
      .dispatchEvent(new Event("submit"));

    const taskItem = document.querySelector("task-item");
    const taskId = taskItem.getAttribute("taskid");

    taskItem.dispatchEvent(
      new CustomEvent("deleteTask", { detail: taskId, bubbles: true })
    );

    expect(taskList.innerHTML).toBe("");
  });
});
