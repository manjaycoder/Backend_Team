const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../db.json');
const db = low(adapter);

// Initialize database if empty
db.defaults({ employeesData: [], trainingData: [], employeeAttendances: [] }).write();

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

module.exports = {
  // Employee operations
  getEmployees: () => db.get('employeesData').value(),
  
  getEmployeeById: (id) => db.get('employeesData').find({ id: parseInt(id) }).value(),
  
  createEmployee: (employee) => {
    const lastEmployee = db.get('employeesData').maxBy('id').value();
    const newId = lastEmployee ? lastEmployee.id + 1 : 1;
    
    const newEmployee = {
      ...employee,
      id: newId,
      EmpId: employee.EmpId.toString() // Ensure EmpId is string
    };
    
    db.get('employeesData').push(newEmployee).write();
    return newEmployee;
  },
  
  updateEmployee: (id, updates) => {
    return db.get('employeesData')
      .find({ id: parseInt(id) })
      .assign(updates)
      .write();
  },
  
  deleteEmployee: (id) => {
    return db.get('employeesData')
      .remove({ id: parseInt(id) })
      .write()
      .length > 0;
  },
  
  // Training operations
  getTrainings: () => db.get('trainingData').value(),
  
  getTrainingById: (id) => db.get('trainingData').find({ id: parseInt(id) }).value(),
  
  createTraining: (training) => {
    const lastTraining = db.get('trainingData').maxBy('id').value();
    const newId = lastTraining ? lastTraining.id + 1 : 1;
    
    const newTraining = { ...training, id: newId };
    db.get('trainingData').push(newTraining).write();
    return newTraining;
  },
  
  updateTraining: (id, updates) => {
    return db.get('trainingData')
      .find({ id: parseInt(id) })
      .assign(updates)
      .write();
  },
  
  deleteTraining: (id) => {
    return db.get('trainingData')
      .remove({ id: parseInt(id) })
      .write()
      .length > 0;
  },
  
  // Attendance operations
  getAttendances: () => db.get('employeeAttendances').value(),
  
  getAttendanceById: (id) => {
    const attendance = db.get('employeeAttendances').find({ id: parseInt(id) }).value();
    if (!attendance) return null;
    
    // Calculate attendance summary
    const values = attendance.values || [];
    const summary = {
      O: values.filter(v => Object.values(v)[0] === 'O').length,
      H: values.filter(v => Object.values(v)[0] === 'H').length,
      L: values.filter(v => Object.values(v)[0] === 'L').length,
      BH: values.filter(v => Object.values(v)[0] === 'BH').length
    };
    
    return { ...attendance, summary };
  },
  
  createAttendance: (attendance) => {
    const lastAttendance = db.get('employeeAttendances').maxBy('id').value();
    const newId = lastAttendance ? lastAttendance.id + 1 : 1;
    
    const newAttendance = { ...attendance, id: newId };
    db.get('employeeAttendances').push(newAttendance).write();
    return newAttendance;
  },
  
  updateAttendance: (id, updates) => {
    return db.get('employeeAttendances')
      .find({ id: parseInt(id) })
      .assign(updates)
      .write();
  },
  
  deleteAttendance: (id) => {
    return db.get('employeeAttendances')
      .remove({ id: parseInt(id) })
      .write()
      .length > 0;
  }
};