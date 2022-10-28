import { axiosInstance } from './AxiosInstance'


export async function getTimeslot() {
    const response = await axiosInstance.get('timeslots/');
    return response;
}

export async function postTimeslot(timeslot) {
    const response = await axiosInstance.post('timeslots/', timeslot);
    return response;
}

export async function deleteTimeslot(id) {
    const response = await axiosInstance.put(`timeslots/cancel/${id}`);
    return response;
}

export async function updateTimeslot(id,timeslot) {
    timeslot.id = id;
    const response = await axiosInstance.put(`timeslots/${id}`,timeslot);
    return response;
}

