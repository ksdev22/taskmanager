const editButtons = document.querySelectorAll(".edit-icon");
for (let editButton of editButtons) {
  editButton.addEventListener("click", (event) => {
    const editForm = editButton.parentElement.children[4];
    if (!editForm.classList.contains("expand")) {
      editForm.classList.add("expand");
      const editFormSubmitButton =
        editButton.parentElement.children[4].children[0].children[2];
      editFormSubmitButton.style.display = "inline-block";
      editForm.parentElement.children[2].style.display = "none";
      editForm.parentElement.children[3].style.display = "none";
      editButton.textContent = "Cancel";
    } else {
      editForm.classList.remove("expand");
      const editFormSubmitButton =
        editButton.parentElement.children[4].children[0].children[2];
      setTimeout(() => {
        editFormSubmitButton.style.display = "none";
        editForm.parentElement.children[2].style.display = "block";
        editForm.parentElement.children[3].style.display = "block";
        editButton.textContent = "Edit";
      }, 500);
    }
  });
}
