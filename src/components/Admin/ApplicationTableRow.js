import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Checkbox,
    Modal,
    Form,
    Radio,
    Button
} from 'semantic-ui-react';
import {
    applicationCalc
} from 'libs/math';
import moment from 'moment';

class ApplicationTableRow extends Component {

    state = {
        applicationStatus: this.props.status
    }

    handleChange = (e, { value }) => this.setState({ applicationStatus: Number(value) })

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
        const { applicationStatus } = this.state;
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
                <Table.Cell width={1}>
                    <Modal
                        trigger={<span>{status}</span>}
                        size={"tiny"}
                    >
                        <Modal.Content className={"modal__success"}>
                            <Modal.Description>Change Status</Modal.Description>

                            <Modal.Description>
                                <Form>
                                    <Form.Field>
                                        Current status: <b>{applicationStatus === 0 ? "Awaiting" : applicationStatus === 1 ? "Approved" : "Rejected"}</b>
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
                                        <Button>
                                            Change
                                        </Button>
                                    </Form.Field>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Table.Cell>
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
