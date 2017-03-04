var Path = require('path');

var Session = require('node-session');

var Config = require('../../config');


module.exports = function (url, request, response) {

    var _this_ = this;

    return  new Promise(function (resolve, reject) {

        (new Session({
            secret:      Config.App_Secret.slice(0, 32),
            lifetime:    24 * 60 * 60 * 1000
        })).startSession(request,  response,  function () {

            var path = url.pathname.split('/'),  _module_;

            try {
                _module_ = Path.join(
                    _this_.User_Root + 'HTTP',  'github',  path[2]
                );
                _module_ = require(_module_);
            } catch (error) {
                _module_ = require(_module_.replace(/[^\/\\]+$/, 'proxy'));

                path.splice(1, 1);

                url.pathname = path.join('/');

                url.path = url.pathname + url.search;
            }

            var _request_ = _module_.apply(
                    Object.assign(_this_, Config),  [
                        url,  request,  response,  resolve
                    ]
                );
            _request_.on('error', reject);

            _request_.end();
        });
    });
};