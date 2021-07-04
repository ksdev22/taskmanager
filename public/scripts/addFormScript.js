const newTaskButtonContainer = document.querySelector(
  "#new-task-button-container"
);
const newTaskButton = document.querySelector("#new-task-button");
const newTaskFormContainer = document.querySelector("#new-task-form-container");
const newTaskForm = document.querySelector("#new-task-form-container form");
const cancel = document.querySelector("#cancel-new-task");

// border border-5 border-info p-2
newTaskButton.addEventListener("click", (event) => {
  // event.preventDefault();
  newTaskButton.style.display = "none";
  newTaskButtonContainer.classList.remove("mb-3");
  newTaskFormContainer.className = "border border-5 border-info p-2 expand";
  newTaskFormContainer.classList.add("mb-3");
});

// newTaskForm.addEventListener("submit", (event) => {
//   newTaskButton.style.display = "block";
//   newTaskFormContainer.style.display = "none";
// });

cancel.addEventListener("click", (event) => {
  event.preventDefault();
  for (let el of newTaskForm.children) {
    el.value = "";
  }
  newTaskButton.style.display = "block";
  newTaskButtonContainer.classList.add("mb-3");
  newTaskFormContainer.className = "";
});
