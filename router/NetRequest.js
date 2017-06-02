const  _URL_ = require('url'),  QS = require('querystring'),
       CharDet = require('jschardet'),  IconV = require('iconv-lite');


module.exports = function (method, URL, header, data, onResponse) {

    URL = _URL_.parse( URL );

    header = header || { };

    data = data || { };

    Content_Type = header['Content-Type'] || header['content-type'] || '';

    if (!(data instanceof Buffer)  &&  (typeof data == 'object'))
        switch ( Content_Type.split(';')[0] ) {
            case 'application/json':
                data = JSON.stringify( data );
                break;
            case 'application/x-www-form-urlencoded':    ;
            default:
                data = QS.stringify( data );
        }

    return  new Promise(function (resolve, reject) {

        var request = require( URL.protocol.slice(0, -1) ).request({
                method:      method,
                hostname:    URL.hostname,
                path:        URL.path,
                headers:     header
            },  function (response) {

                data = '';

                response.on('data',  function () {

                    data += arguments[0].toString('hex');

                }).on('end',  function () {

                    data = Buffer.from(data, 'hex');

                    data = IconV.decode(
                        data,  CharDet.detect( data ).encoding  ||  'UTF-8'
                    );
                    try {
                        if (response.headers['content-type'].indexOf('json') > -1)
                            data = JSON.parse( data );
                    } catch (error) { }

                    resolve(
                        (
                            (onResponse instanceof Function)  &&
                                onResponse.call(response, data)
                        )  ||  data
                    );
                });
            }).on('error', reject);

        request.write( data );

        request.end();
    });
};
