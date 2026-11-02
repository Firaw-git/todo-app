let tasks = [];

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    list.append(li);
  });

  count.textContent = `${tasks.length} task(s)`;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if(text ==="") return;

    tasks.push({id: Date.now(), text: text, done: false});
    input.value = "";
    input.focus();

    renderTasks();

});

renderTasks();