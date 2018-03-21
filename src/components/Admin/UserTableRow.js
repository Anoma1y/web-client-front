import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
} from 'semantic-ui-react';
import moment from 'moment';
import { changeDeleteUsers } from "actions/admin";

class UserTableRow extends Component {

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
                <Table.Cell className={`user_${id}`}>
                    <Link to={`../admin/user/${id}`}>{id}</Link>
                </Table.Cell>
                <Table.Cell>{moment(createdAt).format('DD-MM-YYYY h:mm:ss')}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell className={"cursor-pointer"}><span>{roles}</span></Table.Cell>
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
