const NetRequest = require('../NetRequest.js');


module.exports = function () {

    var header = this.request.headers,  response = this.response;

    delete header.host;
    delete header['accept-encoding'];

    header.Authorization = `token ${this.request.session.get('token')}`;

    return NetRequest(
        this.request.method,
        `https://api.github.com${this.url.path}`,
        header,
        this.request.trailers,
        function () {
            if (typeof response != 'object')  return;

            delete this.headers.status;
            delete this.headers['content-length'];

            response.writeHead(this.statusCode, this.statusMessage, this.headers);
        }
    );
};
