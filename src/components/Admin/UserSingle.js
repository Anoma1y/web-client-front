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
import { setUserSingle } from 'actions/admin';
import AdminLib from 'libs/ApiLib/AdminLib';

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
        AdminLib.getUsersById(id)
            .then((data) => {
                const {
                    setUserSingle
                } = this.props;
                const singleUser = {
                    CreatedAt: data.data.CreatedAt,
                    ID: data.data.ID,
                    email: data.data.email,
                    is_kyc_passed: data.data.is_kyc_passed,
                    is_verified: data.data.is_verified,
                    kyc_type: data.data.kyc_type,
                    roles: data.data.roles,
                }
                setUserSingle(singleUser);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleBlockUser = () => {}
    handleDeleteUser = () => {}
    handleRequestKYCUser = () => {}
    handleKYCAcceptedUser = () => {}

    render() {
        const { activeIndex } = this.state;
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
                                            <Accordion styled fluid>
                                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                                    <Icon name='dropdown' />
                                                    KYC - {singleUser.kyc_type}
                                                </Accordion.Title>
                                                <Accordion.Content active={activeIndex === 0}>

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
    setUserSingle
})(UserSingle);
