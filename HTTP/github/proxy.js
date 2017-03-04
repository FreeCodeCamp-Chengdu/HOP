var HTTPS = require('https'),  QS = require('querystring');


module.exports = function (url, request, response, resolve) {

    delete request.headers.host;

    request.headers.Authorization = 'token ' + request.session.get('token');

    var _request_ = HTTPS.request({
            hostname:    'api.github.com',
            method:      request.method,
            path:        url.path,
            headers:     request.headers
        },  function (_response_) {

            response.writeHead(
                _response_.statusCode, _response_.statusMessage, _response_.headers
            );

            _response_.on('data',  response.write.bind( response ));

            _response_.on('end', resolve);
        });

    _request_.write(QS.stringify( request.trailers ));

    return _request_;
};