import React from 'react';
import {
    Grid,
    Modal,
    Icon,
    Divider,
    Radio,
    Button,
    Loader
} from 'semantic-ui-react';
import { CALCULATOR } from 'libs/messages';
import { separationValue } from 'libs/math';

const CalculatorModal =({ transferData,
                          modalOpen,
                          modalSuccessful,
                          querySuccess,
                          applicationError,
                          currencyValue,
                          tokenValue,
                          currentBonus,
                          order,
                          handleCloseModal,
                          handleSubmitApplication,
                          handleChangeOrderCurrency,
                          handleSendApplication,
                          applicationSendInProgress }) => {
    return (
        <Grid.Column textAlign={"right"}>

            <Modal trigger={<Button
                className={"dashboard__submit"}
                onClick={handleSubmitApplication}
                disabled={transferData.TSR < 1 || transferData.USD === "0"}
                id={"submit__OpenApplication"}
            >
                Apply
            </Button>
            }
                   open={modalOpen}
                   size={"tiny"}
                   onClose={handleCloseModal}
                   id={"click__closeModal"}
            >
                <Modal.Content className={"modal__success"} scrolling>
                    {modalSuccessful ?
                        <Modal.Description>
                            <div className={querySuccess ? "modal__success_icon" : "modal__success_icon modal__error-icon"}>
                                <Icon name={querySuccess ? "check circle outline" : "warning circle"} />
                            </div>
                            <div className={"modal__success_text"}>
                                <span>{querySuccess ? "Application made successfully" : applicationError}</span>
                            </div>
                            <div className={querySuccess ? "modal__success_btn" : "modal__success_btn modal__success-error"}>
                                <Button
                                    className={"dashboard__submit"}
                                    onClick={handleCloseModal}
                                    id={querySuccess ? "close_successApplication" : "close_rejectApplication"}
                                >OK
                                </Button>
                            </div>
                        </Modal.Description> :
                        <Modal.Description>
                            {currencyValue === "ETH" ?
                                <div className={"calculator__order"}>
                                    <div className={"calculator__order_header"}>
                                        <p>{CALCULATOR.ORDER.TITLE}</p>
                                        <span>{CALCULATOR.ORDER.TEXT}</span>
                                    </div>
                                    <Grid className={"calculator__order_paymount"}>
                                        <p className={"calculator__order_label"}>Your order</p>
                                        <Grid.Row className={"order__paymount_item"}>
                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                You ordered
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8}>
                                                {separationValue(tokenValue, 4)} tokens
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className={"order__paymount_item"}>
                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                Bonus
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8}>
                                                {currentBonus ? `${currentBonus} %` : "0"}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className={"order__paymount_item"}>
                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                Total tokens
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8}>
                                                {separationValue(transferData.TSR, 4)} tokens
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Divider className={"calculator__paymount_divider"}/>
                                        <Grid.Row
                                            className={"calculator__order_amount"}>

                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                Payment amount
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8} className={"order__strong"}>
                                                {separationValue(transferData[currencyValue], 4)} {currencyValue}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div> :
                                <div className={"calculator__order"}>
                                    <div className={"calculator__order_header"}>
                                        <p>{CALCULATOR.ORDER.TITLE}</p>
                                        <span>{CALCULATOR.ORDER.TEXT}</span>
                                    </div>
                                    <Grid className={"calculator__order_wrapper"}>
                                        <Grid.Row className={"calculator__order_fixcurrency"}>
                                            <Grid.Column className={"rrright"} width={2}>
                                                <Radio
                                                    label={"TSR"}
                                                    name='BTC_USD_GROUP'
                                                    value={"TSR"}
                                                    checked={order.fixCurrency === "TSR"}
                                                    onChange={handleChangeOrderCurrency}
                                                />
                                            </Grid.Column>
                                            {
                                                currencyValue === "USD" ?
                                                    <Grid.Column className={"llleft"} width={2}>
                                                        <Radio
                                                            label={"USD"}
                                                            name='BTC_USD_GROUP'
                                                            value={"USD"}
                                                            checked={order.fixCurrency === "USD"}
                                                            onChange={handleChangeOrderCurrency}
                                                        />
                                                    </Grid.Column>
                                                    : currencyValue === "BTC" ?
                                                    <Grid.Column className={"llleft"} width={2}>
                                                        <Radio
                                                            label={"BTC"}
                                                            name='BTC_USD_GROUP'
                                                            value={"BTC"}
                                                            checked={order.fixCurrency === "BTC"}
                                                            onChange={handleChangeOrderCurrency}
                                                        />
                                                    </Grid.Column>
                                                    : null
                                            }
                                        </Grid.Row>
                                    </Grid>
                                    <Grid className={"calculator__order_paymount"}>
                                        <Grid.Row className={"order__paymount_item"}>
                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                You ordered
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8}>
                                                {separationValue(tokenValue, 4)} tokens
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className={"order__paymount_item"}>
                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                Bonus
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8}>
                                                {currentBonus ? `${currentBonus} %` : "0"}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row className={"order__paymount_item"}>
                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                Total tokens
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8}>
                                                {separationValue(transferData.TSR, 4)} tokens
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Divider className={"calculator__paymount_divider"}/>
                                        <Grid.Row
                                            className={"calculator__order_amount"}>

                                            <Grid.Column widescreen={6} computer={6} tablet={6}
                                                         mobile={8}>
                                                Payment amount
                                            </Grid.Column>
                                            <Grid.Column widescreen={10} computer={10} tablet={10}
                                                         mobile={8} className={"order__strong"}>
                                                {separationValue(transferData[currencyValue], 4)} {currencyValue}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <p className={"calculator__order_text"}>
                                        {CALCULATOR.ORDER.NOTE}
                                    </p>
                                </div>
                            }
                            <div className={"modal__success_btn"}>
                                <Button
                                    className={"dashboard__submit"}
                                    onClick={handleSendApplication}
                                    floated={"right"}
                                    disabled={applicationSendInProgress === true}
                                    id={"submit__sendApplication"}
                                >{applicationSendInProgress ? <Loader active inline size={"mini"}/> : "Apply"}
                                </Button>
                            </div>
                        </Modal.Description>
                    }
                </Modal.Content>
            </Modal>
        </Grid.Column>
    )
}

export default CalculatorModal;
