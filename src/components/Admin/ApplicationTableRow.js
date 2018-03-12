import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

const ApplicationTableRow = ({id, createdAt, updatedAt, amount, comment, currency, profile, status}) => {
    return (
        <Table.Row>
            <Table.Cell width={1}>{id}</Table.Cell>
            <Table.Cell width={2}>{moment(createdAt).format('DD-MM-YYYY h:mm:ss')}</Table.Cell>
            <Table.Cell width={1}>{amount}</Table.Cell>
            <Table.Cell width={1}>0101010</Table.Cell>
            <Table.Cell width={1}>Russia</Table.Cell>
            <Table.Cell width={3}>{profile.email}</Table.Cell>
            <Table.Cell width={1}>{profile.is_kyc_passed === false ? "No" : "Yes"}</Table.Cell>
            <Table.Cell width={1}>{status}</Table.Cell>
            <Table.Cell width={4} className={"admin__application_comment"}>{comment}</Table.Cell>
        </Table.Row>
    )
};

export default ApplicationTableRow;