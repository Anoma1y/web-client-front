import React from 'react';
import {
    Container
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container className={'auth__container'}>
            <div className={'not__found'}>
                <p className={'not__found_title'}>404</p>
                <p className={'not__found_text'}>Page not found</p>
                <Link to={localStorage.jwt !== undefined ? '/dashboard/' : '/'} className={'not__found_link'}> Go to your account </Link>
            </div>
        </Container>
    )   
};
export default NotFound;