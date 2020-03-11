import axios from 'axios'
import moment from 'moment'

export const AddHasAttendedField = member => {
  member.hasAttended = false
  return member
}

export const UpdateMemberInSession = async memberId => {
  const {data} = await axios.get('/api/cache')
  await axios.put(
    `/api/cache/members`,
    data.members.map(m => {
      if (m.id === memberId) {
        m.hasAttended = !m.hasAttended
        // m.code = "future code change"
      }
      return m
    })
  )
}

export const DAYS_ARRAY = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

// export const GetTimeZoneAccounted = (givenTime, givenDate) => {
//   const time = givenTime ? givenTime : '00:00:00'
//   const date = givenDate ? givenDate : '2020-01-01'
//   return new Date(
//     new Date(`${date}T${time}Z`).getTime() +
//       new Date(Date.now()).getTimezoneOffset() * 60000 +
//       (moment().isDST() ? 1000 * 60 * 60 : 0)
//   )
// }

export const GetWeekNumber = givenDate => {
  const given = new Date(givenDate)
  const start = new Date(given.getFullYear(), 0, 0)
  const startDayOfWeek = start.getDay() === 0 ? 6 : start.getDay() - 1
  const diff =
    given -
    start +
    (start.getTimezoneOffset() - given.getTimezoneOffset()) * 60 * 1000
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  const week = Math.floor((day + startDayOfWeek) / 7 + 1)
  return week
}

// Under Construction
export const GetDefaultService = local => {
  const {schedules} = local
  const today = new Date(Date.now()).getDay()
  const service = schedules.find(s => new Date(s.day).getDay() >= today)
  console.log(service)
  return service
}

export const GetServiceFromScheduleDay = (serviceTime, serviceDay) => {
  const now = new Date(
    new Date(Date.now()).getTime() - new Date().getTimezoneOffset() * 60000
  )
  const nowDay = now.getDay() === 0 ? 6 : now.getDay() - 1
  let serviceDate = new Date(
    now.setDate(now.getDate() - nowDay + DAYS_ARRAY.indexOf(serviceDay))
  ).toISOString()
  return `${serviceDate.slice(0, 10)}T${serviceTime}`
}
