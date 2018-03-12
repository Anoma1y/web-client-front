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
                <Table.Cell>
                    <Modal trigger={<span>{roles}</span>}>
                        <Modal.Header>Change Role</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Form>
                                    <Form.Field>
                                        Current role: <b>{this.state.userRole}</b>
                                    </Form.Field>
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
                </Table.Cell>
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