import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Progress } from 'semantic-ui-react';


class Roadmap extends Component {
    render() {
        const { progressBar } = this.props.roadmap;
        return (
            <div>
                <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                    <Card.Content>
                        <Card.Header>{progressBar}% Roadmap progress</Card.Header>
                        <Card.Description style={{marginTop: "25px"}}>
                            <Progress percent={progressBar} size={"small"} color={"yellow"}/>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}


export default connect(state => ({ roadmap: state.roadmap }), {})(Roadmap);