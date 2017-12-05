'use strict';

/** @module utility */

const LeanCloud = require('leanengine');



exports.fixData = function (data) {

    if (data.toJSON instanceof Function)  data = data.toJSON();

    if ( data.objectId ) {

        data.id = data.objectId;

        delete data.objectId;
    }

    delete data.authData;

    return data;
};


exports.fetchPointer = function (data) {

    var fetch = [ ], _data_ = data.attributes;

    for (let key in _data_)
        if (_data_[ key ]  instanceof  LeanCloud.Object)
            fetch.push([key,  _data_[ key ]]);

    data = exports.fixData( data );

    return  Promise.all(fetch.map(function (item) {

        return LeanCloud.Object.createWithoutData(
            item[1].className, item[1].id
        ).fetch().then(function (_data_) {

            data[ item[0] ] = exports.fixData(_data_);

            _data_ = _data_.attributes;

            for (let key in _data_)
                if (_data_[ key ]  instanceof  LeanCloud.Object)
                    delete  data[ item[0] ][ key ];
        });
    })).then(function () {  return data;  });
};


/**
 * 承诺对象
 *
 * @typedef {Promise} Promise
 *
 * @see     {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 */

/**
 * 响应异步结果
 *
 * @author TechQuery <shiy007@qq.com>
 *
 * @param  {Response} response - Express 响应对象
 * @param  {Promise}  promise  - 异步查询
 *
 * @return {Promise}
 */
exports.reply = function (response, promise) {

    return  promise.then( exports.fetchPointer ).then(function (data) {

        response.json( data ).end();

    },  function (error) {

        response.status(error.status || 400).json({
            code:       error.code,
            message:    error.message || error.rawMessage
        }).end();
    });
};


exports.condition = function (where, parameter) {

    var pointer = [ ], like = '';

    for (let key in parameter) {

        let item = parameter[ key ];

        if (item instanceof LeanCloud.Object)
            pointer.push(
                `${key} = pointer('${item.className}', '${item.id}')`
            );
    }

    pointer = pointer.join(' and ');

    if ((where || '')[0]  &&  parameter.keyWord)
        like = where.map(function () {

            return  `${arguments[0]} like ${
                JSON.stringify(`%${parameter.keyWord}%`)
            }`;
        }).join(' or ');

    where = (pointer && like)  ?
        `${pointer} and (${like})`  :  (pointer || like);

    return  where  ?  `where (${where})`  :  '';
};


/**
 * 批量查询
 *
 * @author TechQuery <shiy007@qq.com>
 *
 * @param  {object}   parameter    - 查询条件（如 Express 中的 `request.query`）
 * @param  {string}   table        - 数据表名
 * @param  {string[]} [where=[]]   - 模糊查询的字段
 * @param  {string[]} [include=[]] - 查询包含的其它表数据
 *
 * @return {Promise}   查询结果
 */
exports.query = function (parameter, table, where = [ ], include = [ ]) {

    Object.assign(parameter, {
        rows:       parameter.rows || 10,
        page:       parameter.page || 1,
        keyWord:    (parameter.keyWord || '').trim()
    });

    var link = include || '';

    if ( link[0] )
        link = link.map(function () {

            return  `include ${arguments[0]}`;

        }).join(', ')  +  ', ';

    where = exports.condition(where, parameter);

    return Promise.all([
        LeanCloud.Query.doCloudQuery(
            `select ${link}* from ${table} ${where} limit ${
                (parameter.page - 1) * parameter.rows},${parameter.rows}`,
            {user: this}
        ),
        LeanCloud.Query.doCloudQuery(
            `select count(*) from ${table} ${where}`,  {user: this}
        )
    ]).then(function (data) {

        return {
            list:     data[0].results.map(function (item) {

                item = exports.fixData( item );

                for (let key of include)
                    item[ key ] = exports.fixData( item[ key ] );

                return item;
            }),
            total:    data[1].count
        };
    });
};
