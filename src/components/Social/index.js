import React, { Component } from 'react';
import {
    Card,
    Icon
} from 'semantic-ui-react'
import SocialItem from './SocialItem'

class Social extends Component {
    constructor(props) {
      super(props);
      this.state = {
          socialNetwork: [{},{},{},{},{},{},{},{}]
      }
    }
    render() {
        return (
            <Card fluid color={'violet'}>
                <Card.Content>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"facebook f"} />
                    </Card.Description>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"vk"} />
                    </Card.Description>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"twitter"} />
                    </Card.Description>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"telegram"} />
                    </Card.Description>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"instagram"} />
                    </Card.Description>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"medium"} />
                    </Card.Description>
                    <Card.Description style={{ marginBottom: "30px" }}>
                        <Icon name={"reddit alien"} />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}


export default Social;