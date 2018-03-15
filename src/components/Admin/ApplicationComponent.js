import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Table,
    Container,
    Button,
    Pagination
} from 'semantic-ui-react';
import ApplicationTableRow from './ApplicationTableRow';
import {
    addAllApplication,
    sortedApplications,
    changeDeleteApplications,
} from 'actions/admin';
import {changeCurrency} from 'actions/rate';
import _ from "underscore";
import { currentCountItems } from 'libs/math';
import CryptoCurrency from "libs/ApiLib/CryptoCurrency";
import AdminLib from 'libs/ApiLib/AdminLib';

class ApplicationComponent extends Component {

    state = {
        itemsOnPage: 15,
        totalPages: 1,
        currentPage: 1
    }
    getCurrencyAdmin = () => {
        const {
            changeCurrency
        } = this.props;
        const INITIAL_DATA = [
            {
                'id': 'bitcoin',
                'name': 'Bitcoin',
                'symbol': 'BTC',
                'price_usd': "8240.82"
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

        CryptoCurrency.getCryptoCurrency()
            .then((data) => {
                const CURRENCY = data.data;
                const CURRENCY_DATA = [...CURRENCY,
                    {
                        id: 'usd',
                        name: 'USD',
                        symbol: 'USD',
                        price_usd: '1'
                    }
                ];
                changeCurrency(CURRENCY_DATA);
            })
            .catch(() => {
                changeCurrency(INITIAL_DATA);
            })
    }

    componentWillUnmount() {
        clearInterval(this.currencyIntervalAdmin);
    }

    componentWillMount() {
        const {
            changeDeleteApplications
        } = this.props;
        this.getCurrencyAdmin();
        this.currencyIntervalAdmin = setInterval(() => {
            this.getCurrencyAdmin();
        }, 10000)
        changeDeleteApplications([]);
    }
    componentDidMount() {
        this.getApplication();
    }

    getApplication = () => {
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

    deleteApplication = () => {
        const {
            deleteApplications
        } = this.props.admin;
        const delApp = deleteApplications.join(',');
        AdminLib.deleteApplication(delApp)
            .then((data) => {
                if (data.status === 200) {
                    this.getApplication();
                }
            })
            .catch((err) => {
                console.log(err);
            })
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
                                        <Table.HeaderCell colSpan='9'>
                                            <Pagination defaultActivePage={1} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange}/>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell colSpan='1'>
                                            <Button 
                                                floated='right' 
                                                color={"youtube"} 
                                                size='small'
                                                onClick={this.deleteApplication}
                                            >
                                                Remove Application
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
    changeDeleteApplications,
    changeCurrency
})(ApplicationComponent);

