const NetRequest = require('../NetRequest.js');


module.exports = function (url, request, response) {

    delete request.headers.host;
    delete request.headers['accept-encoding'];

    request.headers.Authorization = `token ${request.session.get('token')}`;

    return NetRequest(
        request.method,
        `https://api.github.com${url.path}`,
        request.headers,
        request.trailers,
        function () {
            if (typeof response != 'object')  return;

            delete this.headers.status;
            delete this.headers['content-length'];

            response.writeHead(this.statusCode, this.statusMessage, this.headers);
        }
    );
};
