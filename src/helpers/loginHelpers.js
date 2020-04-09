import * as requestHelpers from './requestHelpers';

export const login = async (email, password) => {
    const result = await requestHelpers.postData(`${process.env.REACT_APP_SERVER_URL}/api/login`, {email: email, password: password});
    console.log(result);
    return result;
}