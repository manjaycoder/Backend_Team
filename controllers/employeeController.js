const employeeModel = require("../models/employeeModel");


// Helper function to validate employee data
const validateEmployee = (employee) => {
  if (!employee || typeof employee !== 'object') {
    return { valid: false, message: "Invalid employee data format" };
  }
  
  const requiredFields = ['EmpId', 'Name', 'Grade', 'Designation', 'Project', 'Skills', 'Location'];
  for (const field of requiredFields) {
    if (!employee[field]) {
      return { valid: false, message: `${field} is required` };
    }
  }
  
  return { valid: true };
};

// Employee CRUD operations
exports.getAllEmployees = (req, res) => {
  try {
    const employees = employeeModel.getEmployees();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to retrieve employees" });
  }
};

exports.getEmployeeById = (req, res) => {
  try {
    const employee = employeeModel.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Failed to retrieve employee" });
  }
};

exports.createEmployee = (req, res) => {
  try {
    const validation = validateEmployee(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const newEmployee = employeeModel.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Failed to create employee" });
  }
};

exports.updateEmployee = (req, res) => {
  try {
    const validation = validateEmployee(req.body);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const updated = employeeModel.updateEmployee(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Failed to update employee" });
  }
};

exports.deleteEmployee = (req, res) => {
  try {
    const success = employeeModel.deleteEmployee(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
};

// Training CRUD operations
exports.getAllTrainings = (req, res) => {
  try {
    const trainings = employeeModel.getTrainings();
    res.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ message: "Failed to retrieve trainings" });
  }
};

exports.getTrainingById = (req, res) => {
  try {
    const training = employeeModel.getTrainingById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.json(training);
  } catch (error) {
    console.error("Error fetching training:", error);
    res.status(500).json({ message: "Failed to retrieve training" });
  }
};

exports.createTraining = (req, res) => {
  try {
    const requiredFields = ['TrainingTitle', 'TrainingType', 'PlannedDate', 'Name'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const newTraining = employeeModel.createTraining(req.body);
    res.status(201).json(newTraining);
  } catch (error) {
    console.error("Error creating training:", error);
    res.status(500).json({ message: "Failed to create training" });
  }
};

exports.updateTraining = (req, res) => {
  try {
    const updated = employeeModel.updateTraining(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating training:", error);
    res.status(500).json({ message: "Failed to update training" });
  }
};

exports.deleteTraining = (req, res) => {
  try {
    const success = employeeModel.deleteTraining(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.json({ message: "Training deleted successfully" });
  } catch (error) {
    console.error("Error deleting training:", error);
    res.status(500).json({ message: "Failed to delete training" });
  }
};

// Attendance CRUD operations
exports.getAllAttendances = (req, res) => {
  try {
    const attendances = employeeModel.getAttendances();
    res.json(attendances);
  } catch (error) {
    console.error("Error fetching attendances:", error);
    res.status(500).json({ message: "Failed to retrieve attendances" });
  }
};

exports.getAttendanceById = (req, res) => {
  try {
    const attendance = employeeModel.getAttendanceById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json(attendance);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Failed to retrieve attendance" });
  }
};

exports.createAttendance = (req, res) => {
  try {
    if (!req.body.month || !req.body.name || !req.body.values) {
      return res.status(400).json({ message: "Month, name, and values are required" });
    }

    const newAttendance = employeeModel.createAttendance(req.body);
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ message: "Failed to create attendance" });
  }
};

exports.updateAttendance = (req, res) => {
  try {
    const updated = employeeModel.updateAttendance(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Failed to update attendance" });
  }
};

exports.deleteAttendance = (req, res) => {
  try {
    const success = employeeModel.deleteAttendance(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({ message: "Failed to delete attendance" });
  }
};