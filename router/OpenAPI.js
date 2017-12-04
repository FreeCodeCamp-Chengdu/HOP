'use strict';

const QueryString = require('querystring'),
      router = require('express').Router(),
      fetch = require('node-fetch'),
      Utility = require('./utility');



function queryEdu(type, parameter, response) {

    parameter = Object.assign({ }, parameter);

    parameter.messtype = 'json';

    Utility.reply(
        response,
        fetch(`http://data.api.gkcx.eol.cn/soudaxue/query${type}.html?${
            QueryString.stringify( parameter )
        }`).then(function (response) {

            return response.json();

        }).then(function (data) {

            return {
                total:    parseInt( data.totalRecord.num ),
                list:     data.school
            };
        })
    );
}

/**
 * @api {get} /university/specialty 查询专业
 *
 * @apiName    listSpecialty
 * @apiVersion 1.0.0
 * @apiGroup   University
 *
 * @apiUse List_Query
 */
router.get('/university/specialty',  function (request, response) {

    var data = request.query;

    queryEdu(
        'specialty',
        {
            keyWord2:    encodeURIComponent(data.keyWord || ''),
            size:        data.rows,
            page:        data.page
        },
        response
    );
});


router.get(/\/university(\/(\d+))?/,  function (request, response) {

    var data = request.query;

    queryEdu(
        'school',
        {
            schoolid:    request.params[1] || '',
            keyWord1:    encodeURIComponent(data.keyWord || ''),
            size:        data.rows,
            page:        data.page
        },
        response
    );
});


router.all(/\/map\/(\S+)/,  function (request, response) {

    Utility.reply(
        response,
        fetch(`https://restapi.amap.com/v3/${
            request.originalUrl.replace(`${request.baseUrl}/map/`, '')
        }&key=${
            process.env.AMAP_KEY
        }`).then(function (response) {

            return response.json();
        })
    );
});


module.exports = router;
