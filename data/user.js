'use strict';

var SQL_DM = require('./SQL_DM.js');



class user extends SQL_DM {
    set name(value) {

        this.__data__.name = value;
    }

    set key(value) {

        this.__data__.key = value;
    }

    set logo(value) {

        this.__data__.logo = value;
    }

    set www(value) {

        this.__data__.www = value;
    }
}

module.exports = user;
