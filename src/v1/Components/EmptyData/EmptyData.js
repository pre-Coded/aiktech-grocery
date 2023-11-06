import React from "react"
import { Link } from "react-router-dom"
import "./EmptyData.scss"
import logo from "../../Assets/Images/Group6971.png"
import Button from "../Homepage/Button";

function EmptyData({ text }) {
	return (
		<div>
			<div className="bg-wrapper">
				<img src={logo} alt="logo" />
				<div className="some__txt">
					<center>
						{text}
					</center>
				</div>
				<Link to="/">
					<Button text={'Continue Shopping'} />
				</Link>
			</div>
		</div>
	)
}

export default EmptyData
