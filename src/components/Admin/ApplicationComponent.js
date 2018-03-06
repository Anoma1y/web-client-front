import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Table,
    Container
} from 'semantic-ui-react';
import ApplicationTableRow from './ApplicationTableRow';
import AdminLib from "libs/ApiLib/AdminLib";
import { addAllApplication } from 'actions/admin';

class ApplicationComponent extends Component {

    componentDidMount() {
        const { addAllApplication } = this.props;
        AdminLib.getAllApplication().then((data) => {
            addAllApplication(data.data);
        })
    }

    renderAllApplication = () => {
        const { applicationList } = this.props.admin;
        return applicationList.map(item => {
            return <ApplicationTableRow
                key={item.ID}
                id={item.ID}
                createdAt={item.CreatedAt}
                updatedAt={item.UpdatedAt}
                amount={item.amount}
                comment={item.comment}
                currency={item.currency}
                profile={item.profile}
                status={item.status}
            />
        })
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled textAlign={"center"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>id</Table.HeaderCell>
                                        <Table.HeaderCell>Created At</Table.HeaderCell>
                                        <Table.HeaderCell>Updated At</Table.HeaderCell>
                                        <Table.HeaderCell>Currency</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>User EMail</Table.HeaderCell>
                                        <Table.HeaderCell>User Verified</Table.HeaderCell>
                                        <Table.HeaderCell>User KYC passed</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Comments</Table.HeaderCell>

                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.renderAllApplication()}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {
    addAllApplication
})(ApplicationComponent);

