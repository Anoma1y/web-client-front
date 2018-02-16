import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Card,
    Icon
} from 'semantic-ui-react'
import SocialNetworkItem from './SocialNetworkItem'

class SocialNetwork extends Component {
    renderSocialList = () => {
        const { socialNetwork } = this.props.socialNetwork;
        return socialNetwork.map((item, i) => {
            return (
                <SocialNetworkItem key={i} href={item["href"]} iconName={item["name"]} />
            )
        })
    }
    render() {

        return (
            <Card fluid color={'violet'}>
                <Card.Content>
                    {this.renderSocialList()}
                </Card.Content>
            </Card>
        );
    }
}


export default connect(state => ({
    socialNetwork: state.socialNetwork
}),{})(SocialNetwork);