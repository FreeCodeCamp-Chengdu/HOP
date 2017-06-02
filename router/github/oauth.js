'use strict';

const NetRequest = require('../NetRequest.js'),
      API_Proxy = require('./proxy.js'),
      user = require('../../data/user.js');


module.exports = function () {

    var header = {
            'User-Agent':    'HOP',
            Accept:          'application/json'
        },
        _this_ = this,  session = this.request.session;

    return NetRequest(
        'POST',
        'https://github.com/login/oauth/access_token',
        header,
        {
            client_id:        this.App_ID,
            client_secret:    this.App_Secret,
            code:             this.url.query.code
        }
    ).then(function (token) {

        session.put('token', token.access_token);

        session.put('scope', token.scope.split(','));

        return API_Proxy({
            path:    '/user'
        },  {
            method:     _this_.request.method,
            headers:    header,
            session:    session
        });
    }).then(function (data) {

        return  (new user(this, {
            name:    data.login,
            logo:    data.avatar_url,
            www:     data.html_url
        })).unique('name');

    }).then(function (info) {

        if ( info.lastID )  session.put('uid', info.lastID);

        _this_.response.writeHead(302,  {Location: '/'});
    });
};
