document.addEventListener("DOMContentLoaded", function () {
  const mail = document.querySelector("#mail");
});

// window.addEventListener("load", function () {
//   const lockBlur = document.getElementById("lockBlur");
//   let lock = prompt("Enter The Password");
//   while (lock !== "mina") {
//     lock = window.prompt("enter password");
//   }
//   alert("access granted! Welcome");
//   lockBlur.remove();
// });

// window.addEventListener("load", function () {
//   let lock;
//   do {
//     lock = prompt("Enter The Password"); // Prompt until the correct password is entered
//   } while (lock !== "mina");
//   alert("Access granted");
// });

// pick a color
const color = document.querySelectorAll(".colors button");
const container = document.getElementById("cont");

color.forEach(function (e) {
  e.addEventListener("click", function (e) {
    color.forEach(function (e) {
      e.classList.add("color-opacity");
    });
    e.currentTarget.classList.remove("color-opacity");
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    container.style.backgroundColor = window.localStorage.getItem("color");
    mail.style.color = window.localStorage.getItem("color");
  });
});
if (window.localStorage.getItem("color")) {
  color.forEach(function (e) {
    e.classList.add("color-opacity");
    container.style.backgroundColor = window.localStorage.getItem("color");
    document
      .querySelector(`[data-color="${window.localStorage.getItem("color")}"]`)
      .classList.remove("color-opacity");
    mail.style.color = window.localStorage.getItem("color");
  });
}
// pick a color

const taskBtn = document.getElementById("taskBtn");
const taskInput = document.querySelector(".container header .task input");
const empty = document.querySelector("#empty");
const bigDiv = document.querySelector("#tasks");

let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
getElementsFromLocalStorage();

taskBtn.onclick = () => {
  if (taskInput.value !== "") {
    addTaskToArray(taskInput.value);
    taskInput.value = "";
  }
};
// del button
empty.addEventListener("click", function (e) {
  if (e.target.classList.contains("tasksDelete")) {
    deleteFLStorage(
      e.target
        .closest(".tasks") // instead of parentElement.parentElement
        .getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
  // console.log(e.target.closest('.tasks').getAttribute("data-id"));
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addElementsToLocalStorageFrom(arrayOfTasks);
}
function addElementsToPageFrom(tasksArray) {
  empty.innerHTML = "";
  tasksArray.forEach(function (task) {
    // creat big div
    let div = document.createElement("div");
    div.className = "tasks";
    div.setAttribute("data-id", task.id);
    if (task) {
      div.className = "tasks done";
    }
    empty.appendChild(div);
    // creat input
    let tasksList = document.createElement("div.input");
    tasksList.className = "tasksList";
    tasksList.appendChild(document.createTextNode(task.title));
    div.appendChild(tasksList);
    // create button div
    let divBtn = document.createElement("div");
    divBtn.className = "tasksBtn";
    div.appendChild(divBtn);
    // create edit button
    let edit = document.createElement("button");
    edit.className = "tasksEdit";
    edit.appendChild(document.createTextNode("Edit"));
    divBtn.appendChild(edit);
    // create delete button
    let del = document.createElement("button");
    del.className = "tasksDelete";
    del.appendChild(document.createTextNode("Delete"));
    divBtn.appendChild(del);
  });
}
function addElementsToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getElementsFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
function deleteFLStorage(taskId) {
  // for explaining
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id}===${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  // arrayOfTasks = arrayOfTasks.filter(function (task) {
  //   return task.id != taskId;
  // });
  addElementsToLocalStorageFrom(arrayOfTasks);
}
// pop up
// let mail = document.getElementById("mail");
const popUp = document.getElementById("popUp");
const popUpBtn = document.getElementById("popUpBtn");
mail.onclick = function () {
  popUp.style.display = "block";
};
popUpBtn.onclick = function () {
  popUp.style.cssText = "display:none;transition:1s";
};

// pop up
