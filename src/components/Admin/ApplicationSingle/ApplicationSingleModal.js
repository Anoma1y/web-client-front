import React from 'react';
import {
    Modal,
    Button,
    Grid,
    Icon
} from 'semantic-ui-react'

const ApplicationSingleModal = ({triggerOpen, error, handleSend, handleClose, handleOpen}) => {
    return (
        <Modal
            trigger={<Button
                onClick={handleOpen}
                className={"auth_btn"}
                floated={"right"}
            >Save Changes
            </Button>}
            open={triggerOpen}
            onClose={handleClose}
            basic
            size='small'
        >
            <Modal.Content className={"modal__success"}>
                <Modal.Description>
                    <div className={error === null ? "modal__success_icon" : "modal__success_icon modal__error-icon"}>
                        <Icon name={error === null ? "check circle outline" : "warning circle"} />
                    </div>
                    <div className={"modal__success_text betatest__modal_text"}>
                        <span>{error === null ? "Change applications?" : error}</span>
                    </div>
                    <div>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Button
                                        className={"auth_btn"}
                                        onClick={handleSend}
                                    > Ok
                                    </Button>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Button
                                        className={"auth_btn"}
                                        onClick={handleClose}
                                    > Cancel
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )   
};
export default ApplicationSingleModal;