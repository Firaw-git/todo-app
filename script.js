const STORAGE_KEY = "To-Do App-tasks";

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Could not save tasks:", error);
  }
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load tasks:", error);
    return [];
  }
}

let tasks = loadTasks();
const clearBtn = document.querySelector("#delete-btnn");
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");

function renderTasks() {
  saveTasks();
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    label.append(checkbox, span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
    });

    li.append(label, deleteBtn);
    list.append(li);
  });

  const remaining = tasks.filter((t) => !t.done).length;
  count.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
}

clearBtn.addEventListener("click", () => {
  // outside the function
  tasks = tasks.filter((t) => !t.done);
  renderTasks();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ id: Date.now(), text: text, done: false });
  input.value = "";
  input.focus();

  renderTasks();
});

renderTasks();
