var express = require('express');
var path = require('path');
var router = express.Router();

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var hook = require('css-modules-require-hook');
var stylus = require('stylus');

hook({
  extensions: ['.styl'],
  preprocessCss: function (css, filename) {
    return stylus(css)
      .set('filename', filename)
      .render();
  },
});

var React = require('react');
var renderToString = require('react-dom/server').renderToString;
var Router = require('react-router-dom').StaticRouter;
var Provider = require('react-redux').Provider;

var renderPage = require('../helpers/renderPage');

var App = require('../public/app').default;
var configureStore = require('../public/configureStore').default;
var rootSaga = require('../public/actions/').default;

/* GET home page. */
router.get('*', function(req, res, next) {
    var store = configureStore();
    var context = {};
    var app = (
        <Provider store={store}>
            <Router location={req.url} context={context}>
                <App />
            </Router>
        </Provider>
    );
    store.runSaga(rootSaga).done.then(() => {
        var rendered = renderToString(app);
        var preloadedState = store.getState();
        var output = renderPage(rendered, preloadedState);

        if (context.url) {
            res.redirect(context.url);
        }

        res.send(output);
    });

    renderToString(app);

    store.close();
});

module.exports = router;
