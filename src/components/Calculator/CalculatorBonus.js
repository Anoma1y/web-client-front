import React from 'react';
import { Label } from 'semantic-ui-react'


export const Bonus = ({bonusVal, bonusActive}) => {
    return (
        <Label as={"span"} circular className={bonusActive === true ? "bonus__label bonus__label-active" : "bonus__label"}>{bonusVal} %</Label>
    )
}

