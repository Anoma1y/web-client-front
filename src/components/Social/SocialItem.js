import React from 'react';

export default ({iconName}) => {
    return (
        <Card.Description style={{ marginBottom: "30px" }}>
            <Icon name={iconName} />
        </Card.Description>
    )
}
