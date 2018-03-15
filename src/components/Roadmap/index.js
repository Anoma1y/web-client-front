import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Card,
    Progress,
    Divider
} from 'semantic-ui-react';

class Roadmap extends Component {
    render() {
        const { progressBar } = this.props.roadmap;
        return (
            <div>
                <Card fluid className={"component__main component__shadow roadmap"}>
                    <Card.Content>
                        <Card.Header className={"component__title roadmap__title"}>{progressBar}% roadmap progress</Card.Header>
                        <Divider className={"component__divider"} />
                        <Card.Description className={"roadmap__progress"}>
                            <Progress percent={progressBar} size={"tiny"} className={"roadmap__progress_bar"} />
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