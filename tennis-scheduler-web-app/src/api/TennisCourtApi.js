
import { axiosInstance } from './AxiosInstance'

export async function getTennisCourts() {
  const response = await axiosInstance.get('tennis-courts/');
  return response;
}

export async function getTennisCourt(tennisCourtId) {
  const response = await axiosInstance.get(`tennis-courts/${tennisCourtId}`);
  return response;
}

export async function addTennisCourt(tennisCourt) {
  const response = await axiosInstance.post('tennis-courts/', tennisCourt);
  return response;
}

export async function changeTennisCourt(tennisCourt) {
  const response = await axiosInstance.put('tennis-courts/', tennisCourt);
  return response;
}

export async function deleteTennisCourt(tennisCourtId) {
  const response = await axiosInstance.delete(`tennis-courts/${tennisCourtId}`);
  return response;
}


