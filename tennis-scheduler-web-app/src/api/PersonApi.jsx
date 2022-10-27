import { axiosInstance } from './AxiosInstance'

export async function login(loginInformations) {
    const response = await axiosInstance.post('authentication/login', loginInformations);
    return response;
}

export async function register(registrationInformations) {
    const response = await axiosInstance.post('persons/', registrationInformations);
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

export async function getTennisPlayers() {
    return await axiosInstance.get('persons/');
}

export async function changePassword(passwordData) {
    return await axiosInstance.put('authentication/change-password', passwordData);
}

export async function changeProfileInformation(personalInformation) {
    return await axiosInstance.put(`persons/${personalInformation.id}`, personalInformation);
}