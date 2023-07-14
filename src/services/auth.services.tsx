import axios from "axios";
import authHeader from "../services/auth-header.services";

const API_URL = "http://34.101.145.49:8004/api/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    const config = {
      headers: authHeader(),
    };
    const bodyParameters = {
      key: "value",
    };
    return axios
      .post(API_URL + "logout", bodyParameters, config)
      .then((response) => {
        if (response.data.status) {
          localStorage.removeItem("user");
        }

        return response.data;
      });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
