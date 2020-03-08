// remove dependency on this

const BBExt = {
  areaGroup: ['1-1', '1-2', '1-3']
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

export const Colors = {
  officer: 'blueviolet',
  cfm: 'chartreuse',
  returnee: 'pink',
  default: 'azure'
}

export const CFO = {
  B: 'Buklod',
  K: 'Kadiwa',
  BH: 'Binhi'
}

// Refactor to be area-group flexible
export const ListAreaGroups = loading => {
  if (loading) {
    return []
  }
  return Manhattan.areaGroup
    .map(ag => `MAN ${ag}`)
    .concat(BBExt.areaGroup.map(ag => `BBx ${ag}`))
}
