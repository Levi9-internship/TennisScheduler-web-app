import axios from "axios";

export async function getTennisCourts() {
  return axios.get(process.env.REACT_APP_TENNIS_COURTS);
}
