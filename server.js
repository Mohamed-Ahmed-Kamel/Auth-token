require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;
require("./db.js");

const { adminAuth, userAuth } = require("./middleware/auht.js");

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./Auth/Route.js"));

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/user", userAuth, (req, res) => res.send("User Route"));

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", {maxAge: "1"})
  res.redirect("/")
});

app.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`);
});

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
