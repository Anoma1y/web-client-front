import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
} from 'semantic-ui-react';
import {
    applicationCalc
} from 'libs/math';
import { changeDeleteApplications } from 'actions/admin';
import moment from 'moment-timezone';
import {countryOptions} from "libs/country";

class ApplicationTableRow extends Component {

    state = {
        applicationStatus: this.props.status
    }

    getCountry = (KEY) => {
        const getObj = countryOptions.filter(item => item.key === KEY);
        if (getObj.length !== 0) {
            return getObj[0].text;
        } else return '';
    };

    handleChangeDelete = event => {
        const {
            value,
            checked
        } = event.target;

        const { changeDeleteApplications } = this.props;

        const { deleteApplications } = this.props.admin;

        changeDeleteApplications(
            [...deleteApplications, value].filter(item => {
                let val;
                if (checked === false) {
                    val = value;
                }
                return item !== val;
            })
        );
    }
    
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
            bonus
        } = this.props.admin;

        const {
            currency: cryptoCurrency,
            TSR: TOKEN_ATTITUDE_ETH,
        } = this.props.rate;

        const fixedCurrency = currency.split("/");

        const {
            TOKENVALUE,
            CURRENCYVALUE
        } = applicationCalc(createdAt, amount, fixedCurrency, TOKEN_ATTITUDE_ETH, cryptoCurrency, bonus);

        const fixToken = fixedCurrency[0] === "TSR" ?
            <Table.Cell width={1} positive>{TOKENVALUE}</Table.Cell> :
            <Table.Cell width={1}>{TOKENVALUE}</Table.Cell>;

        const fixCurrency = fixedCurrency[0] !== "TSR" ?
            <Table.Cell width={1} positive>{CURRENCYVALUE}</Table.Cell> :
            <Table.Cell width={1} >{CURRENCYVALUE}</Table.Cell>;

        return (
            <Table.Row>
                <Table.Cell width={1}>
                    <Link to={`/admin/application/${id}`}>{id}</Link>
                </Table.Cell>
                <Table.Cell width={2}>{moment(createdAt).tz('Europe/Moscow').format('DD-MM-YYYY HH:mm:ss z')}</Table.Cell>
                {fixCurrency}
                {fixToken}
                <Table.Cell width={1}>{this.getCountry(profile.country)}</Table.Cell>
                <Table.Cell width={3}>{profile.email}</Table.Cell>
                <Table.Cell width={1}>{
                    (profile.is_kyc_passed === false && profile.kyc_type === '') ? 'No' :
                        (profile.is_kyc_passed === false && profile.kyc_type !== '') ? 'Passed' :
                            (profile.is_kyc_passed && profile.kyc_type !== '') ? 'Verified' :
                                (profile.is_kyc_passed && profile.kyc_type === '') ? 'Verified by admin' : 'Not verified'
                }</Table.Cell>
                <Table.Cell width={1} className={"cursor-pointer"}>
                    <span>{status === 0 ? "Awaiting" : status === 1 ? "Approved" : status === 2 ? "Rejected" : "Paid"}</span>
                </Table.Cell>
                <Table.Cell width={4} className={"admin__application_comment"}>{comment}</Table.Cell>
                <Table.Cell width={1}>
                    <input type="checkbox" value={id} onChange={this.handleChangeDelete}/>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        return this.renderCell()
    }
};

export default connect(state => ({
    admin: state.admin,
    rate: state.rate
}), {
    changeDeleteApplications
})(ApplicationTableRow);
