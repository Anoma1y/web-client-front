import React, {Component} from 'react';
import { Form, Radio, Input, Progress, Label } from 'semantic-ui-react'

class Calculator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        TKN: 1,
          currencyValue: "USD",
          cryptoValue: 0,
          tokenValue: "",
          transferData: {
                USD: 0,
                TKN: 0,
                BTC: 0,
                ETH: 0
          },
          currency: [
              {
                  "id": "bitcoin",
                  "name": "Bitcoin",
                  "symbol": "BTC",
                  "price_usd": "8631.11"
              },
              {
                  "id": "ethereum",
                  "name": "Ethereum",
                  "symbol": "ETH",
                  "price_usd": "845.463",
                  "price_btc": "0.0986706"
              }
          ]
      }
    }

    handleChange = (e, { value }) => {
         const { transferData } = this.state;
        this.setState({
            currencyValue: value,
            cryptoValue: transferData[value]
        });
    }

     componentDidUpdate() {
        console.log(this.state.transferData);

     }

    transferUSDtoBTC = (val) => {
        const BTC = this.state.currency[0].price_usd;
        return val / BTC;
    }
    transferUSDtoETH = (val) => {
        const ETH = this.state.currency[1].price_usd;
        return val / ETH;
    }
    transferBTCtoUSD = (val) => {
        const BTC = this.state.currency[0].price_usd;
        return val * BTC;
    }
    transferBTCtoETH = (val) => {
        const BTC = this.state.currency[0].price_usd;
        const ETH = this.state.currency[1].price_usd;
        const total = (BTC/ETH) * val
        return total;
    }

    transferETHtoUSD = (val) => {
        const ETH = this.state.currency[1].price_usd;
        return val * ETH;
    }
    transferETHtoBTC = (val) => {
        const BTC = this.state.currency[0].price_usd;
        const ETH = this.state.currency[1].price_btc;
        const total = (ETH) * val;
        return total;
    }

    transferToTKN = (val) => {
        const { TKN } = this.state;
        return TKN * val;
    }
    handleETH = (value, currencyValue) => {
        const USD = this.transferETHtoUSD(value);
        const BTC = this.transferETHtoBTC(value);
        const TKN = this.transferToTKN(USD);

        this.setState({
            cryptoValue: value,
            tokenValue: TKN,
            transferData: {
                USD,
                TKN,
                BTC,
                ETH: value
            }
        });

    }
    handleBTC = (value, currencyValue) => {
        const USD = this.transferBTCtoUSD(value);
        const ETH = this.transferBTCtoETH(value);
        const TKN = this.transferToTKN(USD);

        this.setState({
            cryptoValue: value,
            tokenValue: TKN,
            transferData: {
                USD,
                TKN,
                BTC: value,
                ETH
            }
        });

    }
     handleUSD = (value, currencyValue) => {

        const BTC = this.transferUSDtoBTC(value);
        const ETH = this.transferUSDtoETH(value);
        const TKN = this.transferToTKN(value);

        this.setState({
            cryptoValue: value,
            tokenValue: TKN,
            transferData: {
                USD: value,
                TKN,
                BTC,
                ETH
            }
        });
     }

     handleInput = (e) => {
        const val = e.target.value;
        const {currencyValue} = this.state;
        switch (currencyValue) {
            case "USD":
                this.handleUSD(val, currencyValue);
                break;
            case "BTC":
                this.handleBTC(val, currencyValue);
                break;
            case "ETH":
                this.handleETH(val, currencyValue);
                break;
            default:
                console.log(111);
        }
     }


    render() {

        return (
            <div>
                <Form>
                    <Form.Field>
                        <Radio
                            label='BTC'
                            name='radioGroup'
                            value='BTC'
                            checked={this.state.currencyValue === 'BTC'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='ETH'
                            name='radioGroup'
                            value='ETH'
                            checked={this.state.currencyValue === 'ETH'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='USD'
                            name='radioGroup'
                            value='USD'
                            checked={this.state.currencyValue === 'USD'}
                            onChange={this.handleChange}
                            pre-checked={"true"}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input placeholder={this.state.currencyValue} onChange={this.handleInput} value={this.state.cryptoValue}/>
                        <Input placeholder={"TCT"} value={this.state.tokenValue}/>
                    </Form.Field>
                </Form>

                <Progress percent={21} color={"yellow"}/>
                <div>
                    <span>Бонус</span>
                    <Label>10%</Label>
                    <Label>15%</Label>
                    <Label>20%</Label>
                    <span>Вы достигли лимита</span>
                </div>
                <Form>
                    <Form.TextArea placeholder='Оставить комментарий' />
                    <Form.Button>Оставить заявку</Form.Button>
                </Form>
            </div>
        );
    }
}

export default Calculator;