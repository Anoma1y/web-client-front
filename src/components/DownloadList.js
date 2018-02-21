import React, {Component} from 'react';
import {
    Card,
    List
} from 'semantic-ui-react'

class DownloadList extends Component {
    render() {
        return (
            <Card fluid color={'violet'} className={"component__main"}>
                <Card.Content className={"component__download"}>
                    <Card.Header className={"download__title"}>Скачать</Card.Header>
                    <Card.Description className={"download__container"}>
                        <List className={"download__list"}>
                            <List.Item as={"a"} href={"#"} className={"download__list_item"}>Whitepaper</List.Item>
                            <List.Item as={"a"} href={"#"} className={"download__list_item"}>One pager</List.Item>
                            <List.Item as={"a"} href={"#"} className={"download__list_item"}>Terms of use</List.Item>
                            <List.Item as={"a"} href={"#"} className={"download__list_item"}>Privacy policy</List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default DownloadList;
