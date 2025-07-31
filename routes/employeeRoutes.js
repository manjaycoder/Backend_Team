const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee routes
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.createEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Training routes
router.get('/trainings', employeeController.getAllTrainings);
router.get('/trainings/:id', employeeController.getTrainingById);
router.post('/trainings', employeeController.createTraining);
router.put('/trainings/:id', employeeController.updateTraining);
router.delete('/trainings/:id', employeeController.deleteTraining);

// Attendance routes
router.get('/attendances', employeeController.getAllAttendances);
router.get('/attendances/:id', employeeController.getAttendanceById);
router.post('/attendances', employeeController.createAttendance);
router.put('/attendances/:id', employeeController.updateAttendance);
router.delete('/attendances/:id', employeeController.deleteAttendance);

module.exports = router;