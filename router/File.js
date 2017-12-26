'use strict';

const router = require('express').Router(),
      Multiparty = require('connect-multiparty'),
      QiNiu = require('./QiNiu');


function fallback(error) {

    response.status( 500 ).json( error );
}


router.post('/file',  Multiparty(),  function (request, response) {

    var file = request.files.file;

    QiNiu.upload(`${ file.type.split('/')[0] }/${ file.name }`,  file.path).then(
        function (data) {

            response.status( data.statusCode ).json({
                files:    [
                    {url:  `${process.env.QINIU_BUCKET_DOMAIN}/${data.data.key}`}
                ]
            });
        },
        fallback
    );
});


router.delete('/file',  function (request, response) {

    QiNiu.delete(
        request.body.file.replace(process.env.QINIU_BUCKET_DOMAIN + '/',  '')
    ).then(
        function (data) {

            if (data.statusCode === 200)
                response.status( 204 ).end();
            else
                response.status( data.statusCode ).json( data.data );
        },
        fallback
    );
});


module.exports = router;
