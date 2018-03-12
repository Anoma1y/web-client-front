import React, { Component } from 'react';
import {
    Table,
    Checkbox
} from 'semantic-ui-react';
import moment from 'moment';

class ApplicationTableRow extends Component {

    renderCell = () => {
        const {
            id,
            createdAt,
            amount,
            comment,
            currency,
            profile,
            status
        } = this.props;
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
                <Table.Cell width={1}>
                    <Checkbox/>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const {
            id,
            createdAt,
            amount,
            comment,
            currency,
            profile,
            status
        } = this.props;

        return this.renderCell()
    }
};

export default ApplicationTableRow;