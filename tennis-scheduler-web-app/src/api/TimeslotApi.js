import { axiosInstance } from './AxiosInstance'


export async function getTimeslot() {
    const response = await axiosInstance.get('timeslots/');
    return response;
}

export async function postTimeslot(timeslot) {
    const response = await axiosInstance.post('timeslots/', timeslot);
    return response;
}