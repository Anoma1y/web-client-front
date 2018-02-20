import React from 'react';

export const InputSlider = ({tokenValue, handleTokenRange}) => {
    return (
        <input
            type={"range"}
            min={0}
            max={2000000}
            step={10}
            className={"input__slider"}
            value={tokenValue}
            onChange={handleTokenRange}
            style={{backgroundSize: `${(tokenValue * 100) / 2000000}% 100%`}}
        />
    )
}
