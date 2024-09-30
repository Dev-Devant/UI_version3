document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleAuth = document.getElementById("toggleAuth");
  const formTitle = document.getElementById("formTitle");
  const forgotPass = document.getElementById("forgotPass");

  function showLoginForm() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    formTitle.textContent = "Login to Artek";
    toggleAuth.textContent = "Need an account? Sign up";
    forgotPass.style.display = "inline";
  }

  function showSignupForm() {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    formTitle.textContent = "Create an Account";
    toggleAuth.textContent = "Already have an account? Log in";
    forgotPass.style.display = "none";
  }

  toggleAuth.addEventListener("click", function (e) {
    e.preventDefault();
    if (loginForm.style.display === "none") {
      showLoginForm();
    } else {
      showSignupForm();
    }
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    login(email, password);

  });

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const newsletter = document.getElementById("newsletter").checked;
    const terms = document.getElementById("terms").checked;

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!terms) {
      alert("Please agree to the Terms of Use");
      return;
    }
    register(username, password, newsletter);
  });

  forgotPass.addEventListener("click", function (e) {
    e.preventDefault();
    // Add forgot password logic here
    console.log("Forgot password clicked");
  });

  showLoginForm();
});
