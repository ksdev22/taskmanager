const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const formContainer = document.querySelector(".form-container");
const form = document.querySelector("#login-register-form");
const cancelBtn = document.querySelector("#cancel-register-login");

loginBtn.addEventListener("click", () => {
  loginBtn.remove();
  registerBtn.remove();
  formContainer.classList.add("form-expand");

  const formLoginBtn = document.createElement("button");
  formLoginBtn.className = "btn btn-success w-25";
  formLoginBtn.textContent = "Login";
  formLoginBtn.type = "submit";
  cancelBtn.insertAdjacentElement("beforebegin", formLoginBtn);
  form.action = "/login";
});

registerBtn.addEventListener("click", () => {
  loginBtn.remove();
  registerBtn.remove();
  formContainer.classList.add("form-expand");

  const formRegisterBtn = document.createElement("button");
  formRegisterBtn.disabled = true;
  formRegisterBtn.type = "submit";
  formRegisterBtn.id = "form-register-btn";

  const rePasswordContainer = document.createElement("div");
  const rePassword = document.createElement("input");
  const rePasswordLabel = document.createElement("label");
  rePasswordLabel.htmlFor = "re-password";
  rePassword.type = "password";
  rePasswordLabel.textContent = "Re-enter Password";
  rePasswordLabel.className = "form-label";
  rePassword.className = "form-control";
  rePassword.id = "re-password";
  rePassword.required = true;
  rePasswordContainer.className = "mb-3";
  rePasswordContainer.append(rePasswordLabel, rePassword);

  formRegisterBtn.className = "btn btn-primary w-25";
  formRegisterBtn.textContent = "Register";

  cancelBtn.parentElement.insertAdjacentElement(
    "beforebegin",
    rePasswordContainer
  );
  cancelBtn.insertAdjacentElement("beforebegin", formRegisterBtn);
  form.action = "/register";
});

cancelBtn.addEventListener("click", () => {
  window.location.reload();
});

form.addEventListener("input", () => {
  if (form.childElementCount === 4) {
    const pw = form.children[1].children[1];
    const repw = form.children[2].children[1];
    if (repw.value === pw.value && pw.value.length >= 8) {
      repw.classList.add("password-input-border-success");
      pw.classList.add("password-input-border-success");
      repw.classList.remove("password-input-border-incorrect");
      pw.classList.remove("password-input-border-incorrect");
      const regBtn = document.querySelector("#form-register-btn");
      regBtn.disabled = false;
    } else {
      repw.classList.remove("password-input-border-success");
      pw.classList.remove("password-input-border-success");
      repw.classList.add("password-input-border-incorrect");
      pw.classList.add("password-input-border-incorrect");
      const regBtn = document.querySelector("#form-register-btn");
      regBtn.disabled = true;
    }
  }
});
