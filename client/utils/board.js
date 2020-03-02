export const ListAreaGroups = (loading, config) => {
  if (loading) {
    return []
  }
  const {Manhattan, BBExt} = config.localId
  return Manhattan.areaGroup
    .map(ag => `MAN ${ag}`)
    .concat(BBExt.areaGroup.map(ag => `BB ${ag}`))
}
