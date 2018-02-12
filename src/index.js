import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import store, { history } from './store'
import App from './screens/App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
