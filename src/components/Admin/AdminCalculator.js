import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrencyButton } from 'components/Calculator/CalculatorButton';
import { 
    Grid,
    Radio
} from 'semantic-ui-react'
import {
    changeAdminCurrencyValue,
    changeAdminTokenValue,
    changeAdminTransferData,
    handleAdminCurrentCurrency,
    changeFixedCurrency
} from 'actions/admin';
import {
    bonusCalc,
    checkMaximum,
    transferToTKNbonus,
    transferToTKN,
    checkBonus,
    transferUSD,
    transferETH,
    transferBTC,
    TKNprice
} from 'libs/math';
import { InputSlider } from 'components/Calculator/CalculatorSlider';

class AdminCalculator extends Component {

    renderCurrencyButton = () => {
        const {
            currencyValue
        } = this.props.admin;
        const {
            currency
        } = this.props.rate;
        return currency.map(item => {
            return (
                <Grid.Column widescreen={2} computer={2} tablet={2} mobile={3} key={item["id"]}>
                    <CurrencyButton
                        buttonTitle={item["symbol"]}
                        handleChange={this.handleChange}
                        currencyValue={currencyValue}
                    />
                </Grid.Column>
            )
        })
    }


    componentWillMount() {
        const {
            tokenValue
        } = this.props.admin;
        setTimeout(() => {
            this.changeState(this.calcToken(tokenValue));
        }, 500);
    }


    calcCurrency = value => {
        const { currencyValue, bonus: bonusList } = this.props.admin;
        const {
            TSR: TSR_PRICE,
            currency
        } = this.props.rate;
        let bonus;
        let BTC, ETH, TKNinitialValue, TSRvalue, USD;
        const TSR_ETH = TKNprice("ETH", TSR_PRICE, currency);
        if (currencyValue === "USD") {
            BTC = transferUSD(value, "BTC", currency);
            ETH = transferUSD(value, "ETH", currency);
            TKNinitialValue = transferToTKN(value, TSR_ETH);
            bonus = checkBonus(TKNinitialValue, bonusList);
            TSRvalue = transferToTKNbonus(value, bonus.bonusTSR, TSR_ETH);
            USD = value;
        } else if (currencyValue === "ETH") {
            USD = transferETH(value, "USD", currency);
            BTC = transferETH(value, "BTC", currency);
            TKNinitialValue = transferToTKN(USD, TSR_ETH);
            bonus = checkBonus(TKNinitialValue, bonusList);
            TSRvalue = transferToTKNbonus(USD, bonus.bonusTSR, TSR_ETH);
            ETH = value;
        } else if (currencyValue === "BTC") {
            USD = transferBTC(value, "USD", currency);
            ETH = transferBTC(value, "ETH", currency);
            TKNinitialValue = transferToTKN(USD, TSR_ETH);
            bonus = checkBonus(TKNinitialValue, bonusList);
            TSRvalue = transferToTKNbonus(USD, bonus.bonusTSR, TSR_ETH);
            BTC = value;
        }
        const progressBar = this.handleProgressBar(TSRvalue);
        return {
            sumValue: value,
            progressBar,
            tokenValue: TKNinitialValue.toFixed(4),
            bonus: bonus.bonus,
            currentBonus: bonus.bonusTSR,
            transferData: {
                USD,
                TSR: TSRvalue.toFixed(4),
                BTC,
                ETH
            }
        }
    }

    calcToken = value => {
        const { currencyValue, bonus: bonusList } = this.props.admin;
        const { bonus, bonusTSR } = checkBonus(value, bonusList);
        const bonusValue = bonusCalc(value, bonusTSR);
        const { USD, BTC, ETH, TSR } = this.transferTKN(value, bonusValue);
        const currentTokenValue = currencyValue === "BTC" ? BTC.toFixed(4) : currencyValue === "ETH" ? ETH.toFixed(4) : USD.toFixed(2);
        const progressBar = this.handleProgressBar(value);
        return {
            sumValue: currentTokenValue,
            progressBar,
            tokenValue: value,
            bonus,
            currentBonus: bonusTSR,
            transferData: {
                USD: USD.toFixed(2),
                TSR,
                BTC: BTC.toFixed(4),
                ETH: ETH.toFixed(4)
            }
        }
    }
    handleProgressBar = value => {
        const { bonus } = this.props.admin;
        const percent = ((value * 100) / bonus[bonus.length - 1]["limit"]);
        const isMaximum = checkMaximum(percent);
        return {
            isMaximum,
            percent
        };
    }
    transferTKN = (value, bonusValue) => {
        const {
            TSR: TKN_PRICE,
            currency
        } = this.props.rate;
        const TSR_ETH = TKNprice("ETH", TKN_PRICE, currency);
        const USD = TSR_ETH *  value;
        const BTC = (TSR_ETH / currency[0].price_usd) * value;
        const ETH = (TSR_ETH / currency[1].price_usd) * value;
        return { USD, BTC, ETH, TSR: bonusValue }
    }
    handleToken = (event) => {
        const checkNumber = /^\d*(?:\.\d{0,4})?$/g;
        const { value } = event.target;
        if(!value.match(checkNumber)) {
            return;
        }
        if (value > 2000000) {
            return;
        }
        this.changeState(this.calcToken(value));
    }
    handleCurrency = event => {
        const { currencyValue } = this.props.admin;
        const { value } = event.target;
        let checkNumber;
        if (currencyValue === "USD") {
            checkNumber = /^\d*(?:\.\d{0,2})?$/g;
        } else {
            checkNumber = /^\d*(?:\.\d{0,4})?$/g;
        }
        if(!value.match(checkNumber)) {
            return;
        }
        const data = this.calcCurrency(value);
        if (data.tokenValue > 2000000) {
            return;
        }
        this.changeState(data);
    }

    handleChange = (event, {value}) => {
        const { handleAdminCurrentCurrency } = this.props;
        handleAdminCurrentCurrency(value);
    }
    changeState = value => {
        const { changeAdminTransferData } = this.props;
        changeAdminTransferData(value);
    }
    handleTokenRange = event => {
        const { value } = event.target;
        this.changeState(this.calcToken(value));
    }
    handleChangeFixedCurrency = (event, {value}) => {
        const {
            changeFixedCurrency
        } = this.props;
        const {
            currencyValue
        } = this.props.admin;
        if (value === "TSR") {
            changeFixedCurrency(`TSR/${currencyValue}`)

        } else if (value === currencyValue) {
            changeFixedCurrency(`${currencyValue}/TSR`)
        }
    }
    render() {
        const {
            sumValue,
            tokenValue,
            currencyValue,
            currentBonus,
            fixedCurrency,
            bonus
        } = this.props.admin;
        return (
            <Grid>
                <Grid.Row>
                    {this.renderCurrencyButton()}
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8} className={"auth_input"}>
                                    <label>
                                        <input
                                            className={"input__currency populated_currency"}
                                            type={"text"}
                                            placeholder={"TSR"}
                                            value={tokenValue}
                                            onChange={this.handleToken}
                                            ref={(input) => {this.inputToken = input}}
                                        />
                                        <span>TSR</span>
                                    </label>
                                </Grid.Column>
                                <Grid.Column width={8} className={"auth_input"}>
                                    <label>
                                        <input
                                            type="text"
                                            className={"input__currency populated_currency"}
                                            placeholder={currencyValue}
                                            value={sumValue}
                                            onChange={this.handleCurrency}
                                            ref={(input) => {this.inputCurrency = input}}
                                        />
                                        <span>{currencyValue}</span>
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Radio
                            label='TSR'
                            name='FIXED_CURRENCY_GROUP'
                            value='TSR'
                            checked={fixedCurrency.split('/')[0] === 'TSR'}
                            onChange={this.handleChangeFixedCurrency}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Radio
                            label={currencyValue}
                            name='FIXED_CURRENCY_GROUP'
                            value={currencyValue}
                            checked={fixedCurrency.split('/')[0] === currencyValue}
                            onChange={this.handleChangeFixedCurrency}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <InputSlider
                            maximumBonusToken={bonus[bonus.length - 1]["limit"]}
                            tokenValue={tokenValue}
                            handleTokenRange={this.handleTokenRange}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {`Bonus: ${currentBonus}%`}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default connect(state => ({
    admin: state.admin,
    rate: state.rate
}), {
    changeAdminCurrencyValue,
    changeAdminTokenValue,
    changeAdminTransferData,
    handleAdminCurrentCurrency,
    changeFixedCurrency
})(AdminCalculator);

