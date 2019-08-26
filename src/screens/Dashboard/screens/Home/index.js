import React, { Component } from 'react';
import {
    Grid,
    Container,
    Sticky
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Timer from 'components/Timer'
import RequestList from 'components/RequestList'
import BetaTest from 'components/BetaTest'
import Roadmap from "components/Roadmap";
import DownloadList from "components/DownloadList";
import CryptoWidget from "components/CryptoWidget";
import SocialNetwork from 'components/SocialNetwork';
import Calculator from 'components/Calculator';
import TelegramWidget from 'components/TelegramWidget';
import UserBalance from 'components/Balance';
import { AttentionIdentification } from 'components/AttentionIdentification';
import { changeCurrency } from 'actions/rate';
import CryptoCurrency from 'libs/ApiLib/CryptoCurrency';
import {changeTransferData} from 'actions/calculator';
import {calcToken} from 'libs/math';

class Home extends Component{

    state = {

    }

    getCurrency = () => {
        const {
            changeCurrency,
            changeTransferData
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
        Promise.all([
            CryptoCurrency.getCryptList('btc-usd'),
            CryptoCurrency.getCryptList('eth-usd'),
            CryptoCurrency.getCryptList('btc-eth')
        ]).then((data) => {
            const CURRENCY_BTC = {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                price_usd: Number(data[0].data.ticker.price),
            };
            const CURRENCY_ETH = {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                price_usd: Number(data[1].data.ticker.price),
                price_btc: Number(data[2].data.ticker.price)
            };
            const CURRENCY_DATA = [CURRENCY_BTC, CURRENCY_ETH,
                {
                    id: 'usd',
                    name: 'USD',
                    symbol: 'USD',
                    price_usd: '1'
                }
            ];
            const {
                tokenValue,
                currencyValue,
                bonus
            } = this.props.calculator;
            const {
                TSR
            } = this.props.rate;
            changeTransferData(calcToken(tokenValue, currencyValue, bonus, CURRENCY_DATA, TSR));
            changeCurrency(CURRENCY_DATA);
        })
          .catch(() => {
              changeCurrency(INITIAL_DATA);
          })
    }

    componentWillUnmount() {
        clearInterval(this.currencyInterval);
    }

    componentWillMount() {
        this.getCurrency();
        this.currencyInterval = setInterval(() => {
            this.getCurrency();
        }, 60000)
    }

    handleContextRef = contextRef => {
        this.setState({contextRef})
    }

    render() {
        const { contextRef } = this.state;
        const {
            kyc_type,
            is_kyc_passed,
            balance
        } = localStorage;
        return (
            <div>
                {kyc_type !== '' || is_kyc_passed === 'true' ? null :
                    <div className={"attentionIdentification"}>
                        <AttentionIdentification />
                    </div>
                }
                <Container>
                    <div ref={this.handleContextRef}>
                        <Grid >
                            <Grid.Row centered>
                                <Grid.Column widescreen={1} computer={1} tablet={16} mobile={16}>
                                </Grid.Column>
                                <Grid.Column widescreen={9} computer={9} tablet={16} mobile={16} className={"dashboard__wrapper_component"}>
                                    <Grid.Row>
                                        <Timer />
                                    </Grid.Row>
                                    {
                                        balance > 0 ?
                                            <Grid.Row>
                                                <UserBalance
                                                    balance={balance}
                                                />
                                            </Grid.Row>
                                            : null
                                    }
                                    <Grid.Row>
                                        <Calculator />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <RequestList />
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column widescreen={5} computer={5} tablet={16} mobile={16} className={"dashboard__wrapper_component"}>
                                    <Grid.Row>
                                        <DownloadList />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Roadmap />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <CryptoWidget />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <TelegramWidget />
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column widescreen={1} computer={1} tablet={16} mobile={16} className={"dashboard__social_component"}>
                                    <Grid.Row>
                                        <Sticky context={contextRef}>
                                            <SocialNetwork />
                                        </Sticky>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(state => ({
    user: state.user,
    calculator: state.calculator,
    rate: state.rate
}), {
    changeCurrency,
    changeTransferData
})(Home);

