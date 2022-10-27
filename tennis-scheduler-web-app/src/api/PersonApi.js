import { axiosInstance } from './AxiosInstance'


export async function getPerson() {
    const response = await axiosInstance.get('persons/');
    return response;
}