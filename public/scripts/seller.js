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
  const businessName = document.querySelector("#name");
  const about = document.querySelector("#about");
  const address = document.querySelector("#address");
  // const number = document.querySelector("#number");

  if (
    !businessName.length ||
    !address.length ||
    !about.length
    // number.length < 10 ||
    // !Number(number)
  ) {
    showFormError("some informations is/are incorrect");
  } else {
    (loader.style.display = "block"),
      sendData("/seller", {
        name: businessName,
        address: address,
        about: about,
        // number: number,
        email: JSON.parse(sessionStorage.user).email,
      });
  }
});
