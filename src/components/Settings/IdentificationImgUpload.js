import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Button,
    Grid,
    Image,
    Segment,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'underscore';
import SignUpLib from "libs/ApiLib/SignUp";

class IdentificationImgUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
    }

    lazyUploadImage = _.debounce(() => {
        this.uploadImage(this.state.file);
    }, 2500)

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
        this.lazyUploadImage();
        reader.readAsDataURL(file);
    }

    uploadImage = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        this.uploadAxios(formData)
            .then(this.onResponse)
            .catch(this.onResponse);
    }

    uploadAxios = (data) => {
        const { jwt: TOKEN } = this.props.user;
        const header = {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }
        return axios.post("https://account.tokensale.tsrpay.com/api/v1/file", data, header)
            .then(function (response) {
                return response;
            }).catch(function (error) {
                return error.response;
            });
    }

    onResponse = (response) => {
        console.log(response);
    }

    renderImagePreview = (imagePreviewUrl) => {
        if (!imagePreviewUrl) return null;
        const {
            uploadInProgress
        } = this.props.settings;
        return (
            <div>
                {/*uploadInProgress ?*/}
                    {/*<Dimmer active inverted>*/}
                        {/*<Loader inverted>Loading</Loader>*/}
                    {/*</Dimmer>*/}
                {/*: null*/}
                <Image src={imagePreviewUrl} />
            </div>
        )
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
                        <input
                            type={'file'}
                            accept="image/jpeg,image/jpg,image/png"
                            id={this.props.id}
                            style={{display: 'none'}}
                            onChange={(e)=>this.handleImageChange(e)}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}



export default connect(state => ({
    user: state.user,
    settings: state.settings
}), {

})(IdentificationImgUpload);
