import Config from 'libs/config';
import axios from 'axios';

class AdminLib {
    static getAllApplication() {}

    static getApplicationByID() {}


    static getAllUsers() {
        const URL = Config.url + "admin/profile";
        const ADMIN_TOKEN = localStorage.getItem("jwt");
        const header = {
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
        }
        return axios.get(URL,
            header
        )

    }

    static getUsersById() {}
}

export default AdminLib;