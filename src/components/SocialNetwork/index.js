import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Card,
    List,
    Segment
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
            <Segment>
                <List>
                    {this.renderSocialList()}
                </List>
            </Segment>

        );
    }
}


export default connect(state => ({
    socialNetwork: state.socialNetwork
}),{})(SocialNetwork);
{/*<Card fluid color={'violet'}>*/}
{/*<Card.Content>*/}
{/*{this.renderSocialList()}*/}
{/*</Card.Content>*/}
{/*</Card>*/}