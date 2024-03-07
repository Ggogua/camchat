document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.querySelector(".form");

  function redirectToIndex() {
    window.location.replace("../index.html");
  }

  signupForm.addEventListener("submit", function (event) {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const form = document.querySelector(".form");

    if (usernameInput.value.trim() === "") {
      event.preventDefault();
      displayError(usernameInput, "Username cannot be empty");
      setTimeout(() => removeError(usernameInput), 3000);
    }

    if (emailInput.value.trim() === "") {
      event.preventDefault();
      displayError(emailInput, "Email cannot be empty");
      setTimeout(() => removeError(emailInput), 3000);
    }

    const passwordValue = passwordInput.value.trim();
    if (passwordValue === "") {
      event.preventDefault();
      displayError(passwordInput, "Password cannot be empty");
      setTimeout(() => removeError(passwordInput), 3000);
    } else if (!isValidPassword(passwordValue)) {
      event.preventDefault();
      displayError(
        passwordInput,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      setTimeout(() => removeError(passwordInput), 3000);
    } else {
      event.preventDefault();
      saveUserData(usernameInput.value, emailInput.value);
      redirectToIndex("login.html");
    }
  });

  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  function displayError(inputField, errorMessage) {
    const existingError = inputField.nextElementSibling;

    if (existingError && existingError.className === "error-message") {
      existingError.textContent = errorMessage;
    } else {
      const errorElement = document.createElement("p");
      errorElement.className = "error-message";
      errorElement.textContent = errorMessage;

      inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);
    }
  }

  function removeError(inputField) {
    const existingError = inputField.nextElementSibling;

    if (existingError && existingError.className === "error-message") {
      existingError.remove();
    }
  }

  function revealPassword() {
    const eyeIcon = document.getElementById("eye-icon");
    const passwordInput = document.getElementById("password");

    eyeIcon.addEventListener("click", function () {
      if (eyeIcon.classList.contains("fa-eye-slash")) {
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
        passwordInput.type = "text";
      } else {
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
        passwordInput.type = "password";
      }
    });
  }

  function saveUserData(username, email) {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  }

  function redirectToIndex(page) {
    window.location.href = page;
  }

  revealPassword();

  function saveUserData(username, email, password) {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    const userDataJSON = JSON.stringify(userData);
    document.cookie = `userData=${encodeURIComponent(
      userDataJSON
    )}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
  }
});
