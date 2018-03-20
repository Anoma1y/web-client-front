import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setApplicationSingle,
    changeApplicationStatus,
    changeFixedCurrency,
    changeAdminTokenValue,
    changeAdminTransferData,
    handleAdminCurrentCurrency,
    handleAdminInitialCurrency,
    changeApplicationOpenModal,
    changeApplicationError
} from 'actions/admin';
import {
    Container,
    Grid,
    Card,
    Form,
    Radio,
    Button,
    Modal,
    Icon
} from 'semantic-ui-react'
import AdminLib from 'libs/ApiLib/AdminLib';
import AdminCalculator from './AdminCalculator';
import {
    changeCurrency
} from 'actions/rate';
import CryptoCurrency from "libs/ApiLib/CryptoCurrency";


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
            handleAdminInitialCurrency
        } = this.props;
        const {
            bonus: bonusList,
        } = this.props.admin;
        const { jwt: TOKEN } = this.props.user;
        AdminLib.getApplicationByID(id, TOKEN)
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
                    currency: CRYPTO_CURRENCY,
                    TSR: TKN_PRICE
                } = this.props.rate;
                const CURRENT_CURRENCY = data.data.currency.split('/');
                handleAdminInitialCurrency({
                    AMOUNT: data.data.amount,
                    CURRENT_CURRENCY,
                    CRYPTO_CURRENCY,
                    TKN_PRICE,
                    BONUS_LIST: bonusList
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleChange = (event, {value}) => {
        const { changeApplicationStatus } = this.props;
        changeApplicationStatus(Number(value));
    }

    handleOpenModal = () => {
        const { changeApplicationOpenModal } = this.props;
        changeApplicationOpenModal(true);
    }
    handleCloseModal = () => {
        const { changeApplicationOpenModal } = this.props;
        changeApplicationOpenModal(false);
    }

    handleSend = () => {
        const {
            transferData,
            fixedCurrency,
            applicationStatus,
            tokenValue
        } = this.props.admin;
        const {
            changeApplicationOpenModal,
            changeApplicationError
        } = this.props;
        const { id } = this.props.match.params;
        const amount = fixedCurrency.split('/')[0] === 'TSR' ? Number(tokenValue) : Number(transferData[fixedCurrency.split('/')[0]]);
        const data = {
            status: Number(applicationStatus),
            amount,
            currency: fixedCurrency
        }
        const { jwt: TOKEN } = this.props.user;
        AdminLib.editApplication(id, data, TOKEN)
            .then(() => {
                changeApplicationOpenModal(false);
                changeApplicationError(null);
            })
            .catch((err) => {
                changeApplicationError('Application change error!');
            })
    }

    render() {
        const {
            singleApplication,
            applicationStatus,
            applicationModalIsOpen,
            applicationChangeError
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
                                                <Modal
                                                    trigger={<Button
                                                        onClick={this.handleOpenModal}
                                                        className={"auth_btn"}
                                                        floated={"right"}
                                                    >Save Changes
                                                    </Button>}
                                                    open={applicationModalIsOpen}
                                                    onClose={this.handleCloseModal}
                                                    basic
                                                    size='small'
                                                >
                                                    <Modal.Content className={"modal__success"}>
                                                        <Modal.Description>
                                                            <div className={applicationChangeError === null ? "modal__success_icon" : "modal__success_icon modal__error-icon"}>
                                                                <Icon name={applicationChangeError === null ? "check circle outline" : "warning circle"} />
                                                            </div>
                                                            <div className={"modal__success_text betatest__modal_text"}>
                                                                <span>{applicationChangeError === null ? "Change applications?" : applicationChangeError}</span>
                                                            </div>
                                                            <div>
                                                                <Grid>
                                                                    <Grid.Row>
                                                                        <Grid.Column width={8}>
                                                                            <Button
                                                                                className={"auth_btn"}
                                                                                onClick={this.handleSend}
                                                                            > Ok
                                                                            </Button>
                                                                        </Grid.Column>
                                                                        <Grid.Column width={8}>
                                                                            <Button
                                                                                className={"auth_btn"}
                                                                                onClick={this.handleCloseModal}
                                                                            > Cancel
                                                                            </Button>
                                                                        </Grid.Column>
                                                                    </Grid.Row>
                                                                </Grid>
                                                            </div>
                                                        </Modal.Description>
                                                    </Modal.Content>
                                                </Modal>
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


export default connect(state => ({
    admin: state.admin,
    rate: state.rate,
    user: state.user
}), {
    setApplicationSingle,
    changeCurrency,
    changeApplicationStatus,
    changeFixedCurrency,
    changeAdminTokenValue,changeAdminTransferData,handleAdminCurrentCurrency, handleAdminInitialCurrency,
    changeApplicationOpenModal,
    changeApplicationError
})(ApplicationSingle);
