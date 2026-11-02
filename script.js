let tasks = [];

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if(text ===" ") return;

    tasks.push({id: Date.now(), text: text, done: false});
    input.value = "";
    input.focus();

    console.log(tasks);

});