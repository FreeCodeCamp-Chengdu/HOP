var HTTPS = require('https'),  QS = require('querystring');

var Config = require('../config');


module.exports = function (url, request, response) {

    var data = QS.stringify({
            client_id:        Config.App_ID,
            client_secret:    Config.App_Secret,
            code:             url.query.code
        });

    return  new Promise(function (resolve, reject) {

        var Token_Getter = HTTPS.request({
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

                _response_.on('data',  response.write.bind( response ));

                _response_.on('end', resolve);
            });

        Token_Getter.on('error', reject);

        Token_Getter.write( data );

        Token_Getter.end();
    });
};