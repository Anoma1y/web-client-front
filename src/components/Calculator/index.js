import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    changeTransferData,
    changeCurrencyValue,
    checkSuffixText,
    initializingTKN
} from 'actions/calculator';
import {
    Grid,
    TextArea,
    Button,
    Input,
    Progress,
    Icon,
    Card,
    Label,
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
        const {currencyValue, TKN, currency} = this.props.calculator;
        let bonus;
        let BTC, ETH, TKNinitialValue, TKNvalue, USD;
        const TKNVV = TKN * currency[1].price_usd;
        if (currencyValue === "USD") {
            BTC = this.transferUSD(value, "BTC");
            ETH = this.transferUSD(value, "ETH");
            TKNinitialValue = this.transferToTKN(value, TKNVV);
            bonus = this.checkBonus(TKNinitialValue);
            TKNvalue = this.transferToTKNbonus(value, bonus.bonusTKN, TKNVV);
            USD = value;
            console.log(bonus, TKN);
        } else if (currencyValue === "ETH") {
            USD = this.transferETH(value, "USD");
            BTC = this.transferETH(value, "BTC");
            TKNinitialValue = this.transferToTKN(USD, TKNVV);
            bonus = this.checkBonus(TKNinitialValue);
            TKNvalue = this.transferToTKNbonus(USD, bonus.bonusTKN, TKNVV);
            ETH = value;
        } else if (currencyValue === "BTC") {
            USD = this.transferBTC(value, "USD");
            ETH = this.transferBTC(value, "ETH");
            TKNinitialValue = this.transferToTKN(USD, TKNVV);
            bonus = this.checkBonus(TKNinitialValue);
            TKNvalue = this.transferToTKNbonus(USD, bonus.bonusTKN, TKNVV);
            BTC = value;
        }

        const progressBar = this.handleProgressBar(TKNvalue);
        return {
            sumValue: value,
            progressBar,
            tokenValue: TKNinitialValue,
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
        // const { USD, BTC, ETH } = this.transferTKN(bonusValue);
        const { USD, BTC, ETH, TKN } = this.transferTKN(value, bonusValue);
        const currentTokenValue = currencyValue === "BTC" ? BTC : currencyValue === "ETH" ? ETH : USD;
        const progressBar = this.handleProgressBar(value);
        return {
            sumValue: currentTokenValue,
            progressBar,
            tokenValue: value,
            bonus,
            transferData: {
                USD,
                TKN,
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

    checkMaximum = value => value >= 100;

    bonusCalc = (val, bonus) => (1 * val)  + ((1 * val) * (bonus / 100));

    transferToTKNbonus = (value, bonusTKN, TKN) => {
        console.log(TKN * value);
        return (value / TKN) + ((value / TKN) * (bonusTKN / 100));
    }

    transferToTKN = (value, TKN) => {
        //value / 0.845
        // return TKN * value;
        return value / TKN;
    }

    transferTKN = (value, bonusValue) => {
        const { TKN, currency } = this.props.calculator;
        const TKNVV = TKN * currency[1].price_usd;
        const USD = TKNVV *  value;
        const BTC = (TKNVV / currency[0].price_usd) * value;
        const ETH = (TKNVV / currency[1].price_usd) * value;
        const TKN1 = bonusValue;
        return { USD, BTC, ETH, TKN: TKN1 }
    }

    changeState = value => {
        const { changeTransferData } = this.props;
        changeTransferData(value);
    }

    componentWillMount() {
        // const { initializingTKN, calculator } = this.props;
        // const TKN = calculator.currency[1].price_usd * 0.001;
        // initializingTKN(TKN);
    }
    componentDidMount() {
        const { tokenValue } = this.props.calculator;
        this.changeState(this.calcToken(tokenValue))
    }

    handleToken = (event, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return;
        }
        this.changeState(this.calcToken(value));
    }

    handleCurrency = (event, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return 0;
        }
        this.changeState(this.calcCurrency(value));
    }

    handleChange = (event, {value}) => {
        const { changeCurrencyValue } = this.props;
        changeCurrencyValue(value);
    }

    checkSuffix = (event, handleType) => {
        const suffixText = {
            suffixToken: true,
            suffixCurrency: true
        }
        if (this.inputToken.inputRef === event.target) {
            suffixText.suffixToken = handleType !== "FOCUS";
        } else if (this.inputCurrency.inputRef === event.target) {
            suffixText.suffixCurrency = handleType !== "FOCUS";
        }
        return suffixText;
    }

    handleBlur = (event) => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "BLUR");
        checkSuffixText(suffixText);
    }

    handleFocus = (event) => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "FOCUS");
        checkSuffixText(suffixText);
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
                <Grid.Column widescreen={2} computer={2} tablet={3} mobile={4} key={item["id"]}>
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
        const { tokenValue, currencyValue, sumValue, transferData, suffixText } = this.props.calculator;
        return (
            <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                <Card.Content>
                    <Card.Header>Калькулятор</Card.Header>
                    <Divider />
                    <Grid verticalAlign={'middle'}>
                        <Grid.Row>
                            { this.renderCurrencyButton() }
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Form unstackable>
                                    <Form.Group>
                                        <Form.Field width={8}>
                                            <Input
                                                fluid
                                                placeholder={"TCT"}
                                                value={suffixText.suffixToken ? `${tokenValue} TCT` : tokenValue}
                                                onChange={this.handleToken}
                                                size={"large"}
                                                onBlur={this.handleBlur}
                                                onFocus={this.handleFocus}
                                                ref={(input) => {this.inputToken = input}}
                                            />
                                            <Label as={"span"} style={{marginTop: "7px", fontSize: "16px"}}>
                                                <span>Total: {`${transferData.TKN} TCT`}</span>
                                            </Label>
                                        </Form.Field>
                                        <Form.Field width={8}>
                                            <Input
                                                fluid
                                                placeholder={currencyValue}
                                                onChange={this.handleCurrency}
                                                value={suffixText.suffixCurrency ? `${sumValue} ${currencyValue}` : sumValue}
                                                size={"large"}
                                                onBlur={this.handleBlur}
                                                onFocus={this.handleFocus}
                                                ref={(input) => {this.inputCurrency = input}}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
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
                            <Grid.Column widescreen={2} computer={2} tablet={2} mobile={2}>
                                <p>Бонус</p>
                            </Grid.Column>
                            <Grid.Column widescreen={6} computer={8} tablet={8} mobile={8}>
                                { this.renderBonusLabel() }
                             </Grid.Column>
                            <Grid.Column widescreen={8} computer={6} tablet={6} mobile={6}>
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
    changeTransferData,
    checkSuffixText,
    initializingTKN
})(Calculator);
