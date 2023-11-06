import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "./PunchForm.scss";
import { authAPI, cartAPI, productAPI } from "../../Api";
import get from "lodash/get";
import { toast } from "react-toastify";
import { Dropdown, InputField, Modal } from "../../Components";
import deleteIcon from "../../Assets/Icons/delete.svg";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../Assets/Icons/edit.svg";
import "../AddStock/AddStock.scss";
import { isNewLine, removeNewLine } from "../../Utils/general-utils";
import Loader from "../../Components/Loader";
import fuzzysort from 'fuzzysort'

const mapStateToProps = ({ inventory, productsearch }) => ({
  inventory,
  productsearch
});

export default function PunchForm() {
  const { id } = useParams();
  const {
    inventory: { list: inventoryList },
    productsearch: {results: productsearch, loading: load, state: api_state},
  } = useSelector(mapStateToProps);

  console.log(load, api_state)
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    phone: "",
    address: "",
    delivery_charge: 10,
    packaging_charge: 0,
    schedule_time: "",
  };

  const [barcode, setBarcode] = useState("");

  const [state, setstate] = useState(initialState);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_description: "",
    product_unit: "",
    product_id: "",
    product_barcode: "",
  });

  const [modal, setmodal] = useState(false);
  const [editting_index, seteditting_index] = useState(null);
  useEffect(() => {
    // {
    //   console.log(items);
    // }
  }, [items]);

  const defaultEdittingValues = (index) => {
    let edit_product_name = document.querySelector(".product_name_on_edit");
    let edit_product_quantity = document.querySelector(
      ".product_quantity_on_edit"
    );
    let edit_product_price = document.querySelector(".product_price_on_edit");
    let edit_product_unit = document.querySelector(".product_unit_on_edit");

    if (edit_product_name) {
      edit_product_name.value = items[index]["product_name"];
    }
    if (edit_product_quantity) {
      edit_product_quantity.value = items[index]["product_quantity"];
    }
    if (edit_product_price) {
      edit_product_price.value = items[index]["product_price"];
    }
    if (edit_product_unit) {
      edit_product_unit.value = items[index]["product_unit"];
    }
    // console.log({
    //   edit_product_name,
    //   edit_product_quantity,
    //   edit_product_price,
    //   edit_product_unit,
    // });
  };

  const fetchProductsearch = async () => {
    dispatch(actionsCreator.FETCH_ALL_PRODUCTS(id));
  };
  // console.table(productsearch)
  useEffect(() => {
      fetchProductsearch()
  }, [])
  useEffect(() => {
    defaultEdittingValues(editting_index);
  }, [modal]);

  const edittor = (index = editting_index) => {
    let temp = {
      product_name: "",
      product_price: "",
      product_quantity: "",
      product_unit: "",
    };
    let edit_product_name = document.querySelector(".product_name_on_edit");
    let edit_product_quantity = document.querySelector(
      ".product_quantity_on_edit"
    );
    let edit_product_price = document.querySelector(".product_price_on_edit");
    let edit_product_unit = document.querySelector(".product_unit_on_edit");
    if (edit_product_name) {
      temp.product_name = edit_product_name.value;
    }
    if (edit_product_quantity) {
      temp.product_quantity = edit_product_quantity.value;
    }
    if (edit_product_price) {
      temp.product_price = edit_product_price.value;
    }
    if (edit_product_unit) {
      temp.product_unit = edit_product_unit.value;
    }
    let tempItems = items;
    if (editting_index !== null) {
      tempItems[editting_index].product_name = temp.product_name;
      tempItems[editting_index].product_unit = temp.product_unit;
      tempItems[editting_index].product_price = temp.product_price;
      tempItems[editting_index].product_quantity = temp.product_quantity;
    }
    // console.log({
    //   edit_product_name,
    //   edit_product_quantity,
    //   edit_product_price,
    //   edit_product_unit,
    //   tempItems,
    // });
    setItems(tempItems);
    setTimeout(() => {
      setmodal(false);
    }, 100);
  };

  useEffect(() => {
    // console.log(editting_index);
    // console.log(items);
  }, [editting_index]);

  const [redirect, setRedirect] = useState(false);
  const [show] = useState(true);
  //  Search User
  const [suggestions, setSuggestions] = useState([]);
  //  Search Product
  const [productSuggestions, setProductSuggestions] = useState([]);

  const [unitValue, setUnitValue] = useState([]);
  const [inventory, setInventory] = useState("");
  const [inventoryname, setInventoryname] = useState("")
  const [showModal, setshowModal] = useState(false) 
  const inventoryfix = () => {
    if (inventoryList && inventoryList.length>0){
      setInventory(null)
      inventoryList.map(i => {
        if(i.value===parseInt(id)){
          setInventory(id)
          setInventoryname(i.label)
          return 0
        }
      })
    }
  }
  useEffect(()=>{
    inventoryfix()
    if (inventory==null){
      // alert("Inventory Not Found!")
      setInventoryname("NOT FOUND")
      setshowModal(true)
      
    }
  }, [inventoryList])
  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await cartAPI.fetchUnits();
      const units = get(res, "data.data", []);
      setUnitValue((preValues) => preValues.concat(units));
    } catch (error) {}
  };

  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
    if (e.target.name === "phone") {
      handleSearchUser(e);
    }
  };

  const handleitem = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    if (e.target.name === "product_name") {
      handleSearchProduct(e);
    }
  };

  const onSuggestHandler = (name, phone, address) => {
    setstate({ ...state, name: name, phone: phone, address: address });
    setSuggestions([]);
  };

  const onProductSuggestHandler = (title, price, description, id, market_price, price_variation) => {
    setItem({
      ...item,
      product_id: id,
      product_name: `${title} ${description ? `(${description})` : ""}`,
      product_price: price_variation && price_variation.length > 0 ? price_variation[0].price: null,
      product_description: description,
    });

    let element2 = document.querySelector(".quantity");
    element2.focus();

    setProductSuggestions([]);
  };

  const getUser = async (e) => {
    let q = e.target.value;
    try {
      const res = await authAPI.searchUser({ query: q });
      const status = get(res, "data.status");
      const resData = get(res, "data.data", []);
      if (status === 404) {
        setSuggestions([]);
      } else {
        setSuggestions(resData);
      }
    } catch (error) {}
  };

  const getProduct = async (e) => {
    try {
      let product_name = e.target.value;
      let barcode = e.target.barcode;
      if (product_name || barcode) {
        // const res = await productAPI.searchProduct({
        //   name: product_name,
        //   barcode: barcode,
        // });

        if (product_name) {
          // const searchResults = get(res, "data.results");
          // setShowSuggestions(true);
          let regex = new RegExp(`${product_name}`, 'i')
          let suggestion = productsearch.filter(o => regex.test(o.title));
          let sortedSuggestion = fuzzysort.go(product_name.toLowerCase(), suggestion, {key:'title'})
          suggestion = sortedSuggestion.map(i => i.obj)
          setProductSuggestions(suggestion);
          // setTempProduct(q);

          // console.log(searchResults);
        } else if (barcode) {
          let product_from_barcode = productsearch.filter(i => i.barcode===barcode.replace("\n", ""));
          // console.log(typeof data, data);

          if (product_from_barcode.length > 0) {
            // console.log({ data: data });
            setItem({
              product_name: product_from_barcode[0].title,
              product_id: product_from_barcode[0].id,
              product_description: product_from_barcode[0].description,
              product_price: product_from_barcode[0].price,
            });
            setmarketPrices(product_from_barcode[0].market_price);
            setPrices(product_from_barcode[0].price);
          } else {
            setItem({
              product_name: "",
              product_price: "",
              product_quantity: "",
              product_description: "",
              product_unit: "",
            });
          }
        }
      }
    } catch (error) {
      setProductSuggestions([]);
    }
  };

  const debounce = function (getUser, d) {
    let timer;
    return function () {
      let context = this;
      // args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        getUser.apply(context, arguments);
      }, d);
    };
  };

  const handleSearchUser = debounce(getUser, 400);
  const handleSearchProduct = getProduct

  const unitMap = unitValue.map(({ unit }, index) => (
    <option key={index} value={unit}>
      {unit}
    </option>
  ));
  const handleadditem = (e) => {
    if (
      item.product_name !== "" &&
      item.product_price !== "" &&
      item.product_quantity !== "" &&
      item.product_unit !== ""
    ) {
      let itemtemp = {
        product_name: item.product_name,
        product_price: item.product_price,
        product_quantity: item.product_quantity,
        product_description: item.product_description,
        product_unit: item.product_unit,
        product_id: item.product_id,
        product_barcode: barcode,
      };
      setItems([...items, itemtemp]);
      setItem({
        product_name: "",
        product_price: "",
        product_quantity: "",
        product_description: "",
        product_unit: "",
      });
      setBarcode("");
    } else {
      toast.error("Please fill required fields correctly!");
    }
  };
  const handleRemoveItem = (index) => {
    const temp = [...items];
    temp.splice(index, 1);
    setItems(temp);
  };

  const setQuantity = (quantity) => {
    setItem({
      ...item,
      product_quantity: quantity,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // setLoading(true)
      // document.getElementById("loader-up").classList.toggle("loader-show");
      if (
        item.product_name !== "" &&
        item.product_price !== "" &&
        item.product_quantity !== "" &&
        item.product_unit !== ""
      ) {
        let itemtemp = {
          product_name: item.product_name,
          product_price: item.product_price,
          product_quantity: item.product_quantity,
          product_description: item.product_description,
          product_unit: item.product_unit,
          product_id: item.product_id,
        };
        items.push(itemtemp);
      }

      let tempItems = items;
      delete tempItems["product_barcode"];
      setItems(tempItems);
      let data = {
        items: items,
        name: state.name,
        address: state.address,
        phone: state.phone,
        delivery_charge: state.delivery_charge,
        packaging_charge: state.packaging_charge,
        schedule_time: state.schedule_time,
        inventory,
      };
      if (data.phone.length < 10) {
        // document.getElementById("loader-up").classList.toggle("loader-show");
        return toast.error("Please enter a valid phone number");
      }
      if (items.length === 0) {
        // document.getElementById("loader-up").classList.toggle("loader-show");
        return toast.error("please add required details");
      }
      if (!inventory) {
        return toast.error("Inventory is required");
      }
      const res = await cartAPI.placeOrderByAgent(data);
      const resStatus = get(res, "data.status");
      if (resStatus === 201) {
        toast.success("Order is created successfully");
        setRedirect(true);
      } 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = () => {
    dispatch(actionsCreator.FETCH_INVENTORY());
  };

  const [prices, setPrices] = useState("");
  const [marketPrices, setmarketPrices] = useState("");

  useEffect(() => {
    // console.log({
    //   marketPrices: marketPrices,
    //   prices: prices,
    // });
  }, [marketPrices, prices]);

  const handleBarcodeChange = (e) => {
    // console.log(e.target.value);
  };
  useEffect(() => {
    let element;

    if (barcode && barcode !== "") {
      let element2 = document.querySelector(".quantity");
      element2.focus();
    }
  }, [item.product_name]);

  useEffect(() => {
    if (barcode !== "" && barcode && isNewLine(barcode)) {
      let data = {
        target: {
          barcode: barcode,
        },
      };
      setBarcode(removeNewLine(barcode));
      getProduct(data);
    }
  }, [barcode]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  //qwert
  return (
    <div className="punce-order-details">
      <Modal show={load}>
        <Loader message={"Please Wait. Products are fetching!"}></Loader>
      </Modal>
      <Modal show={showModal}>
        <div className="home-page-modal">
          <h5>
            Inventory Not Found
          </h5>
        </div>
      </Modal>
      <h5>EVERYTHING ORDER IN <span className="inventory_colored">{inventoryname}</span></h5>
      <div
        className="forms"
        // onSubmit={handleSubmit}
        // id="form"
      >
        {/* For Input name details */}

        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="suggestionContainer">
              <InputField
                label={"Mobile No. *"}
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={state.phone}
              />
            </div>
            {suggestions && suggestions.length > 0 && (
              <div
                style={{
                  backgroundColor: "#fff",
                  border:
                    suggestions &&
                    suggestions.length > 0 &&
                    "1px solid transparent",
                  height: suggestions && suggestions.length > 0 && "80px",
                  overflowY: suggestions && suggestions.length > 0 && "scroll",
                }}
                className="suggestion mt-1"
              >
                {suggestions &&
                  suggestions.map(({ name, phone_number, address }, index) => (
                    <div
                      key={index}
                      className="suggestionList"
                      onClick={() =>
                        onSuggestHandler(name, phone_number, address)
                      }
                    >
                      {phone_number}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <InputField
              label={"Name *"}
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={state.name}
            />
          </div>

          <div className="col-lg-3 col-md-4 col-syour optionm-4 col-12">
            <InputField
              label={"Address *"}
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={state.address}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <InputField
              label={"Delivery Charge *"}
              type="text"
              name="delivery_charge"
              id="delivery_charge"
              onChange={handleChange}
              value={state.delivery_charge}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <InputField
              label={"Packaging Charge *"}
              type="text"
              name="packaging_charge"
              id="packaging_charge"
              onChange={handleChange}
              value={state.packaging_charge}
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <InputField
              label={"Delivery Time (Optional)"}
              type="datetime-local"
              name="schedule_time"
              id="schedule_time"
              onChange={handleChange}
              value={state.schedule_time}
            />
          </div>
          {/* <div className="col-lg-3 col-md-4 col-sm-4 col-12">
            <div className="input-container">
              <div className="input-label">Inventory</div>
              <Dropdown
                placeholder={"Inventory"}
                value={inventory}
                options={inventoryList}
                onClick={setInventory}
              />
            </div>
          </div> */}
        </div>
        <h5 className="my-4">Add Items:</h5>

        <div>
          <div className="topbar">
            <div>
              <textarea
                style={{
                  height: "1.8rem",
                  backgroundColor: "white",
                  resize: "none",
                  overflow: "hidden",
                }}
                className="product_barcode"
                type="text"
                placeholder="Barcode"
                onChange={(e) => {
                  setBarcode(e.target.value);
                }}
                value={barcode}
              />
            </div>

            <div>
              <input
                className="input"
                type="text"
                name="product_name"
                id="product_name"
                onChange={handleitem}
                onBlur={(e) => {
                  if (productSuggestions && productSuggestions.length > 0) {
                    setItem({ ...item, product_name: "" });
                  }
                }}
                value={item.product_name}
                placeholder="Product Name"
                autoComplete="off"
              />
              {productSuggestions && productSuggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border:
                      productSuggestions &&
                      productSuggestions.length > 0 &&
                      "1px solid transparent",
                    height:
                      productSuggestions &&
                      productSuggestions.length > 0 &&
                      "120px",
                    overflowY:
                      productSuggestions &&
                      productSuggestions.length > 0 &&
                      "scroll",
                  }}
                  className="suggestion mt-1"
                >
                  {productSuggestions &&
                    productSuggestions.map(
                      (
                        { title, price, description, id, market_price, price_variation },
                        index
                      ) => (
                        <div
                          key={index}
                          className="suggestionList"
                          onClick={() => {
                            onProductSuggestHandler(
                              title,
                              price,
                              description,
                              id,
                              market_price,
                              price_variation
                            );
                            setmarketPrices(price_variation && price_variation.length > 0 ? price_variation[0].market_price:price);
                            setPrices(price_variation && price_variation.length > 0 ? price_variation[0].price:market_price);
                          }}
                        >
                          {title} {description ? `(${description})` : null}
                        </div>
                      )
                    )}
                </div>
              )}
            </div>
            <div className="line">|</div>
            <div className="">
              <input
                className="input"
                type="number"
                name="product_price"
                id="product_price"
                onChange={handleitem}
                // onClick={(e) => {
                //   e.target.value = "";
                // }}
                value={item.product_price}
                placeholder="Price"
                autoComplete="off"
                list={"price_options"}
              />
              <datalist id="price_options">
                <option value={prices}>Our Price</option>
                {marketPrices && (
                  <option value={marketPrices}>Market Price</option>
                )}
              </datalist>
            </div>
            <div className="line">|</div>
            <select
              className="dropdown-toggle"
              type="button"
              id="product_unit"
              data-toggle="dropdown"
              name="product_unit"
              onChange={handleitem}
              value={item.product_unit}
            >
              <option value="" disabled defaultValue>
                Select
              </option>
              {unitMap}
            </select>
            <div className="counter-container">
              {/* <div className="counter">
                <button
                  className="minus"
                  onClick={() => {
                    if (item.product_quantity > 1) {
                      setQuantity(item.product_quantity - 1)
                    }
                  }}
                >
                  -
                </button>
                {item.product_quantity}
                <button
                  className="plus"
                  onClick={() => setQuantity(item.product_quantity + 1)}
                >
                  +
                </button>
              </div> */}
              <input
                className="quantity"
                type="number"
                name="product_quantity"
                placeholder="Quantity"
                onChange={handleitem}
                value={item.product_quantity}
              />
              <button className="add" onClick={handleadditem}>
                ADD
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="product__details__table">
              {items.map((product, index) => {
                const {
                  product_barcode,
                  product_quantity,
                  product_name,
                  product_price,
                  product_unit,
                  product_id,
                  product_description,
                } = product;
                return (
                  <tr key={index}>
                    <td>{product_barcode}</td>
                    <td style={{ maxWidth: "450px", wordWrap: "break-word" }}>
                      {product_name}
                    </td>
                    {/* <td>{product_id}</td> */}
                    {/* <td>{product_description}</td> */}
                    <td>{product_price}</td>
                    <td>{product_unit}</td>
                    <td>{product_quantity}</td>
                    <td>
                      <div onClick={() => handleRemoveItem(index)}>
                        <img src={deleteIcon} className="cursor" alt="Delete" />
                      </div>
                    </td>
                    <td>
                      <div
                        onClick={() => {
                          setmodal(true);
                          seteditting_index(index);
                        }}
                      >
                        <img
                          src={editIcon}
                          className="punch-edit-icon cursor"
                          alt="Edit"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>

        <div className="mt-5 flex-center">
          <button
            className="btn btn-light px-4 submit_button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Order
          </button>
        </div>
      </div>
      <Modal show={modal} onClose={() => setmodal(false)}>
        <div>
          <div className="">
            <div className="topbar">
              <div>
                <div>
                  <input
                    className="product_name_on_edit input"
                    type="text"
                    name="product_name_on_edit"
                    id="product_name"
                    placeholder="Product Name"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="line">|</div>
              <div className="">
                <input
                  className="input product_price_on_edit"
                  type="number"
                  name="product_price"
                  id="product_price"
                  // value={items.length > 0 ? items[editting_index].product_name : null}
                  placeholder="Price"
                  autoComplete="off"
                  list={"edit-price_options"}
                />
                <datalist id="edit-price_options">
                  <option value={prices}>Our Price</option>
                  {marketPrices && (
                    <option value={marketPrices}>Market Price</option>
                  )}
                </datalist>
              </div>
              <div className="line">|</div>
              <select
                className="dropdown-toggle product_unit_on_edit"
                type="button"
                id="product_unit"
                data-toggle="dropdown"
                name="product_unit"
                // value={items.length > 0 ? items[editting_index].product_name : null}
              >
                <option value="" disabled defaultValue>
                  Select
                </option>
                {unitMap}
              </select>
              <div className="counter-container">
                {/* <div className="counter">
                <button
                  className="minus"
                  onClick={() => {
                    if (item.product_quantity > 1) {
                      setQuantity(item.product_quantity - 1)
                    }
                  }}
                >
                  -
                </button>
                {item.product_quantity}
                <button
                  className="plus"
                  onClick={() => setQuantity(item.product_quantity + 1)}
                >
                  +
                </button>
              </div> */}
                <input
                  className="product_quantity_on_edit"
                  type="number"
                  name="product_quantity"
                  placeholder="Quantity"
                  // value={items.length > 0 ? items[editting_index].product_name : null}
                />
                <button className="add" onClick={() => edittor()}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
