import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
    Grid,
    TextArea,
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
            progressBar: {
              percent: 0,
              isMaximum: false
            },
            currencyValue: "USD",
            sumValue: 0,
            tokenValue: 10000,
            transferData: {
                USD: 0, TKN: 0, BTC: 0, ETH: 0
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



    componentDidMount() {
        const { tokenValue:cc } = this.state;
        const { sumValue, progressBar, tokenValue, bonus, transferData } = this.calcToken(cc);
        const payload = this.calcToken(cc);
        this.props.changeDefaultValue(payload)
        this.setState({
            sumValue,
            progressBar,
            tokenValue,
            bonus,
            transferData
        })
    }

    transferUSD = (value, type) => {
        const { currency } = this.state;
        if (type === "BTC") {
            let BTC = currency[0].price_usd;
            return value / BTC
        } else if (type === "ETH") {
            let ETH = currency[1].price_usd;
            return value / ETH;
        }
    }

    transferETH = (value, type) => {
        const { currency } = this.state;
        if (type === "USD") {
            let ETH = currency[1].price_usd;
            return value * ETH;
        } else if (type === "BTC") {
            let ETH = this.state.currency[1].price_btc;
            return ETH * value;
        }
    }

    transferBTC = (value, type) => {
        const { currency } = this.state;
        if (type === "USD") {
            let BTC = currency[0].price_usd;
            return value * BTC;
        } else if (type === "ETH") {
            let BTC = currency[0].price_usd;
            let ETH = currency[1].price_usd;
            return (BTC / ETH) * value;
        }
    }


    calcCurrency = value => {
        const {currencyValue, TKN} = this.state;
        const { bonus, bonusTKN } = this.checkBonus(value);
        let BTC, ETH, TKNvalue, USD;
        if (currencyValue === "USD") {
            BTC = this.transferUSD(value, "BTC");
            ETH = this.transferUSD(value, "ETH");
            TKNvalue = this.transferToTKN(value, bonusTKN, TKN);
            USD = value;
        } else if (currencyValue === "ETH") {
            USD = this.transferETH(value, "USD");
            BTC = this.transferETH(value, "BTC");
            TKNvalue = this.transferToTKN(USD, bonusTKN, TKN);
            ETH = value;
        } else if (currencyValue === "BTC") {
            USD = this.transferBTC(value, "USD");
            ETH = this.transferBTC(value, "ETH");
            TKNvalue = this.transferToTKN(USD, bonusTKN, TKN);
            BTC = value;
        }
        const progressBar = this.handleProgressBar(TKNvalue);
        return {
            sumValue: value,
            progressBar,
            tokenValue: TKNvalue,
            bonus,
            transferData: {
                USD, TKN: TKNvalue, BTC, ETH
            }
        }
    }

    calcToken = value => {
        const { currencyValue } = this.state;
        const { bonus, bonusTKN } = this.checkBonus(value);
        const bonusValue = this.bonusCalc(value, bonusTKN);
        const { USD, BTC, ETH } = this.transferTKN(bonusValue);
        const currentTokenValue = currencyValue === "BTC" ? BTC : currencyValue === "ETH" ? ETH : USD;
        const progressBar = this.handleProgressBar(value);
        return {
            sumValue: currentTokenValue,
            progressBar,
            tokenValue: value,
            bonus,
            transferData: {
                USD,
                TKN: value,
                BTC,
                ETH
            }
        }
    }


    handleProgressBar = value => {
        const { bonus } = this.state;
        const percent = ((value * 100) / bonus[bonus.length - 1]["limit"]);
        const isMaximum = this.checkMaximum(percent);
        return {
            isMaximum,
            percent
        };
    }

    checkBonus = value => {
        const { bonus: bonusList } = this.state;
        let bonusTKN = 0;
        let bonus = [];
        bonusList.forEach((item) => {
            if (value >= item["limit"]) {
                bonusTKN = item["value"];
                bonus.push({value: item["value"], limit: item["limit"], active: true});
            } else {
                bonus.push({value: item["value"], limit: item["limit"], active: false});
            }
        });
        return {
            bonus,
            bonusTKN
        }
    }

    checkMaximum = value => value > 100;

    bonusCalc = (val, bonus) => (1 * val)  - ((1 * val) * (bonus / 100));

    transferToTKN = (value, bonusTKN, TKN) => (TKN * value)  + ((TKN * value) * (bonusTKN / 100));

    transferTKN = value => {
        const { TKN, currency } = this.state;
        const USD = TKN *  value;
        const BTC = (TKN / currency[0].price_usd) * value;
        const ETH = (TKN / currency[1].price_usd) * value;
        return { USD, BTC, ETH }
    }

    handleToken = (e, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return;
        }
        const {sumValue, progressBar, tokenValue, bonus, transferData} = this.calcToken(value);
        const obj = this.calcToken(value);
        this.props.calculateCurrencyValue(obj);
        this.setState({
            sumValue,
            progressBar,
            tokenValue,
            bonus,
            transferData
        })
    }

    handleInput = (e, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return;
        }
        const {sumValue, progressBar, tokenValue, bonus, transferData} = this.calcCurrency(value);
        const obj = this.calcCurrency(value);
        this.props.calculateCurrencyValue(obj);
        this.setState({
            sumValue,
            progressBar,
            tokenValue,
            bonus,
            transferData
        })
    }

    handleChange = (e, {value}) => {
        const { transferData:transferDataState } = this.state;
        const { changeCurrentCurrency, changeSumValue, transferData } = this.props;
        this.props.changeCurrentCurrency(value);
        this.props.changeSumValue(this.props.calculator.transferData[value])
        this.setState({
            currencyValue: value,
            sumValue: transferDataState[value]
        });
    }

    renderBonusLabel = () => {
        const { bonus } = this.state;
        return bonus.map((item,i) => {
            return(
                <Bonus
                    key={i}
                    bonusVal={item["value"]}
                    bonusActive={item["active"]}
                />
            )
        })
    }

    renderCurrencyButton = () => {
        const { currencyValue, currency } = this.state;
        return currency.map(item => {
            return (
                <Grid.Column width={2} key={item["id"]}>
                    <CurrencyButton
                        buttonTitle={item["symbol"]}
                        handleChange={this.handleChange}
                        currencyValue={currencyValue}
                    />
                </Grid.Column>
            )
        })
    }

    render() {
        const {percent, isMaximum} = this.state.progressBar;
        const { tokenValue, currencyValue } = this.state;

        return (
            <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                <Card.Content>
                    <Card.Header>Калькулятор</Card.Header>
                    <Divider />
                    <Grid verticalAlign={'middle'}>
                        <Grid.Row>
                            { this.renderCurrencyButton() }
                        </Grid.Row>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Input
                                    placeholder={currencyValue}
                                    onChange={this.handleInput}
                                    value={this.state.sumValue}
                                    style={{width: "100%"}}
                                    size={"big"}
                                    label={{ basic: true, content: currencyValue }}
                                    labelPosition='left'
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    placeholder={"TCT"}
                                    value={tokenValue}
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
                                    percent={percent}
                                    size={"tiny"}
                                    color={"red"}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <p>Бонус</p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                { this.renderBonusLabel() }
                             </Grid.Column>
                            <Grid.Column width={5}>
                                <span className={isMaximum === true ? "active": ""}>
                                    <Icon name={"warning sign"} />
                                    Вы достигли лимита
                                </span>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Form as={"div"}>
                                    <TextArea
                                        autoHeight
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

const mapStateToProps = state => ({
    calculator: state.calculator
})
const mapStateToDispatch = dispatch => ({
    changeCurrentCurrency: value => dispatch({type: "calculator/CHANGE_CURRENT_CURRENCY", payload: value}),
    changeSumValue: value => dispatch({type: "calculator/CHANGE_SUM_VALUE", payload: value}),
    changeDefaultValue: payload => {
        const { sumValue, progressBar, tokenValue, bonus, transferData } = payload;
        const initialDefault = () => {
            return dispatch => {
                dispatch({type: "calculator/CHANGE_SUM_VALUE", payload: sumValue});
                dispatch({type: "calculator/CHANGE_PROGRESS_BAR", payload: progressBar});
                dispatch({type: "calculator/CHANGE_TOKEN_VALUE", payload: tokenValue});
                dispatch({type: "calculator/CHANGE_BONUS", payload: bonus});
                dispatch({type: "calculator/CHANGE_TRANSFER_DATA", payload: transferData});
            }
        }
        dispatch(initialDefault())
    },
    calculateCurrencyValue: payload => {
        const { sumValue, progressBar, tokenValue, bonus, transferData } = payload;
        const calccurrencyValue = () => {
            return dispatch => {
                dispatch({type: "calculator/CHANGE_SUM_VALUE", payload: sumValue});
                dispatch({type: "calculator/CHANGE_PROGRESS_BAR", payload: progressBar});
                dispatch({type: "calculator/CHANGE_TOKEN_VALUE", payload: tokenValue});
                dispatch({type: "calculator/CHANGE_BONUS", payload: bonus});
                dispatch({type: "calculator/CHANGE_TRANSFER_DATA", payload: transferData});
            }
        }
        dispatch(calccurrencyValue())
    }
})
export default connect(mapStateToProps, mapStateToDispatch)(Calculator);
// export default Calculator;