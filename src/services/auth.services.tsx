import axios from "axios";

const API_URL = "http://34.101.145.49:8004/api/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    return axios.post(API_URL + "logout")
    .then(response => {
      if(response.data.status){
        localStorage.removeItem("user");
      }

      return response.data;
    })
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();