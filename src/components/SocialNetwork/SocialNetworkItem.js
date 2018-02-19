import React from 'react';
import {
    Grid,
    Icon
} from 'semantic-ui-react'

export default ({href, iconName}) => {
    return (
        <Grid.Column widescreen={16} computer={16} tablet={1} mobile={1} textAlign={"center"}>
            <a href={href} target={"_blank"} style={{color: "black"}}>
                <Icon name={iconName} style={{ marginBottom: "25px" }}/>
            </a>
        </Grid.Column>
    )
}
