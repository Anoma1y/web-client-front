import React, {Component} from 'react';
import { Form, Radio, Input, Progress, Label } from 'semantic-ui-react'

class Calculator extends Component {
    constructor(props) {
      super(props);
    }
    state = {}
    handleChange = (e, { value }) => this.setState({ value })
    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <Radio
                            label='BTC'
                            name='radioGroup'
                            value='BTC'
                            checked={this.state.value === 'BTC'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='ETH'
                            name='radioGroup'
                            value='ETH'
                            checked={this.state.value === 'ETH'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='USD'
                            name='radioGroup'
                            value='USD'
                            checked={this.state.value === 'USD'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                </Form>
                <Input placeholder={"USD"}/><Input placeholder={"TCT"}/>
                <Progress percent={21} color={"yellow"}/>
                <div>
                    <span>Бонус</span><Label>10%</Label><Label>15%</Label><Label>20%</Label> <span>Вы достигли лимита</span>
                </div>
                <Form>
                    <Form.TextArea placeholder='Оставить комментарий' />
                    <Form.Button>Оставить заявку</Form.Button>
                </Form>
            </div>
        );
    }
}

export default Calculator;