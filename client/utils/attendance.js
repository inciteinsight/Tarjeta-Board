import axios from 'axios'

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
      }
      return m
    })
  )
}
