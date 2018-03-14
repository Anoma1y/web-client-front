import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Modal,
    Radio,
    Form,
    Button
} from 'semantic-ui-react';
import moment from 'moment';
import {changeDeleteUsers} from "actions/admin";

class UserTableRow extends Component {

    state = {
        userRole: this.props.roles,
        checkedUser: null
    }

    handleChangeRole = (e, { value }) => {
        this.setState({ userRole: value })
    }

    handleChangeDelete = event => {
        const {
            value,
            checked
        } = event.target;
        const { changeDeleteUsers } = this.props;
        const { deleteUsers } = this.props.admin;
        changeDeleteUsers(
            [...deleteUsers, value].filter(item => {
                let val;
                if (checked === false) {
                    val = value;
                }
                return item !== val;
            })
        );
    }

    goToSingleUser = (e) => {
        console.log(e.target.className);
    }
    
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
            <Table.Row className={"admin__users-user"} >
                <Table.Cell className={`user_${id}`} onClick={this.goToSingleUser}>{id}</Table.Cell>
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
                                        onChange={this.handleChangeRole}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='User'
                                        name='roleGroup'
                                        value='user'
                                        checked={this.state.userRole === 'user'}
                                        onChange={this.handleChangeRole}
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
                    <input 
                        type="checkbox" 
                        value={id} 
                        onChange={this.handleChangeDelete}
                    />
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default connect(state => ({ admin: state.admin }), {
    changeDeleteUsers
})(UserTableRow);
