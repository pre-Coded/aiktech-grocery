import requestMaker from '../Lib';

export const register = (data) => {
    const url = `/account/register/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'post', { params, payload });
};

export const sendOtp = (data) => {
    const { phone_number } = data;
    const url = `/account/sendotp/${phone_number}/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'post', { params, payload });
};

export const verifyOtp = (data) => {
    const { phone_number, token, otp } = data;
    const url = `/account/verifyotp/${phone_number}/${token}/${otp}/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'get', { params, payload });
};

export const login = (data) => {
    const url = `/account/login/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'post', { params, payload });
};

export const fetchUserDetails = (data) => {
    const url = `/account/userprofile/`;
    const params = {};
    const payload = {};
    return requestMaker(url, 'get', { params, payload });
};

export const searchUser = (data) => {
    const { query } = data;
    const url = `/shop/usersearch/${query}/`;
    const params = {};
    const payload = {};
    return requestMaker(url, 'get', { params, payload });
};

export const company = (data) => {
    const url = `/account/company/`;
    const params = {};
    const payload = {};
    return requestMaker(url, 'get', { params, payload });
};

export const updateUserInventory = (data) => {
    const url = `/account/user/updateInventory/`;
    const params = {...data};
    const payload = {};
    return requestMaker(url, 'get', { params, payload });
};
export const checkAdmin = (data) => {
    const url = `/account/user/admin/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'get', { params, payload });
};

