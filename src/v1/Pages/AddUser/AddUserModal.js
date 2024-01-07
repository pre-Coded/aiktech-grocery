import React, { useState } from "react";
import { toast } from "react-toastify";

import { editTenantUsers, addTenantUser } from '../../Api/authAPI'

function AddUserModal({ closeModal, userForm , handleResponse, edit }) {

    const [item, setItem] = useState(userForm);

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value);

        setItem( prev => ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    !edit ? 
    addTenantUser(item)
    .then( (res) => {

        res.status === 201 && handleResponse({
            id : res.data.id, 
            data : res.data
        });
        toast.success("user added successfully")
        closeModal(false)

    })
    .catch( (err) => {
        toast.error("Error in adding user.")
    })
    :
    editTenantUsers(item)
    .then((res) => {

        res.status === 200 &&  handleResponse({
            id : res.data.id,
            data : res.data
        });
        closeModal(false);

    })
    .catch( (err) => {
        toast.error("Error in editing user.")
    })

  }
 
  return (
    <form className="add-product-wrapper flex-column gap-10" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="text-large text-bold-md" style={{textAlign : 'center'}}>Add User</div>

      <input 
        className="input-border"
        type={"text"}
        name="username"
        id="name"
        placeholder="User Name"
        value={item.username}
        onChange={handleChange}
        required
      />

        <input
            className="input-border"
            type={"email"}
            name="email"
            id="email"
            placeholder="Email"
            value={item.email}
            onChange={handleChange}       
        />

        <input
            className="input-border"
            type={"text"}
            name="phone_number"
            id="phone_number"
            placeholder="Phone Number"
            value={item.phone_number}
            onChange={handleChange}  
            required     
        />

        <div className="input-border flex-row ">
            <select
                onChange={handleChange}
                name={'role'}
                className="flex-1"
                required
            >
                <option value={"C"} defaultValue>Customer</option>
                <option value={"DP"}>Delievery Partner</option>
                <option value={"SK"}>Store Manager</option>
                <option value={"ADMIN"}>Admin</option>
            </select>
        </div>

        <div className="option-buttons save-changes-buttons">
            <button className="btn-none btn-outline" onClick={() => closeModal(false)}>
            Discard
            </button>
            <button className="btn-none btn-primary" type="submit">Save</button>
        </div>
    </form>
  );
}

export default AddUserModal;