import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CurrencyButton } from 'components/Calculator/CalculatorButton';
import { 
    Grid,
    Radio,
    Divider
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
    calcCurrency,
    separationValue
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
                                        <span className={'auth_input-span'}>TSR</span>
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
                                        <span className={'auth_input-span'}>{currencyValue}</span>
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
                        <Grid className={"calculator__paymount"}>
                            <Grid.Row className={"calculator__paymount_info"}>
                                <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                    You ordered
                                </Grid.Column>
                                <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                    {separationValue(tokenValue)} tokens
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"calculator__paymount_info"}>
                                <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                    Bonus
                                </Grid.Column>
                                <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                    {currentBonus ? `${currentBonus} %` : "0"}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"calculator__paymount_info"}>
                                <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                    Total tokens
                                </Grid.Column>
                                <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                    {separationValue(transferData.TSR)} tokens
                                </Grid.Column>
                            </Grid.Row>
                            <Divider className={"calculator__paymount_divider"}/>
                            <Grid.Row className={"calculator__paymount_info calculator__paymount_amount"}>

                                <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                    Payment amount
                                </Grid.Column>
                                <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                    {separationValue(transferData[currencyValue])} {currencyValue}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"calculator__paymount_info calculator__paymount_amount"}>

                                <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                    Fixed currency
                                </Grid.Column>
                                <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                    <span style={{color: '#ff0000'}}>{fixedCurrency.split('/')[0]}</span>/<span>{fixedCurrency.split('/')[1]}</span>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
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

