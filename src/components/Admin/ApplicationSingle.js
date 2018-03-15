import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setApplicationSingle,
    changeApplicationStatus,
    changeFixedCurrency,changeAdminTokenValue, changeAdminTransferData,handleAdminCurrentCurrency
} from 'actions/admin';
import {
    Container,
    Grid,
    Card,
    Form,
    Radio,
    Button
} from 'semantic-ui-react'
import AdminLib from 'libs/ApiLib/AdminLib';
import AdminCalculator from './AdminCalculator';
import {
    changeCurrency
} from 'actions/rate';
import CryptoCurrency from "libs/ApiLib/CryptoCurrency";
import { calcToken,calcCurrency } from 'libs/math';


class ApplicationSingle extends Component {

    getCurrencyAdmin = () => {
        const {
            changeCurrency
        } = this.props;
        const INITIAL_DATA = [
            {
                'id': 'bitcoin',
                'name': 'Bitcoin',
                'symbol': 'BTC',
                'price_usd': "8240.82"
            },
            {
                'id': 'ethereum',
                'name': 'Ethereum',
                'symbol': 'ETH',
                "price_usd": "0",
                "price_btc": "0"
            },
            {
                'id': 'usd',
                'name': 'USD',
                'symbol': 'USD',
                'price_usd': '1'
            }
        ]

        CryptoCurrency.getCryptoCurrency()
            .then((data) => {
                const CURRENCY = data.data;
                const CURRENCY_DATA = [...CURRENCY,
                    {
                        id: 'usd',
                        name: 'USD',
                        symbol: 'USD',
                        price_usd: '1'
                    }
                ];
                changeCurrency(CURRENCY_DATA);
            })
            .catch(() => {
                changeCurrency(INITIAL_DATA);
            })
    }

    componentWillUnmount() {
        clearInterval(this.currencyIntervalAdmin);
    }

    componentWillMount() {
        this.getCurrencyAdmin();
        this.currencyIntervalAdmin = setInterval(() => {
            this.getCurrencyAdmin();
        }, 10000)
    }

    componentDidMount() {
        const {
            id
        } = this.props.match.params;
        const {
            setApplicationSingle,
            changeApplicationStatus,
            changeAdminTokenValue,
            handleAdminCurrentCurrency,
            changeAdminTransferData
        } = this.props;
        const {
            currencyValue,
            bonus: bonusList,
        } = this.props.admin;

        AdminLib.getApplicationByID(id)
            .then((data) => {
                const APPLICATION =  {
                    CreatedAt: data.data.CreatedAt,
                    ID: data.data.ID,
                    amount: data.data.amount,
                    currency: data.data.currency,
                    comment: data.data.comment,
                    profile: {
                        ID: data.data.profile.ID,
                        CreatedAt: data.data.profile.CreatedAt,
                        email: data.data.profile.email,
                        is_kyc_passed: data.data.profile.is_kyc_passed,
                        is_verified: data.data.profile.is_verified,
                        kyc_type: data.data.profile.kyc_type,
                        roles: data.data.profile.role,
                    },
                    status: data.data.status
                }
                changeApplicationStatus(data.data.status);
                setApplicationSingle(APPLICATION);
                const {
                    currency,
                    TSR: TKN_PRICE
                } = this.props.rate;
                const CURRENT_CURRENCY = data.data.currency.split('/');
                if (CURRENT_CURRENCY[0] === 'TSR') {
                    handleAdminCurrentCurrency(CURRENT_CURRENCY[1]);
                    changeAdminTransferData(calcToken(data.data.amount, CURRENT_CURRENCY[1], bonusList, currency, TKN_PRICE));
                } else if (CURRENT_CURRENCY[1] === 'TSR') {
                    handleAdminCurrentCurrency(CURRENT_CURRENCY[0]);
                    changeAdminTransferData(calcCurrency(data.data.amount, CURRENT_CURRENCY[0], bonusList, currency, TKN_PRICE));
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleChange = (event, {value}) => {
        const { changeApplicationStatus } = this.props;
        changeApplicationStatus(Number(value));
    }

    handleSend = () => {
        const {
            transferData,
            fixedCurrency,
            applicationStatus,
            tokenValue
        } = this.props.admin;
        const {
            id
        } = this.props.match.params;
        const amount = fixedCurrency.split('/')[0] === 'TSR' ? Number(tokenValue) : Number(transferData[fixedCurrency.split('/')[0]]);
        const data = {
            status: Number(applicationStatus),
            amount,
            currency: fixedCurrency
        }

        AdminLib.editApplication(id, data)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
        
    }

    render() {
        const {
            singleApplication,
            applicationStatus
        } = this.props.admin;
        return (
            <Container>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column>
                            <Card fluid className={"component__main component__shadow"}>
                                <Card.Content>
                                    <Card.Header>
                                        {"Application editing"}
                                    </Card.Header>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form>
                                                    <Form.Field>
                                                        Current status: <b>{singleApplication.status === 0 ? "Awaiting" : singleApplication.status === 1 ? "Approved" : singleApplication.status === 2 ? "Rejected" : "Paid"}</b>
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio
                                                            label='Awaiting'
                                                            name='applicationStatusGroup'
                                                            value='0'
                                                            checked={applicationStatus === 0}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio
                                                            label='Approved'
                                                            name='applicationStatusGroup'
                                                            value='1'
                                                            checked={applicationStatus === 1}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio
                                                            label='Rejected'
                                                            name='applicationStatusGroup'
                                                            value='2'
                                                            checked={applicationStatus === 2}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <Radio
                                                            label='Paid'
                                                            name='applicationStatusGroup'
                                                            value='3'
                                                            checked={applicationStatus === 3}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                </Form>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <AdminCalculator />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Button
                                                    className={"auth_btn"}
                                                    onClick={this.handleSend}
                                                >
                                                    Save Changes
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}


export default connect(state => ({ admin: state.admin, rate: state.rate }), {
    setApplicationSingle,
    changeCurrency,
    changeApplicationStatus,
    changeFixedCurrency,
    changeAdminTokenValue,changeAdminTransferData,handleAdminCurrentCurrency
})(ApplicationSingle);
