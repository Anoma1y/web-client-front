import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Button } from 'semantic-ui-react'

const Login = props => (
    <div>
        <Header as={'h1'}>Login screen</Header>
        <Button onClick={() => props.changePage()}>Go to registration</Button>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/signup')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Login)

