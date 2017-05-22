const Path = require('path');


module.exports = function (url, request, response) {

    var path = url.pathname.split('/'),  _module_;

    try {
        _module_ = Path.join(
            this.User_Root + 'HTTP',  'github',  path[2]
        );
        _module_ = require(_module_);
    } catch (error) {
        _module_ = require(_module_.replace(/[^\/\\]+$/, 'proxy'));

        path.splice(1, 1);

        url.pathname = path.join('/');

        url.path = url.pathname + url.search;
    }

    return  _module_.call(this, url, request, response);
};
