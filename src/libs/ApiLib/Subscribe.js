import axios from 'axios';
import Config from 'libs/config';

class Subscribe {

    //Метод для отправки POST запроса - подписку на Бета Тест
    static subscribeToBetaTest(email, android, ios) {
        // const data = {
        //     email,
        //     android: android === true ? 'android' : '',
        //     ios: ios === true ? 'ios' : ''
        // };
        const data = {"email": "rqwerqwer@mail.ru", "android": "", "ios": "ios"};
        return axios.post(Config.subscribeBetaTestURL, data)
    }
}
export default Subscribe;
