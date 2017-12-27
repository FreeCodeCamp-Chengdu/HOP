'use strict';

const Path = require('path'),
      URL_Utility = require('url'),
      FS = require('fs');

const router = require('express').Router(),
      Multiparty = require('connect-multiparty'),
      LeanCloud = require('leanengine'),
      QiNiu = require('./QiNiu');

const File = LeanCloud.Object.extend('xFile');


function fallback(response, error) {

    response.status(error.status || 500).send( error.message );
}


/**
 * @api {post} /file 上传文件
 *
 * @apiName  postFile
 * @apiGroup File
 *
 * @apiParam {String} file 文件二进制数据
 *
 * @apiSuccess {Object[]} file      文件列表
 * @apiSuccess {String}   file.url  文件 URL
 */
router.post('/file',  Multiparty(),  function (request, response) {

    var file = request.files.file;

    (new File()).save({
        name:       file.name,
        type:       file.type,
        size:       file.size,
        creator:    request.currentUser
    }).then(function (_file_) {

        return QiNiu.upload(
            URL_Utility.resolve(
                file.type,  _file_.id + Path.parse( file.name ).ext
            ),
            file.path
        );
    }).then(function (data) {

        response.status( data.statusCode ).json({
            files:    [
                {url:  `${process.env.QINIU_BUCKET_DOMAIN}/${data.data.key}`}
            ]
        });
    }).catch(fallback.bind(null, response)).then(function () {

        for (var name in request.files)
            FS.unlinkSync( request.files[ name ].path );
    });
});


/**
 * @api {delete} /file 删除文件
 *
 * @apiName  deleteFile
 * @apiGroup File
 *
 * @apiParam {String} file  文件 URL
 */
router.delete('/file',  function (request, response) {

    var file = URL_Utility.parse( request.body.file );

    var _file_ = LeanCloud.Object.createWithoutData(
            'xFile',  Path.parse( file.pathname ).name
        );

    _file_.fetch().then(function (_file_) {

        if ((request.currentUser || '').id  ===  (_file_.get('creator') || '').id)
            return  QiNiu.delete( file.pathname.slice(1) );

        var error = Error('This file can be deleted by its creator only');

        error.status = 403;

        throw error;

    }).then(function () {

        return _file_.destroy();

    }).then(function () {

        response.status( 204 ).end();

    }).catch(fallback.bind(null, response));
});


module.exports = router;
