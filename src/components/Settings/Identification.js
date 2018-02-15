import React from 'react'
import { Button, Card, Divider, Input} from 'semantic-ui-react'

import IdentificationImgUpload from './IdentificationImgUpload'

class Identification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateForm: 1
        }
    }

    renderUploadForm() {

        const text = 'Cras consectetur ac metus vitae lobortis. In pulvinar urna nunc, quis gravida ante ultrices vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'

        if (this.state.templateForm === 1) {
            return (
                <div>
                    <IdentificationImgUpload
                        description={text}
                    />
                    <IdentificationImgUpload
                        description={text}
                    />
                </div>
            )
        } else if (this.state.templateForm === 2) {
            return (
                <div>
                    <IdentificationImgUpload
                        description={text}
                    />
                    <IdentificationImgUpload
                        description={text}
                    />
                    <IdentificationImgUpload
                        description={text}
                    />
                    <IdentificationImgUpload
                        description={text}
                    />
                    <IdentificationImgUpload
                        description={text}
                    />
                </div>
            )
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

export default Identification;