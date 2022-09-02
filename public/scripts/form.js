window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (user.email) {
      location.replace("/");
    }
  }
};

let formBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");

formBtn.addEventListener("click", () => {
  let fullname = document.querySelector("#name") || null;
  let Email = document.querySelector("#email");
  let Password = document.querySelector("#password");
  let tac = document.querySelector("#tc") || null;

  if (fullname != null) {
    if (fullname.value.length < 3) {
      showFormError("name must be atleast 3 letters long");
    } else if (!Email.value.length) {
      showFormError("Enter your mail");
    } else if (Password.value.length < 8) {
      showFormError("Password must be 8 characters long");
    } else if (!tac) {
      showFormError("You must agree to the terms and conditions");
    } else {
      // submit form
      loader.style.display = "block";
      sendData("/signup", {
        name: fullname.value,
        email: Email.value,
        password: Password.value,
        tc: tac.checked,
      });
    }
  } else {
    if (!Email.value.length || !Password.value.length) {
      showFormError("fill all the inputs");
    } else {
      loader.style.display = "block";
      sendData("/login", {
        email: Email.value,
        password: Password.value,
      });
    }
  }
});
