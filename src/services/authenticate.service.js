import axios from "axios";
class AuthenticateService {
  async createAccount(email, username, password) {
    return await axios.post("authenticate/register", {
      email: email,
      username: username,
      password: password
    });
  }
  async login(username, password) {
    return await axios.post("authenticate/login", {
      username: username,
      password: password
    });
  }
}
export default new AuthenticateService();
