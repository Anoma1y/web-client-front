import React, { Component } from 'react';

class CryptoETHtoUSD extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = "https://widgets.cryptocompare.com/serve/v2/coin/chart?fsym=ETH&tsym=USD&period=1W";
        this.scriptNode.appendChild(script);
    }

    render() {
        return (
            <div ref={node => (this.scriptNode = node)} />
        );
    }
}

export default CryptoETHtoUSD;
