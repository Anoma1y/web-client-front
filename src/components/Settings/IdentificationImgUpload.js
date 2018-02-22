import React from 'react';
import {
    Card,
    Button,
    Icon,
    Input,
    Image
} from 'semantic-ui-react';

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
        return <Image src={imagePreviewUrl}  rounded/>
    }

    render() {
        return (
            <div className={"setting__description"}>
                <Card.Description>
                    {this.props.description}
                </Card.Description>
                <Card.Description>
                    <Button
                        className={"setting__button"}
                        compact icon
                        labelPosition={'left'}
                        circular
                        onClick={(e)=> {
                            document.getElementById(this.props.id).click();
                            this.handleSubmit(e)
                        }}
                    >
                        <Icon name={'upload'}/>
                        Upload
                    </Button>
                </Card.Description>
                <Card.Description className={"setting__imagePreview"}>
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