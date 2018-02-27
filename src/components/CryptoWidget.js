import React, {Component} from 'react';
import {
    Card,
    Divider,
} from 'semantic-ui-react';

class CryptoWidget extends Component {
    componentDidMount() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = "https://widgets.cryptocompare.com/serve/v2/coin/chart?fsym=ETH&tsym=BTC&period=1W"
        this.instance.appendChild(s);
    }
    render() {

        return (
            <Card fluid className={"component__main"}>
                <Card.Content className={"component__cryptocurrency"}>
                    <Card.Description className={"cryptocurrency__container"}>
                        <div ref={el => (this.instance = el)} />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default CryptoWidget;
