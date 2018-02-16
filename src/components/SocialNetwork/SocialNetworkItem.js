import React from 'react';
import {
    List
} from 'semantic-ui-react'

export default ({href, iconName}) => {
    return (
        <List.Item>
            <a href={href} style={{color: "black"}}>
                <List.Icon name={iconName} style={{ marginBottom: "30px" }}/>
            </a>
        </List.Item>
    )
}
