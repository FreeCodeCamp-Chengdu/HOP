var HTTPS = require('https'),  QS = require('querystring');


module.exports = function (url, request, response, resolve) {

    var data = QS.stringify({
            client_id:        this.App_ID,
            client_secret:    this.App_Secret,
            code:             url.query.code
        }),
        token = '';

    var _request_ = HTTPS.request({
            hostname:    'github.com',
            method:      'POST',
            path:        '/login/oauth/access_token',
            headers:     {
                'User-Agent':        'EasyREST',
                'Content-Type':      'application/x-www-form-urlencoded',
                'Content-Length':    Buffer.byteLength( data ),
                Accept:              'application/json'
            }
        },  function (_response_) {

            _response_.on('data',  function () {

                token += arguments[0];
            });

            _response_.on('end',  function () {

                token = JSON.parse( token );

                request.session.put('token', token.access_token);

                request.session.put('scope', token.scope.split(','));

                resolve( response.writeHead(302,  {Location: '/'}) );
            });
        });

    _request_.write( data );

    return _request_;
};