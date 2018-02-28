import React, { Component } from 'react';

class CryptoETHtoBTC extends Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = "https://widgets.cryptocompare.com/serve/v2/coin/chart?fsym=ETH&tsym=BTC&period=1W";
        this.scriptNode.appendChild(script);
    }

    render() {

        return (
            <div ref={node => (this.scriptNode = node)} className={"crypto__widget"}/>
        );
    }
}

export default CryptoETHtoBTC;
