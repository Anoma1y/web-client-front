import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Button, Container } from 'semantic-ui-react'

const Home = props => (
    <Container>
        <Header as={'h1'}>Home</Header>
        <Button onClick={() => props.changePage()}>Go to login</Button>
    </Container>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home)