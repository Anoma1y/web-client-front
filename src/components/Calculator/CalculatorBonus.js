import React from 'react';
import { Label } from 'semantic-ui-react'


export const Bonus = ({bonusVal, bonusActive}) => {
    return (
        <Label as={"span"} circular className={bonusActive === true ? "active" : ""} style={{margin: "0 3px", width: "45px"}}>{bonusVal} %</Label>
    )
}

