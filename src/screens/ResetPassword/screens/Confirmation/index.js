import React from 'react'
import {
    Container,
    Grid
} from 'semantic-ui-react'
import ConfirmationComponent from 'components/Reset/ConfirmationComponent'

const Confirmation = (props) => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <ConfirmationComponent/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Confirmation;