import React from 'react'

const GenericDropdown = ({member, property, options, handleChange}) => {
  return (
    <select
      className="col-8 form-control"
      required
      name={property}
      onChange={handleChange}
    >
      {options.map(o => (
        <option key={o} selected={o === member[property]} value={o}>
          {String(o)}
        </option>
      ))}
    </select>
  )
}

export default GenericDropdown
