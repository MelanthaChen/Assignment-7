$(document).ready(function () {
  // Track validation status of each field
  let isFormValid = {
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  };

  function validateForm() {
    $("#login-btn").prop(
      "disabled",
      !(
        isFormValid.email &&
        isFormValid.username &&
        isFormValid.password &&
        isFormValid.confirmPassword
      )
    );
  }

  // Email Validation on Blur
  $("#email").on("blur", function () {
    const email = $(this).val();
    if (!email.endsWith("@northeastern.edu")) {
      $("#email-error").text("Email must be a Northeastern ID.");
      isFormValid.email = false;
    } else {
      $("#email-error").text("");
      isFormValid.email = true;
    }
    validateForm();
  });

  // Username Validation on Blur
  $("#username").on("blur", function () {
    const username = $(this).val();
    if (username.length < 3 || username.length > 15) {
      $("#username-error").text("Username must be 3-15 characters long.");
      isFormValid.username = false;
    } else {
      $("#username-error").text("");
      isFormValid.username = true;
    }
    validateForm();
  });

  // Password Validation on Blur
  $("#password").on("blur", function () {
    const password = $(this).val();
    if (password.length < 8) {
      $("#password-error").text("Password must be at least 8 characters.");
      isFormValid.password = false;
    } else {
      $("#password-error").text("");
      isFormValid.password = true;
    }
    validateForm();
  });

  // Confirm Password Validation on Blur
  $("#confirm-password").on("blur", function () {
    const confirmPassword = $(this).val();
    const password = $("#password").val();
    if (confirmPassword !== password) {
      $("#confirm-password-error").text("Passwords do not match.");
      isFormValid.confirmPassword = false;
    } else {
      $("#confirm-password-error").text("");
      isFormValid.confirmPassword = true;
    }
    validateForm();
  });

  // Login Button Click
  $("#login-btn").click(function (event) {
    event.preventDefault();
    console.log("Login button clicked");
    sessionStorage.setItem("username", $("#username").val());
    window.location.href = "calculator.html";
  });

  // Calculator Functionality
  window.calculate = (operation) => {
    console.log(`Calculate ${operation} button clicked`);
    let num1 = parseFloat($("#num1").val());
    let num2 = parseFloat($("#num2").val());
    let result;

    if (isNaN(num1) || isNaN(num2)) {
      $("#num1-error").text("Enter valid numbers.");
      $("#num2-error").text("Enter valid numbers.");
      return;
    } else {
      $("#num1-error").text("");
      $("#num2-error").text("");
    }

    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        break;
    }

    $("#result").text(result);
  };

  // Stopwatch Functionality
  let interval;
  let seconds = 0;

  function updateDisplay() {
    let hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    let mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    let secs = String(seconds % 60).padStart(2, "0");
    $("#time-display").text(`${hrs}:${mins}:${secs}`);
  }

  window.startTimer = async () => {
    if (!interval) {
      interval = setInterval(() => {
        seconds++;
        updateDisplay();
      }, 1000);
    }
  };

  window.stopTimer = () => {
    clearInterval(interval);
    interval = null;
  };

  window.resetTimer = () => {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    updateDisplay();
  };
});
