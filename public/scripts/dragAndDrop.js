const moveIcons = document.querySelectorAll(".move-icon");
const taskCards = document.querySelectorAll(".task-card");
const dropZones = document.querySelectorAll(".drop-zone");
const deleteIcon = document.querySelector("#delete-icon");

for (let moveIcon of moveIcons) {
  moveIcon.addEventListener("mouseenter", function (event) {
    moveIcon.parentElement.draggable = true;
  });
  moveIcon.addEventListener("mouseleave", function (event) {
    moveIcon.parentElement.draggable = false;
  });
}

for (let taskCard of taskCards) {
  taskCard.addEventListener("mouseenter", () => {
    taskCard.children[5].style.display = "inline-block";
    setTimeout(() => {
      taskCard.children[5].style.display = "none";
    }, 400);
  });
  taskCard.addEventListener("dragstart", (event) => {
    if (taskCard.draggable == true) {
      taskCard.id = "dragged";
      event.dataTransfer.setData("text", "#dragged");
      setTimeout(() => {
        taskCard.classList.add("invisible");
      }, 0);
      deleteIcon.style.display = "flex";
    }
  });
  taskCard.addEventListener("dragend", (event) => {
    deleteIcon.style.display = "none";
    taskCard.classList.remove("invisible");
  });
}

for (let dropZone of dropZones) {
  dropZone.addEventListener("dragenter", (event) => {
    dropZone.classList.add("drop-zone-hover");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drop-zone-hover");
  });
  dropZone.addEventListener("dragover", (event) => {
    if (event.target.classList.contains("drop-zone")) {
      event.preventDefault();
      dropZone.classList.add("drop-zone-hover");
    }
  });
  dropZone.addEventListener("drop", async (event) => {
    if (event.target.classList.contains("drop-zone")) {
      const id = event.dataTransfer.getData("text");
      if (id === "#dragged") {
        const taskCard = document.querySelector("#dragged");
        dropZone.insertAdjacentElement("beforeend", taskCard);
        taskCard.classList.remove("invisible");
        dropZone.classList.remove("drop-zone-hover");
        taskCard.id = "";
        const status = taskCard.parentElement.id;
        await axios.patch("/taskmanager?drag=true", {
          status,
          id: taskCard.classList[0],
        });
        // window.location.reload();
      }
    }
  });
}

// delete
deleteIcon.addEventListener("dragenter", () => {
  deleteIcon.classList.add("delete-hover");
});
deleteIcon.addEventListener("dragleave", () => {
  deleteIcon.classList.remove("delete-hover");
});
deleteIcon.addEventListener("dragover", async (event) => {
  event.preventDefault();
});
deleteIcon.addEventListener("drop", async (event) => {
  const taskCard = document.querySelector("#dragged");
  await axios.delete("/taskmanager", { data: { id: taskCard.classList[0] } });
  taskCard.style.display = "none";
  // window.location.reload();
});
