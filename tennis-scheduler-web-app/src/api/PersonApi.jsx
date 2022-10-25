import { axiosInstance } from './AxiosInstance'

export async function login(loginInformations) {
    const response = await axiosInstance.post('authentication/login', loginInformations);
    return response;
}

export async function getLoggedUser() {
    const response = await axiosInstance.get('authentication/logged-user');
    return response;
}

export async function getUserById(id) {
    const response = await axiosInstance.get(`persons/${id}`);
    return response;
}