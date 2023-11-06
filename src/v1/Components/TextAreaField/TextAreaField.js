import React from "react"
import "./TextAreaField.scss"

function TextAreaField({
	type,
	size = { height: "150px", padding: "15px" },
	value,
	onChange,
	autoFocus,
	placeHolder,
	name,
	className
}) {
	return <textarea type={type} style={size} name={name} value={value} onChange={onChange} autoFocus={autoFocus} placeHolder={placeHolder} className={className} />
}

export default TextAreaField
