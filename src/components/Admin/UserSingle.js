import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Grid,
    Card,
    Button,
    Accordion,
    Icon
} from 'semantic-ui-react';
import { handleSetUserByID } from 'actions/admin';

class UserSingle extends Component {
    state = { activeIndex: -1 }

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
        handleSetUserByID(id);
    }

    handleBlockUser = () => { console.log('BlockUser'); }
    handleDeleteUser = () => { console.log('DeleteUser'); }
    handleRequestKYCUser = () => { console.log('RequestKYCUser'); }
    handleKYCAcceptedUser = () => { console.log('KYCAcceptedUser'); }

    renderKYC = () => {
        const {
            singleUser,
            singleUserKYC
        } = this.props.admin;
        const data = JSON.parse(singleUserKYC.content);
        return (
            <div>
                <h1>User Profile</h1>
            </div>
        )
    }

    render() {
        const { activeIndex } = this.state;
        const {
            singleUser,
            singleUserKYC
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
                                                <Button
                                                    className={"auth_btn"}
                                                    onClick={this.handleBlockUser}
                                                >
                                                    Block
                                                </Button>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button
                                                    className={"auth_btn"}
                                                    onClick={this.handleDeleteUser}
                                                >
                                                    Delete
                                                </Button>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button
                                                    className={"auth_btn"}
                                                    onClick={this.handleRequestKYCUser}
                                                >
                                                    Request extra KYC
                                                </Button>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button
                                                    className={"auth_btn"}
                                                    onClick={this.handleKYCAcceptedUser}
                                                >
                                                    KYC accepted
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <div>
                                                    <p>ID : {singleUser.ID}</p>
                                                    <p>Email : {singleUser.email}</p>
                                                    <p>ISKYCPASSED : {singleUser.is_kyc_passed === true ? "Yes" : "No"}</p>
                                                    <p>ISVERIFIED : {singleUser.is_verified === true ? "Yes" : "No"}</p>
                                                    <p>Roles : {singleUser.roles}</p>
                                                    <p>KYCTYPE : {singleUser.kyc_type}</p>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
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

export default connect(state => ({ admin: state.admin }), {
    handleSetUserByID
})(UserSingle);
