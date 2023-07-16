import axios from "axios";
import authHeader from "../services/auth-header.services";

const API_URL = "http://34.101.145.49:8004/api/";

class UnitKerjaService {
  get() {
    return axios
      .get(API_URL + `unit`,{
        headers: authHeader()
      })
      .then(async (response) => {
        return response.data;
      });
  }

}

export default new UnitKerjaService();
