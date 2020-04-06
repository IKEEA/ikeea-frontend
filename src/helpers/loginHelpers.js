import * as requestHelpers from './requestHelpers';
import * as configuration from './../constants/configuration.constants';

export const login = async (email, password) => {
    const result = await requestHelpers.postData(`${configuration.DEV_SERVER_URL}/api/login`, {email: email, password: password});
    console.log(result);
    return result;
}