import axios from "axios";
class UsersService {
    async getUsers(){
        return await axios.get(`/users`);
    }
}
export default new UsersService()