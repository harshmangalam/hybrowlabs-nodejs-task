const { Router } = require("express");
const {
  createNewEmployee,
  getEmployeeById,
  getAllEmployees,
} = require("../controllers/employee.controller");

const router = Router();

router.post("/", createNewEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);

module.exports = router;
