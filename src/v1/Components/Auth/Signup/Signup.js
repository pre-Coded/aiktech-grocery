import React, { useEffect, useState } from 'react'
import '../Auth.scss';
import { Button, InputField } from '../../../Components';
import { findError } from '../../../Utils';
import AddressForm from '../../AddressForm';
export default function Signup({ submitHandler, controls, errors, showErr, onChange, loading }) {
    const { phone_number, email, password, username, addressurl, coordinates, } = controls;
    const [signupAddress, setSignupAddress] = useState('')

    const addressSetter = (item, area, coords = { lat: "", lng: "" }) => {
        // setSignupAddress(item)
        let address = {
            'target': {
                'value': item
            }
        }
        let coordinates = {
            'target': {
                'value': coords
            }
        }
        let inventory = {
            'target': {
                'value': area
            }
        }
        onChange(address, 'ADDRESS');
        onChange(inventory, 'INVENTORY');
        onChange(coordinates, 'COORDINATES');

        console.log(address)
        console.log(inventory)
        console.log(coordinates)
    }

    useEffect(() => {
        console.log('updating')
        console.log(signupAddress)
    }, [signupAddress])

    return (
        <div className="signup-content">

            <InputField
                type='text'
                placeholder='Name'
                value={username}
                onChange={(e) =>
                    onChange(e, 'USERNAME')}
                error={findError('username', errors, showErr)}
            />

            <InputField
                type="email"
                placeholder='E-mail'
                value={email}
                onChange={(e) =>
                    onChange(e, 'EMAIL')}
                error={findError('email', errors, showErr)}
            />

            <InputField
                type='number'
                placeholder='Mobile Number'
                value={phone_number}
                onChange={(e) =>
                    onChange(e, 'PHONE')}
                error={findError('phone_number', errors, showErr)}
            />

            <AddressForm labels=''
                showButton={false}
                isSignup={true}
                addressSetter={addressSetter}
            />

            <InputField type="password"
                placeholder='Password'
                value={password}
                onChange={(e) =>
                    onChange(e, 'PASSWORD')}
                error={findError('password', errors, showErr)}
            />

            <Button
                loading={loading}
                text={'Register'}
                width='80%'
                margin='0.5rem auto'
                type={'button'}
                clicker={submitHandler}
            />

        </div>
    )
}