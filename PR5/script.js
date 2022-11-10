const options = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

let tasks = {};
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks") === null) return;

  const dataFromStorage = JSON.parse(localStorage.getItem("tasks"));

  for (let key in dataFromStorage) {
    tasks[key] = dataFromStorage[key];
    createTaskElement(tasks[key]);
  }
});

let containerTasks = document.getElementById("tasks");

let inputTask = document.getElementById("iTask");

let modeSort = document.querySelector("select");

function createTaskElement(task) {
  const taskItem = document.createElement("div");
  taskItem.setAttribute("data-task", task.id);
  taskItem.classList.add("task-item");
  const checkBox = document.createElement("input");

  checkBox.setAttribute("type", "checkbox");

  const spanTaskName = document.createElement("span");

  spanTaskName.classList.add("task_name");

  spanTaskName.textContent = task.name;

  if (task.executed) {
    checkBox.style.visibility = "hidden";
    spanTaskName.style.textDecoration = "line-through";
    spanTaskName.style.color = "silver";
  }

  const spanRemove = document.createElement("span");

  spanRemove.classList.add("remove");

  spanRemove.textContent = "X";

  const spanDate = document.createElement("span");

  spanDate.classList.add("date_created");
  spanDate.textContent = task.dateCreated;

  taskItem.appendChild(checkBox);
  taskItem.appendChild(spanTaskName);
  taskItem.appendChild(spanRemove);
  taskItem.appendChild(spanDate);

  checkBox.addEventListener("change", (e) => {
    tasks[e.target.parentElement.dataset.task].executed = true;

    e.target.style.visibility = "hidden";
    spanTaskName.style.textDecoration = "line-through";
    spanTaskName.style.color = "silver";

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  spanRemove.addEventListener("click", (e) => {
    if (!confirm("Точно видалити?")) return;
    containerTasks.removeChild(e.target.parentNode);

    delete tasks[e.target.parentElement.dataset.task];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  spanTaskName.addEventListener("dblclick", showEdit);

   containerTasks.insertAdjacentElement("afterbegin", taskItem);
  //containerTasks.appendChild(taskItem);
}

inputTask.addEventListener("keydown", (e) => {
  if (e.key != "Enter") return;

  if (inputTask.value.length < 5) {
    alert("Назва закоротка");
    return;
  }
  const id = Date.now();

  const obj = {
    id,
    name: inputTask.value,
    date: new Date(),
    executed: false,
    dateCreated: new Date().toLocaleString("uk-UK", options),
  };

  tasks[id] = obj;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createTaskElement(obj);

  inputTask.value = "";
});

function showEdit(event) {
  let editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.value = event.target.textContent;
  event.target.textContent = "";
  event.target.appendChild(editInput);
  const idTask = event.target.parentElement.dataset.task;

  editInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      let parent = e.target.parentElement;

      parent.removeChild(editInput);

      parent.textContent = e.target.value;

      tasks[idTask].name = e.target.value;

      let dateChanged = new Date().toLocaleString("uk-UK", options);

      tasks[idTask].dateCreated = dateChanged;

      event.target.parentElement.lastElementChild.textContent = dateChanged;

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
}

modeSort.addEventListener("change", sortTasks);

function sortTasks(e) {
  let arrObjs = Object.keys(tasks).map((key) => tasks[key]);

  let sortValue = modeSort.value == "executed" ? true : false;

  arrObjs = arrObjs
    .filter((el) => el.executed == sortValue)
    .concat(arrObjs.filter((el) => el.executed == !sortValue));

  containerTasks.innerHTML = "";

  arrObjs.forEach((el) => createTaskElement(tasks[el.id]));
}
