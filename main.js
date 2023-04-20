let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let divTasks = document.querySelector(".tasks");
let delet = document.querySelector(".delet");

let arrayTask = [];

if (localStorage.getItem("taskss")) {
  arrayTask = JSON.parse(localStorage.getItem("taskss"));
}
getfromLocalStorage();

submit.onclick = function () {
  if (input.value != "") {
    addtasktoarray(input.value);
    input.value = "";
  }
};
function addtasktoarray(input) {
  const tasks = {
    id: Date.now(),
    title: input,
    complated: false,
  };
  arrayTask.push(tasks);
  // console.log( arrayTask );
  addtobody(arrayTask);
  addtolocalStorage(arrayTask);
}
function addtobody(arrayTask) {
  divTasks.innerHTML = "";
  arrayTask.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.complated) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // console.log( div );
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delet"));
    div.appendChild(span);
    divTasks.appendChild(div);
  });
}
function addtolocalStorage(arrayTask) {
  window.localStorage.setItem("taskss", JSON.stringify(arrayTask));
}
function getfromLocalStorage() {
  let data = window.localStorage.getItem("taskss");
  if (data) {
    let task = JSON.parse(data);
    addtobody(task);
    // console.log( task );
  }
  delet.addEventListener("click", (e) => {
    if (e.target.classList.contains("delet")) {
      divTasks.innerHTML = "";
      window.localStorage.removeItem("taskss");
    }
  });
  addtolocalStorage(arrayTask);
}
divTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deletFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function deletFromLocalStorage(taskId) {
  arrayTask = arrayTask.filter((task) => task.id != taskId);
  addtolocalStorage(arrayTask);
}
function toggleStatus(taskId) {
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].id == taskId) {
      arrayTask[i].complated == false
        ? (arrayTask[i].complated = true)
        : (arrayTask[i].complated = false);
    }
  }
  addtolocalStorage(arrayTask);
}