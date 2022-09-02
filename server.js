import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEzepeCPI215Pbc5cmrJeoxsi4i1ZxHPI",
  authDomain: "myapp-9cc04.firebaseapp.com",
  projectId: "myapp-9cc04",
  storageBucket: "myapp-9cc04.appspot.com",
  messagingSenderId: "859064704461",
  appId: "1:859064704461:web:4995c8eace1a9c94683884",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

// init
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

// routes
// home route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});
// sign up route
app.get("/signup", (req, res) => {
  res.sendFile("sign-up.html", { root: "public" });
});

app.post("/signup", (req, res) => {
  const { name, email, password, tc } = req.body;
  if (name.length < 3) {
    res.json({ alert: "name must be atleast 3 letters long" });
  } else if (!email.length) {
    res.json({ alert: "Enter your mail" });
  } else if (password.length < 8) {
    res.json({ alert: "Password must be 8 characters long" });
  } else if (!tc) {
    res.json({ alert: "You must agree to the terms and conditions" });
  } else {
    // store the data in database
    const users = collection(db, "users");
    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({ alert: "email already exist" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.seller = false;

            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

// log in route;
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});
app.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email.length || !password.length) {
    res.json({ alert: "Fill all inputs" });
  }
  const users = collection(db, "users");
  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "Email doesn't exist" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "Password is incorrect" });
        }
      });
    }
  });
});

// seller routes
app.get("/seller", (req, res) => {
  res.sendFile("seller.html", { root: "public" });
});
app.post("/seller", (req, res) => {
  let { name, address, about } = req.body;
  if (
    !name.length ||
    !address.length ||
    !about.length
    // number.length < 10 ||
    // !Number(number)
  ) {
    return res.json({ alert: "some informations is/are incorrect" });
  } else {
    const sellers = collection(db, "sellers");
    setDoc(doc(sellers, email), req.body).then((data) => {
      const users = collection(db, "users");
      updateDoc(doc(users, email), {
        seller: true,
      }).then((data) => {
        res.json({ seller: true });
      });
    });
  }
});
// dashboard
app.get("/dashboard", (res, req) => {
  res.sendFile("dashboard.html", { root: "public" });
});

// 404 route
app.get("/404", (req, res) => {
  res.sendFile("404.html", { root: "public" });
});
app.use((req, res) => {
  res.redirect("/404");
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
