window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user === null) {
    location.replace("/login");
  } else if (user.seller) {
    location.replace("/dashboard");
  }
};

let loader = document.querySelector(".loader");
let applyBtn = document.querySelector(".apply-btn");

applyBtn.addEventListener("click", () => {
  const businessName = document.querySelector("#name").value;
  const about = document.querySelector("#about").value;
  const address = document.querySelector("#address").value;

  if (!businessName.length || !address.length || !about.length) {
    showFormError("some informations is/are incorrect");
  } else {
    (loader.style.display = "block"),
      sendData("/seller", {
        name: businessName,
        address: address,
        about: about,
        email: JSON.parse(sessionStorage.user).email,
      });
  }
});
