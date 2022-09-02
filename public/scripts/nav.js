const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (scrollY >= 180) {
    navbar.classList.add("bg");
  } else {
    navbar.classList.remove("bg");
  }
});

const createNavbar = () => {
  let navbar = document.querySelector(".navbar");

  navbar.innerHTML += `   <ul class="links-container">
        <li class="link-item"><a href="#" class="link active">HOME</a></li>
        <li class="link-item">
          <a href="product.html" class="link">PRODUCT</a>
        </li>
        <li class="link-item"><a href="#" class="link">ABOUT</a></li>
        <li class="link-item"><a href="#" class="link">CONTACT</a></li>
      </ul>
      <div class="user-interactions">
        <div class="cart">
          <img src="img/cart.png" class="cart-icon" alt="" />
          <span class="cart-item-count">00</span>
        </div>
        <div class="user">
          <img src="img/user.png" class="user-icon" alt="" />
          <div class="user-icon-popup">
            <p>login to your account</p>
            <a>login</a>
          </div>
        </div>
      </div>
      `;
};
createNavbar();

// user popup
let userIcon = document.querySelector(".user-icon");
let userPopupIcon = document.querySelector(".user-icon-popup");

userIcon.addEventListener("click", () =>
  userPopupIcon.classList.toggle("active")
);

let text = userPopupIcon.querySelector("p");
let actionBtn = userPopupIcon.querySelector("a");
let user = JSON.parse(sessionStorage.user || null);

if (user != null) {
  text.innerHTML = `log in as, ${user.name}`;
  actionBtn.innerHTML = "Log out";
  actionBtn.addEventListener("click", () => logout());
} else {
  text.innerHTML = "login to your account";
  actionBtn.innerHTML = "Log in";
  actionBtn.addEventListener("click", () => (location.href = "/login"));
}

const logout = () => {
  sessionStorage.clear();
  location.reload();
};
