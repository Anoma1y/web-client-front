import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Card,
    Icon
} from 'semantic-ui-react'
import SocialNetworkItem from './SocialNetworkItem'

class SocialNetwork extends Component {
    render() {
        const { }
        return (
            <Card fluid color={'violet'}>
                <Card.Content>

                </Card.Content>
            </Card>
        );
    }
}


export default connect(state => {
    socialNetwork: state.socialNetwork
},{})(SocialNetwork);