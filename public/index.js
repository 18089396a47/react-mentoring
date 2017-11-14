import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './configureStore';

const store = configureStore(window.PRELOADED_STATE);

delete window.PRELOADED_STATE;

const render = () => {
    const NextApp = require('./app').default;
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <NextApp />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app'),
    );
}

render();

if (module.hot) {
    module.hot.accept('./app', render);
}
