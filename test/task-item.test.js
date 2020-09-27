import TaskItem from "../src/components/task-list/task-item/task-item";
/* eslint-disable no-undef */
import TaskList from "../src/components/task-list/task-list";

describe("component-task-item", () => {
  beforeAll(() => {
    // Create element
    document.body.appendChild(new TaskList());
  });

  beforeEach(() => {
    // Create element
    const newTask = {
      text: "test task",
      checked: false,
      id: Date.now(),
    };

    const taskList = document.body.querySelector("task-list");
    taskList.appendChild(new TaskItem(newTask));
  });

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    const taskList = document.body.querySelector("task-list");

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  });

  it("should delete the task when the delete button is clicked", () => {
    const taskItem = document.body.querySelector("task-item");
    taskItem.shadowRoot
      .querySelector("button")
      .dispatchEvent(new Event("click"));
    expect(document.body.querySelector("task-list").innerHTML).toBe("");
  });

  it("should show crossed text and a checkmark when the checkbox is clicked once", () => {
    const taskItem = document.body.querySelector("task-item");
    taskItem.shadowRoot
      .querySelector("input")
      .dispatchEvent(new Event("click"));
    expect(
      taskItem.shadowRoot
        .querySelector("span")
        .classList.contains("list__task-text_crossed")
    ).toBe(true);
    expect(
      taskItem.shadowRoot
        .querySelector(".list__task-checkmark")
        .classList.contains("list__task-checkmark_checked")
    ).toBe(true);
  });

  it("should show crossed text and a checkmark when the checkbox is clicked twice", () => {
    const taskItem = document.body.querySelector("task-item");

    // Checked the box
    taskItem.shadowRoot
      .querySelector("input")
      .dispatchEvent(new Event("click"));

    // Unchecked the box
    taskItem.shadowRoot
      .querySelector("input")
      .dispatchEvent(new Event("click"));

    expect(
      taskItem.shadowRoot
        .querySelector("span")
        .classList.contains("list__task-text_crossed")
    ).toBe(false);
    expect(
      taskItem.shadowRoot
        .querySelector(".list__task-checkmark")
        .classList.contains("list__task-checkmark_checked")
    ).toBe(false);
  });
});
