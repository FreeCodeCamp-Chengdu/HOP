'use strict';

const QS = require('querystring');


class DataModel {
    constructor(Data_Base, Model_Name) {

        this.__DB__ = Data_Base;

        this.__name__ = Model_Name;
    }

    static Hash2SQL(data, assign, separator) {

        return  QS.stringify(data, separator, assign, {
            encodeURIComponent:    JSON.stringify
        });
    }

    search(ID) {

        var where = '';

        if (typeof ID != 'object')
            where = ID  ?  ` where (id = ${ID})`  :  '';
        else
            where = ` where (${DataModel.Hash2SQL(ID,  ' like %',  '%) and (')}%)`;

        return  new Promise((function (resolve, reject) {

            this.__DB__.all(
                `select * from ${this.__name__}${where}`,
                function (error, row) {

                    if ( error )  return  reject( error );

                    for (var i = 0;  row[i];  i++)
                        row[i].ctime = +(new Date( row[i].ctime ))  /  1000;

                    resolve(ID ? row[0] : row);
                }
            );
        }).bind( this ));
    }

    append(data) {

        var key = Object.keys( data );

        var value = key.map(function () {

                return  JSON.stringify( data[ arguments[0] ] );
            });

        return  new Promise((function (resolve, reject) {

            this.__DB__.run(
                `insert into ${this.__name__} (${key}) values (${value})`,
                function (error) {

                    if ( error )
                        reject( error );
                    else
                        resolve( this.lastID );
                }
            );
        }).bind( this ));
    }

    update(ID, data) {

        data = DataModel.Hash2SQL(data,  ', ',  ' = ');

        return  new Promise((function (resolve, reject) {

            this.__DB__.run(
                `update ${this.__name__} set ${data} where (id = ${ID})`,
                function (error) {

                    if ( error )
                        reject( error );
                    else
                        resolve( this.lastID );
                }
            );
        }).bind( this ));
    }

    remove(ID) {

        return  new Promise((function (resolve, reject) {

            this.__DB__.run(
                `delete from ${this.__name__} where (id = ${ID})`,
                function (error) {

                    if ( error )
                        reject( error );
                    else
                        resolve( this.lastID );
                }
            );
        }).bind( this ));
    }

    unique(key, data) {

        var _data_ = { },  _this_ = this;

        _data_[key] = data[key];

        return  this.search(_data_).then(function (row) {

            return  row[0] ?
                _this_.update(row[0].id, data)  :  _this_.append( data );
        });
    }
}

module.exports = DataModel;
