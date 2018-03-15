import Config from 'libs/config';
import axios from 'axios';

class AdminLib {
    static getAllApplication() {
        const URL = Config.url + "admin/application";
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

    static getApplicationByID(id) {
        const URL = Config.url + `admin/application/${id}`;
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

    static editApplication(id, data) {
        const URL = Config.url + `admin/application/${id}`;
        const ADMIN_TOKEN = localStorage.getItem("jwt");
        const header = {
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
        }
        return axios.put(URL,
            data,
            header
        )
    }

    static deleteApplication(id) {
        const URL = Config.url + `admin/application/${id}`;
        const ADMIN_TOKEN = localStorage.getItem("jwt");
        const header = {
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
        }
        return axios.delete(URL,
            header
        )
    }

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

    static getUsersById(id) {
        const URL = Config.url + `admin/profile/${id}`;
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
}

export default AdminLib;