function redirectTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("the-login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("login-username");

    const cookieData = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="));

    if (cookieData) {
      const storedUserData = cookieData.substring("userData=".length);

      try {
        const userData = JSON.parse(decodeURIComponent(storedUserData));
        const storedUsername = userData.username;

        const enteredUsername = usernameInput.value.trim();

        if (enteredUsername === storedUsername) {
          redirectToIndex("profile.html");
        } else {
          displayError(usernameInput, "Invalid username or password");
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        displayError(usernameInput, "Error parsing user data");
      }
    } else {
      displayError(usernameInput, "No registered user found");
    }

    if (usernameInput.value.trim() === "") {
      event.preventDefault();
      displayError(usernameInput, "Username cannot be empty");
      setTimeout(() => removeError(usernameInput), 3000);
    }

    if (passwordInput.value.trim() === "") {
      event.preventDefault();
      displayError(passwordInput, "Password cannot be empty");
      setTimeout(() => removeError(passwordInput), 3000);
    }
  });

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

  function reveal() {
    const eye = document.querySelector(".fa-eye-slash");
    const passwordInput = document.getElementById("login-password");

    eye.addEventListener("click", () => {
      if (eye.classList[1] === "fa-eye-slash") {
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
        passwordInput.type = "text";
      } else {
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
        passwordInput.type = "password";
      }
    });
  }

  reveal();

  function redirectToIndex(page) {
    window.location.href = page;
  }
});
