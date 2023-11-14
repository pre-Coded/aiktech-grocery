import React, { useState, useEffect } from "react";
import { Button } from "../../Components";
import "./AddStock.scss";
import { toast } from "react-toastify";
import deleteIcon from "../../Assets/Icons/delete.svg";
import editIcon from "../../Assets/Icons/edit.svg";
import Modal from "../../Components/Modal";
import { addStock, searchProduct } from "../../Api/productAPI";
import { fetchProductsearch } from "../../Redux/sagas/productSaga"; 
import { useDispatch, useSelector } from "react-redux";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import { debounce } from "../../Utils/debounce-utils";
import get from "lodash/get";
import {filter} from "lodash"
import Searchsuggestion from "./Searchsuggestion";
import { set } from "lodash";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Addinventory from "./Addinventory";
import AddUnit from "./AddUnit";
import AddProduct from "./AddProduct";
import { errorMsg } from "../../Utils";
import { cartAPI } from "../../Api";
import logo from "../../Assets/Images/logo/phurti_logo.png";
import Loader from "../../Components/Loader";
import fuzzysort from 'fuzzysort'

const mapStateToProps = ({ stockdropdown,  productsearch}) => ({
  stockdropdown,
  productsearch
});

export default function AddStock() {
  const { id } = useParams();
  const {
    stockdropdown: { list: stockdropdownList },
    productsearch: {results: productsearch=[], loading: load, state: api_state},
  } = useSelector(mapStateToProps);

  const [cartData, setCartData] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [tempProduct, setTempProduct] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [unit, setUnit] = useState("");
  const [inventory, setInventory] = useState("");
  const [pricePerProduct, setPricePerProduct] = useState("");
  const [items, setItems] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inventoryname, setInventoryname] = useState("")
  const [showModal, setshowModal] = useState(false)
  const [productRemaining, setProductRemaining] = useState("NA")
  const [productAddress, setProductAddress] = useState("NA");
  const [expiry,setExpiry]=useState(new Date());
  const [batch_number,setBatchNumber]=useState(-1)

  const inventoryfix = () => {
    if (stockdropdownList.inventory){
      setInventory(null)
      stockdropdownList.inventory.map(i => {
        if(i.id===parseInt(id)){
          setInventory(id)
          setInventoryname(i.name)
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
  }, [stockdropdownList.inventory])
  //loader
  const [loader, showloader] = useState(false);

  //image
  const [image, setImage] = useState(null);

  const [modal, setModal] = useState(false);
  const [option, setOption] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const fetchStockDropdown = async () => {
    dispatch(actionsCreator.FETCH_STOCK_DROPDOWN());
  };
  const fetchProductsearch = async () => {
    dispatch(actionsCreator.FETCH_ALL_PRODUCTS(id));
  };

  const closeModal = (value, value1) => {
    setModal(value ? true : false);
    setDropdown(value1 ? true : false);
  }; // Closing the modal
  // console.log(dropdown)
  useEffect(() => {
    fetchStockDropdown();
  }, [dropdown]);

  useEffect(() => {
    fetchStockDropdown();
  }, []);

  useEffect(() => {
    fetchProductsearch()
  }, [])
  
  const onChangeHandler = (e, key) => {
    const value = e.target.value;
    if (key === "PRODUCT") {
      setProduct(value);
    } else if (key === "PRICE_PER_PRODUCT") {
      setPricePerProduct(value);
    } else if (key === "UNIT") {
      setUnit(value);
    } else if (key === "INVENTORY") {
      setInventory(value);
    } else if (key === "ADDED_BY") {
      setAddedBy(value);
    } else if (key === "QUANTITY") {
      setQuantity(value);
    } else if (key === "BARCODE") {
      setBarcode(value);
    }
    console.log(e.target.value);
  };
  //ADDING ALL THE ITEM INFORMATION IN THE LIST
  const addItem = () => {
    console.log(cartData);
    if (
      product === "" ||
      pricePerProduct === "" ||
      quantity === "" ||
      unit === "" ||
      inventory === "" ||
      addedBy === ""||
      batch_number===-1 
    ) {
      console.log(unit);
      toast.error("Please add detail correctly.");
    } else {
      if (product && quantity) {
        let payload = {
          stock_product: product,
          stock_quantity: quantity,
          procurement_price_per_product: pricePerProduct,
          stock_unit: unit,
          inventory: inventory,
          added_by: addedBy,
          temp_stock_product: tempProduct,
          description: productDescription,
          barcode: barcode,
          product_remaining: productRemaining,
          product_address: productAddress,
          expiry:expiry,
          batch_number:batch_number
        };
        let cartObj = [...cartData];
        cartObj.push(payload);
        setCartData(cartObj);
        clearInputs();

        setImage(logo);

        let searchProductinput = document.querySelector("#product_name");
        if (searchProductinput) {
          searchProductinput.focus();
          searchProductinput.value = "";
        }

        let element = document.querySelector(".product_barcode");
        if (element) element.focus();
      }
    }
  };

  //editing items
  const editItem = () => {
    if (
      product === "" ||
      pricePerProduct === "" ||
      quantity === "" ||
      unit === "" ||
      inventory === "" ||
      addedBy === ""
    ) {
      toast.error("Please add detail correctly.");
    } else {
      if (product && quantity) {
        let payload = {
          added_by: addedBy,
          stock_quantity: quantity,
          stock_unit: unit,
          stock_product: product,
          inventory: inventory,
          procurement_price_per_product: pricePerProduct,
          barcode: barcode,
          temp_stock_product: tempProduct,
        };
        let cartObj = cartData;
        cartObj[editIndex] = payload;
        setCartData(cartObj);
        setTempProduct("");
        clearInputs()
      }
      setEditIndex(null);
      setEditModal(false);
    }
    document.querySelector(".suggestion_input").value = "";
  };

  //setting values of cart
  const setValues = (index = editIndex) => {
    setProduct(cartData[index].stock_product);
    setAddedBy(cartData[index].added_by);
    setUnit(cartData[index].stock_unit);
    setInventory(cartData[index].inventory);
    setPricePerProduct(cartData[index].procurement_price_per_product);
    setQuantity(cartData[index].stock_quantity);
    setTempProduct(cartData[index].temp_stock_product);
    setProductDescription(cartData[index].description);
    setAddedBy(cartData[index].added_by);
    setImage(cartData[index].image);
    setBarcode(cartData[index].barcode);
  };

  //clearing all the inputs
  const clearInputs = () => {
    setPricePerProduct("");
    setProductDescription("");
    setQuantity("");
    setProduct("");
    setUnit("");
    setTempProduct("");
    setBarcode("");
    setImage(null);
    setBarcodeQuery("");
  };

  //deleting the added item
  const deleteItem = (index) => {
    let cartObj = [...cartData];
    cartObj.splice(index, 1);
    setCartData(cartObj);
  };

  //API for fetching product from barcode or product name.
  const getProduct = async (e) => {
    try {
      let product_name = e.target.value;
      let barcode = e.target.barcode;
      if (product_name || barcode) {

        if (product_name) {
          setShowSuggestions(true);
          let regex = new RegExp(`${product_name}`, 'i')
          let suggestion = productsearch.filter(o => regex.test(o.title));
          let sortedSuggestion = fuzzysort.go(product_name.toLowerCase(), suggestion, {key:'title'})
          suggestion = sortedSuggestion.map(i => i.obj)
          setProductSuggestions(suggestion);
          setTempProduct(product_name);
          setBarcode("");
          setProduct(product_name)

          // console.log(searchResults);
        } else if (barcode) {

          let product_from_barcode = productsearch.filter(i => i.barcode===barcode.replace("\n", ""));
          if (product_from_barcode.length > 0) {
            setTempProduct(product_from_barcode[0].title);
            setProduct(product_from_barcode[0].id);
            setMarketPrices(product_from_barcode[0].market_price);
            setPrices(product_from_barcode[0].price);
            setProductDescription(product_from_barcode[0].description);
            setBarcodeQuery(product_from_barcode[0].title);
            setImage(product_from_barcode[0].photo);
            setProductRemaining(product_from_barcode[0].remaining_products && product_from_barcode[0].remaining_products.map(i => (i.inventory_id==inventory? i.product_remaining: null)))
            setProductAddress(product_from_barcode[0].remaining_products && product_from_barcode[0].remaining_products.map(i => (i.inventory_id==inventory? i.address: null)))
            
            let searchPriceinput = document.querySelector("#price_per_product");
            if (searchPriceinput) {
              searchPriceinput.focus();
            }
          } else {
            // setBarcodeQuery("");
            // setProduct(e.target.value)
          }
        }
      }
    } catch (error) {
      setProductSuggestions([]);
    }
  };

  //using debouncing
  const handleSearchProduct = getProduct

  //filling data after selecting from the suggestions list
  const handleSuggestion = (e) => {
    setShowSuggestions(false);
    document.querySelector(".suggestion_input").value =
      e.target.getAttribute("data-producttitle");
    setProduct(e.target.getAttribute("data-productid"));
    setProductDescription(e.target.getAttribute("data-productdescription"));
    console.log(e.target.getAttribute("data-productdescription"));
    setTempProduct(e.target.getAttribute("data-producttitle"));
    setPrices(e.target.getAttribute("data-product-price"));
    console.log(prices);
    setMarketPrices(e.target.getAttribute("data-product-market-price"));
    setImage(e.target.getAttribute("data-product-image"));
    setBarcode(e.target.getAttribute("data-product-barcode"));
    setProductRemaining(e.target.getAttribute("data-product-remaining")? parseInt(e.target.getAttribute("data-product-remaining").replace(/,/g, '')): e.target.getAttribute("data-product-remaining"))
    setProductAddress(e.target.getAttribute("data-product-address")? (e.target.getAttribute("data-product-address").replace(/,/g, '')): e.target.getAttribute("data-product-address"))
    
    let searchPriceinput = document.querySelector("#price_per_product");
    if (searchPriceinput) {
      searchPriceinput.focus();
    }

  };

  const history = useHistory();

  //adding all the items in the stocks
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      addedBy !== "" &&
      quantity !== "" &&
      unit !== "" &&
      product !== "" &&
      inventory !== "" &&
      pricePerProduct !== ""
    ) {
      let temp = {
        added_by: addedBy,
        stock_quantity: quantity,
        stock_unit: unit,
        stock_product: product,
        inventory: inventory,
        procurement_price_per_product: pricePerProduct,
        barcode: barcode,
        batch_number:batch_number,
        expiry:expiry
      };
      cartData.push(temp);
    }
    console.log(cartData);
    if (!cartData || cartData.length === 0) {
      console.log(cartData);
      console.log(expiry);
      console.log(product);
      toast.error("Please add stock correctly.");
    } else {
      // API calls for adding data to the backend
      clearInputs();
      let data = {
        data: cartData,
      };
      if (cartData.length === 0) {
        toast.error("Please add required details.");
      }
      showloader(true);
      addStock(data)
        .then((res) => {
          if (res.data.status === 201) {
            toast.success("Stocks Added Successfully!");
            showloader(false);

            history.push("/");
          } else if (res.data.status === 400) {
            toast.error("Please fill all fields correctly!");
          }
        })
        .catch((err) => {
          const errMsg = errorMsg(err);
          toast.error(errorMsg);
        });
    }
  };

  const [editModal, setEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editPlaceHolder, setEditPlaceHolder] = useState("Search Results");
  const [prices, setPrices] = useState("");
  const [marketPrices, setMarketPrices] = useState("");
  useEffect(() => {
    if (tempProduct === "" || tempProduct === null) {
      setPrices("");
      setMarketPrices("");
    }
  }, [tempProduct]);

  useEffect(() => {
    if (!editModal) setEditPlaceHolder("Search Products");
    else setEditPlaceHolder(cartData[editIndex].temp_stock_product);
  }, [editModal, editIndex]);

  useEffect(() => {
    let barcode = document.querySelector(".product_barcode");
    if (barcode) barcode.focus();

    console.log({ barcode: barcode });
    setImage(logo);
  }, []);

  const [barcodeQuery, setBarcodeQuery] = useState(null);

  //checking for new line in the string here using for barcode
  function isNewLine(str, char = "\n") {
    return str.indexOf(char) > -1;
  }

  //calling the getProduct function to fetch product through barcode
  useEffect(() => {
    if (barcode !== "" && barcode && isNewLine(barcode)) {
      let data = {
        target: {
          barcode: barcode,
        },
      };
      getProduct(data);
      setBarcode(removeNewLine(barcode));
    }
  }, [barcode]);

  const removeNewLine = (str) => {
    let ans = str.replace("\n", "");
    return ans;
  };

  //barcodeQuery is the product name fetched from backend through barcode
  useEffect(() => {
    let searchProductinput = document.querySelector("#product_name");
    if (searchProductinput && barcodeQuery) {
      searchProductinput.focus();
      searchProductinput.value = barcodeQuery;
    }
    setBarcodeQuery(null);
  }, [barcodeQuery]);

  useEffect(() => {
    console.log({ CartData: cartData });
  }, [cartData]);

  //qwert
  return (
    <div className="everything-delivery-wrapper">
      <Modal show={load}>
        <Loader message={"Please Wait. Products are fetching!"}></Loader>
      </Modal>
      <Modal show={loader}>
        <Loader message={"Please Wait. Adding Stocks!"}></Loader>
      </Modal>
      <Modal show={showModal}>
        <div className="home-page-modal">
          <h5>
            Inventory Not Found
          </h5>
        </div>
      </Modal>
      <Modal show={modal} onClose={() => setModal(false)}>
        {option === "inventory" ? (
          <Addinventory closeModal={closeModal} dropdown={dropdown} />
        ) : null}
        {option === "unit" ? (
          <AddUnit closeModal={closeModal} dropdown={dropdown} />
        ) : null}
        {option === "product" ? (
          <AddProduct
            setBarcodeQuery={setBarcodeQuery}
            setPrices={setPrices}
            setProductDescription={setProductDescription}
            setBarcode={setBarcode}
            closeModal={closeModal}
            dropdown={dropdown}
          />
        ) : null}
      </Modal>
      <form
        className="forms"
        onSubmit={handleSubmit}
        id="form"
        autoComplete="new-password"
      >
        <div className="everything-delivery-container">
          <div className="table__wrapper__stock">
            <h3 className="Page_Heading">Add Stock for <span className="inventory_colored">({inventoryname})</span></h3>
            {!editModal && (
              <div className="topbar__add_stock">
                
                <div class="product_address">{productAddress}</div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {productRemaining}
                <div className="responsive__wrapper">
                  <select
                    className="added__by"
                    onChange={(e) => onChangeHandler(e, "ADDED_BY")}
                    value={addedBy}
                    // data-addedBy={}
                  >
                    <option>Added By</option>
                    {stockdropdownList &&
                      stockdropdownList.added_by &&
                      stockdropdownList.added_by.map((added_by, index) => (
                        <option value={added_by.id} key={index}>
                          {added_by.phone_number}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="responsive__wrapper">
                  <img style={{ maxWidth: "3.5rem" }} src={image} />
                </div>

                <div className="responsive__wrapper">
                  <textarea
                    className="product_barcode"
                    type="text"
                    placeholder="Barcode"
                    onChange={(e) => onChangeHandler(e, "BARCODE")}
                    value={barcode}
                  />
                </div>

                <div className="responsive__wrapper" style={{width: "60rem"}}>
                  <div className="suggestionHandle">
                    <input
                      id="product_name"
                      className="suggestion_input"
                      type="text"
                      placeholder="Search Product"
                      style={{ backgroundColor: "white" }}
                      onChange={handleSearchProduct}
                      // value={tempProduct? tempProduct: null}
                      onKeyDown={(e) => {
                        let key = e.keyCode || e.charCode;
                        if (key === 8) {
                          setTempProduct("");
                          setPrices("");
                          setMarketPrices("");
                          setProduct("");
                        }
                      }}
                    />

                    <Searchsuggestion
                      inventory={inventory}
                      productSuggestions={productSuggestions}
                      handleSuggestion={handleSuggestion}
                      showsuggestions={showSuggestions}
                    />
                  </div>
                  <button
                    className="circle__button"
                    type="button"
                    onClick={() => {
                      setModal(true);
                      setOption("product");
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>

                <div className="responsive__wrapper">
                  <div className="individual__component__wrapper">
                    <select
                      onChange={(e) => onChangeHandler(e, "UNIT")}
                      value={unit}
                    >
                      <option>Units</option>

                      {stockdropdownList &&
                        stockdropdownList.stock_unit &&
                        stockdropdownList.stock_unit.map(
                          (stock_unit, index) => (
                            <option value={stock_unit.id} key={index}>
                              {stock_unit.name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                  <button
                    className="circle__button"
                    type="button"
                    onClick={() => {
                      setModal(true);
                      setOption("unit");
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>

                {/* <div
                  className="inventory_wrapper responsive__wrapper"
                >
                  <div className="individual__component__wrapper">
                    <select
                      onChange={(e) => onChangeHandler(e, "INVENTORY")}
                      value={inventory}
                    >
                      <option>Inventory</option>
                      {stockdropdownList &&
                        stockdropdownList.stock_unit &&
                        stockdropdownList.inventory.map((inventory, index) => (
                          <option value={inventory.id} key={index}>
                            {inventory.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button
                    className="circle__button"
                    type="button"
                    onClick={() => {
                      setModal(true);
                      setOption("inventory");
                    }}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div> */}

                <div className="line">|</div>

                <div className="responsive__wrapper">
                  <input
                    className="priceperproduct"
                    type="text"
                    placeholder="price"
                    style={{ backgroundColor: "white", paddingLeft: "15px" }}
                    onChange={(e) => onChangeHandler(e, "PRICE_PER_PRODUCT")}
                    value={pricePerProduct}
                    list={"price_options"}
                    id="price_per_product"
                  />
                  <datalist id="price_options">
                    <option value={prices}>Our Price</option>
                    {marketPrices && (
                      <option value={marketPrices}>Market Price</option>
                    )}
                  </datalist>
                </div>

                <div className="responsive__wrapper priceperproduct__wrapper bottom-buttons">
                  <input
                    className="product_quantity"
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => onChangeHandler(e, "QUANTITY")}
                    value={quantity}
                  />
                </div>
                <div className="responsive__wrapper priceperproduct__wrapper bottom-buttons">
                  <input
                    className="product_quantity"
                    type="date"
                    placeholder="expiry date"
                    onChange={(e) => {setExpiry(e.target.value)}}
                    value={expiry}
                  />
                </div>
                <div className="responsive__wrapper priceperproduct__wrapper bottom-buttons">
                  <input
                    className="product_quantity"
                    type="number"
                    placeholder="Batch Number"
                    onChange={(e) => setBatchNumber(e.target.value)}
                    value={batch_number}
                  />
                </div>

                <div className="responsive__wrapper bottom-buttons">
                  <button type="button" className="add" onClick={addItem}>
                    ADD
                  </button>
                </div>

                <div className="counter-container"></div>
              </div>
            )}
            <div className="table-responsive">
              <table className="product__details__table">
                <tr>
                  <th>Address</th>
                  <th>Product Remaining</th>
                  <th>Added By</th>
                  <th>Barcode</th>
                  <th>Product</th>
                  <th>Unit</th>
                  <th>Inventory</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Expiry</th>
                  <th>Batch Number</th>
                </tr>

                {cartData.map((product, index) => {
                  const {
                    stock_quantity,
                    temp_stock_product,
                    added_by,
                    stock_unit,
                    inventory,
                    procurement_price_per_product,
                    description,
                    barcode,
                    product_remaining,
                    product_address
                  } = product;
                  return (
                    <tr key={index}>
                      <td>{product_address}</td>
                      <td>{product_remaining}</td>
                      <td>
                        {stockdropdownList &&
                          stockdropdownList.added_by.map((user) =>
                            user.id.toString() === added_by
                              ? user.phone_number
                              : null
                          )}
                      </td>
                      <td>{barcode}</td>
                      <td style={{ maxWidth: "450px", wordWrap: "break-word" }}>
                        {temp_stock_product} ({description})
                      </td>
                      <td>
                        {stockdropdownList &&
                          stockdropdownList.stock_unit.map((stockunit) =>
                            stockunit.id.toString() === stock_unit
                              ? stockunit.unit
                              : null
                          )}
                      </td>
                      <td>
                        {stockdropdownList &&
                          stockdropdownList.inventory.map((i) =>
                            i.id.toString() === inventory ? i.name : null
                          )}
                        {}
                      </td>
                      <td>{procurement_price_per_product}</td>
                      <td>{stock_quantity}</td>
                      <td>{expiry}</td>
                      <td>{batch_number}</td>
                      <td>
                        <div onClick={() => deleteItem(index)}>
                          <img
                            src={deleteIcon}
                            className="cursor"
                            alt="Delete"
                          />
                        </div>
                      </td>
                      <td>
                        <div
                          onClick={() => {
                            setEditModal(true);
                            setEditIndex(index);
                            setValues(index);
                          }}
                        >
                          <img
                            src={editIcon}
                            className="cursor edit"
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
        </div>
        <div className="checkout-button">
          <Button
            className="checkout-button"
            text="Add Stock"
            clicker={handleSubmit}
            type="submit"
          />
        </div>
      </form>
      <Modal unset={true} show={editModal} onClose={() => setEditModal(false)}>
        <div className="cross" onClick={() => setEditModal(false)}>
          ✕
        </div>
        <form
          className="forms"
          onSubmit={handleSubmit}
          id="form"
          autoComplete="new-password"
        >
          <div className="everything-delivery-container">
            <div className="table__wrapper__stock">
              <h3 className="Page_Heading">Add Stock</h3>
              <div className="topbar__add_stock">
                <div className="responsive__wrapper">
                  <select
                    className="added__by"
                    onChange={(e) => onChangeHandler(e, "ADDED_BY")}
                    value={addedBy}
                    // data-addedBy={}
                  >
                    <option>Added By</option>
                    {stockdropdownList &&
                      stockdropdownList.added_by &&
                      stockdropdownList.added_by.map((added_by, index) => (
                        <option value={added_by.id} key={index}>
                          {added_by.phone_number}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="responsive__wrapper">
                  <textarea
                    className="product_barcode"
                    type="text"
                    placeholder="Barcode"
                    onChange={(e) => onChangeHandler(e, "BARCODE")}
                    value={barcode}
                  />
                </div>

                <div className="responsive__wrapper searchWrapper">
                  <div className="suggestionHandle">
                    <input
                      className="suggestion_input"
                      type="text"
                      placeholder={editPlaceHolder}
                      onClick={() => {
                        setEditPlaceHolder("Search Product");
                      }}
                      style={{ backgroundColor: "white" }}
                      onChange={handleSearchProduct}
                      // value={tempProduct? tempProduct: null}
                      onKeyDown={(e) => {
                        let key = e.keyCode || e.charCode;
                        if (key === 8) {
                          setTempProduct("");
                          setProduct("");
                          setPrices("");
                          setMarketPrices("");
                        }
                      }}
                    />
                    <Searchsuggestion
                      productSuggestions={productSuggestions}
                      handleSuggestion={handleSuggestion}
                      showsuggestions={showSuggestions}
                    />
                  </div>
                </div>

                <div className="responsive__wrapper">
                  <div className="individual__component__wrapper">
                    <select
                      onChange={(e) => onChangeHandler(e, "UNIT")}
                      value={unit}
                    >
                      <option>Units</option>

                      {stockdropdownList &&
                        stockdropdownList.stock_unit &&
                        stockdropdownList.stock_unit.map(
                          (stock_unit, index) => (
                           
                            <option value={stock_unit.id} key={index}>
                              {stock_unit.name}
                            </option>
                            
                          )
                        )}
                    </select>
                  </div>
                </div>

                {/* <div
                  className="inventory_wrapper"
                  className="responsive__wrapper"
                >
                  <div className="individual__component__wrapper">
                    <select
                      onChange={(e) => onChangeHandler(e, "INVENTORY")}
                      value={inventory}
                    >
                      <option>Inventory</option>
                      {stockdropdownList &&
                        stockdropdownList.stock_unit &&
                        stockdropdownList.inventory.map((inventory, index) => (
                          <option value={inventory.id} key={index}>
                            {inventory.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div> */}

                <div className="responsive__wrapper">
                  <input
                    className="priceperproduct"
                    type="text"
                    placeholder="price"
                    style={{
                      backgroundColor: "white",
                      paddingLeft: "15px",
                      width: "100%",
                    }}
                    onChange={(e) => onChangeHandler(e, "PRICE_PER_PRODUCT")}
                    value={pricePerProduct}
                    list={"edit-price_options"}
                  />

                  <datalist id="edit-price_options">
                    <option value={prices}>Our Price</option>
                    {marketPrices && (
                      <option value={marketPrices}>Market Price</option>
                    )}
                  </datalist>

                </div>

                <div className="responsive__wrapper priceperproduct__wrapper bottom-buttons">
                  <input
                    className="product_quantity"
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => onChangeHandler(e, "QUANTITY")}
                    value={quantity}
                  />
                </div>
                <div className="responsive__wrapper priceperproduct__wrapper bottom-buttons">
                  <input
                    className="product_quantity"
                    type="date"
                    placeholder="expiry date"
                    onChange={(e) => {setExpiry(e.target.value)}}
                    value={expiry}
                  />
                </div>
                <div className="responsive__wrapper priceperproduct__wrapper bottom-buttons">
                  <input
                    className="product_quantity"
                    type="number"
                    placeholder="Batch Number"
                    onChange={(e) => {setBatchNumber(e.target.value)}}
                    value={batch_number}
                  />
                </div>

                <div className="responsive__wrapper bottom-buttons">
                  <button type="button" className="add" onClick={editItem}>
                    Edit
                  </button>
                </div>

                <div className="counter-container"></div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
