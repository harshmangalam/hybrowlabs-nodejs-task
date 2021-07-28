const { readDataFromFile, addDataToFile } = require("../utils/file.util");
const path = require("path");
const shortid = require("shortid");

// absolute path of employees.txt file
const filePath = path.resolve(path.join(__dirname, "..", "employees.txt"));

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await readDataFromFile(filePath);
    return res.status(200).json({
      status: 200,
      type: "success",
      message: "Fetch all employees",
      data: {
        employees,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    let employee = await readDataFromFile(filePath);

    employee = employee.find((data) => data.id === req.params.id);

    return res.status(200).json({
      status: 200,
      type: "success",
      message: "Fetch employee by ID",
      data: {
        employee,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createNewEmployee = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const content = {
      id: shortid(),
      name,
      email,
      phone,
    };

    const employee = await addDataToFile(filePath, content);
    return res.status(201).json({
      status: 201,
      type: "success",
      message: "Create new employee",
      data: {
        employee,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
};
