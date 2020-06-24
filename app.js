const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const exphbs = require("express-handlebars");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Routes
app.use('/',require('./routes/index'))

// static folder
app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
