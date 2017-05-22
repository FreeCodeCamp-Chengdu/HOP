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

var Session = require('node-session');

var HTTP_Server = require('easy-rest').HTTP(function () {

        Object.assign(arguments[0], require('./config.js')).SQL_DB = DataBase;

    },  function (config, url, request, response) {

        if ( url.pathname.match(/\.html?|\/\w+\/?$/) )
            return  new Promise(function () {

                (new Session({
                    secret:      config.App_Secret.slice(0, 32),
                    lifetime:    24 * 60 * 60 * 1000
                })).startSession(request, response, arguments[0]);
            });
    }).listen(8000);

console.log('HTTP Server runs at:');
console.dir( HTTP_Server.address() );
