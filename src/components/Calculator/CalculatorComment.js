import React, { Component } from 'react';
import {
    Grid,
    Accordion,
    Form,
    TextArea,
    Icon
} from 'semantic-ui-react';

class CalculatorComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
            messageLength: 0
        }
    }

    handleAccordionBtn = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const {
            activeIndex,
        } = this.state;
        const {
            comments,
            messageLength,
            handleChangeComments
        } = this.props;
        return (
            <Grid.Column>
                <Accordion styled className={"calculator__accordion"}>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleAccordionBtn} className={"calculator__accordion_title"}>
                        <p>Leave a comment </p><Icon name='chevron right' />
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0} className={"calculator__accordion_content"}>
                        <Form as={"div"} className={"comments__form"}>
                                            <TextArea
                                                className={"calculator__comments"}
                                                autoHeight
                                                placeholder='Leave comment'
                                                onChange={handleChangeComments}
                                                value={comments}
                                            />
                            <span className={messageLength <= 500 ? "message__length" : "message__length message__length-active"}>{messageLength} / 500</span>
                        </Form>
                    </Accordion.Content>
                </Accordion>
            </Grid.Column>
        );
    }
}

export default CalculatorComment;
