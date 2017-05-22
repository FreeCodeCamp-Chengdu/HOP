const NetRequest = require('../NetRequest.js'),
      API_Proxy = require('./proxy.js'),
      DataModel = require('../DataModel.js');


module.exports = function (url, request, response) {

    var header = {
            'User-Agent':    'HOP',
            Accept:          'application/json'
        },
        model = new DataModel(this.SQL_DB, 'user');

    return NetRequest(
        'POST',
        'https://github.com/login/oauth/access_token',
        header,
        {
            client_id:        this.App_ID,
            client_secret:    this.App_Secret,
            code:             url.query.code
        }
    ).then(function (token) {

        request.session.put('token', token.access_token);

        request.session.put('scope', token.scope.split(','));

        return API_Proxy({
            path:    '/user'
        },  {
            method:     request.method,
            headers:    header,
            session:    request.session
        });
    }).then(function (data) {

        return  model.unique('name', {
            name:    data.login,
            logo:    data.avatar_url,
            www:     data.html_url
        });
    }).then(function (info) {

        if ( info.lastID )  request.session.put('uid', info.lastID);

        response.writeHead(302,  {Location: '/'});
    });
};
