import React from 'react'
import { connect } from 'react-redux';
import {
    Button,
    Card,
    Divider,
    Grid
} from 'semantic-ui-react'

import IdentificationImgUpload from './IdentificationImgUpload'

class Identification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateForm: 1
        }
    }

    renderUploadForm() {
        // TODO: Add constants to form type
        const { individualUser, legalEntity } = this.props.settings;
        switch (this.state.templateForm) {
            case 1:
                return individualUser.map((item) => {
                    return (
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            key={item.id}
                        />
                    )
                });
            case 2:
                return legalEntity.map((item) => {
                    return (
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            key={item.id}
                        />
                    )
                });
            default:
                return
        }
    }

    renderForm() {
        const { templateForm } = this.state;
        return (
            <Card fluid className={"settings__identification"}>
                <Card.Content>
                    <Card.Header>Identification</Card.Header>
                    <Divider className={"white__divider"}/>
                    <Grid className={"dashboard__component"}>
                        <Grid.Row className={"settings__identification_header"}>
                            <Grid.Column>
                                <Button
                                    circular
                                    size={"small"}
                                    className={templateForm === 1 ? "setting__header_button setting__header_button-active" : "setting__header_button"}
                                    onClick={() => this.setState({templateForm: 1})}
                                >Individual user
                                </Button>
                                <Button
                                    circular
                                    size={"small"}
                                    className={templateForm === 2 ? "setting__header_button setting__header_button-active" : "setting__header_button"}
                                    onClick={() => this.setState({templateForm: 2})}
                                >Legal entity
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.renderUploadForm()}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button
                                    className={"setting__button"}
                                    fluid
                                    circular
                                >Save changes
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }
}

export default connect((state) => ({
    settings: state.settings
}), {})(Identification);