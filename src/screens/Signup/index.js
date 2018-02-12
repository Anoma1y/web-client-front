import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Button } from 'semantic-ui-react'

const Signup = props => (
    <div>
        <Header as={'h1'}>Signup screen</Header>
        <Button onClick={() => props.changePage()}>Go to login</Button>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Signup)