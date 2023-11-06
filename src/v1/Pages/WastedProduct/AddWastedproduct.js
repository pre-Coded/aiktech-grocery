import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import { stock_dropdown, wasted, productSearch } from "../../../api/request.api"
// import ModalOpener from "../../../Pages/"
// import ".StockAdd/AddStock.css"
import './AddWastedproduct.scss'
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
			.post(wasted, { data: items }, {
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
		<div className="wasted-product-wrapper">
			<h3 className="title">ADD WASTED PRODUCT</h3>
			<form className="wasted-table-wrapper">
				<div className="item-wrapper">
					<p>Added By</p>
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
				<div className="item-wrapper">
					<p>Product</p>
					<input type="text" name="" id="" />
				</div>
				<div className="item-wrapper">
					<p>Qty.</p>
					<input type="text" name="" id="" />
				</div>
				<div className="item-wrapper">
					<p>Units</p>
					<input type="text" name="" id="" />
				</div>
				<div className="item-wrapper">
					<p>Reason</p>
					<input type="text" name="" id="" />
				</div>
				<div className="item-wrapper">
					<p>Upload Image</p>
					<input type="text" name="" id="" />
				</div>
			</form>
		</div>
	)
}
