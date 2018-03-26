import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    changeTransferData,
    changeCurrencyValue,
    changeComments,
    checkSuffixText,
    changeOrder,
    handleFormOrder,
    handleChangeOrder,
    handleApplication,
    handleCloseModal
} from 'actions/calculator';
import {
    Grid,
    Card,
    Icon,
    Divider,
} from 'semantic-ui-react';
import {
    separationValueCalculator,
    calcCurrency,
    calcToken
} from 'libs/math';
import { CurrencyButton } from './CalculatorButton';
import { InputSlider } from './CalculatorSlider';
import CalculatorComment from './CalculatorComment';
import CalculatorModal from "./CalculatorModal";
import CalculatorPaymount from './CalculatorPaymount';
import {CALCULATOR} from "libs/messages";

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            activeIndex: -1,
            messageLength: 0
        }
    }

    changeState = value => {
        const { changeTransferData } = this.props;
        changeTransferData(value);
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
            bonus: BONUS_LIST
        } = this.props.calculator;
        const {
            TSR: TSR_RATE,
            currency: CRYPTO_CURRENCY
        } = this.props.rate;
        this.changeState(calcToken(value, currencyValue, BONUS_LIST, CRYPTO_CURRENCY, TSR_RATE));
    }

    handleTokenRange = event => {
        const { value } = event.target;
        const {
            currencyValue,
            bonus: BONUS_LIST
        } = this.props.calculator;
        const {
            TSR: TSR_RATE,
            currency: CRYPTO_CURRENCY
        } = this.props.rate;
        this.changeState(calcToken(value, currencyValue, BONUS_LIST, CRYPTO_CURRENCY, TSR_RATE));
    }

    handleCurrency = event => {
        const {
            currencyValue,
            bonus: BONUS_LIST
        } = this.props.calculator;
        const {
            TSR: TSR_RATE,
            currency: CRYPTO_CURRENCY
        } = this.props.rate;
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
        const data = calcCurrency(value, currencyValue, BONUS_LIST, CRYPTO_CURRENCY, TSR_RATE);
        if (data.tokenValue > 2000000) {
            return;
        }
        this.changeState(data);
    }

    handleChange = (event, {value}) => {
        const { changeCurrencyValue } = this.props;
        changeCurrencyValue(value);
    }

    renderCurrencyButton = () => {
        const { currencyValue } = this.props.calculator;
        const { currency } = this.props.rate;
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

    checkSuffix = (event, handleType) => {
        const suffixText = {
            suffixToken: true,
            suffixCurrency: true
        };
        if (this.inputToken === event.target) {
            suffixText.suffixToken = handleType !== "FOCUS";
        } else if (this.inputCurrency === event.target) {
            suffixText.suffixCurrency = handleType !== "FOCUS";
        }
        return suffixText;
    }

    handleBlur = event => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "BLUR");
        checkSuffixText(suffixText);
    }

    handleFocus = event => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "FOCUS");
        checkSuffixText(suffixText);
    }

    handleChangeComments = event => {
        const { value } = event.target;
        const { changeComments } = this.props;
        const { length } = value;
        this.setState({
            messageLength: length
        })
        changeComments(value);
    }

    handleCloseModal = () => {
        const { handleCloseModal } = this.props;
        handleCloseModal()
    }

    handleSubmitApplication = () => {
        const { handleFormOrder } = this.props;
        const { comments } = this.props.calculator;
        if (comments.length <= 500) {
            handleFormOrder();
        }
    }
    handleSendApplication = () => {
        const { handleApplication } = this.props;
        this.setState({
            messageLength: 0
        });
        handleApplication();
    }
    handleChangeOrderCurrency = (event, {value}) => {
        const { handleChangeOrder } = this.props;
        const { currencyValue, transferData, tokenValue } = this.props.calculator;
        let orders = {}
        if (value === "TSR") {
            orders = {
                fixCurrency: "TSR",
                forCurrency: currencyValue,
                amount: tokenValue
            }
        } else {
            orders = {
                fixCurrency: value,
                forCurrency: "TSR",
                amount: transferData[value]
            }
        }
        handleChangeOrder(orders);
    }

    render() {
        const {
            messageLength
        } = this.state;
        const {
            tokenValue,
            currencyValue,
            sumValue,
            transferData,
            suffixText,
            bonus,
            currentBonus,
            comments,
            modalOpen,
            progressBar,
            modalSuccessful,
            order,
            querySuccess,
            applicationError,
            applicationSendInProgress
        } = this.props.calculator;
        return (
            <Card fluid className={"component__calculator component__main component__shadow"}>
                <Card.Content>
                    <Grid verticalAlign={'middle'} className={"dashboard__component"}>
                        <Grid.Row className={"calculator__currency"}>
                            { this.renderCurrencyButton() }
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8} className={"auth_input auth_input-success"}>
                                            <label>
                                                <input
                                                    className={"input__currency populated_currency"}
                                                    type={"text"}
                                                    placeholder={"TSR"}
                                                    value={suffixText.suffixToken ? separationValueCalculator(tokenValue) : tokenValue}
                                                    onChange={this.handleToken}
                                                    onBlur={this.handleBlur}
                                                    onFocus={this.handleFocus}
                                                    ref={(input) => {this.inputToken = input}}
                                                />
                                                <span className={'auth_input-span auth_input-success'}>TSR</span>
                                            </label>
                                        </Grid.Column>
                                        <Grid.Column width={8} className={"auth_input auth_input-success"}>
                                            <label>
                                                <input
                                                    type="text"
                                                    className={"input__currency populated_currency"}
                                                    placeholder={currencyValue}
                                                    value={suffixText.suffixCurrency ? separationValueCalculator(sumValue) : sumValue}
                                                    onChange={this.handleCurrency}
                                                    onBlur={this.handleBlur}
                                                    onFocus={this.handleFocus}
                                                    ref={(input) => {this.inputCurrency = input}}
                                                />
                                                <span className={'auth_input-span'}>{currencyValue}</span>
                                            </label>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{paddingTop: "10px"}}>
                            <Grid.Column width={16} className={"slider__wrapper"}>
                                <InputSlider
                                    maximumBonusToken={bonus[bonus.length - 1]["limit"]}
                                    tokenValue={tokenValue}
                                    handleTokenRange={this.handleTokenRange}
                                />
                                {
                                    progressBar.isMaximum ? <span className={"bonus__maximum bonus__maximum-active"}>
                                                    <Icon name={"warning sign"} className={"bonus__maximum-icon"} />
                                            {CALCULATOR.MAXIMUM_ERROR}
                                                 </span>
                                        : null
                                }
                            </Grid.Column>
                        </Grid.Row>
                        <Divider className={"calculator__slider_divider"}/>
                        <Grid.Row>
                            <CalculatorPaymount
                                currentBonus={currentBonus}
                                transferData={transferData}
                                currencyValue={currencyValue}
                                tokenValue={tokenValue}
                            />
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <CalculatorComment
                                comments={comments}
                                handleChangeComments={this.handleChangeComments}
                                messageLength={messageLength}
                            />
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <CalculatorModal
                                transferData={transferData}
                                modalOpen={modalOpen}
                                modalSuccessful={modalSuccessful}
                                querySuccess={querySuccess}
                                applicationError={applicationError}
                                currencyValue={currencyValue}
                                tokenValue={tokenValue}
                                currentBonus={currentBonus}
                                order={order}
                                applicationSendInProgress={applicationSendInProgress}
                                handleCloseModal={this.handleCloseModal}
                                handleSubmitApplication={this.handleSubmitApplication}
                                handleChangeOrderCurrency={this.handleChangeOrderCurrency}
                                handleSendApplication={this.handleSendApplication}
                            />
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(state => ({
    calculator: state.calculator,
    rate: state.rate
}), {
    changeCurrencyValue,
    changeTransferData,
    checkSuffixText,
    changeComments,
    changeOrder,
    handleApplication,
    handleChangeOrder,
    handleFormOrder,
    handleCloseModal
})(Calculator);
