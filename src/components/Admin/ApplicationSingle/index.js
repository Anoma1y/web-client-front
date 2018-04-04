import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    setApplicationSingle,
    changeApplicationStatus,
    handleAdminInitialCurrency,
    changeApplicationOpenModal,
    changeApplicationError,
    resetAdminState
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
        AdminLib.getApplicationByID(id, TOKEN).then((data) => {
            const {
                CreatedAt,
                ID,
                amount,
                currency,
                comment,
                profile,
                status
            } = data.data;
            changeApplicationStatus(status);
            setApplicationSingle({
                CreatedAt,
                ID,
                amount,
                currency,
                comment,
                profile,
                status
            });
            const {
                currency: CRYPTO_CURRENCY,
                TSR: TKN_PRICE
            } = this.props.rate;
            const CURRENT_CURRENCY = currency.split('/');
            handleAdminInitialCurrency({
                AMOUNT: amount,
                CURRENT_CURRENCY,
                CRYPTO_CURRENCY,
                TKN_PRICE,
                BONUS_LIST: bonusList
            });
        }).catch((err) => console.log(err));
    }

    handleChange = (event, {value}) => {
        const { changeApplicationStatus } = this.props;
        changeApplicationStatus(Number(value));
    }
    backToApplicationList = () => {
        const {
            goToApplicationList,
            resetAdminState
        } = this.props;
        resetAdminState();
        goToApplicationList();
    }
    goToUser = event => {
        const {
            goToUserByID,
            resetAdminState
        } = this.props;
        const { id } = event.target;
        resetAdminState();
        goToUserByID(id.split('_')[1]);
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
            .catch(() => {
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
                                        <p onClick={this.backToApplicationList} style={{display: 'block', marginBottom: '20px', cursor: 'pointer', color: 'rgba(0, 79, 206, 1)'}}>Back to Applications</p>
                                        <p id={`user_${singleApplication.profile.ID}`} onClick={this.goToUser} style={{display: 'block', marginBottom: '20px', cursor: 'pointer', color: 'rgba(0, 79, 206, 1)'}}>Go to - {singleApplication.profile.email}</p>
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
    goToApplicationList: () => push('/admin/application'),
    goToUserByID: (id) => push(`/admin/user/${id}`),
    setApplicationSingle,
    changeCurrency,
    resetAdminState,
    changeApplicationStatus,
    handleAdminInitialCurrency,
    changeApplicationOpenModal,
    changeApplicationError
})(ApplicationSingle);
