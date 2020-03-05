const BBExt = {
  areaGroup: ['1-1', '1-2']
}

const Manhattan = {
  areaGroup: [
    '1-1',
    '1-2',
    '1-3',
    '1-4',
    '1-5',
    '1-6',
    '2-1',
    '2-2',
    '2-3',
    '2-4'
  ]
}

export const CFO = {
  B: 'Buklod',
  K: 'Kadiwa',
  BH: 'Binhi'
}

export const ListAreaGroups = loading => {
  if (loading) {
    return []
  }
  return Manhattan.areaGroup
    .map(ag => `MAN ${ag}`)
    .concat(BBExt.areaGroup.map(ag => `BB ${ag}`))
}
