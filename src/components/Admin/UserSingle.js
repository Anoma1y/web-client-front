import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
    Container,
    Grid,
    Card,
    Button,
    Accordion,
    Icon,
    Modal,

} from 'semantic-ui-react';
import {
    handleSetUserByID,
    handleChangeIndividualUser,
    setUserKYC,
    setUserSingle,
} from 'actions/admin';
import UserSingleIndividual from './UserSingleIndividual';
import UserSingleLegal from './UserSingleLegal';
import AdminLib from 'libs/ApiLib/AdminLib';

class UserSingle extends Component {
    state = {
        activeIndex: -1,
        deleteUserIsOpen: false,
        blockUserIsOpen: false
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex })
    }

    componentDidMount() {
        const {
            id
        } = this.props.match.params;
        const {
            handleSetUserByID
        } = this.props;
        handleSetUserByID(id)
    }

    handleBlockUser = () => {
        const { id } = this.props.match.params;
        const { setUserSingle } = this.props;
        const { singleUser } = this.props.admin;
        const BLOCK = singleUser.is_blocked !== true;

        AdminLib.blockSingleUser(id, BLOCK).then(() => {
            setUserSingle({
                ...singleUser,
                is_blocked: BLOCK
            });
        }).catch((err) => console.log(err));
        this.setState({
            blockUserIsOpen: false
        })
    }

    handleOpenModalBlock = () => {
        this.setState({
            blockUserIsOpen: true
        });
    }
    handleCloseModalBlock = () => {
        this.setState({
            blockUserIsOpen: false
        })
    }

    handleDeleteUser = () => {
        const { jwt: TOKEN } = this.props.user;
        const { id } = this.props.match.params;
        const { goToUserList } = this.props;
        AdminLib.deleteSingleUser(id, TOKEN).then(() => {
            goToUserList();
        }).catch((err) => console.log(err));
    }

    handleOpenModalDelete = () => {
        this.setState({
            deleteUserIsOpen: true
        });
    }
    handleCloseModalDelete = () => {
        this.setState({
            deleteUserIsOpen: false
        })
    }

    handleRequestKYCUser = () => {
        const { goToUserList } = this.props;
        goToUserList()
    }
    handleKYCAcceptedUser = () => {
        const { id } = this.props.match.params;
        const { setUserSingle } = this.props;
        const { singleUser } = this.props.admin;
        const ACCEPTED = singleUser.is_kyc_passed !== true;

        AdminLib.kycAcceptedSingleUser(id, ACCEPTED).then(() => {
            setUserSingle({
                ...singleUser,
                is_kyc_passed: ACCEPTED
            });
        }).catch((err) => console.log(err));
    }

    renderKYC = () => {
        const {
            kyc_type
        } = this.props.admin.singleUser;
        return (
            <Grid>
                <Grid.Row>
                    { kyc_type === 'individual' ? <UserSingleIndividual /> : kyc_type === 'legal' ? <UserSingleLegal /> : null }
                </Grid.Row>
            </Grid>
        )
    }


    render() {
        const {
            activeIndex,
            deleteUserIsOpen,
            blockUserIsOpen
        } = this.state;
        const {
            singleUser
        } = this.props.admin;
        return (
            <Container>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column>
                            <Card fluid className={"component__main component__shadow"}>
                                <Card.Content>
                                    <Card.Header>
                                        {"User editing"}
                                    </Card.Header>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Modal
                                                    trigger={
                                                        <Button
                                                            floated='right'
                                                            color={"orange"}
                                                            size='small'
                                                            fluid
                                                            style={{fontWeight: 600, fontSize: '14px', textTransform: 'uppercase'}}
                                                            onClick={this.handleOpenModalBlock}
                                                        >
                                                            {singleUser.is_blocked ? 'Unblock' : 'Block'}
                                                        </Button>
                                                    }
                                                    open={blockUserIsOpen}
                                                    onClose={this.handleCloseModalBlock}
                                                    basic
                                                >
                                                    <Modal.Content className={"modal__success"}>
                                                        <Modal.Description>
                                                            <div className={"modal__success_icon modal__error-icon"}>
                                                                <Icon name={"attention"} />
                                                            </div>
                                                            <div className={"modal__success_text black-text"}>
                                                            <span>
                                                                {singleUser.is_blocked ? 'Unlock user?' : 'Block user?'}
                                                            </span>
                                                            </div>
                                                            <div className={"modal__success_btn modal__success-error"}>
                                                                <Button
                                                                    className={"dashboard__submit"}
                                                                    onClick={this.handleBlockUser}
                                                                >{singleUser.is_blocked ?  'Unblock' : 'Block'}
                                                                </Button>
                                                                <Button
                                                                    className={"dashboard__submit auth_btn"}
                                                                    onClick={this.handleCloseModalBlock}
                                                                >Cancel
                                                                </Button>
                                                            </div>
                                                        </Modal.Description>
                                                    </Modal.Content>
                                                </Modal>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Modal
                                                    trigger={
                                                        <Button
                                                            floated='right'
                                                            color={"youtube"}
                                                            size='small'
                                                            fluid
                                                            style={{fontWeight: 600, fontSize: '14px', textTransform: 'uppercase'}}
                                                            onClick={this.handleOpenModalDelete}
                                                        >
                                                            Delete
                                                        </Button>
                                                    }
                                                    open={deleteUserIsOpen}
                                                    onClose={this.handleCloseModalDelete}
                                                    basic
                                                >
                                                    <Modal.Content className={"modal__success"}>
                                                        <Modal.Description>
                                                            <div className={"modal__success_icon modal__error-icon"}>
                                                                <Icon name={"attention"} />
                                                            </div>
                                                            <div className={"modal__success_text black-text"}>
                                                            <span>
                                                                Delete user?
                                                            </span>
                                                            </div>
                                                            <div className={"modal__success_btn modal__success-error"}>
                                                                <Button
                                                                    className={"dashboard__submit"}
                                                                    onClick={this.handleDeleteUser}
                                                                >Delete
                                                                </Button>
                                                                <Button
                                                                    className={"dashboard__submit auth_btn"}
                                                                    onClick={this.handleCloseModalDelete}
                                                                >Cancel
                                                                </Button>
                                                            </div>
                                                        </Modal.Description>
                                                    </Modal.Content>
                                                </Modal>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button
                                                    className={"auth_btn"}
                                                    style={{width: "100%"}}
                                                    onClick={this.handleRequestKYCUser}
                                                >
                                                    Request extra KYC
                                                </Button>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button
                                                    className={"auth_btn"}
                                                    style={{width: "100%"}}
                                                    onClick={this.handleKYCAcceptedUser}
                                                >
                                                    KYC {singleUser.is_kyc_passed ? 'REFUSED' : 'accepted'}
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <div>
                                                    <p>ID : {singleUser.ID}</p>
                                                    <p>Email : {singleUser.email}</p>
                                                    <p>ISBLOCKED : {singleUser.is_blocked === true ? "Yes" : "No"}</p>
                                                    <p>ISKYCPASSED : {singleUser.is_kyc_passed === true ? "Yes" : "No"}</p>
                                                    <p>ISVERIFIED : {singleUser.is_verified === true ? "Yes" : "No"}</p>
                                                    <p>Roles : {singleUser.roles}</p>
                                                    <p>KYCTYPE : {singleUser.kyc_type}</p>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                            <Accordion styled fluid>
                                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                                    <Icon name='dropdown' />
                                                    KYC - {singleUser.kyc_type}
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 0}>
                                                    <div>
                                                        {this.renderKYC()}
                                                    </div>
                                                </Accordion.Content>
                                            </Accordion>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    goToUserList: () => push('/admin/'),
    handleSetUserByID,
    handleChangeIndividualUser,
    setUserKYC,
    setUserSingle
}, dispatch);

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSingle)
