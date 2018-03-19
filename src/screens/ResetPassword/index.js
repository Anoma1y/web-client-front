import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Email from './screens/Email';
import Password from  './screens/Password';
import Confirmation from './screens/Confirmation';
import { Container } from 'semantic-ui-react'

const ResetPassword = ({ match }) => (
    <Container className={'auth__container'}>
        <main>
            <Switch>
                <Route exact path={`${match.url}`} component={Email} />
                <Route exact path={`${match.url}/confirmation`} component={Confirmation} />
                <Route exact path={`${match.url}/password`} component={Password} />
            </Switch>
        </main>
    </Container>
);

export default ResetPassword;