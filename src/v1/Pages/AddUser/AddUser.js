import React, { useEffect, useMemo, useRef, useState } from 'react'

// import './AddProduct.scss'

import { Modal } from '../../Components';

import ContentCard from '../AddContent/ContentCards';


import AddProductModal from '../AddContent/AddProdcut/AddProductModal';

import { dashboardAPI } from "../../Api/index.js";

// import data from '../../../Assets/DummyData.json'

import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';

import { productList } from '../../../api/request.api';

import { fetchTenantUsers } from '../../Api/authAPI';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import HoverComponent from '../../Components/HoverComponent/HoverComponent';
import { BsThreeDotsVertical } from 'react-icons/bs';
import AddUserModal from './AddUserModal';

import { deleteTenantUsers } from '../../Api/authAPI';

import data from '../../Assets/DummyData.json'

const UserCard = (props) => {
    const editRef = useRef(null);
    const [showEditBtn, toggleEditBtn] = useState(false);


    const handleEdit = () => {
        props.editFunction(props.data);
    }

    const handleDelete = () => {
        deleteTenantUsers({id : props.id })
        .then((res) => {
            res.status === 202 && props.deleteFunction(props.id);
        })
        .catch((err) => {
            toast.error("Error in deleting user.")
        })
    }

    return (
        <ul 
            className='ul-style-none relative' 
            style={{
                display : 'inline-flex',
                flexDirection : 'column',
                maxWidth : '32%',
                width : '32%',
                marginBottom : '1%',
                marginLeft : '1%',
                gap : '4px',
                borderRadius : '8px',
                padding : '4px',
                boxShadow : '0 0 1px #333'
            }}
        >
            <div
                className='content-card-edit btn-none'
                onMouseEnter={() => toggleEditBtn(true)}
                onMouseLeave={() => toggleEditBtn(false)}
                ref={editRef}
            >
                <BsThreeDotsVertical fontSize={'1rem'} color={"black"} />
                {
                    showEditBtn &&
                    <HoverComponent
                        hoverRef={editRef}
                        style={{
                            backgroundColor : '#f2f2f2', 
                            padding : '4px 0', 
                            width : '8rem',
                            borderRadius : '8px'
                        }}
                    >  
                        <div className='flex-column gap-10'>
                            { 
                                <button 
                                    onClick={ handleEdit }
                                    className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'
                                >
                                    <CiEdit fontSize={'1.2rem'} style={{maxWidth : '2rem'}}/> Edit
                                </button>
                            }
                            <button
                                className='btn-none nowrap flex-row items-center gap-10 text-small btn-hover'

                                onClick={ handleDelete }
                            >
                                <MdDeleteOutline fontSize={'1.2rem'} style={{maxWidth : '2rem'}}/>
                                <span>Delete</span>
                            </button>
                        </div>
                    </HoverComponent>
                }
            </div>

            <li className='flex-row gap-10 items-center gap-10 text-small text-bold-sm'>
                <span className='text-small text-bold-sm'>Name : </span>
                <span>{props.data?.name}</span>
            </li>
            <li className='flex-row gap-10 items-center gap-10 text-small text-bold-sm'>
                <span className='text-small text-bold-sm'>Email : </span>
                <span>{props.data?.email}</span>
            </li>
            <li className='flex-row gap-10 items-center gap-10 text-small text-bold-sm'>
                <span className='text-small text-bold-sm'>Phone Number : </span>
                <span>{props.data?.phone_number}</span>
            </li>
        </ul>
    )
}


const AddUser = () => {
    const [users, setUsers] = useState([])
    const [fullUsers, setFullUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchItem = async () => {
        try{
            const response = await fetchTenantUsers();
            setUsers(response.data);
            setFullUsers(response.data)
        }catch(e){
            toast.error("Failed in fetching User.", 1000)
        }

        setLoading(false);
    }

    useEffect(async ()=>{
        fetchItem();
    },[])


    // handling searchPart
    const handleChange = (e) => {
        const searchText = e.target.value;

        if (searchText === null || searchText.length === 0 || searchText === "") {
            setUsers(fullUsers);
            return;
        }

        const filterItem = fullUsers.filter((item) => {
            return item?.name.toLowerCase().includes(searchText.toLowerCase())
        })

        setUsers(filterItem);
    }

    const [addOrEditModal, toggleAddOrEditModal] = useState(false);

    const [userForm, setUserForm] = useState({
        name : '',
        email : '',
        phone_number : '',
        role : ''
    })  

    // Modal View and toggleEdit Button
    const handleToggleModal = () => {
        toggleAddOrEditModal(prev => !prev);
    }

    const handleEditButton = (data) => {
        setUserForm(data);
        handleToggleModal();
    }

    const handleDelete = (data) => {
        const newUser = fullUsers.filter((item) => item.id === data.id);

        setUsers(newUser);
        setFullUsers(newUser);
    }

    const handleEditSuccess = (data) =>{
        const id = data.id;

        let newUserAdded = true;
        const newUserList = fullUsers.reduct( (newList, data) => {
            if(data.id === id){

                data = data.data;

                if(newUserAdded) newUserAdded = false;
            }

            newList.push(data);
            return newList;
        }, [])

        if(newUserAdded) newUserList.push(data.data);

        setUsers(newUserList);
        setFullUsers(newUserList)
    }

    return (
        <div className='add-content-container flex-column flex-1'>
            {
                addOrEditModal && 
                <Modal 
                    show={addOrEditModal}
                    onClick={handleToggleModal}
                >
                    <AddUserModal 
                        closeModal={toggleAddOrEditModal}
                        userForm={userForm}
                        handleResponse = {handleEditSuccess}
                        edit = { userForm.email !== '' }
                    />
                </Modal>
            }

            {
                loading ? 

                <div className="flex-1 flex-row place-item-center">
                    <Loader />
                </div> : 

                <div className='add-content-wrapper flex-column'>

                    <section className='flex-row items-center gap-10 flex-1'>

                        <div className='search-tab input-border flex-1'>
                            <input
                                type={'search'}
                                placeholder="Search User..."
                                onChange={handleChange}
                            />
                        </div>

                        <button onClick={()=>{
                            setUserForm({
                                name : '',
                                email : '',
                                phone_number : '',
                                role : ''
                            })

                            handleToggleModal();

                        }} className='add-btn btn-none btn-outline'>
                            {`Add User`}
                        </button>

                    </section>

                    <section className='all-products-list-wrapper flex-row flex-1'>
                        <div className='all-products-list overflow-scroll flex-1'>
                            {
                                users.length !== 0 ? 
                                users.map((user, index) =>
                                (
                                    <UserCard
                                        key={user.id}
                                        id={user.id}
                                        data={user}
                                        editFunction = {handleEditButton}
                                        deleteFunction = {handleDelete}
                                    />
                                )
                                ) 
                                :
                                <div className='text-medium text-bold-sm flex-1 flex-row place-item-center'>
                                    No User to show
                                </div>
                            }
                        </div>
                    </section>
                </div>
            }


        </div>
    )
}


export default AddUser;