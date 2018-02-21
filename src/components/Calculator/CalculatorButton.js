import React from 'react';
import { Radio } from 'semantic-ui-react'


export const CurrencyButton = ({buttonTitle, handleChange, currencyValue}) => {
    return (
        <Radio
            label={buttonTitle}
            name='radioGroup'
            value={buttonTitle}
            className={"currency__button"}
            checked={currencyValue === buttonTitle}
            onChange={handleChange}
        />
    )
}


