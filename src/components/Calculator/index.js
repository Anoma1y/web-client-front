import React, {Component} from 'react';
import {
    Form,
    Radio,
    Input,
    Progress,
    Label
} from 'semantic-ui-react'
import "../../App.css";
class Calculator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        TKN: 100,

        limitToken: 2000000,

        maxToken: {
            BTC: 10,
            ETH: 100,
            USD: 85000
        },
        bonus: {
            first: 2.5,
            second: 5,
            third: 10,
            fourth: 15
        },
          bonusActive: {
              firstBonus: false,
              secondBonus: false,
              thirdBonus: false,
              fourthBonus: false
          },
        //FIX
        bonusLimit: {
          first: 100000,
          second: 500000,
          third: 1000000,
          fourth: 2000000
        },

        isMaximum: false,
        percentBar: 0,
        currencyValue: "USD",
        cryptoValue: 0,
          tokenValue: 0,
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
        const ETH = this.state.currency[1].price_btc;
        const total = (ETH) * val;
        return total;
    }

    checkBonus = (val) => {
        const {bonusLimit, bonus, TKN} = this.state;
        let totalBonus = 0;
        if (val >= bonusLimit["first"] && val < bonusLimit["second"]) {
            totalBonus = bonus["first"];
        } else if (val >= bonusLimit["second"] && val < bonusLimit["third"]) {
            totalBonus = bonus["second"];
        } else if (val >= bonusLimit["third"] && val < bonusLimit["fourth"]) {
            totalBonus = bonus["third"];
            //FIX
            //parseInt(val) + (parseInt(val) * (15 / 100));
        } else if (val >= bonusLimit["fourth"]) {
            totalBonus = bonus["fourth"];
        }
        return totalBonus;
    }

    transferToTKN = (val) => {
        const { TKN } = this.state;
        const bonusTKN = this.checkBonus(val);

        const bonus = (TKN * val)  + ((TKN * val) * (bonusTKN / 100));
        const currentPercent = this.getPercent(bonus);
        this.setState({
            percentBar: currentPercent
        })
        return bonus;
    }
    handleETH = (value) => {
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




    handleBTC = (value) => {

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


     handleUSD = (value) => {
        // const currentMax = this.getPercent(value);

        const BTC = this.transferUSDtoBTC(value);
        const ETH = this.transferUSDtoETH(value);
        // const TKN = this.transferToTKN(value, currentMax);
         const TKN = this.transferToTKN(value);

         this.setState({
            // percentBar: currentMax,
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
    transferTKN = (val, type) => {
        const { TKN, currency } = this.state;
        const USD = 1;
        if (type === "USD") {
            return TKN * USD * val
        } else if (type === "BTC") {
            return (TKN / currency[0].price_usd) * val
        } else if (type === "ETH") {
            return (TKN / currency[1].price_usd) * val
        }
    }
    getPercent = (val) => {
        const {limitToken} = this.state;
        const percent = ((val * 100) / limitToken).toFixed(2);
        this.checkMaximum(percent);
        return percent;
    }
    checkMaximum = (percent) => {
        if (percent >= 100) {
            this.setState({
                isMaximum: true
            })
        } else {
            this.setState({
                isMaximum: false
            })
        }
    }
     handleToken = (e) => {
        const val = e.target.value;
        const { currencyValue } = this.state;

         const bonusTKN = this.checkBonus(val);

         const bonus = (1 * val)  - ((1 * val) * (bonusTKN / 100));
         const USD = this.transferTKN(bonus, "USD");
         const BTC = this.transferTKN(bonus, "BTC");
         const ETH = this.transferTKN(bonus, "ETH");
         const currentPercent = this.getPercent(val);

         this.setState({
             percentBar: currentPercent
         })
         const currentTokenValue = currencyValue === "BTC" ? BTC : currencyValue === "ETH" ? ETH : USD;

        this.setState({
            cryptoValue: currentTokenValue,
            tokenValue: val,
            transferData: {
                USD,
                TKN: val,
                BTC,
                ETH
            }
        })
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
                        <Radio
                            label='ETH'
                            name='radioGroup'
                            value='ETH'
                            checked={this.state.currencyValue === 'ETH'}
                            onChange={this.handleChange}
                        />
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
                        <Input placeholder={"TCT"} value={this.state.tokenValue} onChange={this.handleToken}/>
                    </Form.Field>
                </Form>

                <Progress percent={this.state.percentBar} progress size={"small"} color={"red"}/>
                <div>
                    <span>Бонус</span>
                    <Label className={this.state.bonusActive.firstBonus === true ? "active": ""}>2.5%</Label>
                    <Label className={this.state.bonusActive.secondBonus === true ? "active": ""}>5%</Label>
                    <Label className={this.state.bonusActive.thirdBonus === true ? "active": ""}>10%</Label>
                    <Label className={this.state.bonusActive.fourthBonus === true ? "active": ""}>15%</Label>
                    <span className={this.state.isMaximum === true ? "active": ""}>Вы достигли лимита</span>
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