import * as requestHelpers from './requestHelpers';

export const login = async (email, password) => {
    const response = await requestHelpers.postData('http://localhost:8080/api/login', {email: email, password: password})
    console.log(response)
}