import React from 'react';
import {
    Grid,
    Divider
} from 'semantic-ui-react';

const separationValue = value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(value);

const CalculatorPaymount = ({ tokenValue, transferData, currentBonus, currencyValue}) => {
    return (
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
            </Grid>
        </Grid.Column>
    );
}

export default CalculatorPaymount;
