import { axiosInstance } from './AxiosInstance'

export async function getTennisCourts() {
  const response = await axiosInstance.get('tennis-courts/');
  return response;
}

