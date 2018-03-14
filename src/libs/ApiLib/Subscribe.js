import axios from 'axios';
import Config from 'libs/config';

class Subscribe {

    //Метод для отправки POST запроса - подписку на Бета Тест
    static subscribeToBetaTest(email, android, ios) {
        const data = {
            email,
            android: android === true ? 'android' : '',
            ios: ios === true ? 'ios' : ''
        };
        return axios.post(Config.subscribeBetaTestURL, JSON.stringify(data))
    }
}
export default Subscribe;
