import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

const ApplicationTableRow = ({id, createdAt, updatedAt, amount, comment, currency, profile, status}) => {
    return (
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{moment(createdAt).format('DD-MM-YYYY h:mm:ss')}</Table.Cell>
            <Table.Cell>{amount}</Table.Cell>
            <Table.Cell>0101010</Table.Cell>
            <Table.Cell>Russia</Table.Cell>
            <Table.Cell>{profile.email}</Table.Cell>
            <Table.Cell>{profile.is_kyc_passed === false ? "No" : "Yes"}</Table.Cell>
            <Table.Cell>{status}</Table.Cell>
            <Table.Cell className={"admin__application_comment"}>{comment}</Table.Cell>
        </Table.Row>
    )
};

export default ApplicationTableRow;