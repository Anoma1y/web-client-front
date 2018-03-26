import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    setApplicationSingle,
    changeApplicationStatus,
    handleAdminInitialCurrency,
    changeApplicationOpenModal,
    changeApplicationError
} from 'actions/admin';
import {
    Container,
    Grid,
    Card,
} from 'semantic-ui-react'
import AdminLib from 'libs/ApiLib/AdminLib';
import AdminCalculator from 'components/Admin/AdminCalculator/';
import {
    changeCurrency
} from 'actions/rate';
import CryptoCurrency from "libs/ApiLib/CryptoCurrency";
import ApplicationSingleStatus from './ApplicationSingleStatus';
import ApplicationSingleModal from './ApplicationSingleModal';

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
        console.log(singleApplication);
        return (
            <Container>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column>
                            <Card fluid className={"component__main component__shadow"}>
                                <Card.Content>
                                    <Card.Header>
                                        <Link to={'/admin/application/'} style={{display: 'block', marginBottom: '20px'}}>Back to Applications</Link>
                                        <Link to={`/admin/user/${singleApplication.profile.ID}`} style={{display: 'block', marginBottom: '20px'}}>Go to - {singleApplication.profile.email}</Link>
                                    </Card.Header>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <ApplicationSingleStatus
                                                    singleApplication={singleApplication}
                                                    applicationStatus={applicationStatus}
                                                    handleChange={this.handleChange}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <AdminCalculator />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <ApplicationSingleModal
                                                    triggerOpen={applicationModalIsOpen}
                                                    error={applicationChangeError}
                                                    handleSend={this.handleSend}
                                                    handleClose={this.handleCloseModal}
                                                    handleOpen={this.handleOpenModal}
                                                />
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
    handleAdminInitialCurrency,
    changeApplicationOpenModal,
    changeApplicationError
})(ApplicationSingle);
