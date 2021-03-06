import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrencyButton } from 'components/Calculator/CalculatorButton';
import {
    Grid,
    Radio,
} from 'semantic-ui-react'
import {
    changeAdminCurrencyValue,
    changeAdminTokenValue,
    changeAdminTransferData,
    handleAdminCurrentCurrency,
    changeFixedCurrency
} from 'actions/admin';
import {
    calcToken,
    calcCurrency
} from 'libs/math';
import { InputSlider } from 'components/Calculator/CalculatorSlider';
import AdminCalculatorPaymount from './AdminCalculatorPaymount';
import AdminInputCurrency from './AdminInputCurrency';

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


    handleToken = (event) => {
        const checkNumber = /^\d*(?:\.\d{0,4})?$/g;
        const { value } = event.target;
        if(!value.match(checkNumber)) {
            return;
        }
        if (value > 2000000) {
            return;
        }
        const {
            currencyValue,
            bonus: bonusList,
        } = this.props.admin;
        const {
            currency,
            TSR: TKN_PRICE
        } = this.props.rate;
        this.changeState(calcToken(value, currencyValue, bonusList, currency, TKN_PRICE));
    }

    handleTokenOnly = event => {
        const checkNumber = /^\d*(?:\.\d{0,4})?$/g;
        const { value } = event.target;
        if(!value.match(checkNumber)) {
            return;
        }
        if (value > 2000000) {
            return;
        }
        const {
            currencyValue,
            bonus: bonusList,
        } = this.props.admin;
        const {
            currency,
            TSR: TKN_PRICE
        } = this.props.rate;
        const { changeAdminTokenValue } = this.props;
        // console.log(calcToken(value, currencyValue, bonusList, currency, TKN_PRICE));
        const { tokenValue } = calcToken(value, currencyValue, bonusList, currency, TKN_PRICE);
        changeAdminTokenValue(tokenValue);
    }
    handleCurrencyOnly = event => {
        const { currencyValue, bonus: bonusList, } = this.props.admin;
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
        const {
            currency,
            TSR: TKN_PRICE
        } = this.props.rate;
        const { changeAdminCurrencyValue } = this.props;
        const { sumValue, tokenValue } = calcCurrency(value, currencyValue, bonusList, currency, TKN_PRICE);
        if (tokenValue > 2000000) {
            return;
        }
        changeAdminCurrencyValue(sumValue);
    }
    
    handleCurrency = event => {
        const { currencyValue, bonus: bonusList, } = this.props.admin;
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
        const {
            currency,
            TSR: TKN_PRICE
        } = this.props.rate;
        const data = calcCurrency(value, currencyValue, bonusList, currency, TKN_PRICE);
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
        const {
            currencyValue,
            bonus: bonusList,
        } = this.props.admin;
        const {
            currency,
            TSR: TKN_PRICE
        } = this.props.rate;
        this.changeState(calcToken(value, currencyValue, bonusList, currency, TKN_PRICE));
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
            bonus,
            transferData
        } = this.props.admin;
        return (
            <Grid>
                <Grid.Row>
                    {this.renderCurrencyButton()}
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <AdminInputCurrency
                            tokenValue={tokenValue}
                            sumValue={sumValue}
                            currencyValue={currencyValue}
                            handleToken={this.handleToken}
                            // handleToken={this.handleTokenOnly}
                            handleCurrency={this.handleCurrency}
                            // handleCurrency={this.handleCurrencyOnly}
                        />
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
                        {
                            fixedCurrency.split('/')[1] !== 'ETH' ?
                                <Radio
                                    label={currencyValue}
                                    name='FIXED_CURRENCY_GROUP'
                                    value={currencyValue}
                                    checked={fixedCurrency.split('/')[0] === currencyValue}
                                    onChange={this.handleChangeFixedCurrency}
                                /> : null
                        }

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
                        <AdminCalculatorPaymount
                            tokenValue={tokenValue}
                            currencyValue={currencyValue}
                            fixedCurrency={fixedCurrency}
                            currentBonus={currentBonus}
                            transferData={transferData}
                        />
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

