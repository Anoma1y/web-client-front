import React from 'react';
import { Form } from 'semantic-ui-react'
import {countryOptions} from "libs/country";

const getCountry = (KEY) => {
    const getObj = countryOptions.filter(item => item.key === KEY);
    if (getObj.length !== 0) {
        return getObj[0].text;
    } else return '';
};

const UserSingleBeneficial = (beneficial) => {
    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input readOnly fluid label='Name' value={beneficial.beneficial.Name}/>
                <Form.Input readOnly fluid label='Surname' value={beneficial.beneficial.Surname}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input readOnly fluid label='Address' value={beneficial.beneficial.Addres}/>
                <Form.Input readOnly fluid label='City' value={beneficial.beneficial.City}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input readOnly fluid label='Country' value={getCountry(beneficial.beneficial.Country)}/>
                <Form.Input readOnly fluid label='ZIP/Postal code' value={beneficial.beneficial.Zip}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input readOnly fluid label='Birth day' value={beneficial.beneficial.Dateofbirth}/>
                <Form.Input readOnly fluid label='Email' value={beneficial.beneficial.Email}/>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input readOnly fluid label='Phone' value={beneficial.beneficial.Phone}/>
            </Form.Group>
        </Form>
    )
};
export default UserSingleBeneficial;