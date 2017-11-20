module.exports = function(appString, preloadedState) {
    return `
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
            <div id="app">${appString}</div>
            <script>
                window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
            </script>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;
};
