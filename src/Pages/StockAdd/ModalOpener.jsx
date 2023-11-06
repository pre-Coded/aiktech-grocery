import React from "react";
import AddInventoryForm from "./AddInventoryForm";
import AddProductForm from "./AddProductForm";
import AddUnitForm from "./AddUnitForm";
import "./modal.css";

function ModalOpener({ value, setShowModal,getStock }) {
  return (
    <div className="modal_section">
      <div className="modal-container">
        <div className="modal_content">
          {value === "units" && <AddUnitForm setShowModal={setShowModal} getStock={getStock}/>}
          {value === "products" && (
            <AddProductForm setShowModal={setShowModal} getStock={getStock}/>
          )}
          {value === "inventory" && (
            <AddInventoryForm setShowModal={setShowModal} getStock={getStock}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalOpener;
