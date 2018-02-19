import React, {Component} from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Button } from 'semantic-ui-react';
import axios from 'axios';
class Home extends Component {

    componentDidMount() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=2')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillMount() {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        return (
            <div>
                <h1>111</h1>
            </div>
        );
    }

}
export default connect(state => ({ home: state.home }), {

})(Home);
