import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Card,
    Form,
    Image
} from 'semantic-ui-react';
import {countryOptions} from 'libs/country';

class UserSingleIndividual extends Component {

    render() {
        const {
            singleUser,
            individualUserInformation,
            individualUserImage,
        } = this.props.admin;
        const getCountry = (KEY) => {
            const getObj = countryOptions.filter(item => item.key === KEY);
            if (getObj.length !== 0) {
                return getObj[0].text;
            } else return '';
        };
        return (
            <Grid.Column>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            {singleUser.kyc_type}
                        </Card.Header>
                        <Card.Description>

                            <div>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input readOnly fluid label='Name' value={individualUserInformation.Name}/>
                                        <Form.Input readOnly fluid label='Surname' value={individualUserInformation.Surname}/>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input readOnly fluid label='Address' value={individualUserInformation.Addres}/>
                                        <Form.Input readOnly fluid label='City' value={individualUserInformation.City}/>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input readOnly fluid label='Country' value={getCountry(individualUserInformation.Country)}/>
                                        <Form.Input readOnly fluid label='ZIP/Postal code' value={individualUserInformation.Zip}/>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input readOnly fluid label='Birth day' value={individualUserInformation.Dateofbirth}/>
                                        <Form.Input readOnly fluid label='Email' value={individualUserInformation.Email}/>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input readOnly fluid label='Phone' value={individualUserInformation.Phone}/>
                                    </Form.Group>
                                </Form>
                            </div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <p>Submit a personal identity document with photo: Passport, ID, Residence document (both sides)</p>
                                    </Grid.Column>
                                    <Grid.Column width={16}>
                                        <Image centered src={individualUserImage.personalUserDocument} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <p>Utility bill or any other document with a date no later than 2 months before the presentation (this confirms the address)</p>
                                    </Grid.Column>
                                    <Grid.Column width={16}>
                                        <Image centered src={individualUserImage.utilityBill} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {

})(UserSingleIndividual);

