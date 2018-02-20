import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Progress } from 'semantic-ui-react';

class Roadmap extends Component {
    render() {
        const { progressBar } = this.props.roadmap;
        return (
            <div>
                <Card fluid color={'violet'} className={"component__main"}>
                    <Card.Content>
                        <Card.Header>{progressBar}% roadmap progress</Card.Header>
                        <Card.Description className={"roadmap__progress"}>
                            <Progress percent={progressBar} size={"small"} className={"roadmap__progress_bar"} />
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default connect(state => ({
    roadmap: state.roadmap
}), {})(Roadmap);