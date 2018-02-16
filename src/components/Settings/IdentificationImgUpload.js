import React from 'react'
import { Card, Button, Icon, Input, Image} from 'semantic-ui-react'

class IdentificationImgUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    handleImageChange(e) {
        e.preventDefault();
        if (!e.target.files.length) {
            this.setState({
                imagePreviewUrl: null
            });
            return;
        }

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    renderImagePreview(imagePreviewUrl) {
        if (!imagePreviewUrl) return null;
        return <Image src={imagePreviewUrl} style={{maxHeight: 200}} rounded/>
    }

    render() {
        return (
            <div>
                <Card.Description style={{marginBottom: 15}}>
                    {this.props.description}
                </Card.Description>
                <Card.Description style={{marginBottom: 15}}>
                    <Button
                        compact icon
                        labelPosition={'left'}
                        onClick={(e)=> {
                            document.getElementById(this.props.id).click();
                            this.handleSubmit(e)
                        }}
                    >
                        <Icon name={'upload'}/>
                        Upload
                    </Button>
                </Card.Description>
                <Card.Description style={{marginBottom: 15}}>
                    {this.renderImagePreview(this.state.imagePreviewUrl)}
                </Card.Description>
                <Input
                    type={'file'}
                    id={this.props.id}
                    style={{display: 'none'}}
                    onChange={(e)=>this.handleImageChange(e)}/>
            </div>
        )
    }
}



export default IdentificationImgUpload;