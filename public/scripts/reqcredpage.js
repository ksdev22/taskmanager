const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector("#login-register-form");

loginBtn.addEventListener("click", () => {
  loginBtn.remove();
  registerBtn.remove();
  formContainer.classList.add("form-expand");

  const formLoginBtn = document.createElement("button");
  formLoginBtn.className = "btn btn-success mb-3";
  formLoginBtn.textContent = "Login";
  form.insertAdjacentElement("beforeend", formLoginBtn);
  form.action = "/login";
});

registerBtn.addEventListener("click", () => {
  loginBtn.remove();
  registerBtn.remove();
  formContainer.classList.add("form-expand");

  const formRegisterBtn = document.createElement("button");
  formRegisterBtn.className = "btn btn-primary mb-3";
  formRegisterBtn.textContent = "Register";
  form.insertAdjacentElement("beforeend", formRegisterBtn);
  form.action = "/register";
});
