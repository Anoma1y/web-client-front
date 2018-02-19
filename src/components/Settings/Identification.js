import React from 'react'
import { connect } from 'react-redux';
import { Button, Card, Divider} from 'semantic-ui-react'

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
        switch (this.state.templateForm) {
            case 1:
                return this.props.settings.individualUser.map((item) => {
                    return (
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            key={item.id}
                        />
                    )
                });
            case 2:
                return this.props.settings.legalEntity.map((item) => {
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
            <Card fluid color={'violet'}>
                <Card.Content>
                    <Card.Header>Идентификация</Card.Header>
                    <Divider />
                    <Card.Description style={{marginBottom: 15}}>
                        <Button.Group>
                            <Button inverted color={'orange'}
                                onClick={() => this.setState({templateForm: 1})}
                            >
                                Individual user
                            </Button>
                            <Button inverted color={'orange'}
                                    onClick={() => this.setState({templateForm: 2})}
                            >
                                Legal entity
                            </Button>
                        </Button.Group>
                    </Card.Description>
                    {this.renderUploadForm()}
                    <Button fluid>Сохранить изменения</Button>
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