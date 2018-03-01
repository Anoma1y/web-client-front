import React, {Component} from 'react';
import {
    Card,
} from 'semantic-ui-react';

class TelegramWidget extends Component {

    render() {

        return (
            <Card fluid className={"component__main telegram__wrapper"}>
                <Card.Content className={"component__telegram"}>
                    <Card.Description className={"telegram__container"}>
                        <iframe
                            src="https://tgwidget.com/channel/?id=5a86cb8583ba8857578b4567"
                            frameBorder="0"
                            scrolling="no"
                            horizontalscrolling="no"
                            verticalscrolling="no"
                            width="100%"
                            height="280px"
                            async>
                        </iframe>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default TelegramWidget;
