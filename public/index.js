import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDom from 'react-dom';
import App from './app';

const render = () => {
    const NextApp = require('./app').default;
    ReactDom.render(
        <AppContainer>
            <NextApp />
        </AppContainer>,
        document.getElementById('app'),
    );
}

render();

if (module.hot) {
    module.hot.accept('./app', render);
}
