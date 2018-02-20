import React from 'react';

export const InputSlider = ({tokenValue, handleTokenRange}) => {
    return (
        <input
            type={"range"}
            min={0}
            max={2000000}
            step={10}
            value={tokenValue}
            onChange={handleTokenRange}
            style={{width: "100%"}}
        />
    )
}


