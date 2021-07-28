const express = require("express");
const employeeRoutes = require("./routes/employee.route");

// create new instance of express server 
const app = express();

// parse incomming body 
app.use(express.json())

// employee middleware
app.use("/employees", employeeRoutes);

// anything other than employee route will show not found error

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    type: "error",
    message: "Api endpoint doesn`t found",
    data: null,
  };
  next(error);
});


// global error handler middleware
app.use((err, req, res, next) => {
  console.log(err);
  const type = err.type;
  const status = err.status || 500;
  const message = err.message || "Server error";
  const data = err.data || null;
  res.status(status).json({
    status,
    type,
    message,
    data,
  });
});

module.exports = app;
