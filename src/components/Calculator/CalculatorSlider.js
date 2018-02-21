import React from 'react';

export const InputSlider = ({maximumBonusToken, tokenValue, handleTokenRange}) => {
    const getPercent = val => (val * 100) / maximumBonusToken;
    return (
         <input
            type={"range"}
            min={0}
            max={maximumBonusToken}
            step={10}
            className={"input__slider"}
            value={tokenValue}
            onChange={handleTokenRange}
            style={{backgroundSize: `${getPercent(tokenValue) <= 100 ? getPercent(tokenValue) : 100}% 100%`}}
        />
    )
};
