import React from 'react';
import {
    Card,
    List,
    Divider
} from 'semantic-ui-react';

const DownloadList = () => {
    return (
        <Card fluid className={"component__main component__shadow"}>
            <Card.Content className={"component__download"}>
                <Card.Header className={"component__title"}>Download</Card.Header>
                <Divider className={"component__divider"} />
                <Card.Description className={"download__container"}>
                    <List className={"download__list"}>
                        <List.Item
                            as={"a"}
                            href={"https://example.com"}
                            target={"_blank"}
                            className={"download__list_item"}
                        >{'Whitepaper'}
                        </List.Item>
                        <List.Item
                            as={"a"}
                            href={"https://example.com"}
                            target={"_blank"}
                            className={"download__list_item"}
                        >{'One pager'}
                        </List.Item>
                        <List.Item
                            as={"a"}
                            href={"https://example.com"}
                            target={"_blank"}
                            className={"download__list_item"}
                        >{'Terms of service'}
                        </List.Item>
                        <List.Item
                            as={"a"}
                            href={"https://example.com"}
                            target={"_blank"}
                            className={"download__list_item"}
                        >{'Privacy policy'}
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    )
};
export default DownloadList;

