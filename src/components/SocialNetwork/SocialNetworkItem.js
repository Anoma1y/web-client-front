import React from 'react';
import {
    Card,
    Icon
} from 'semantic-ui-react'

export default ({iconName}) => {
    return (
        <Card.Description style={{ marginBottom: "30px" }}>
            <Icon name={iconName} />
        </Card.Description>
    )
}
