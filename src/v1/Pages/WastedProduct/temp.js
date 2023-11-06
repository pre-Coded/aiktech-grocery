<div className="add-wasted-product">
    <form
        className="forms"
        onSubmit={handleSubmit}
        id="form"
        autoComplete="new-password"
    >
        {/* Heading for items */}
        <h3 className="title">Add Wasted Products:</h3>

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
                                    ? `${product_name} ${description ? `(${description})` : ""
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
                            // style={{
                            // 	border:
                            // 		productSuggestions.length > 0 &&
                            // 		searchProduct &&
                            // 		"1px solid transparent",
                            // 	height:
                            // 		productSuggestions.length > 0 && searchProduct && "120px",
                            // 	overflowY:
                            // 		productSuggestions.length > 0 &&
                            // 		searchProduct &&
                            // 		"scroll",
                            // }}
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
                    {/* {showmodal && (
                    <ModalOpener
                        value={value}
                        setShowModal={setShowModal}
                        getStock={getStock}
                    />
                )} */}
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

                    {/* {showmodal && (
                    <ModalOpener
                        value={value}
                        setShowModal={setShowModal}
                        getStock={getStock}
                    />
                )} */}
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
</div>