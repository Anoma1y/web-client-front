import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Button,
    Grid,
    List
} from 'semantic-ui-react';
import {
    changeAndroidChecked,
    changeAppleChecked,
    handleSubscribeToBetaTest
} from 'actions/betatest';
class BetaTest extends React.Component {

    onCheckedAndroid = () => {
        const { androidChecked } = this.props.betatest;
        const { changeAndroidChecked } = this.props;
        androidChecked === true ? changeAndroidChecked(false) : changeAndroidChecked(true);
    }
    onCheckedApple = () => {
        const { appleChecked } = this.props.betatest;
        const { changeAppleChecked } = this.props;
        appleChecked === true ? changeAppleChecked(false) : changeAppleChecked(true);
    }
    handleSubscribeBtn = () => {
        const {
            androidChecked,
            appleChecked
        } = this.props.betatest;
        if (androidChecked === false && appleChecked === false) {
            return;
        }
        const { handleSubscribeToBetaTest } = this.props;
        handleSubscribeToBetaTest()
    }
    render () {
        const {
            androidChecked,
            appleChecked,
            success
        } = this.props.betatest;
        return (
            <Card fluid className={"component__main"}>
                <Card.Content>
                    <Card.Header className={"component__title"}>Beta Test</Card.Header>
                    <Card.Description className={"betatest"}>
                        {
                         success ?   <Grid>
                                        <Grid.Row centered>
                                            <Grid.Column width={16} style={{textAlign: "center"}}>
                                                <h1>Success</h1>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                             :
                             <Grid>
                                 <Grid.Row>
                                     <Grid.Column width={8} className={"betatest__wrapper"}>
                                         <List horizontal>
                                             <List.Item className={androidChecked ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedAndroid}>
                                                 <List.Icon name='android' size='large' verticalAlign='middle' />
                                             </List.Item>
                                             <List.Item className={appleChecked ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedApple}>
                                                 <List.Icon name='apple' size='large' verticalAlign='middle' />
                                             </List.Item>
                                         </List>
                                     </Grid.Column>
                                     <Grid.Column width={8}>
                                         <Button
                                             floated={"right"}
                                             className={"betatest__submit"}
                                             onClick={this.handleSubscribeBtn}
                                         >Apply</Button>
                                     </Grid.Column>
                                 </Grid.Row>
                             </Grid>
                        }
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(state => ({ betatest: state.betatest }), {
    changeAndroidChecked,
    changeAppleChecked,
    handleSubscribeToBetaTest
})(BetaTest);
