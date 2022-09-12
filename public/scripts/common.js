const sendData = (path, data) => {
  console.log(data);
  fetch(path, {
    method: "post",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => processData(data));
};
const processData = (data) => {
  loader.style.display = null;
  if (data.alert) {
    showFormError(data.alert);
  } else if (data.name) {
    sessionStorage.user = JSON.stringify(data);
    location.replace("/");
  } else if (data.seller) {
    let user = JSON.parse(sessionStorage.user);
    user.seller = true;
    sessionStorage.user = JSON.stringify(user);
    location.replace("/dashboard");
  }
};

const showFormError = (err) => {
  let error = document.querySelector(".error");
  error.innerHTML = err;
  error.classList.add("show");
};
