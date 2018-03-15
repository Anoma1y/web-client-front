import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
    Modal,
    Form,
    Radio,
    Button
} from 'semantic-ui-react';
import {
    applicationCalc
} from 'libs/math';
import { changeDeleteApplications } from 'actions/admin';
import moment from 'moment';
import AdminCalculator from "./AdminCalculator";

class ApplicationTableRow extends Component {

    state = {
        applicationStatus: this.props.status
    }

    handleChange = (e, { value }) => this.setState({ applicationStatus: Number(value) })

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
            currency: cryptoCurrency,
            TSR: TOKEN_ATTITUDE_ETH,
            bonus
        } = this.props.admin;

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
                <Table.Cell width={1}>
                    <Link to={`application/${id}`}>{id}</Link>
                </Table.Cell>
                <Table.Cell width={2}>{moment(createdAt).format('DD-MM-YYYY h:mm:ss')}</Table.Cell>
                {fixCurrency}
                {fixToken}
                <Table.Cell width={1}>Russia</Table.Cell>
                <Table.Cell width={3}>{profile.email}</Table.Cell>
                <Table.Cell width={1}>{profile.is_kyc_passed === false ? "No" : "Yes"}</Table.Cell>
                <Modal
                    trigger={
                        <Table.Cell width={1} className={"cursor-pointer"}>
                            <span>{status === 0 ? "Awaiting" : status === 1 ? "Approved" : status === 2 ? "Rejected" : "Paid"}</span>
                        </Table.Cell>
                    }
                    size={"tiny"}
                >
                    <Modal.Content className={"modal__success"}>
                        <Modal.Description>Change Status</Modal.Description>

                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                    Current status: <b>{status === 0 ? "Awaiting" : status === 1 ? "Approved" : status === 2 ? "Rejected" : "Paid"}</b>
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Awaiting'
                                        name='applicationStatusGroup'
                                        value='0'
                                        checked={this.state.applicationStatus === 0}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Approved'
                                        name='applicationStatusGroup'
                                        value='1'
                                        checked={this.state.applicationStatus === 1}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Rejected'
                                        name='applicationStatusGroup'
                                        value='2'
                                        checked={this.state.applicationStatus === 2}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Paid'
                                        name='applicationStatusGroup'
                                        value='3'
                                        checked={this.state.applicationStatus === 3}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Description>
                        <Modal.Description>
                            <AdminCalculator />
                        </Modal.Description>
                        <Modal.Description>
                            <Button>Save Changes</Button>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
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
    admin: state.admin
}), {
    changeDeleteApplications
})(ApplicationTableRow);
