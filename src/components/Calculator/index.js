import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    changeTransferData,
    changeCurrencyValue,
    changeComments,
    checkSuffixText,
    initializingTKN,
    changeModalSuccessful,
    handleApplication
} from 'actions/calculator';
import {
    Grid,
    TextArea,
    Button,
    Card,
    Accordion,
    Icon,
    Modal,
    Radio,
    List,
    Divider,
    Form
} from 'semantic-ui-react';
import { Bonus } from './CalculatorBonus';
import { CurrencyButton } from './CalculatorButton';
import { InputSlider } from './CalculatorSlider';

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            activeIndex: -1 
        }

    }
    
    //Метод для расчета валюты
    //Принимает 2 параметра: value - текущее значение выбранной валюты
    //type - тип валюты для расчета
    transferUSD = (value, type) => {
        const { currency } = this.props.calculator;
        switch(type) {
            case "BTC":
                return (value / currency[0].price_usd).toFixed(4);
            case "ETH":
                return (value / currency[1].price_usd).toFixed(4);
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
                return (value * currency[1].price_usd).toFixed(2);
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
                return (value * currency[0].price_usd).toFixed(2);
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

    //Метод для расчета стоимость ТОКЕНА
    //Принимает 1 параметр: type - тип криптовалюты,
    //Возвращает расчетную стоимость токена, если тип не передан, то вернет токен без расчетов
    TKNprice = type => {
        const { TKN, currency } = this.props.calculator;
        switch(type) {
            case "BTC":
                return currency[0].price_usd * TKN;
            case "ETH":
                return currency[1].price_usd * TKN;
            default:
                return TKN;
        }
    }

    //Метод для расчета количества токенов из вводимого пользователем значения в Input-валюты
    //Принимает 1 параметр: value - вводимое пользователем значение валюты
    //Для выбранной валюты происходит расчет значений
    //Возвращает объект значений текущего значения Input, заполненость прогресс бара, значения токенов
    //бонусов и расчетного значения транферного значения валют и токенов
    calcCurrency = value => {
        const { currencyValue } = this.props.calculator;
        let bonus;
        let BTC, ETH, TKNinitialValue, TKNvalue, USD;
        const TKN_ETH = this.TKNprice("ETH");
        if (currencyValue === "USD") {
            BTC = this.transferUSD(value, "BTC");
            ETH = this.transferUSD(value, "ETH");
            TKNinitialValue = this.transferToTKN(value, TKN_ETH);
            bonus = this.checkBonus(TKNinitialValue);
            TKNvalue = this.transferToTKNbonus(value, bonus.bonusTKN, TKN_ETH);
            USD = value;
        } else if (currencyValue === "ETH") {
            USD = this.transferETH(value, "USD");
            BTC = this.transferETH(value, "BTC");
            TKNinitialValue = this.transferToTKN(USD, TKN_ETH);
            bonus = this.checkBonus(TKNinitialValue);
            TKNvalue = this.transferToTKNbonus(USD, bonus.bonusTKN, TKN_ETH);
            ETH = value;
        } else if (currencyValue === "BTC") {
            USD = this.transferBTC(value, "USD");
            ETH = this.transferBTC(value, "ETH");
            TKNinitialValue = this.transferToTKN(USD, TKN_ETH);
            bonus = this.checkBonus(TKNinitialValue);
            TKNvalue = this.transferToTKNbonus(USD, bonus.bonusTKN, TKN_ETH);
            BTC = value;
        }
        const progressBar = this.handleProgressBar(TKNvalue);
        return {
            sumValue: value,
            progressBar,
            tokenValue: TKNinitialValue.toFixed(4),
            bonus: bonus.bonus,
            currentBonus: bonus.bonusTKN,
            transferData: {
                USD,
                TKN: TKNvalue.toFixed(4),
                BTC,
                ETH
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
        const currentTokenValue = currencyValue === "BTC" ? BTC.toFixed(4) : currencyValue === "ETH" ? ETH.toFixed(4) : USD.toFixed(2);
        const progressBar = this.handleProgressBar(value);
        return {
            sumValue: currentTokenValue,
            progressBar,
            tokenValue: value,
            bonus,
            currentBonus: bonusTKN,
            transferData: {
                USD: USD.toFixed(2),
                TKN,
                BTC: BTC.toFixed(4),
                ETH: ETH.toFixed(4)
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

    //Метод для расчета бонусного значения при вводе токена
    //Принимает 2 параметра: value - текущее значения вводимое пользователем в Input-токены, bonus - процент бонуса
    //Возвращает значение токена с бонусным значением
    bonusCalc = (value, bonus) => (1 * value)  + ((1 * value) * (bonus / 100));

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
        const { currency } = this.props.calculator;
        const TKN_ETH = this.TKNprice("ETH");
        const USD = TKN_ETH *  value;
        const BTC = (TKN_ETH / currency[0].price_usd) * value;
        const ETH = (TKN_ETH / currency[1].price_usd) * value;
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
    handleToken = (event) => {
        const checkNumber = /^\d*(?:\.\d{0,4})?$/g;
        const { value } = event.target;
        if(!value.match(checkNumber)) {
            return;
        }
        if (value.length >= 25) {
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
    handleCurrency = event => {
        const { currencyValue } = this.props.calculator;
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
        if (value.length >= 25) {
            return;
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

    //Метод для разделения групп разрядов строки
    separationValue = value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(value);

    //Метод проверки суффикса (принимает параметры: event (текущий инпут) и handleType (тип: фокус или потеря фокуса из инпута)
    //Возвращает объект булевых значений для каждого инпута
    checkSuffix = (event, handleType) => {
        const suffixText = {
            suffixToken: true,
            suffixCurrency: true
        };
        //inputRef после ноды
        if (this.inputToken === event.target) {
            suffixText.suffixToken = handleType !== "FOCUS";
        } else if (this.inputCurrency === event.target) {
            suffixText.suffixCurrency = handleType !== "FOCUS";
        }
        return suffixText;
    }

    //Метод для возвращения суффикса (текущей валюты) в инпут.
    handleBlur = event => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "BLUR");
        checkSuffixText(suffixText);
    }

    //Метод для снятия суффикса (текущей валюты) из инпута, для последующего ввода числового значения
    handleFocus = event => {
        const { checkSuffixText } = this.props;
        const suffixText = this.checkSuffix(event, "FOCUS");
        checkSuffixText(suffixText);
    }

    handleChangeComments = event => {
        const { value } = event.target;
        const { changeComments } = this.props;
        changeComments(value);
    }

    handleCloseModal = () => {
        const { changeModalSuccessful } = this.props;
        changeModalSuccessful(false);
    }

    handleSubmitApplication = () => {
        const { currencyValue, transferData, comments } = this.props.calculator;
        const { handleApplication, changeModalSuccessful } = this.props;
        const { jwt:token } = this.props.user;
        changeModalSuccessful(true);
        console.log(currencyValue, transferData, comments);
        // handleApplication({currency: currencyValue, amount: Number(transferData[currencyValue]), comments ,token});
    }
    

    handleAccordionBtn = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }
    
    render() {
        const { isMaximum } = this.props.calculator.progressBar;
        const {
            tokenValue,
            currencyValue,
            sumValue,
            transferData,
            suffixText,
            bonus,
            currentBonus,
            comments,
            modalSuccessful,
            querySuccess
        } = this.props.calculator;
        const orderCurrency = "ETH"
        return (
            <Card fluid className={"component__calculator component__main"}>
                <Card.Content>
                    <Card.Header className={"component__title"}>Calculator</Card.Header>
                    <Divider className={"white__divider"}/>
                    <Grid verticalAlign={'middle'} className={"dashboard__component"}>
                        <Grid.Row className={"calculator__currency"}>
                            { this.renderCurrencyButton() }
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8} className={"auth_input"}>
                                            <label>
                                                <input
                                                    className={"input__currency populated"}
                                                    type={"text"}
                                                    placeholder={"TSR"}
                                                    value={suffixText.suffixToken ? this.separationValue(tokenValue) : tokenValue}
                                                    onChange={this.handleToken}
                                                    onBlur={this.handleBlur}
                                                    onFocus={this.handleFocus}
                                                    ref={(input) => {this.inputToken = input}}
                                                />
                                                <span>TSR</span>
                                            </label>
                                        </Grid.Column>
                                        <Grid.Column width={8} className={"auth_input"}>
                                            <label>
                                                <input
                                                    type="text"
                                                    className={"input__currency populated"}
                                                    placeholder={currencyValue}
                                                    value={suffixText.suffixCurrency ? this.separationValue(sumValue) : sumValue}
                                                    onChange={this.handleCurrency}
                                                    onBlur={this.handleBlur}
                                                    onFocus={this.handleFocus}
                                                    ref={(input) => {this.inputCurrency = input}}
                                                />
                                                <span>{currencyValue}</span>
                                            </label>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1} only={"computer"} style={{paddingTop: "10px"}}>
                            <Grid.Column>
                                <InputSlider
                                    maximumBonusToken={bonus[bonus.length - 1]["limit"]}
                                    tokenValue={tokenValue}
                                    handleTokenRange={this.handleTokenRange}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"calculator__bonus"}>
                            <Grid.Column widescreen={6} computer={8} tablet={12} mobile={16} floated={"right"}>
                                {
                                    isMaximum ? <span className={"bonus__maximum bonus__maximum-active"}>
                                                    <Icon name={"warning sign"} className={"bonus__maximum-icon"} />
                                                    You've reached the limit
                                                 </span>
                                        : null
                                }
                            </Grid.Column>
                        </Grid.Row>
                        {isMaximum ? <Divider/> : null}
                        <Grid.Row>
                            <Grid.Column>
                                <Grid className={"calculator__paymount"}>
                                    <Grid.Row className={"calculator__paymount_info"}>
                                        <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                            You ordered
                                        </Grid.Column>
                                        <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                            {this.separationValue(tokenValue)} tokens
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
                                            {this.separationValue(transferData.TKN)} tokens
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Divider className={"calculator__paymount_divider"}/>
                                    <Grid.Row className={"calculator__paymount_info calculator__paymount_amount"}>

                                        <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                            Payment amount
                                        </Grid.Column>
                                        <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                            {this.separationValue(transferData[currencyValue])} {currencyValue}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Accordion styled className={"calculator__accordion"}>
                                    <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleAccordionBtn} className={"calculator__accordion_title"}>
                                        <p>Leave a comment </p><Icon name='chevron right' />
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeIndex === 0} className={"calculator__accordion_content"}>
                                        <Form as={"div"}>
                                            <TextArea
                                                className={"calculator__comments"}
                                                autoHeight
                                                placeholder='Leave comment'
                                                onChange={this.handleChangeComments}
                                                value={comments}
                                            />
                                        </Form>
                                    </Accordion.Content>
                                </Accordion>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column textAlign={"right"}>

                                <Modal trigger={<Button
                                                    className={"dashboard__submit"}
                                                    onClick={this.handleSubmitApplication}
                                                    disabled={transferData.TKN < 1 || transferData.USD === "0"}
                                                >
                                                    Apply
                                                </Button>
                                                }
                                       open={modalSuccessful}
                                       size={"tiny"}
                                       onClose={this.handleCloseModal}
                                >
                                    <Modal.Content className={"modal__success"}>
                                        <Modal.Description>
                                            {currencyValue === "ETH" ?
                                                <div className={"calculator_order"}>
                                                    <p className={"calculator_order_header"}>Your order</p>
                                                    <List horizontal>
                                                        <List.Item >
                                                            <List.Icon
                                                                name='radio'
                                                                verticalAlign='middle'
                                                                onClick={this.handleChangeOrderCurrency}
                                                                className={orderCurrency === "TSR" ? "order__currency order__currency-active" : "order__currency"}
                                                            />
                                                            <List.Content className={orderCurrency === "TSR" ? "order__currency order__currency-active" : "order__currency"}>TSR</List.Content>
                                                        </List.Item>
                                                        <List.Item >
                                                            <List.Icon
                                                                name='radio'
                                                                verticalAlign='middle'
                                                                onClick={this.handleChangeOrderCurrency}
                                                                className={orderCurrency === "ETH" ? "order__currency order__currency-active" : "order__currency"}
                                                            />
                                                            <List.Content className={orderCurrency === "ETH" ? "order__currency order__currency-active" : "order__currency"}>ETH</List.Content>
                                                        </List.Item>
                                                    </List>
                                                </div> :
                                                <div className={"calculator_order"}>
                                                    <p className={"calculator_order_header"}>Please choose whether you want to set the number of tokens or the purchase amount in</p>
                                                    <List horizontal>
                                                        <List.Item >
                                                            <List.Icon
                                                                name='radio'
                                                                verticalAlign='middle'
                                                                onClick={this.handleChangeOrderCurrency}
                                                                className={orderCurrency === "TSR" ? "order__currency order__currency-active" : "order__currency"}
                                                            />
                                                            <List.Content className={orderCurrency === "TSR" ? "order__currency order__currency-active" : "order__currency"}>TSR</List.Content>
                                                        </List.Item>
                                                        {
                                                            currencyValue === "USD" ?
                                                                <List.Item >
                                                                    <List.Icon
                                                                        name='radio'
                                                                        verticalAlign='middle'
                                                                        onClick={this.handleChangeOrderCurrency}
                                                                        className={orderCurrency === "USD" ? "order__currency order__currency-active" : "order__currency"}
                                                                    />
                                                                    <List.Content className={orderCurrency === "USD" ? "order__currency order__currency-active" : "order__currency"}>USD</List.Content>
                                                                </List.Item>
                                                            : currencyValue === "BTC" ?
                                                                <List.Item >
                                                                    <List.Icon
                                                                        name='radio'
                                                                        verticalAlign='middle'
                                                                        onClick={this.handleChangeOrderCurrency}
                                                                        className={orderCurrency === "BTC" ? "order__currency order__currency-active" : "order__currency"}
                                                                    />
                                                                    <List.Content className={orderCurrency === "BTC" ? "order__currency order__currency-active" : "order__currency"}>BTC</List.Content>
                                                                </List.Item> 
                                                             : null
                                                        }
                                                    </List>
                                                    <Grid>
                                                        <Grid.Row className={"calculator__order_paymount"}>
                                                            <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                                                You ordered
                                                            </Grid.Column>
                                                            <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                                                {this.separationValue(tokenValue)} tokens
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className={"calculator__order_paymount"}>
                                                            <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                                                Bonus
                                                            </Grid.Column>
                                                            <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                                                {currentBonus ? `${currentBonus} %` : "0"}
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className={"calculator__order_paymount"}>
                                                            <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                                                Total tokens
                                                            </Grid.Column>
                                                            <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                                                {this.separationValue(transferData.TKN)} tokens
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Divider className={"calculator__paymount_divider"}/>
                                                        <Grid.Row className={"calculator__order_paymount calculator__order_amount"}>

                                                            <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                                                                Payment amount
                                                            </Grid.Column>
                                                            <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                                                                {this.separationValue(transferData[currencyValue])} {currencyValue}
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <p className={"calculator__order_text"}>
                                                        Please choose whether you want to set the number of tokens or the purchase amount in
                                                        Please be aware that the number of tokens bought will be calculated after we receive the funds, not at the moment theywere sent. The final amount can change due to exchange rate fluctuations.
                                                    </p>
                                                </div>
                                            }
                                            <div className={"modal__success_btn"}>
                                                <Button
                                                    className={"dashboard__submit"}
                                                    onClick={this.handleCloseModal}
                                                >Apply
                                                </Button>
                                            </div>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(state => ({ calculator: state.calculator, user: state.user }), {
    changeCurrencyValue,
    changeTransferData,
    checkSuffixText,
    changeComments,
    initializingTKN,
    changeModalSuccessful,
    handleApplication,
})(Calculator);
