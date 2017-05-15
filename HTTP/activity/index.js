var QS = require('querystring');


module.exports = function (url, request, response) {

    var _this_ = this,  model = module.id.match(/([^\/\\]+)(\/|\\index)?\.js/)[1];

    var ID = (url.pathname.match(/(\d+)\/?/) || '')[1];

    var where = ID  ?  ` where (id = ${ID})`  :  '',  data;

    return  new Promise(function (resolve, reject) {

        switch ( request.method ) {
            case 'GET':
                _this_.SQL_DB.all(
                    `select * from ${model}${where}`,
                    function (error, row) {

                        if ( error )
                            reject( error );
                        else
                            resolve( row );
                    }
                );
                break;
            case 'POST':      {
                data = {key:  Object.keys( request.params )};

                data.value = data.key.map(function () {

                    return  JSON.stringify( request.params[ arguments[0] ] );
                });

                _this_.SQL_DB.run(
                    `insert into ${model} (${data.key}) values (${data.value})`,
                    function (error) {

                        if ( error )
                            reject( error );
                        else
                            resolve( this.lastID );
                    }
                );
                break;
            }
            case 'PUT':       {
                data = QS.stringify(request.params,  ', ',  ' = ',  {
                    encodeURIComponent:    JSON.stringify
                });

                _this_.SQL_DB.run(
                    `update ${model} set ${data}${where}`,
                    function (error) {

                        if ( error )
                            reject( error );
                        else
                            resolve( this.lastID );
                    }
                );
                break;
            }
            case 'DELETE':
                _this_.SQL_DB.run(
                    `delete from ${model}${where}`,
                    function (error) {

                        if ( error )
                            reject( error );
                        else
                            resolve( this.lastID );
                    }
                );
        }
    });
};