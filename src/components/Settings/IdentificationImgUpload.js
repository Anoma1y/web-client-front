import React from 'react';
import {
    Card,
    Button,
    Grid,
    Input,
    Image
} from 'semantic-ui-react';

class IdentificationImgUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ""
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

    renderImagePreview = (imagePreviewUrl) => {
        if (!imagePreviewUrl) return null;
        return <Image src={imagePreviewUrl}  rounded/>
    }

    render() {
        const { imagePreviewUrl } = this.state;
        return (
            <Grid className={"setting__description"}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Card.Description>
                            {this.props.description}
                        </Card.Description>
                        <Card.Description className={"setting__imagePreview"}>
                            {this.renderImagePreview(this.state.imagePreviewUrl)}
                        </Card.Description>
                        <Card.Description>
                            <Button
                                className={imagePreviewUrl.length > 0 ? "auth_btn setting__button-new" :"auth_btn setting__button"}
                                floated={"right"}
                                onClick={(e)=> {
                                    document.getElementById(this.props.id).click();
                                    this.handleSubmit(e)
                                }}
                            >
                                {imagePreviewUrl.length > 0 ? "Upload New" : "Upload" }
                            </Button>
                        </Card.Description>
                        <Input
                            type={'file'}
                            id={this.props.id}
                            style={{display: 'none'}}
                            onChange={(e)=>this.handleImageChange(e)}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}



export default IdentificationImgUpload;