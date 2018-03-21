import Config from 'libs/config';
import axios from 'axios';

class AdminLib {
    static getAllApplication() {
        const URL = Config.url + "admin/application";
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.get(URL,
            header
        )
    }

    static getApplicationByID(id) {
        const URL = Config.url + `admin/application/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.get(URL,
            header
        )
    }

    static editApplication(id, data) {
        const URL = Config.url + `admin/application/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.put(URL,
            data,
            header
        )
    }

    static deleteApplication(data) {
        const URL = Config.url + `admin/application?ids=${data}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.delete(URL,
            header
        )
    }

    static getAllUsers() {
        const URL = Config.url + "admin/profile";
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.get(URL,
            header
        )
    }

    static getUsersById(id) {
        const URL = Config.url + `admin/profile/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.get(URL,
            header
        )
    }

    static getKYCById(id) {
        const URL = Config.url + `admin/kyc/${id}`;
        const jwt = localStorage.jwt;
        return axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        )
    }

    static getKYCImage(id) {
        const url = `${Config.url}admin/file?ids=${id}`;
        const jwt = localStorage.jwt;
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
    }

    static deleteSingleUser(id) {
        const URL = Config.url + `admin/profile/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.delete(URL,
            header
        )
    }

    static blockSingleUser(id, data) {
        const URL = Config.url + `admin/profile/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.put(URL, {'is_blocked': data},
            header
        )
    }

    static kycAcceptedSingleUser(id, data) {
        const URL = Config.url + `admin/profile/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.put(URL, {'is_kyc_passed': data},
            header
        )
    }

    static changeRoleSingleUser(id, data) {
        const URL = Config.url + `admin/profile/${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.put(URL, {'roles': data},
            header
        )
    }

    static deleteUser(id) {
        const URL = Config.url + `admin/profile?ids=${id}`;
        const jwt = localStorage.jwt;
        const header = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios.delete(URL,
            header
        )
    }

}

export default AdminLib;