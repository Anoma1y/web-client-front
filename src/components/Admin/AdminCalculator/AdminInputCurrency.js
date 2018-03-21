import React from 'react';
import { Grid } from 'semantic-ui-react'

const AdminInputCurrency = ({tokenValue, sumValue, currencyValue, handleToken, handleCurrency}) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={8} className={"auth_input"}>
                    <label>
                        <input
                            className={"input__currency populated_currency"}
                            type={"text"}
                            placeholder={"TSR"}
                            value={tokenValue}
                            onChange={handleToken}
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
                            onChange={handleCurrency}
                        />
                        <span className={'auth_input-span'}>{currencyValue}</span>
                    </label>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};
export default AdminInputCurrency;