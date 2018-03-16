import React, { Component } from 'react';
import {
    Grid,
    Container,
    Sticky
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Timer from 'components/Timer'
import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'
import BetaTest from 'components/BetaTest'
import Roadmap from "components/Roadmap";
import DownloadList from "components/DownloadList";
import SocialNetwork from 'components/SocialNetwork';
import TelegramWidget from 'components/TelegramWidget';
import CryptoWidget from 'components/CryptoWidget';
import { AttentionIdentification } from 'components/AttentionIdentification';
import { redirectToHome } from "actions/redirect";
import { changeCurrency } from 'actions/rate';
import CryptoCurrency from 'libs/ApiLib/CryptoCurrency';


class Home extends Component{
    state = {

    }

    getCurrency = () => {
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
        clearInterval(this.currencyInterval);
    }

    componentWillMount() {
        this.getCurrency();
        this.currencyInterval = setInterval(() => {
            this.getCurrency();
        }, 3000)
    }


    handleContextRef = contextRef => {
        this.setState({contextRef})
    }

    render() {
        const { contextRef } = this.state;
        const { is_kyc_passed } = localStorage;
        return (
            <div>
                {is_kyc_passed ? null :
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
                                        <CryptoWidget />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Roadmap />
                                    </Grid.Row>
                                    <Grid.Row>
                                        <BetaTest />
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
    user: state.user
}), {
    redirectToHome,
    changeCurrency
})(Home);

