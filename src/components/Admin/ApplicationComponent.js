import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Table,
    Container,
    Button,
    Icon,
    Pagination
} from 'semantic-ui-react';
import ApplicationTableRow from './ApplicationTableRow';
import AdminLib from "libs/ApiLib/AdminLib";
import {
    addAllApplication,
    sortedApplications,
    changeDeleteApplications
} from 'actions/admin';
import { setCurrency } from 'actions/calculator';
import _ from "underscore";
import CryptoCurrency from "libs/ApiLib/CryptoCurrency";
import { currentCountItems } from 'libs/math';

class ApplicationComponent extends Component {

    state = {
        itemsOnPage: 15,
        totalPages: 1,
        currentPage: 1
    }

    componentWillMount() {
        const {
            setCurrency,
            changeDeleteApplications
        } = this.props;
        changeDeleteApplications([]);
        const INITIAL_DATA = [
            {
                'id': 'bitcoin',
                'name': 'Bitcoin',
                'symbol': 'BTC',
                'price_usd': '0'
            },
            {
                'id': 'ethereum',
                'name': 'Ethereum',
                'symbol': 'ETH',
                "price_usd": "0",
                "price_btc": "0"
            },
            {
                'id': 'usd',
                'name': 'USD',
                'symbol': 'USD',
                'price_usd': '1'
            }
        ]
        CryptoCurrency.getCryptoCurrency().then((data) => {
            const CURRENCY = data.data;
            const CURRENCY_DATA = [...CURRENCY,
                {
                    id: 'usd',
                    name: 'USD',
                    symbol: 'USD',
                    price_usd: '1'
                }
            ]
            if (CURRENCY.length !== 0) {
                setCurrency(CURRENCY_DATA);
            } else {
                setCurrency(INITIAL_DATA)
            }
        }).catch(() => {
            setCurrency(INITIAL_DATA);
        })
    }
    componentDidMount() {
        const { addAllApplication } = this.props;
        AdminLib.getAllApplication().then((data) => {
            this.setState({
                totalPages: Math.ceil(data.data.length / this.state.itemsOnPage)
            })
            addAllApplication(_.sortBy(data.data, function(node) {
                return -(new Date(node.CreatedAt).getTime());
            }));
        })
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            currentPage: activePage
        })
        const { changeDeleteApplications } = this.props;
        changeDeleteApplications([]);
    }

    renderAllApplication = () => {
        const { applicationList } = this.props.admin;
        const {
            itemsOnPage,
            currentPage
        } = this.state;
        const {
            fromPage,
            toPage
        } = currentCountItems(itemsOnPage, currentPage);
        return applicationList.data.slice(fromPage, toPage).map(item => {
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
                                        <Table.HeaderCell colSpan='8'>
                                            <Pagination defaultActivePage={1} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange}/>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell colSpan='2'>
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
    sortedApplications,
    setCurrency,
    changeDeleteApplications
})(ApplicationComponent);

