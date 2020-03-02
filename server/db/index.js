const db = require('./db')

// register models
require('./models')

// To Do List:

// ReportingPeriod
// - id {year, weekNumber, serviceType}
// - year
// - weekNumber
// - serviceType
// - localId - varchar(50)

// Member
// - id
// - local - varchar(50)
// - Extension - varchar(50)
// - areaGroup - varchar(7)
// - lastName - varchar (40)
// - firstName - varchar (50)
// - cfo - varchar(10)
// - officer - varchar(20)
// - gender - Enum (M, F)
// - isActive

// WorshipServiceAttendance
// - reportingPeriodId
// - memberId
// - dateTime
// - hasAttended

// local
// - id {first letter; two consonance}
// - name
// - extensionOf (reference local Entity; nulll if local)
// - district?

// Functionalities

// - Add / Remove (de-activate) Members Manually
// - Update Current List via Excel
// - Swipe from area to area
// - UX / UI Feedback - Screen; Members

module.exports = db
