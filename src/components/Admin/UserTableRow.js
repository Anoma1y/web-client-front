import React, { Component } from 'react';
import {
    Table,
    Checkbox,
    Modal,
    Radio,
    Form,
    Button
} from 'semantic-ui-react';
import moment from 'moment';

class UserTableRow extends Component {

    state = {
        userRole: this.props.roles
    }

    handleChange = (e, { value }) => this.setState({ userRole: value })

    render() {
        const {
            id,
            createdAt,
            email,
            roles,
            is_verified,
            is_kyc_passed
        } = this.props;
        return (
            <Table.Row>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{moment(createdAt).format('DD-MM-YYYY h:mm:ss')}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Modal
                    trigger={<Table.Cell className={"cursor-pointer"}><span>{roles}</span></Table.Cell>}
                    size={"tiny"}
                >
                    <Modal.Content className={"modal__success"}>
                        <Modal.Description>
                            <h1>Change Role</h1>
                        </Modal.Description>
                        <Modal.Description>
                            <Form>
                                <p>
                                    Current role: <b>{this.props.roles}</b>
                                </p>
                                <Form.Field>
                                    <Radio
                                        label='Admin'
                                        name='roleGroup'
                                        value='admin'
                                        checked={this.state.userRole === 'admin'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='User'
                                        name='roleGroup'
                                        value='user'
                                        checked={this.state.userRole === 'user'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Button>
                                        Change
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                <Table.Cell>{is_verified === false ? "No" : "Yes"}</Table.Cell>
                <Table.Cell>{is_kyc_passed === false ? "No" : "Yes"}</Table.Cell>
                <Table.Cell>
                    <Checkbox/>
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default UserTableRow;