export const ListAreaGroups = (loading, config) => {
  if (loading) {
    return []
  }
  const {Manhattan, BBExt} = config.Local
  return Manhattan.AreaGroup.map(ag => `MAN ${ag}`).concat(
    BBExt.AreaGroup.map(ag => `BB ${ag}`)
  )
}
