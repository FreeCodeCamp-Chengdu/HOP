var DataModel = require('../DataModel.js');


module.exports = function (url, request, response) {

    var model = new DataModel(
            this.SQL_DB,  module.id.match(/([^\/\\]+)((\/|\\)index)?\.js/)[1]
        ),
        ID = (url.pathname.match(/(\d+)\/?/) || '')[1];

    switch ( request.method ) {
        case 'GET':       return  model.search( ID );
        case 'POST':      return  model.append( request.params );
        case 'PUT':       return  model.update(ID, request.params);
        case 'DELETE':    return  model.remove( ID );
    }
};
