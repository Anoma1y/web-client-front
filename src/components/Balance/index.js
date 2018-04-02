import React from 'react';
import {
    Grid,
    Divider,
    Card
} from 'semantic-ui-react';
import { separationValue } from 'libs/math';

const UserBalance = () => {
    const USER_BALANCE = 0;
    return (
        <Card fluid className={"component__main component__shadow"}>
            <Card.Content>
                <Card.Header className={"component__title"}>Your balance</Card.Header>
                <Divider className={"component__divider"} />
                <Grid className={"dashboard__component"}>
                    <Grid.Row textAlign={"left"} className={"component__timer"}>
                        <Grid.Column>
                            <p className={'user__balance_amount'}>
                                {separationValue(USER_BALANCE, 4)} tokens
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    )
};
export default UserBalance;