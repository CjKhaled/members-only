// necessary modules
require("dotenv").config();
const session = require("express-session");
const passport = require("./auth/passport");
const errorHandler = require("./errors/errorHandlers");

// app setup
const express = require("express");
const path = require("path");
const app = express();

// templating
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routers
const indexRouter = require("./routes/indexRouter");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "psh", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use("/", indexRouter);

// app.use(errorHandler)

app.listen(3000, () => console.log(`server listening on port 3000!`));
