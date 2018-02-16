import React, {Component} from 'react';
import {
    Card,
    List
} from 'semantic-ui-react'

class DownloadList extends Component {
    render() {
        return (
            <div>
                <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                    <Card.Content>
                        <Card.Header>Скачать</Card.Header>
                        <Card.Description>
                            <List>
                                <List.Item as={"a"} href={"#"}>Whitepaper</List.Item>
                                <List.Item as={"a"} href={"#"}>One pager</List.Item>
                                <List.Item as={"a"} href={"#"}>Terms of use</List.Item>
                                <List.Item as={"a"} href={"#"}>Privacy policy</List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default DownloadList;
