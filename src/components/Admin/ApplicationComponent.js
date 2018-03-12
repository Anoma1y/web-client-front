import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Table,
    Container,
    Button,
    Icon
} from 'semantic-ui-react';
import ApplicationTableRow from './ApplicationTableRow';
import AdminLib from "libs/ApiLib/AdminLib";
import {
    addAllApplication,
    sortedApplications
} from 'actions/admin';
import _ from "underscore";

class ApplicationComponent extends Component {

    componentDidMount() {
        const { addAllApplication } = this.props;
        AdminLib.getAllApplication().then((data) => {
            addAllApplication(_.sortBy(data.data, function(node) {
                return -(new Date(node.CreatedAt).getTime());
            }));
        })
    }

    renderAllApplication = () => {
        const { applicationList } = this.props.admin;
        return applicationList.data.map(item => {
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

    handleSort = clickedColumn => () => {
        const { applicationList } = this.props.admin;
        const { sortedApplications } = this.props;
        const newData = clickedColumn === 'createdAt' ? _.sortBy(applicationList.data, function(node){
            return - (new Date(node.CreatedAt).getTime());
        }) : _.sortBy(applicationList.data, clickedColumn);
        const sortData = {
            column: clickedColumn,
            data:
                applicationList.direction === 'descending' ?
                    newData :
                    newData.reverse(),
            direction:
                applicationList.direction === 'ascending' ?
                    'descending' :
                    'ascending'
        }
        sortedApplications(sortData);
    }

    render() {
        const {
            applicationList
        } = this.props.admin;
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled textAlign={"center"} sortable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell sorted={applicationList.column === 'ID' ? applicationList.direction : null} onClick={this.handleSort('ID')}>id</Table.HeaderCell>
                                        <Table.HeaderCell sorted={applicationList.column === 'CreatedAt' ? applicationList.direction : null} onClick={this.handleSort('CreatedAt')}>Created</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Tokens</Table.HeaderCell>
                                        <Table.HeaderCell>Country</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell sorted={applicationList.column === 'is_kyc_passed' ? applicationList.direction : null} onClick={this.handleSort('is_kyc_passed')}> KYC</Table.HeaderCell>
                                        <Table.HeaderCell sorted={applicationList.column === 'status' ? applicationList.direction : null} onClick={this.handleSort('status')}>Status</Table.HeaderCell>
                                        <Table.HeaderCell>Comment</Table.HeaderCell>
                                        <Table.HeaderCell> </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.renderAllApplication()}
                                </Table.Body>
                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='16'>
                                            <Button floated='right' icon labelPosition='left' color={"youtube"} size='small'>
                                                <Icon name='remove circle' /> Remove Application
                                            </Button>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {
    addAllApplication,
    sortedApplications
})(ApplicationComponent);

