const taskItemTemplate = (newTask) => `
    <li class="list__task-item" data-key="${newTask.id}">
    <input id="${newTask.id}" type="checkbox" />
    <label for="${newTask.id}" class="list__task-label">
    <svg class="list__task-checkbox">
        <!-- Seems to be an empty checkbox. -->
        <!-- <rect class="checkmark" x="21" y="3" width="18" height="18" rx="1" transform="rotate(90 21 3)" /> -->
        <rect class="list__task-box" width="18" height="18" x="3" y="3" />
        <path class="list__task-checkmark" d="M6.66666 12.6667L9.99999 16L17.3333 8.66669" stroke-dasharray="16" stroke-dashoffset="16" />
    </svg>
    </label>
    <span class="list__task-text">${newTask.text}</span>
    <button class="list__task-button">
    <svg>
        <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339" />
        <path
        d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z" />
    </svg>
    </button>
    </li>
`;

export default taskItemTemplate;
