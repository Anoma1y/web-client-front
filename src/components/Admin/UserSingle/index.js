import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import {
    Container,
    Grid,
    Card,
    Button,
    Icon,
    Modal,
    Form,
    Radio
} from 'semantic-ui-react';
import {
    handleSetUserByID,
    setUserSingle,
    resetAdminState
} from 'actions/admin';
import UserSingleIndividual from './UserSingleIndividual';
import UserSingleLegal from './UserSingleLegal';
import UserSingleInfo from './UserSingleInfo';
import AdminLib from 'libs/ApiLib/AdminLib';

class UserSingle extends Component {
    state = {
        currentRole: '',
        deleteUserIsOpen: false,
        blockUserIsOpen: false,
        rolesUserIsOpen: false,
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
        const { goToUserList, resetAdminState } = this.props;
        AdminLib.deleteSingleUser(id, TOKEN).then(() => {
            resetAdminState();
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
        // const { goToUserList } = this.props;
        // goToUserList();
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

    handleChangeRadioRoles = (e, { value }) => this.setState({ currentRole: value });

    handleOpenModalRoles = () => {
        this.setState({
            rolesUserIsOpen: true
        })
    }
    handleCloseModalRoles = () => {
        this.setState({
            rolesUserIsOpen: false
        })
    }
    backToUserList = () => {
        const { goToUserList, resetAdminState } = this.props;
        resetAdminState();
        goToUserList();
    }
    handleChangeRoles = () => {
        const { currentRole } = this.state;
        const { id } = this.props.match.params;
        const { setUserSingle } = this.props;
        const { singleUser } = this.props.admin;
        if (currentRole !== '') {
            AdminLib.changeRoleSingleUser(id, currentRole).then(() => {
                setUserSingle({
                    ...singleUser,
                    roles: currentRole
                });
            }).catch((err) => console.log(err));
        }
        this.setState({
            rolesUserIsOpen: false
        })
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
            deleteUserIsOpen,
            blockUserIsOpen,
            rolesUserIsOpen,
            currentRole
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
                                        <p onClick={this.backToUserList} style={{display: 'block', marginBottom: '20px', cursor: 'pointer', color: 'rgba(0, 79, 206, 1)'}}>Back to User</p>
                                    </Card.Header>
                                    <Grid>
                                        <Grid.Row centered>
                                            <Grid.Column width={3}>
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
                                            <Grid.Column width={3}>
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
                                            <Grid.Column width={3}>
                                                <Button
                                                    className={"auth_btn"}
                                                    style={{width: "100%"}}
                                                    onClick={this.handleRequestKYCUser}
                                                >
                                                    Request extra KYC
                                                </Button>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Button
                                                    className={"auth_btn"}
                                                    style={{width: "100%"}}
                                                    onClick={this.handleKYCAcceptedUser}
                                                >
                                                    KYC {singleUser.is_kyc_passed ? 'REFUSED' : 'accepted'}
                                                </Button>
                                            </Grid.Column>
                                            {
                                                Number(this.props.user.ID) !== Number(this.props.match.params.id) ?
                                                    <Grid.Column width={3}>
                                                        <Modal
                                                            trigger={
                                                                <Button
                                                                    className={"auth_btn"}
                                                                    style={{width: "100%"}}
                                                                    onClick={this.handleOpenModalRoles}
                                                                >
                                                                    Change Roles
                                                                </Button>
                                                            }
                                                            open={rolesUserIsOpen}
                                                            onClose={this.handleCloseModalRoles}
                                                            basic
                                                        >
                                                            <Modal.Content className={"modal__success"}>
                                                                <Modal.Description>
                                                                    <div className={"modal__success_icon"}>
                                                                        <Icon name={"attention"} />
                                                                    </div>
                                                                    <div className={"modal__success_text black-text"}>
                                                                        <Form>
                                                                            <Form.Field>
                                                                                Selected role: <b>{singleUser.roles}</b>
                                                                            </Form.Field>
                                                                            <Form.Field>
                                                                                <Radio
                                                                                    label='User'
                                                                                    name='radioGroup'
                                                                                    value='user'
                                                                                    checked={currentRole === 'user'}
                                                                                    onChange={this.handleChangeRadioRoles}
                                                                                />
                                                                            </Form.Field>
                                                                            <Form.Field>
                                                                                <Radio
                                                                                    label='Admin'
                                                                                    name='radioGroup'
                                                                                    value='admin'
                                                                                    checked={currentRole === 'admin'}
                                                                                    onChange={this.handleChangeRadioRoles}
                                                                                />
                                                                            </Form.Field>
                                                                        </Form>
                                                                    </div>
                                                                    <div className={"modal__success_btn"}>
                                                                        <Button
                                                                            className={"dashboard__submit"}
                                                                            onClick={this.handleChangeRoles}
                                                                        >Change
                                                                        </Button>
                                                                        <Button
                                                                            className={"dashboard__submit auth_btn"}
                                                                            onClick={this.handleCloseModalRoles}
                                                                        >Cancel
                                                                        </Button>
                                                                    </div>
                                                                </Modal.Description>
                                                            </Modal.Content>
                                                        </Modal>
                                                    </Grid.Column> : null
                                            }
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Grid className={"calculator__paymount"}>
                                                    <UserSingleInfo name={'ID'} value={singleUser.ID} />
                                                    <UserSingleInfo name={'Email'} value={singleUser.email} />
                                                    <UserSingleInfo name={'User status'} value={
                                                        (singleUser.is_verified === false && singleUser.is_blocked === false) ? 'New' :
                                                            (singleUser.is_verified && singleUser.is_blocked === false) ? 'Verified' :
                                                                ((singleUser.is_verified || singleUser.is_verified === false) && singleUser.is_blocked) ? 'Blocked' : ''

                                                    } />
                                                    <UserSingleInfo name={'KYC'} value={
                                                        (singleUser.is_kyc_passed === false && singleUser.kyc_type === '') ? 'No' :
                                                            (singleUser.is_kyc_passed === false && singleUser.kyc_type !== '') ? 'Passed' :
                                                                (singleUser.is_kyc_passed && singleUser.kyc_type !== '') ? 'Verified' :
                                                                    (singleUser.is_kyc_passed && singleUser.kyc_type === '') ? 'Verified by admin' : 'Not verified'
                                                    }/>
                                                    <UserSingleInfo name={'Roles'} value={singleUser.roles} />
                                                </Grid>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                {this.renderKYC()}
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
    resetAdminState,
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
