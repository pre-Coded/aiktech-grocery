import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import { stock_dropdown, wasted, productSearch } from "../../api/request.api"
import ModalOpener from "../StockAdd/ModalOpener"
import "../StockAdd/AddStock.css"

export default function AddWastedProduct() {
	const [items, setItems] = useState([])
	const [addedBy, setAddedBy] = useState([])
	const [stockUnit, setStockUnits] = useState([])
	const [stockProducts, setStockProducts] = useState([])

	const [item, setItem] = useState({
		added_by: "",
		stock_quantity: "0",
		stock_unit: "",
		stock_product: "",
		product: null,
		reason: "",
		wasted_product_image: null,
	})
	const [redirect, setRedirect] = useState(false)
	const [searchProduct, setSearchProduct] = useState("")
	const [productSuggestions, setProductSuggestions] = useState([])
	const [value, setValue] = useState("")
	const [show] = useState(true)
	const getStock = async () => {
		const { data } = await axios.get(stock_dropdown)
		setAddedBy(data.added_by)
		setStockUnits(data.stock_unit)
		setStockProducts(data.stock_products)
	}
	const debounce = function (getUser, d) {
		let timer
		return function () {
			let context = this
			// args = arguments;
			clearTimeout(timer)
			timer = setTimeout(() => {
				getUser.apply(context, arguments)
			}, d)
		}
	}

	const getProduct = (e) => {
		let q = e.target.value
		if (q) {
			axios({
				url: `${productSearch}${q}/`,
				method: "GET",
			})
				.then((res) => {
					if (res.data.status === 404) {
						console.log("Not Found")
						setProductSuggestions([])
					} else {
						setProductSuggestions(res.data.search)
					}
				})
				.catch((err) => {
					console.log("Network Error", err)
				})
		}
	}

	useEffect(() => {
		getStock()
	}, [])

	const onProductSuggestHandler = (product_name, id, description) => {
		setItem({
			...item,
			stock_product: id,
			product: `${product_name}(${description})`,
		})
		setProductSuggestions([])
	}
	const AddedOption = addedBy.map(({ id, username, phone_number }) => (
		<option value={id} key={id}>
			{username}({phone_number})
		</option>
	))
	const StockUnitOption = stockUnit.map(({ id, unit }) => (
		<option value={id} key={id}>
			{unit}
		</option>
	))

	const [showmodal, setShowModal] = useState(false)

	const unitHandler = () => {
		setShowModal(true)
		setValue("units")
	}
	const productHandler = () => {
		setShowModal(true)
		setValue("products")
	}


	const handleItem = (e) => {

		setItem({ ...item, [e.target.name]: e.target.value })

		if (e.target.name === "stock_product") {
			setSearchProduct(e.target.value)
			const getPro = debounce(getProduct, 400)
			getPro(e) //Getting product

			if (searchProduct.length < 1) {
				setProductSuggestions([])
			}
		}

		if (e.target.name === "stock_quantity") {
			setItem({
				...item,
				[e.target.name]: e.target.value
					.toString()
					.split(".")
					.map((el, i) => (i ? el.split("").slice(0, 2).join("") : el))
					.join("."),
			})
		}
		if (e.target.name === "wasted_product_image") {
			var fReader = new FileReader()
			fReader.readAsDataURL(e.target.files[0])
			fReader.onloadend = function (event) {
				setItem({ ...item, [e.target.name]: event.target.result })
			}
		}
		
	}

	const keyDownHandler = (e) => {
		var key = e.keyCode || e.charCode
		if (key === 8) {
			setItem({
				...item,
				product: "",
			})
			setSearchProduct(e.target.value)
		}
	}

	const handleadditem = (e) => {

		let data = {
			added_by: item.added_by,
			stock_quantity: item.stock_quantity,
			stock_unit: item.stock_unit,
			stock_product: item.stock_product,
			product: item.product,
			reason: item.reason,
			wasted_product_image: item.wasted_product_image,
		}
		if (
			item.added_by !== "" &&
			item.stock_quantity !== "" &&
			item.stock_unit !== "" &&
			item.stock_product !== "" &&
			item.product !== "" &&
			item.reason !== "" &&
			item.wasted_product_image
		) {
			setItems([...items, data])
			setItem({
				added_by: "",
				stock_quantity: "",
				stock_unit: "",
				stock_product: "",
				product: "",
				reason: "",
				wasted_product_image: "",
			})
			setSearchProduct("")
		} else {
			return alert("Please fill required fields correctly!")
		}
	}

	const handleRemoveItem = (event) => {
		const temp = [...items]
		temp.splice(event.target.getAttribute("data-index"), 1)
		setItems(temp)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		document.getElementById("loader-up").classList.toggle("loader-show")
		if (
			item.added_by !== "" &&
			item.stock_quantity !== "" &&
			item.stock_unit !== "" &&
			item.stock_product !== "" &&
			item.product !== "" &&
			item.reason !== "" && 
			item.wasted_product_image !== ""
		) {
			let data = {
				added_by: item.added_by,
				stock_quantity: item.stock_quantity,
				stock_unit: item.stock_unit,
				stock_product: item.stock_product,
				product: item.product,
				reason: item.reason,
				wasted_product_image: item.wasted_product_image,
			}
			items.push(data)
		}
		
		
		axios
			.post(wasted, {data: items}, {
			})
			.then((res) => {
				
				if (res.data.status === 201) {
					document.getElementById("form").reset()
					setTimeout(() => {
						document.getElementById("loader-up").classList.toggle("loader-show")
						setRedirect(true)
					}, 2000)
				} else if (res.data.status === 400) {
					setTimeout(() => {
						document.getElementById("loader-up").classList.toggle("loader-show")
					}, 2000)
					alert("Please fill order correctly!")
				}
			})
			.catch((err) => {
				setTimeout(() => {
					document.getElementById("loader-up").classList.toggle("loader-show")
				}, 2000)
				console.log("NETWORK ERROR!")
				alert("Network Error")
			})
	}

	if (redirect) {
		return <Redirect to="/order-placed" />
	}

	return (
		<>
			<form
				className="forms"
				onSubmit={handleSubmit}
				id="form"
				autoComplete="new-password"
			>
				{/* Heading for items */}
				<h3 className="my-4">Add Wasted Products:</h3>

				{/* Heading for items */}

				{/* Top Lable for inputs  */}
				<div className="row">
					<div className="col-lg-2 col-md-2 col-sm-2 col-1">
						<div className="label mt-3 py-3 text-center ">
							<label htmlFor="added_by">Added By</label>
						</div>
					</div>
					<div className="col-lg-2 col-md-2 col-sm-2 col-2">
						<div className="label mt-3 py-3 text-center">
							<label htmlFor="stock_product">Product</label>
						</div>
					</div>
					<div className="col-lg-2 col-md-2 col-sm-2 col-2">
						<div className="label mt-3 py-3 text-center">
							<label htmlFor="stock_quantity">Qty.</label>
						</div>
					</div>
					<div className="col-lg-1 col-md-1 col-sm-1 col-1">
						<div className="label mt-3 py-3 text-center">
							<label htmlFor="stock_unit">Units</label>
						</div>
					</div>
					<div className="col-lg-2 col-md-2 col-sm-2 col-3">
						<div className="label mt-3 py-3 text-center">
							<label htmlFor="reason">Reason</label>
						</div>
					</div>

					<div className="col-lg-2 col-md-2 col-sm-2 col-2">
						<div className="label mt-3 py-3 text-center">
							<label htmlFor="procurement_price_per_product">
								Upload Image
							</label>
						</div>
					</div>
				</div>
				{/* Top Label for inputs  */}

				{/* Border */}
				<div className="b-bottom w-100 my-1"></div>
				{/* Border */}

				{/* punched order */}
				{items.map((item, idx) => (
					<div className="row" key={idx}>
						<div className="col-lg-2 col-md-2 col-sm-2 col-1">
							<div className="label mt-3 py-3 text-center">
								<label htmlFor="added_by">
									{addedBy.map((i) =>
										i.id.toString() === item.added_by ? i.username : null
									)}
								</label>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 col-2">
							<div className="label mt-3 py-3 text-center">
								<label htmlFor="Product">
									{stockProducts.map(({ product_name, id, description }) =>
										id === item.stock_product
											? `${product_name} ${
													description ? `(${description})` : ""
											  }`
											: null
									)}
								</label>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 col-1">
							<div className="label mt-3 py-3 text-center">
								<label htmlFor="Quantity">{item.stock_quantity}</label>
							</div>
						</div>
						<div className="col-lg-1 col-md-1 col-sm-1 col-1">
							<div className="label mt-3 py-3 text-center">
								<label htmlFor="Units">
									{stockUnit.map((i) =>
										i.id.toString() === item.stock_unit ? i.unit : null
									)}
								</label>
							</div>
						</div>

						<div className="col-lg-2 col-md-2 col-sm-2 col-3">
							<div className="label mt-3 py-3 text-center">
								{/* <label htmlFor="reason">Reason</label> */}
								<div value={item.reason}>{item.reason}</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 col-2">
							<div className="label mt-3 py-3 text-center">
								<img id="output" src={item.wasted_product_image} width="100px" height="100px" alt="" />
							</div>
						</div>
						<div className="col-lg-1 col-md-1 col-sm-1 col-1">
							<div className="label mt-3 py-3 text-center">
								<label htmlFor="product_price">
									<i
										className="fa fa-trash"
										onClick={handleRemoveItem}
										data-index={idx}
									></i>
								</label>
							</div>
						</div>
					</div>
				))}
				<div className="b-bottom w-100 my-1"></div>
				{/* punched order */}

				{/* For Product Input fields */}
				<div className="mt-4 product_input" id="product_input">
					<div className="mx-2 my-1">
						<div className="suggestionContainer ">
							<select
								className="input my-2 btn btn-secondary dropdown-toggle"
								name="added_by"
								id="added_by"
								onChange={handleItem}
								value={item.added_by}
							>
								<option value="" disabled defaultValue>
									Select
								</option>
								{AddedOption}
							</select>
						</div>
					</div>
					<div className="mx-2 my-1" id="product_p">
						<div className="suggestionContainer ">
							<div>
								<div className="suggestionBox">
									<input
										className="input mt-2"
										type="text"
										name="stock_product"
										id="stock_product"
										onChange={handleItem}
										onKeyDown={keyDownHandler}
										onBlur={() => {
											if (productSuggestions.length < 1) {
												setSearchProduct("")
											}
										}}
										value={item.product ? item.product : searchProduct}
										placeholder="Search Product"
										autoComplete="off"
										data-attribute="id"
									/>
								</div>
								<div
									style={{
										border:
											productSuggestions.length > 0 &&
											searchProduct &&
											"1px solid transparent",
										height:
											productSuggestions.length > 0 && searchProduct && "120px",
										overflowY:
											productSuggestions.length > 0 &&
											searchProduct &&
											"scroll",
									}}
									className="suggestion mt-1 btn-secondary"
								>
									{productSuggestions &&
										searchProduct &&
										productSuggestions.map(
											({ title, id, description }, index) => (
												<div
													key={index}
													className="suggestionList"
													onClick={() =>
														onProductSuggestHandler(title, id, description)
													}
												>
													{title} {description ? `(${description})` : null}
												</div>
											)
										)}
								</div>
							</div>
						</div>
					</div>
					<div className="mx-2 my-1">
						<div className="suggestionContainer ">
							<button
								className="btn btn-sm btn-secondary mx-1 my-2 fa fa-plus"
								type="button"
								onClick={productHandler}
							></button>
							{showmodal && (
								<ModalOpener
									value={value}
									setShowModal={setShowModal}
									getStock={getStock}
								/>
							)}
						</div>
					</div>
					<div className="mx-2 my-1" id="quantity">
						<div className="suggestionContainer ">
							<input
								type="number"
								className="input my-2"
								name="stock_quantity"
								id="stock_quantity"
								onChange={handleItem}
								value={item.stock_quantity}
								placeholder="Qty"
							/>
						</div>
					</div>
					<div className="mx-2 my-1">
						<div className="suggestionContainer ">
							<select
								className="input my-2 btn btn-secondary dropdown-toggle"
								name="stock_unit"
								id="stock_unit"
								onChange={handleItem}
								value={item.stock_unit}
							>
								<option value="" disabled defaultValue>
									Select
								</option>
								{StockUnitOption}
							</select>
							<button
								className="btn btn-sm btn-secondary mx-1 my-2 fa fa-plus"
								type="button"
								onClick={unitHandler}
							></button>

							{showmodal && (
								<ModalOpener
									value={value}
									setShowModal={setShowModal}
									getStock={getStock}
								/>
							)}
						</div>
					</div>

					<div className="mx-2 my-1">
						<div className="suggestionContainer ">
							<textarea
								className="input mt-2"
								type="text"
								name="reason"
								id="reason"
								onChange={handleItem}
								value={item.reason}
								placeholder="Type Reason"
								autoComplete="off"
								data-attribute="reason"
							/>
						</div>
					</div>

					{/* Wasted Product  */}
					<div className="mx-2 my-1" id="ppp">
						<div className="suggestionContainer">
							<input
								name="wasted_product_image"
								type="file"
								id="input"
								onChange={handleItem}
								// ref={inputRef}
							/>
						</div>
					</div>
				</div>
				{/* For Product Input fields */}

				<div className="col mt-3">
					{show ? (
						<button
							className="btn btn-outline-light mx-1"
							type="button"
							onClick={handleadditem}
						>
							<i className="fa fa-plus"></i>
						</button>
					) : null}
				</div>

				<div className="mt-5 text-center">
					<button className="btn btn-light px-4 submit_button" type="submit">
						Submit
					</button>
				</div>
			</form>
		</>
	)
}
