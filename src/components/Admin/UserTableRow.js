import React from 'react';
import {
    Table
} from 'semantic-ui-react'

const UserTableRow = ({id, createdAt, updatedAt, deletedAt, email, roles, is_verified, is_kyc_passed}) => {
    return (
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{createdAt}</Table.Cell>
            <Table.Cell>{updatedAt}</Table.Cell>
            <Table.Cell>{deletedAt}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{roles}</Table.Cell>
            <Table.Cell>{is_verified === false ? "No" : "Yes"}</Table.Cell>
            <Table.Cell>{is_kyc_passed === false ? "No" : "Yes"}</Table.Cell>
        </Table.Row>
    )
}

export default UserTableRow;