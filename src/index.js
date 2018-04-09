import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';
import './Style.css';
import store, { history } from './store';
import App from './screens/App';
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
unregister();
