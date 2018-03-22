import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Card,
    Progress,
    Divider,
    Modal
} from 'semantic-ui-react';
import SkyLight from 'react-skylight';

class Roadmap extends Component {

    render() {
        const buttonNone = {
            display: 'none'
        };
        const diag = {
            width: '90%',
            marginLeft: '-45%',
            marginTop: '-290px',
            height: '600px',

        };
        const { progressBar } = this.props.roadmap;
        return (
            <div className={'roadmap__wrapper'}>
               <Card fluid className={"component__main component__shadow roadmap"} onClick={() => this.simpleDialog.show()}>
                   <Card.Content>
                       <Card.Header className={"component__title roadmap__title"}>{progressBar}% roadmap progress</Card.Header>
                       <Divider className={"component__divider"} />
                       <Card.Description className={"roadmap__progress"}>
                           <Progress percent={progressBar} size={"tiny"} className={"roadmap__progress_bar"} />
                       </Card.Description>
                   </Card.Content>
               </Card>
                <SkyLight
                    hideOnOverlayClicked
                    closeButtonStyle={buttonNone}
                    dialogStyles={diag}
                    ref={ref => this.simpleDialog = ref}
                >
                    <iframe src="https://tsrpay.com/roadmap" className={'roadmap_modal'} align="center" />
                </SkyLight>
            </div>
        );
    }
}

export default connect(state => ({
    roadmap: state.roadmap
}), {})(Roadmap);
{/*<iframe src="https://tsrpay.com/roadmap" width="100%" height="100%" align="center" />*/}