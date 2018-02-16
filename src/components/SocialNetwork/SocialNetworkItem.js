import React from 'react';
import {
    Card,
    Icon
} from 'semantic-ui-react'

export default ({href, iconName}) => {
    return (
        <Card.Description style={{ marginBottom: "30px" }}>
            <a href={href}>
                <Icon name={iconName} />
            </a>
        </Card.Description>
    )
}
