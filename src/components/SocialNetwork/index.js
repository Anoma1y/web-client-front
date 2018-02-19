import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Grid,
    Segment,
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
            <Segment style={{padding: "0", textAlign: "center"}}>
                <Grid>
                    <Grid.Row centered columns={"equal"}>

                        {this.renderSocialList()}

                    </Grid.Row>

                </Grid>
            </Segment>
        );
    }
}


export default connect(state => ({
    socialNetwork: state.socialNetwork
}),{})(SocialNetwork);