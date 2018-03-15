import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setApplicationSingle
} from 'actions/admin';
import {
    Grid
} from 'semantic-ui-react'

import AdminLib from 'libs/ApiLib/AdminLib';

class ApplicationSingle extends Component {

    
    componentDidMount() {
        const {
            id
        } = this.props.match.params;
        const {
            setApplicationSingle
        } = this.props;
        AdminLib.getApplicationByID(id)
            .then((data) => {
                const APPLICATION =  {
                    CreatedAt: data.data.CreatedAt,
                    ID: data.data.ID,
                    amount: data.data.amount,
                    currency: data.data.currency,
                    comment: data.data.comment,
                    profile: {
                        ID: data.data.profile.ID,
                        CreatedAt: data.data.profile.CreatedAt,
                        email: data.data.profile.email,
                        is_kyc_passed: data.data.profile.is_kyc_passed,
                        is_verified: data.data.profile.is_verified,
                        kyc_type: data.data.profile.kyc_type,
                        roles: data.data.profile.role,
                    },
                    status: data.data.status
                }
                setApplicationSingle(APPLICATION);
            })
            .catch((err) => {
                console.log(err);
            })
        
        
    }

    render() {
        
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <h1>{this.props.admin.singleApplication.ID}</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {
    setApplicationSingle
})(ApplicationSingle);
