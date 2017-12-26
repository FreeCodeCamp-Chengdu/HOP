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


exports.upload = function (name, path) {

    return  new Promise(function (resolve, reject) {

        uploader.putFile(
            token,  name,  path,  putExtra,  function (error, _, data) {

                if ( error )
                    reject( error );
                else
                    resolve( data );
            }
        );
    });
};


exports.delete = function (name) {

    return  new Promise(function (resolve, reject) {

        manager.delete(scope,  name,  function (error, _, data) {

            if ( error )
                reject( error );
            else
                resolve( data );
        });
    });
};
