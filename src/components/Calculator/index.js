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
    Icon,
    Card,
    Label,
    Divider,
    Form
} from 'semantic-ui-react';
import { Bonus } from './CalculatorBonus';
import { CurrencyButton } from './CalculatorButton';
import { InputSlider } from './CalculatorSlider';

class Calculator extends Component {
    //Метод для расчета валюты
    //Принимает 2 параметра: value - текущее значение выбранной валюты
    //type - тип валюты для расчета
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
    //Метод для расчета валюты
    //Принимает 2 параметра: value - текущее значение выбранной валюты
    //type - тип валюты для расчета
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
    //Метод для расчета валюты
    //Принимает 2 параметра: value - текущее значение выбранной валюты
    //type - тип валюты для расчета
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

    //Метод для проверки наличия бонусного значения скидки
    //Принимает 1 параметр: value - значение текущего кол-ва токенов
    //Если достигает текущего лимита для определенных бонусов, то возвращает true значение (активированный бонус
    //Возвращает объект бонусов и бонусного процента
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

    //Метод для расчета количества токенов из вводимого пользователем значения в Input-валюты
    //Принимает 1 параметр: value - вводимое пользователем значение валюты
    //Для выбранной валюты происходит расчет значений
    //Возвращает объект значений текущего значения Input, заполненость прогресс бара, значения токенов
    //бонусов и расчетного значения транферного значения валют и токенов
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
            tokenValue: TKNinitialValue.toFixed(4),
            bonus: bonus.bonus,
            transferData: {
                USD, TKN: TKNvalue.toFixed(4), BTC, ETH
            }
        }
    }
    //Метод для расчета количества токенов из вводимого пользователем значения в Input-токен
    //Принимает 1 параметр: value - вводимое пользователем значение токенов
    //Для выбранной валюты происходит расчет значений
    //Возвращает объект значений расчетного значения суммы валют, заполненость прогресс бара, значения токенов из текущего Input
    //бонусов и расчетного значения транферного значения валют и токенов
    calcToken = value => {
        const { currencyValue } = this.props.calculator;
        const { bonus, bonusTKN } = this.checkBonus(value);
        const bonusValue = this.bonusCalc(value, bonusTKN);
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

    //Обраточки прогресс бара
    //Принимает 1 значение: value - текущее количество заполнености
    //Возвращает объект значение: максимум (true || false) и percent - текущее кол-во процентов заполнености
    handleProgressBar = value => {
        const { bonus } = this.props.calculator;
        const percent = ((value * 100) / bonus[bonus.length - 1]["limit"]);
        const isMaximum = this.checkMaximum(percent);
        return {
            isMaximum,
            percent
        };
    }

    //Метод для проверки достижения максимум бонусов
    //Принимает 1 значение: value - процент заполнения прогресс бара
    //Зависящий от максимального количества токена и вводимого пользователем
    checkMaximum = value => value >= 100;

    bonusCalc = (val, bonus) => (1 * val)  + ((1 * val) * (bonus / 100));

    //Метод для расчета бонуса от токена, принимает 3 значения: value - текущее значение вводимое пользователем в Input-валюты
    //bonusTKN - бонусное значение токена, TKN - стоимость токена
    //Возвращает значение токена с бонусом
    //Метод добавляет значение в общее количество токенов
    transferToTKNbonus = (value, bonusTKN, TKN) => (value / TKN) + ((value / TKN) * (bonusTKN / 100));

    //Метод для расчета текущего значения токена из вводимой валюты
    //Принимает 2 параметра: value - значения, вводимое пользователем в Input-валюты
    //TKN - стоимость токена
    //Возвращает целое цифровое значение токена
    transferToTKN = (value, TKN) => value / TKN;

    //Метод для расчета текущего значения токена из вводимого токена
    //Принимает 2 значения: value - значение, вводимое пользователем в Input-токен
    //bonusValue - бонусное значение токена
    //Возвращает объект значений для каждой валюты + токена
    transferTKN = (value, bonusValue) => {
        const { TKN, currency } = this.props.calculator;
        const TKNVV = TKN * currency[1].price_usd;
        const USD = TKNVV *  value;
        const BTC = (TKNVV / currency[0].price_usd) * value;
        const ETH = (TKNVV / currency[1].price_usd) * value;
        return { USD, BTC, ETH, TKN: bonusValue }
    }

    //Метод для изменения состояния
    //Принимает 1 значение: value - объект данных
    //Вызывает Action для добавления данных в Store
    changeState = value => {
        const { changeTransferData } = this.props;
        changeTransferData(value);
    }

    //Инициализия дефолтного значения токенов
    componentDidMount() {
        const { tokenValue } = this.props.calculator;
        this.changeState(this.calcToken(tokenValue))
    }

    //Метод для обработки Input ввода валюты (тип валюты зависит от выбранного Radio Button'a)
    //Принимает 1 значение (event - value) - вводимое (пользователем) значение
    //Происходит проверка на отсутствие текста и спец-символов
    //Если ошибок нет, то вызывает фукнцию для изменения состояния с помощью экшенеов
    //Передает в данную фукнцию функцию которая расчитывает данные
    handleToken = (event, {value}) => {
        const checkNumber = /^\d*(?:\.\d{0,4})?$/g;
        if(!value.match(checkNumber)) {
            return;
        }
        this.changeState(this.calcToken(value));
    }

    handleTokenRange = event => {
        const { value } = event.target;
        this.changeState(this.calcToken(value));
    }
    
    //Метод для обработки Input ввода валюты (тип валюты зависит от выбранного Radio Button'a)
    //Принимает 1 значение (event - value) - вводимое (пользователем) значение
    //Происходит проверка на отсутствие текста и спец-символов
    //Если ошибок нет, то вызывает фукнцию для изменения состояния с помощью экшенеов
    //Передает в данную фукнцию функцию которая расчитывает данные
    handleCurrency = (event, {value}) => {
        const checkNumber = /^\d*\.?\d*$/;
        const checkDoth = /^\./;
        if (!value.match(checkNumber) || value.match(checkDoth)) {
            return 0;
        }
        this.changeState(this.calcCurrency(value));
    }

    //Метод для обработки Radio button'ов
    //Устанавливает текущее значение выбранной валюты, принимает 1 параметр (значение event'a) - текущая валюта
    //Взывает Action для смены выбранной валюты в Reducer
    handleChange = (event, {value}) => {
        const { changeCurrencyValue } = this.props;
        changeCurrencyValue(value);
    }

    //Метод проверки суффикса (принимает параметры: event (текущий инпут) и handleType (тип: фокус или потеря фокуса из инпута)
    //Возвращает объект булевых значений для каждого инпута
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

    //Метод для возвращения суффикса (текущей валюты) в инпут.
    handleBlur = (event) => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "BLUR");
        checkSuffixText(suffixText);
    }

    //Метод для снятия суффикса (текущей валюты) из инпута, для последующего ввода числового значения
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
                <Grid.Column widescreen={3} computer={3} tablet={3} mobile={4} key={item["id"]}>
                    <CurrencyButton
                        buttonTitle={item["symbol"]}
                        handleChange={this.handleChange}
                        currencyValue={currencyValue}
                    />
                </Grid.Column>
            )
        })
    }

    //Метод для разделения групп разрядов строки
    separationValue = value => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 4 }).format(value);

    render() {
        const { isMaximum } = this.props.calculator.progressBar;
        const { tokenValue, currencyValue, sumValue, transferData, suffixText, bonus } = this.props.calculator;

        return (
            <Card fluid className={"component__calculator component__main"}>
                <Card.Content>
                    <Card.Header>Калькулятор</Card.Header>
                    <Divider className={"white__divider"}/>
                    <Grid verticalAlign={'middle'} className={"dashboard__component"}>
                        <Grid.Row>
                            { this.renderCurrencyButton() }
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Form unstackable>
                                    <Form.Group  style={{marginBottom: 0}}>
                                        <Form.Field width={8}>
                                            <Input
                                                fluid
                                                className={"input__currency"}
                                                placeholder={"TCT"}
                                                value={suffixText.suffixToken ? `${this.separationValue(tokenValue)} TCT` : tokenValue}
                                                onChange={this.handleToken}
                                                size={"large"}
                                                onBlur={this.handleBlur}
                                                onFocus={this.handleFocus}
                                                ref={(input) => {this.inputToken = input}}
                                            />
                                            <Label as={"span"} className={"total__label"}>
                                                <span>Total: {`${this.separationValue(transferData.TKN)} TCT`}</span>
                                            </Label>
                                        </Form.Field>
                                        <Form.Field width={8}>
                                            <Input
                                                fluid
                                                className={"input__currency"}
                                                placeholder={currencyValue}
                                                onChange={this.handleCurrency}
                                                value={suffixText.suffixCurrency ? `${this.separationValue(sumValue)} ${currencyValue}` : sumValue}
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
                        <Grid.Row columns={1} only={"computer"} style={{paddingTop: 0}}>
                            <Grid.Column>
                                <InputSlider
                                    maximumBonusToken={bonus[bonus.length - 1]["limit"]}
                                    tokenValue={tokenValue}
                                    handleTokenRange={this.handleTokenRange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"calculator__bonus"}>
                            <Grid.Column widescreen={2} computer={2} tablet={2} mobile={2}>
                                <p className={"bonus__title"}>Bonus</p>
                            </Grid.Column>
                            <Grid.Column widescreen={6} computer={8} tablet={8} mobile={8}>
                                { this.renderBonusLabel() }
                             </Grid.Column>
                            <Grid.Column widescreen={8} computer={6} tablet={6} mobile={6}>
                                <span className={isMaximum === true ? "bonus__maximum bonus__maximum-active": "bonus__maximum"}>
                                    <Icon name={"warning sign"} className={"bonus__maximum-icon"}/>
                                    Вы достигли лимита
                                </span>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Form as={"div"}>
                                    <TextArea
                                        className={"calculator__comments"}
                                        autoHeight
                                        placeholder='Оставить комментарий'
                                    />
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column textAlign={"right"}>
                                <Button
                                    circular
                                    className={"calculator__submit"}
                                    disabled={tokenValue === "0" || sumValue === "0"}
                                > Оставить заявку
                                </Button>
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
