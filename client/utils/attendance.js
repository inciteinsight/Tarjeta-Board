import axios from 'axios'

export const AddHasAttendedField = member => {
  member.hasAttended = false
  return member
}

export const UpdateMemberInSession = async memberId => {
  const {data} = await axios.get('/api/ws')
  await axios.put(
    `/api/ws`,
    data.map(m => {
      if (m.Id === memberId) {
        m.hasAttended = !m.hasAttended
      }
      return m
    })
  )
}
