'use strict';

const DataModel = require('easy-rest').DataModel;



class SQL_DM extends DataModel {
    constructor(context, data) {

        super(context, data);

        this.setPrivate('DB', context.SQL_DB);
    }

    run(statement) {

        var DB = this.__DB__;

        return  new Promise(function (resolve, reject) {

            DB.run(statement,  function (error) {

                if ( error )  return  reject( error );

                delete this.sql;

                resolve( this );
            });
        });
    }

    search(like) {

        if ( this.id )
            like = `id = ${this.id}`;
        else {
            for (var key in like)  like[key] = `%${like[key]}%`;

            like = DataModel.Hash2SQL(like,  ' like ',  ') and (');
        }

        var _this_ = this;

        return  new Promise(function (resolve, reject) {

            _this_.__DB__.all(
                `select * from ${_this_.__name__} where (${like})`,
                function (error, row) {

                    if ( error )  return  reject( error );

                    for (var i = 0;  row[i];  i++)
                        row[i].ctime = +(new Date( row[i].ctime ))  /  1000;

                    resolve(_this_.id ? row[0] : row);
                }
            );
        });
    }

    append() {

        var key = Object.keys( this );

        var value = key.map(function () {

                return  JSON.stringify( this[ arguments[0] ] );

            }, this);

        return  this.run(`insert into ${this.__name__} (${key}) values (${value})`);
    }

    update() {

        var data = DataModel.Hash2SQL(this,  ' = ',  ', ');

        return this.run(
            `update ${this.__name__} set ${data} where (id = ${this.id})`
        );
    }

    remove() {

        return  this.run(`delete from ${this.__name__} where (id = ${this.id})`);
    }

    unique(key) {

        var _data_ = { },  _this_ = this;

        _data_[key] = this[key];

        return  this.search(_data_).then(function (item) {

            return  item  ?  _this_.update(item.id, _this_).then(function (info) {

                info.lastID = item.id;

                return info;

            })  :  _this_.append( _this_ );
        });
    }
}

module.exports = SQL_DM;
