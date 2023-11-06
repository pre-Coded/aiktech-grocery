import React, { useState } from "react";
import { addUnit } from "../../Api/productAPI"
import "./form.scss";
import { toast } from "react-toastify";
import InputField from '../../Components/InputField'


function AddUnitForm({ closeModal, dropdown}) {
  const [item, setItem] = useState({
    unit: "",
    unit_description: "",
  });
  const handleAddItem = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.unit !== "") {
      let data = {
        unit: item.unit,
        unit_description: item.unit_description,

      };
      addUnit(data)
        .then((res) => {
          console.log(res);
          if (res.data.status === 201) {
            closeModal(false, dropdown?false:true)
            toast.success("Stock Unit Succesfully!")
          
          } else if (res.data.status === 400) {
            toast.error("Error on adding stock unit!")
            
          }
        })
        .catch((error) => {
            toast.error("Error on adding stock unit!")
        });
       
    } else {
      alert("Please enter values");
    }
  };
  return (
    <form className='address-option-container'>
        <h4 onClick={() => closeModal(false)}>✕</h4>
        <h3>Add Unit:</h3>
        <InputField
            type="text"
            className="input mt-2"
            name="unit"
            id="unit"
            placeholder="Enter Unit"
            value={item.unit}
            onChange={handleAddItem}
        />
        <InputField
            type="text"
            className="input mt-2"
            name="unit_description"
            id="unit_description"
            placeholder="unit_description"
            value={item.unit_description}
            onChange={handleAddItem}
        />
            
        <div className='option-buttons save-changes-buttons'>
            {/* <button onClick={() => setModal(false)}>Cancel</button> */}
            <button onClick={handleSubmit}>Save</button>
        </div>
    </form>
   
      
       
  );
}

export default AddUnitForm;