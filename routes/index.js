var express = require('express');
var path = require('path');
var router = express.Router();

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

var App = require('../public/app').default;
var configureStore = require('../public/configureStore').default;

/* GET home page. */
router.get('*', function(req, res, next) {
    var store = configureStore();
    var context = {};
    var rendered = renderToString(
        <Provider store={store}>
            <Router location={req.url} context={context}>
                <App />
            </Router>
        </Provider>
    );
    var output = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="icon" href="/favicon.ico">
            <link rel="stylesheet" href="/styles.css">
            <title>React Mentoring</title>
        </head>
        <body>
            <div id="app">${rendered}</div>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;

    if (context.url) {
        res.redirect(context.url);
    }

    res.send(output);
});

module.exports = router;
