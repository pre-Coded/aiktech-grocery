import requestMaker from '../Lib';

export const handlePaymentSuccess = (payload) => {
    const url = `/payments/success/`;
    const params = {};
    return requestMaker(url, 'post', { params, payload });
};

export const handlePaymentFailure = (payload) => {
    const url = `/payments/failure/`;
    const params = {};
    return requestMaker(url, 'post', { params, payload });
};

