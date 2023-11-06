import requestMaker from '../Lib';

export const fetchAddresses = (data) => {
    const url = `/account/add_alternative/`;
    const params = { ...data };
    const payload = {};
    return requestMaker(url, 'get', { params, payload });
};

export const addAddresses = (data) => {
    const url = `/account/add_alternative/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'post', { params, payload });
};

export const editAddresses = (data) => {
    const url = `/account/add_alternative/`;
    const params = {};
    const payload = { ...data };
    return requestMaker(url, 'patch', { params, payload });
};