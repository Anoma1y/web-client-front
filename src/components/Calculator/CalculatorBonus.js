import React from 'react';
import { Label } from 'semantic-ui-react'


export const Bonus = ({bonusVal}) => {
    return (
        <Label as={"span"} circular style={{margin: "0 3px", width: "45px"}}>{bonusVal} %</Label>
    )
}

