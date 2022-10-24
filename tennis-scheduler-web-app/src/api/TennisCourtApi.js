import axios from "axios";

let baseUrl = "http://localhost:8081/tennis-courts/";

export async function getTennisCourts() {
  return axios.get(baseUrl);
}
