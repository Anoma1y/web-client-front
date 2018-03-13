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

        return axios.post(Config.subscribeBetaTestURL, data)
    }
}
export default Subscribe;

//Страница для заявки по ID - /admin/application/"ID"
//Страница для пользователя по ID - /admin/users/"ID"
