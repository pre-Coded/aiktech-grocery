import React, { useEffect, useState } from 'react'
import './Auth.scss'
import { authAPI } from '../../Api';
import { useDispatch } from 'react-redux';
import { actionsCreator } from '../../Redux/actions/actionsCreator';
import { checkValidData, errorMsg, findError, isRequired, storeToken, validate } from '../../Utils';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { DEFAULT_INPUT_ERROR } from '../../Assets/Constant';
import { Login, Signup, Otp, LocationPopUp   } from '../../Components';
import PasswordLogin from './Login/PasswordLogin';
import { useSelector } from 'react-redux';
import { getNearestInventory } from '../../Utils/general-utils'
import useGeoLocation from '../../Hooks/useGeoLocation';

const Auth = (props) => {
    const [username, setUserName] = useState('');
    const [otpScreen, setOtpScreen] = useState(false);
    const [phone_number, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordScreen, setPasswordScreen] = useState(false);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [address_url, setaddressURL] = useState('');
    const [inventory, setInventory] = useState('');
    const [otp, setOtp] = useState('');
    const [token, setToken] = useState('');
    const [showErr, setShowErr] = useState(false);
    const [errors, setErrors] = useState(DEFAULT_INPUT_ERROR);
    const [login_option, setlogin_option] = useState('login');
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const location = useGeoLocation();

    useEffect(()=>{
        if(location.coordinates){
            const inventory = getNearestInventory(inventoryList, location.coordinates.lat, location.coordinates.lng);
            setInventory(inventory)
            console.log(inventory,"nearest inventory is===d")
        }
        location.error?<LocationPopUp/>:(<div></div>)        
    },[location])

    useEffect(() => {
        clearInputs();
    }, [login_option])

    const onChange = (e, key) => {
        const value = e.target.value;
        switch (key) {
            case 'USERNAME':
                setUserName(value);
                validateInput(value, ['isRequired'], 'username');
                break;
            case 'PHONE':
                setPhone(value);
                validateInput(value, ['isRequired', 'isPhone'], 'phone_number');
                break;
            case 'EMAIL':
                setEmail(value);
                validateInput(value, ['isEmail'], 'email');
                break;
            case 'PASSWORD':
                setPassword(value);
                validateInput(value, ['isRequired', 'isValidPassword'], 'password');
                break;
            case 'ADDRESS':
                setAddress(value);
                validateInput(value, ['isRequired'], 'address');
            case 'COORDINATES':
                setCoordinates(value);
                validateInput(value, ['isRequired'], 'coordinates');
            case 'OTP':
                setOtp(value);
                validateInput(value, ['isRequired'], 'otp');
                break;
        }
    }

    // const validateInput = (value, rules, key) => {
    //     const { error = false, msg = '' } = validate(value, rules)
    //     setErrors({ ...errors, [key]: { error, msg } });
    // };
    const validateInput = (value, rules, key) => {
        let validationRules = ['isRequired'];
    
        if (key === 'password') {
            // Additional password validation rules
            validationRules = validationRules.concat(['isValidPassword']);
        }
    
        const { error = false, msg = '' } = validate(value, validationRules);
        setErrors({ ...errors, [key]: { error, msg } });
    };

    const isValidPassword = (value) => {
        // Example: Minimum 8 characters, at least one letter, and one number
        const minLength = 8;
        const containsLetter = /[a-zA-Z]/.test(value);
        const containsNumber = /\d/.test(value);
    
        return (
            value.length >= minLength &&
            containsLetter &&
            containsNumber
        );
    };

    const register = async () => {
        setLoading(true)
        try {
            if(inventory===null){
                toast.error("your location cannot be delivered");
            }

            const payload = {
                name: username,
                password,
                // password2: password,
                phone_number,
                role: 'C',
                address,
                inventory,
                coordinates,
                device_id: ''
            }
            if (email) {
                payload['email'] = email;
            }
            const validationError = checkValidData(payload, errors);
            if (!validationError) {
                const res = await authAPI.register(payload);
                const status = get(res, 'data.status');
                if (status === 201) {
                    toast.success('User is registered successfully');
                    setShowErr(false);
                    sendOtp();
                }
            }
            else {
                setShowErr(true);
            }
            setLoading(false)

        } catch (error) {
            const msg = errorMsg(error);
            const status = get(error, 'response.status');
            if (status === 400) {
                const messages = get(error, 'response.data.data', {});
                showErrors(messages);
            }
            else {
                toast.error(msg)
            }
            setLoading(false)
        }
    }

    const showErrors = (messages) => {
        setShowErr(true);
        let errorList = { ...errors };
        for (let key of Object.keys(messages)) {
            console.log(key, errorList[key]);
            errorList[key] = {
                error: true,
                msg: messages[key] ? messages[key][0] : messages[key]
            }
        }
        setErrors(errorList);
    }

    const sendOtp = async (message) => {
        setLoading(true)
        try {
            const payload = {
                phone_number
            }
            const res = await authAPI.sendOtp(payload);
            if (res) {
                const otpToken = get(res, 'data.data.Details')
                setToken(otpToken)
                setOtpScreen(true);
                if (message) {
                    toast.success('OTP is sent successfully');
                    setLoading(false)
                }
            }
        } catch (error) {
            const msg = errorMsg(error);
            toast.error(msg);
            setLoading(false)
        }
    }

    const verifyOtp = async () => {
        setLoading(true)
        try {
            const payload = {
                phone_number,
                token,
                otp
            }
            const validationError = checkValidData(payload, errors);
            if (!validationError) {
                const res = await authAPI.verifyOtp(payload);
                setOtpScreen(false);
                loginSuccess(res)
            }
            else {
                setShowErr(true);
            }
            setLoading(false)

        } catch (error) {
            const status = get(error, 'response.data.data.Status');
            const statusCode = get(error, 'response.data.data.code');
            if (status === "Error" && statusCode === 400) {
                toast.error('Please enter the correct OTP');
            }
            else {
                const msg = errorMsg(error);
                toast.error(msg);
            }
            setLoading(false)
        }
    }

    const loginHandler = async () => {
        try {
            const payload = {
                phone_number,
                password
            }
            const validationError = checkValidData(payload, errors);
            if (!validationError) {
                const res = await authAPI.login(payload);
                setPasswordScreen(true);
                if (res) {
                    const statusCode = get(res, 'data.status');
                    if (statusCode === 200) {
                        loginSuccess(res)
                    }
                }
            }
            else {
                setShowErr(true);
            }

        } catch (error) {
            const msg = errorMsg(error);
            const isVerified = get(error, 'response.data.is_verified');
            if (isVerified === 'false') {
                toast.error('Please verify your phone number');
                setShowErr(false);
                sendOtp();
                setOtpScreen(true);
            }
            else {
                toast.error(msg);
            }
        }
    }

    const loginSuccess = (res) => {
        toast.success('User is logged in successfully');
        const token = get(res, 'data.token.access');
        const userData = get(res, 'data.user', {});
        storeToken(token);
        dispatch(actionsCreator.SET_LOGIN({ isLoggedIn: true, showLoginPopup: false }));
        dispatch(actionsCreator.SET_USER_DETAILS(userData));
        dispatch(actionsCreator.FETCH_USER_DETAILS());
        dispatch(actionsCreator.UPDATE_CART_DETAILS());
    }

    const clearInputs = () => {
        setUserName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setPasswordScreen(false);
        setOtpScreen(false);
        setOtp('');
        setToken('');
        setErrors(DEFAULT_INPUT_ERROR)
        setShowErr(false);
    }

    const controls = { phone_number, username, email, otp, address, password, coordinates };

    return (
        <div className='login-wrapper'>
          <div className="login-container">
            <div className='login-options'>
              <h5 className={login_option === 'login' ? 'login-head highlighted-head' : 'login-head'} onClick={() => { setlogin_option('login'); }} >Login</h5>
              <h5 className={login_option === 'signup' ? 'signup-head highlighted-head' : 'signup-head'} onClick={() => { setlogin_option('signup'); }} >Sign-Up</h5>
            </div>
            <hr className={login_option === 'login' ? 'login-left-hr' : 'login-right-hr'} />
      
            {login_option === 'login'
              ? otpScreen
                ? <Otp controls={controls} submitHandler={verifyOtp} onChange={onChange} errors={errors} showErr={showErr} sendOtp={sendOtp} loading={loading} />
                : (
                  <>
                    <Login controls={controls} submitHandler={sendOtp} onChange={onChange} errors={errors} showErr={showErr} loading={loading} />
                    <PasswordLogin controls={controls} submitHandler={loginHandler} onChange={onChange} errors={errors} showErr={showErr} loading={loading} />
                  </>
                )
              : otpScreen
                ? <Otp controls={controls} submitHandler={verifyOtp} onChange={onChange} errors={errors} showErr={showErr} sendOtp={sendOtp} loading={loading} />
                : <Signup controls={controls} submitHandler={register} onChange={onChange} errors={errors} showErr={showErr} loading={loading} />
            }
          </div>
        </div>
      )
      
}

export default Auth
