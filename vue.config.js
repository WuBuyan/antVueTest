module.exports = {
    devServer: {
        // before: function(app, server, compiler) {
        //     app.get('/some/path', function(req, res) {
        //         res.json({ custom: 'response' });
        //     });
        // }

        //引入mock/inedx.js
        before:require('./mock/index.js')
    }
};