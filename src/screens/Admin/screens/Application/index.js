import React, { Component } from 'react';
import ApplicationComponent from 'components/Admin/ApplicationComponent';
import AdminMenu from 'components/Admin/AdminMenu';

class Application extends Component {
    render() {
        return (
            <div>
                <AdminMenu />
                <ApplicationComponent />
            </div>
        );
    }
}

export default Application;
