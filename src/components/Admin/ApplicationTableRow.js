import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Checkbox
} from 'semantic-ui-react';
import {
    applicationCalc
} from 'libs/math';
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
        const {
            currency: cryptoCurrency,
            TSR: TOKEN_ATTITUDE_ETH,
            bonus
        } = this.props.calculator;
        const fixedCurrency = currency.split("/");
        const {
            TOKENVALUE,
            CURRENCYVALUE
        } = applicationCalc(amount, fixedCurrency, TOKEN_ATTITUDE_ETH, cryptoCurrency, bonus);
        const fixToken = fixedCurrency[0] === "TSR" ?
            <Table.Cell width={1} positive>{TOKENVALUE}</Table.Cell> :
            <Table.Cell width={1}>{TOKENVALUE}</Table.Cell>;
        const fixCurrency = fixedCurrency[0] !== "TSR" ?
            <Table.Cell width={1} positive>{CURRENCYVALUE}</Table.Cell> :
            <Table.Cell width={1} >{CURRENCYVALUE}</Table.Cell>;
        return (
            <Table.Row>
                <Table.Cell width={1}>{id}</Table.Cell>
                <Table.Cell width={2}>{moment(createdAt).format('DD-MM-YYYY h:mm:ss')}</Table.Cell>
                {fixCurrency}
                {fixToken}
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
        return this.renderCell()
    }
};

export default connect(state => ({ calculator: state.calculator }), {

})(ApplicationTableRow);
