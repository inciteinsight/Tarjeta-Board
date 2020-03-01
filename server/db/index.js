const db = require('./db')

// register models
require('./models')

// To Do List:

// ReportingPeriod
// - Id {year, weekNumber, serviceType}
// - year
// - weekNumber
// - serviceType
// - localId - varchar(50)

// Member
// - Id
// - Local - varchar(50)
// - Extension - varchar(50)
// - AreaGroup - varchar(7)
// - LastName - varchar (40)
// - FirstName - varchar (50)
// - CFO - varchar(10)
// - Officer - varchar(20)
// - Gender - Enum (M, F)
// - isActive

// WorshipServiceAttendance
// - reportingPeriodId
// - memberId
// - dateTime
// - hasAttended

// Local
// - id {first letter; two consonance}
// - name
// - extensionOf (reference Local Entity; nulll if Local)
// - district?

// Functionalities

// - Add / Remove (de-activate) Members Manually
// - Update Current List via Excel
// - Swipe from area to area
// - UX / UI Feedback - Screen; Members

module.exports = db
