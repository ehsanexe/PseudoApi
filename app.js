const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
// app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://Ehsan:1234@pizzacluster.amb7h.mongodb.net/PracticeDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

//cookies

// app.get("/set-cookies", (req, res) => {
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", false, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send("here have a cookie!");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });
