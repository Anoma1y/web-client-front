import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Container,
    Grid
} from 'semantic-ui-react';
import ApiLib from 'libs/ApiLib/SignUp';
import _ from 'underscore';
import {push} from "react-router-redux";

class VerificationUser extends Component {

    parseURL = () => {
        const { search } = this.props.routing.location;
        return _.object(_.compact(_.map(search.slice(1).split('&'), function(item) {  if (item) return item.split('='); })));
    }

    componentDidMount() {
        const { id, token } = this.parseURL();
        const { redirectToLogin} = this.props;
        ApiLib.verificationUser(id, token)
            .then(() => {
                redirectToLogin();
            })
            .catch(() => {
                redirectToLogin();
            });
    }

    render(){
        return (
            <Container>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                            <h1>Confirmed</h1>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default connect(state => ({ routing: state.routing }), {
    redirectToLogin: () => push('/login')
})(VerificationUser);
