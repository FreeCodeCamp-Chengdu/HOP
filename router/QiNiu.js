'use strict';

const QiNiu = require('qiniu'), scope = process.env.QINIU_BUCKET_ID;


const putPolicy = new QiNiu.rs.PutPolicy({scope: scope}),
      mac = new QiNiu.auth.digest.Mac(
          process.env.QINIU_APP_ID, process.env.QINIU_APP_SECRET
      ),
      config = new QiNiu.conf.Config();

config.zone = QiNiu.zone[`Zone_${process.env.QINIU_BUCKET_ZONE}`];

const uploader = new QiNiu.form_up.FormUploader( config ),
      manager = new QiNiu.rs.BucketManager(mac, config),
      token = putPolicy.uploadToken( mac ),
      putExtra = new QiNiu.form_up.PutExtra();


function promisify(factory) {

    return  function () {

        var _this_ = this, param = Array.from( arguments );

        return  new Promise(function (resolve, reject) {

            factory.apply(_this_,  param.concat(function (error, data, response) {

                if (error = error || (data || '').error) {

                    error = new Error(error.message || error);

                    error.status = response.statusCode;

                    reject( error );
                } else
                    resolve( response );
            }));
        });
    };
}


exports.upload = promisify(function (name, path, callback) {

    uploader.putFile(token, name, path, putExtra, callback);
});


exports.delete = promisify(function (name, callback) {

    manager.delete(scope, name, callback);
});
