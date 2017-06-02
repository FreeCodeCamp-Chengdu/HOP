'use strict';


//  SQL Data Base

var SQLite = require('sqlite3').verbose(),  DB_Scheme = require('./data/scheme');

var DataBase = new SQLite.Database('data/SQLite.db'),  Default = DB_Scheme['*'];

delete DB_Scheme['*'];


Promise.all(Object.keys( DB_Scheme ).map(function (name) {

    return  new Promise(function (resolve, reject) {

        var field = Object.assign({ },  Default,  DB_Scheme[ name ]);

        field = Object.keys( field ).map(function (key) {

            return  `${key} ${field[key]}`;

        }).join(', ');

        DataBase.run(
            `create Table if not exists ${name} (${field})`,
            function (error) {

                if (! error)  return  resolve( name );

                console.error( error );

                reject( error );
            }
        );
    });
})).then(function () {

    console.log(`SQL Table: ${arguments[0]}`);
});


//  HTTP Server

const  Config = require('./config.js');

Config.SQL_DB = DataBase;


const RestApp = require('easy-rest').RestApp;

const App = new RestApp( Config );

App.server.listen(8000);

console.log('HTTP Server runs at:');
console.dir( App.server.address() );


//  Custom API

App.get(/\/github\?/, require('./router/github/oauth'));

App.all('/github/', require('./router/github/proxy'));

App.on('model',  function (_, data) {

    data.uid = this.request.session.get('uid');
});
