import React from 'react'
import {
    Card,
    Button,
    Grid,
    List
} from 'semantic-ui-react'

class RequestList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checkedAndroid: false,
        checkedApple: false
      }
    }

    onCheckedAndroid = () => {
        if (this.state.checkedAndroid) {
            this.setState({
                checkedAndroid: false
            })
        } else {
            this.setState({
                checkedAndroid: true
            })
        }

    }
    onCheckedApple = () => {
        if (this.state.checkedApple) {
            this.setState({
                checkedApple: false
            })
        } else {
            this.setState({
                checkedApple: true
            })
        }
    }
    render () {
        return (
            <Card fluid color={'violet'} className={"component__main"}>
                <Card.Content>
                    <Card.Header className={"component__title"}>Beta Test</Card.Header>
                    <Card.Description className={"betatest"}>
                        <Grid>
                            <Grid.Row centered>
                                <Grid.Column width={8} className={"betatest__wrapper"}>
                                    <List horizontal>
                                        <List.Item className={this.state.checkedAndroid ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedAndroid}>
                                            <List.Icon name='android' size='large' verticalAlign='middle' />
                                        </List.Item>
                                        <List.Item className={this.state.checkedApple ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedApple}>
                                            <List.Icon name='apple' size='large' verticalAlign='middle' />
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Button floated={"right"} className={"betatest__submit"}>Apply</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
// <Checkbox label='Make my profile visible' />
}

export default RequestList;