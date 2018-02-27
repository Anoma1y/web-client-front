import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Email from './screens/Email';
import Password from  './screens/Password';
import Confirmation from './screens/Confirmation';

const ResetPassword = ({ match }) => (
    <div>
        <main>
            <Switch>
                <Route exact path={`${match.url}`} component={Email} />
                <Route exact path={`${match.url}/confirmation`} component={Confirmation} />
                <Route exact path={`${match.url}/password`} component={Password} />
            </Switch>
        </main>
    </div>
);

export default ResetPassword;