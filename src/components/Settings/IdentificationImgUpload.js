import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Button,
    Grid,
    Image,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import {
    changeDocumentIndividualUser,
    changeDocumentEntityUser,
    changeDocumentEntityCompany,
    changeDocumentEntityBeneficial
} from 'actions/settings';
import axios from 'axios';
import Config from 'libs/config';
import _ from 'underscore';

class IdentificationImgUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            isLoading: false,
            fileUploadError: ''
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
        this.setState({
            isLoading: true
        })
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/tiff' || file.type === 'image/gif') {
            if ((file.size / 1024 / 1024) <= 25) {
                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        imagePreviewUrl: reader.result,
                        fileUploadError: ''
                    });
                };
                this.lazyUploadImage();
                reader.readAsDataURL(file);
            } else {
                this.setState({
                    fileUploadError: 'Maximum file size is 25MB'
                })
            }
        } else {
            this.setState({
                fileUploadError: 'Allowed file types: png, jpg, gif, tiff'
            })
        }

    }

    uploadImage = (file) => {
        const formData = new FormData();
        formData.append('file', file);
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
        return axios.post(`${Config.url}file`, data, header)
            .then(response => {
                return response;
            }).catch(error => {
                return error.response;
            });
    }

    onResponse = (response) => {
        this.setState({
            isLoading: false
        })
        if (response.status === 200) {
            const { ID: documentID } = response.data;
            const {
                id,
                objectFile,
                indexBeneficial,
                changeDocumentIndividualUser,
                changeDocumentEntityUser,
                changeDocumentEntityCompany,
                changeDocumentEntityBeneficial
            } = this.props;
            switch (objectFile) {
                case 'individualUserFile':
                    changeDocumentIndividualUser({id, documentID});
                    break;
                case 'personCompanyFile':
                    changeDocumentEntityUser({id, documentID});
                    break;
                case 'companyFile':
                    changeDocumentEntityCompany({id, documentID});
                    break;
                case 'beneficialFile':
                    changeDocumentEntityBeneficial({
                        indexBeneficialFile: indexBeneficial,
                        keyBeneficialFile: id.split('_')[0],
                        valueBeneficialFile: documentID
                    });
                    break;
                default:
                    return;
            }
        }
    }

    renderImagePreview = (imagePreviewUrl) => {
        if (!imagePreviewUrl) return null;
        const {
            isLoading
        } = this.state;
        return (
            <div>
                {isLoading ?
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    : null
                }
                <Image src={imagePreviewUrl} />
            </div>
        )
    }

    render() {
        const { imagePreviewUrl } = this.state;
        return (
            <Grid className={'setting__description'}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Card.Description style={{zIndex: 99999}}>
                            {this.props.description}
                        </Card.Description>
                        <Card.Description className={'setting__imagePreview'} style={{zIndex: 50}}>
                            {this.renderImagePreview(this.state.imagePreviewUrl || this.props.imageValue)}
                        </Card.Description>
                        <Card.Description>
                            <Button
                                className={'auth_btn setting__button-new'}
                                floated={'right'}
                                onClick={(e)=> {
                                    document.getElementById(this.props.id).click();
                                    this.handleSubmit(e)
                                }}
                            >
                                {imagePreviewUrl.length || this.props.imageValue.length > 0 ? 'Upload New' : 'Upload' }
                            </Button>
                        </Card.Description>
                        <input
                            type={'file'}
                            accept='image/jpeg,image/jpg,image/png,image/tiff,image/gif'
                            id={this.props.id}
                            style={{display: 'none'}}
                            onChange={(e)=>this.handleImageChange(e)}
                        />
                        { this.state.fileUploadError.length !== 0 ?
                            <p className={'imagePreview__error'}>
                                {this.state.fileUploadError}
                            </p> : null
                        }
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
    changeDocumentIndividualUser,
    changeDocumentEntityUser,
    changeDocumentEntityCompany,
    changeDocumentEntityBeneficial
})(IdentificationImgUpload);
