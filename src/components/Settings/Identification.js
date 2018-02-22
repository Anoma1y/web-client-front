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
        return (
            <Card fluid className={""}>
                <Card.Content>
                    <Card.Header>Идентификация</Card.Header>
                    <Divider className={"white__divider"}/>
                    <Grid className={"dashboard__component"}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button
                                    inverted
                                    color={'orange'}
                                    onClick={() => this.setState({templateForm: 1})}
                                >Individual user
                                </Button>
                                <Button
                                    inverted
                                    color={'orange'}
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
                                <Button fluid>Сохранить изменения</Button>
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