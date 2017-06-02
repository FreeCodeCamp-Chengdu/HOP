'use strict';

var SQL_DM = require('./SQL_DM.js');



class activity extends SQL_DM {
    set title(value) {

        this.__data__.title = value;
    }

    set keyWord(value) {

        this.__data__.keyWord = value;
    }

    set startTime(value) {

        this.__data__.startTime = value;
    }

    set endTime(value) {

        this.__data__.endTime = value;
    }

    set location(value) {

        this.__data__.location = value;
    }

    set description(value) {

        this.__data__.description = value;
    }
}

module.exports = activity;
