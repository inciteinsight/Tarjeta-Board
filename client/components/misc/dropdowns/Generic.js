import React from 'react'

const GenericDropdown = ({
  property,
  defaultProperty,
  options,
  handleChange,
  labels
}) => {
  return (
    <select
      className="col-8 form-control"
      required
      name={property}
      onChange={handleChange}
    >
      {options.map((o, i) => (
        <option key={o} selected={o === defaultProperty} value={o}>
          {labels ? labels[i] : String(o)}
        </option>
      ))}
    </select>
  )
}

export default GenericDropdown
