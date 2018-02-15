import React from 'react'
import { Card, Button, Icon, Input } from 'semantic-ui-react'

const IdentificationImgUpload = (props) => (
    <div>
        <Card.Description style={{marginBottom: 15}}>
            {props.description}
        </Card.Description>
        <Card.Description>
            <Button compact icon labelPosition={'left'} style={{marginBottom: 15}}><Icon name='upload' />Upload</Button> Photo.jopg
        </Card.Description>
        <Input type={'file'} style={{display: 'none' }}/>
    </div>
);

export default IdentificationImgUpload;