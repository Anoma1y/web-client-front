import Config from 'libs/config';
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import _ from 'underscore';


class PayLib {
    static getPaymentData(ID) {
        return new Promise((res, rej) => {
            res({
                TYPE: 'eth',
                ADDRESS: uuidv1(),
                EXPECTED_VALUE: _.random(1,150)
            })
        });
    }
}
export default PayLib;