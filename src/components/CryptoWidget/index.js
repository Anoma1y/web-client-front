import React, {Component} from 'react';
import {
    Card,
    Form,
    Radio
} from 'semantic-ui-react';
import CryptoETHtoBTC from './CryptoETHtoBTC';
import CryptoETHtoUSD from './CryptoETHtoUSD';

class CryptoWidget extends Component {
    constructor(props) {
      super(props);
      this.state = {
          current: "ETHtoBTC"
      }
    }

    handleChange = (e, { value }) => this.setState({ current: value })

    render() {
        return (
            <Card fluid className={"component__main component__shadow"}>
                <Card.Content className={"component__cryptocurrency"}>
                    <Card.Description className={"cryptocurrency__container"}>
                        <Form className={"cryptocurrency__form"}>
                            <Form.Group inline className={"crypto__widget_radio"}>
                                <Form.Field>
                                    <Radio
                                        label='BTC/ETH'
                                        name='radioGroup'
                                        value='ETHtoBTC'
                                        checked={this.state.current === 'ETHtoBTC'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='USD/ETH'
                                        name='radioGroup'
                                        value='ETHtoUSD'
                                        checked={this.state.current === 'ETHtoUSD'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                        {this.state.current === "ETHtoBTC" ? <CryptoETHtoBTC /> : <CryptoETHtoUSD />}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}


export default CryptoWidget;
