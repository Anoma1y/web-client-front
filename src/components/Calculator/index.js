import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    changeTransferData,
    changeCurrencyValue
} from 'actions/calculator';
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



    transferUSD = (value, type) => {
        const { currency } = this.props.calculator;
        switch(type) {
            case "BTC":
                return value / currency[0].price_usd;
            case "ETH":
                return value / currency[1].price_usd;
            default:
                return;
        }
    }

    transferETH = (value, type) => {
        const { currency } = this.props.calculator;
        switch(type) {
            case "USD":
                return value * currency[1].price_usd;
            case "BTC":
                return currency[1].price_btc * value;
            default:
                return;
        }
    }

    transferBTC = (value, type) => {
        const { currency } = this.props.calculator;
        switch(type) {
            case "USD":
                return value * currency[0].price_usd;
            case "ETH":
                return (currency[0].price_usd / currency[1].price_usd) * value;
            default:
                return;
        }
    }

    checkBonus = value => {
        const { bonus: bonusList } = this.props.calculator;

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

    calcCurrency = value => {
        const {currencyValue, TKN} = this.props.calculator;
        let bonus;
        let BTC, ETH, TKNvalue, USD;
        if (currencyValue === "USD") {
            BTC = this.transferUSD(value, "BTC");
            ETH = this.transferUSD(value, "ETH");
            TKNvalue = this.transferToTKN(value, TKN);
            bonus = this.checkBonus(TKNvalue);
            TKNvalue = this.transferToTKNbonus(value, bonus.bonusTKN, TKN);
            USD = value;
        } else if (currencyValue === "ETH") {
            USD = this.transferETH(value, "USD");
            BTC = this.transferETH(value, "BTC");
            TKNvalue = this.transferToTKN(USD, TKN);
            bonus = this.checkBonus(TKNvalue);
            TKNvalue = this.transferToTKNbonus(USD, bonus.bonusTKN, TKN);
            ETH = value;
        } else if (currencyValue === "BTC") {
            USD = this.transferBTC(value, "USD");
            ETH = this.transferBTC(value, "ETH");
            TKNvalue = this.transferToTKN(USD, TKN);
            bonus = this.checkBonus(TKNvalue);
            TKNvalue = this.transferToTKNbonus(USD, bonus.bonusTKN, TKN);
            BTC = value;
        }
        const progressBar = this.handleProgressBar(TKNvalue);
        return {
            sumValue: value,
            progressBar,
            tokenValue: TKNvalue,
            bonus: bonus.bonus,
            transferData: {
                USD, TKN: TKNvalue, BTC, ETH
            }
        }
    }

    calcToken = value => {
        const { currencyValue } = this.props.calculator;
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
        const { bonus } = this.props.calculator;
        const percent = ((value * 100) / bonus[bonus.length - 1]["limit"]);
        const isMaximum = this.checkMaximum(percent);
        return {
            isMaximum,
            percent
        };
    }

    checkMaximum = value => value > 100;

    bonusCalc = (val, bonus) => (1 * val)  - ((1 * val) * (bonus / 100));

    transferToTKNbonus = (value, bonusTKN, TKN) => (TKN * value)  + ((TKN * value) * (bonusTKN / 100));

    transferToTKN = (value, TKN) => TKN * value;

    transferTKN = value => {
        const { TKN, currency } = this.props.calculator;
        const USD = TKN *  value;
        const BTC = (TKN / currency[0].price_usd) * value;
        const ETH = (TKN / currency[1].price_usd) * value;
        return {
            USD,
            BTC,
            ETH
        }
    }

    changeState = value => {
        const { changeTransferData } = this.props;
        changeTransferData(value);
    }

    componentDidMount() {
        const { tokenValue } = this.props.calculator;
        this.changeState(this.calcToken(tokenValue))
    }

    handleToken = (e, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return;
        }
        this.changeState(this.calcToken(value))
    }

    handleCurrency = (e, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return;
        }
        this.changeState(this.calcCurrency(value))
    }

    handleChange = (e, {value}) => {
        const { changeCurrencyValue } = this.props;
        changeCurrencyValue(value);
    }

    renderBonusLabel = () => {
        const { bonus } = this.props.calculator;
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
        const { currencyValue, currency } = this.props.calculator;
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
        const { percent, isMaximum } = this.props.calculator.progressBar;
        const { tokenValue, currencyValue, sumValue } = this.props.calculator;
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
                                    onChange={this.handleCurrency}
                                    value={sumValue}
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

export default connect(state => ({ calculator: state.calculator }), {
    changeCurrencyValue,
    changeTransferData
})(Calculator);
