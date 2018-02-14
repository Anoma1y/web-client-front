import React, {Component} from 'react';
import {
    Grid,
    TextArea,
    Radio,
    Button,
    Input,
    Progress,
    Icon,
    Card,
    Divider,
    Form
} from 'semantic-ui-react'
import {Bonus} from './CalculatorBonus'
import {CurrencyButton} from './CalculatorButton'
import "../../App.css";




class Calculator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        TKN: 1,
        bonus: [
            {
                value: 2.5,
                limit: 100000,
                active: false
            },{
                value: 5,
                limit: 500000,
                active: false
            },{
                value: 10,
                limit: 1000000,
                active: false
            },{
                value: 15,
                limit: 2000000,
                active: false
            }
        ],
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
              },
              {
                  "id": "usd",
                  "name": "USD",
                  "symbol": "USD",
                  "price_usd": "1"
              }
          ]
      }
    }

    transferUSD = (val, type) => {
        const { currency } = this.state;
        if (type === "BTC") {
            let BTC = currency[0].price_usd;
            return val / BTC
        } else if (type === "ETH") {
            let ETH = currency[1].price_usd;
            return val / ETH;
        }
    }
    transferETH = (val, type) => {
        const { currency } = this.state;
        if (type === "USD") {
            let ETH = currency[1].price_usd;
            return val * ETH;
        } else if (type === "BTC") {
            let ETH = this.state.currency[1].price_btc;
            let total = (ETH) * val;
            return total;
        }
    }
    transferBTC = (val, type) => {
        const { currency } = this.state;
        if (type === "USD") {
            let BTC = currency[0].price_usd;
            return val * BTC;
        } else if (type === "ETH") {
            let BTC = currency[0].price_usd;
            let ETH = currency[1].price_usd;
            let total = (BTC/ETH) * val;
            return total;
        }
    }

    checkBonus = (val) => {
        const { bonus } = this.state;

        let totalBonus = 0;
        let arr = [];

        bonus.forEach((item, i) => {
            if (val >= item["limit"]) {
                totalBonus = item["value"];
                arr.push({value: item["value"], limit: item["limit"], active: true});
            } else {
                arr.push({value: item["value"], limit: item["limit"], active: false});
            }
        });

        this.setState({
            bonus: arr
        });

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

    //NEED FIX
    handleCurrency = (value, type) => {
        let BTC, ETH, TKN, USD;
        if (type === "USD") {
            BTC = this.transferUSD(value, "BTC");
            ETH = this.transferUSD(value, "ETH");
            TKN = this.transferToTKN(value);
            USD = value;
        } else if (type === "ETH") {
            USD = this.transferETH(value, "USD");
            BTC = this.transferETH(value, "BTC");
            TKN = this.transferToTKN(USD);
            ETH = value;
        } else if (type === "BTC") {
            USD = this.transferBTC(value, "USD");
            ETH = this.transferBTC(value, "ETH");
            TKN = this.transferToTKN(USD);
            BTC = value;
        }
        this.setState({
            cryptoValue: value,
            tokenValue: TKN,
            transferData: {
                USD, TKN, BTC, ETH
            }
        })
    }

    getPercent = (val) => {
        const {bonus} = this.state;
        const percent = ((val * 100) / bonus[bonus.length - 1]["limit"]).toFixed(2);
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


    transferTKN = (val, type) => {
        const { TKN, currency } = this.state;
        const USD = 1;
        if (type === "USD") {
            return TKN * USD * val
        } else if (type === "BTC") {
            return (TKN / currency[0].price_usd) * val * USD;
        } else if (type === "ETH") {
            return (TKN / currency[1].price_usd) * val * USD;
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
         const check = /^\d*\.?\d*$/;
         if (!val.match(check)) {
             return;
         }
         this.handleCurrency(val, currencyValue);
     }

    handleChange = (e, {value}) => {
        const { transferData } = this.state;
        this.setState({
            currencyValue: value,
            cryptoValue: transferData[value]
        });
    }

    render() {

        return (

            <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                <Card.Content>
                    <Card.Header>Калькулятор</Card.Header>
                    <Divider />
                    <Grid verticalAlign={'middle'}>
                        <Grid.Row>
                            {
                                this.state.currency.map(item => {
                                    return (
                                        <Grid.Column width={2} key={item["id"]}>
                                            <CurrencyButton
                                                buttonTitle={item["symbol"]}
                                                handleChange={this.handleChange}
                                                currencyValue={this.state.currencyValue}
                                            />
                                        </Grid.Column>
                                    )
                                })
                            }
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Input
                                    placeholder={this.state.currencyValue}
                                    onChange={this.handleInput}
                                    value={this.state.cryptoValue}
                                    style={{width: "100%"}}
                                    size={"big"}
                                    label={{ basic: true, content: this.state.currencyValue }}
                                    labelPosition='left'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    placeholder={"TCT"}
                                    value={this.state.tokenValue}
                                    onChange={this.handleToken}
                                    style={{width: "100%"}}
                                    size={"big"}
                                    label={{ basic: true, content: 'TKN' }}
                                    labelPosition='left'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Progress
                                    percent={this.state.percentBar}
                                    size={"tiny"}
                                    color={"red"}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p>Бонус</p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                {
                                    this.state.bonus.map((item,i) => {
                                        return <Bonus key={i} bonusVal={item["value"]} bonusActive={item["active"]}/>
                                    })
                                }
                             </Grid.Column>
                            <Grid.Column width={5}>
                                <span className={this.state.isMaximum === true ? "active": ""}>
                                    <Icon name={"warning sign"} />
                                    Вы достигли лимита
                                </span>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Form as={"div"}>
                                <TextArea
                                    placeholder='Оставить комментарий'
                                />
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column textAlign={"right"}>
                                <Button circular>Оставить заявку</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default Calculator;