const db = require('./db')

// register models
require('./models')

// To Do List:

// WorshipService
// - Year
// - WeekNumber
// - ServiceType
// - Local - varchar(50)
// - Extension - varchar(50)

// Member
// - ID
// - Local - varchar(50)
// - Extension - varchar(50)
// - AreaGroup - varchar(7)
// - LastName - varchar (40)
// - FirstName - varchar (50)
// - CFO - varchar(10)
// - Officer - varchar(20)
// - Gender - Enum (M, F)

// Local
// - District?

module.exports = db
