import React, {Component} from 'react';
import {
    Card,
    List,
    Divider
} from 'semantic-ui-react'

class DownloadList extends Component {
    render() {
        return (
            <Card fluid className={"component__main"}>
                <Card.Content className={"component__download"}>
                    <Card.Header className={"component__title"}>Download</Card.Header>
                    <Divider />
                    <Card.Description className={"download__container"}>
                        <List className={"download__list"}>
                            <List.Item as={"a"} href={"https://tsrpay.com/docs/whitepaper.pdf"} target={"_blank"} className={"download__list_item"}>Whitepaper</List.Item>
                            <List.Item as={"a"} href={"https://tsrpay.com/docs/onepager_en.pdf"} target={"_blank"} className={"download__list_item"}>One pager</List.Item>
                            <List.Item as={"a"} href={"https://tsrpay.com/docs/terms_of_service.pdf"} target={"_blank"} className={"download__list_item"}>Terms of use</List.Item>
                            <List.Item as={"a"} href={"https://tsrpay.com/docs/privacy_policy.pdf"} target={"_blank"} className={"download__list_item"}>Privacy policy</List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default DownloadList;
