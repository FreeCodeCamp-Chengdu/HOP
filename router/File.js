'use strict';

const FS = require('fs'),
      router = require('express').Router(),
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

    QiNiu.upload(null, file.path).then(function (data) {

        return  (new LeanCloud.Query('xFile')).equalTo(
            'hash',  file.hash = data.data.hash
        ).find();

    }).then(function (list) {

        return  list[0] ||
            (new File()).save(
                {
                    name:       file.name,
                    type:       file.type,
                    size:       file.size,
                    hash:       file.hash,
                    creator:    request.currentUser
                },
                {user:  request.currentUser}
            );
    }).then(function (_file_) {

        response.json({
            files:    [{
                url:    `${process.env.QINIU_BUCKET_DOMAIN}/${_file_.get('hash')}`
            }]
        });
    }).catch( fallback.bind(null, response) ).then(function () {

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

    var hash = request.body.file.split('/').slice(-1)[0], _file_;

    (new LeanCloud.Query('xFile')).equalTo('hash', hash).find().then(
        function (list) {

            var error;

            if (! list[0]) {

                error = Error('Not found');

                error.status = 404;

            } else if (
                (request.currentUser || '').id  !==
                (list[0].get('creator') || '').id
            ) {
                error = Error('This file can be deleted by its creator only');

                error.status = 403;
            } else
                return  list[0].destroy({user: request.currentUser});

            throw error;
        }
    ).then(function () {

        return  QiNiu.delete( hash );

    }).then(function () {

        response.status( 204 ).end();

    }).catch( fallback.bind(null, response) );
});


module.exports = router;
