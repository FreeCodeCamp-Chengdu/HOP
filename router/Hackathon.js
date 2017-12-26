'use strict';

const router = require('express').Router(),
      Multiparty = require('connect-multiparty'),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');

const Hackathon = LeanCloud.Object.extend('Hackathon');

/**
 * @apiDefine Hackathon_Model
 *
 * @apiParam {String{3..100}} title       标题
 * @apiParam {String}         [imageURL]  题图 URL
 * @apiParam {Date}           startTime   开始时间
 * @apiParam {Date}           endTime     结束时间
 * @apiParam {String{3..100}} [location]  地址
 * @apiParam {String{100..}}  description 描述
 */

/**
 * @api {post} /hackathon 发起黑客松
 *
 * @apiName    postHackathon
 * @apiVersion 1.0.0
 * @apiGroup   Hackathon
 *
 * @apiUse Hackathon_Model
 *
 * @apiSuccess {String} id 唯一索引
 */
router.post('/hackathon',  Multiparty(),  function (request, response) {

    var data = request.body;

    data.creator = request.currentUser;

    data.startTime = new Date( data.startTime );

    data.endTime = new Date( data.endTime );

    Utility.reply(response,  (new Hackathon()).save( data ));
});


/**
 * @api {get} /hackathon 查询黑客松
 *
 * @apiName    listHackathon
 * @apiVersion 1.0.0
 * @apiGroup   Hackathon
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   list.title       标题
 * @apiSuccess {String}   list.imageURL    题图 URL
 * @apiSuccess {Date}     list.startTime   开始时间
 * @apiSuccess {Date}     list.endTime     结束时间
 * @apiSuccess {String}   list.location    地址
 * @apiSuccess {String}   list.description 描述
 */
router.get('/hackathon',  function (request, response) {

    Utility.reply(
        response,
        Utility.query(request.query,  'Hackathon',  ['title', 'description'])
    );
});


/**
 * @api {get} /hackathon/:id 查看黑客松详情
 *
 * @apiName    getHackathon
 * @apiVersion 1.0.0
 * @apiGroup   Hackathon
 *
 * @apiParam {String} id 唯一索引
 *
 * @apiUse Model_Meta
 *
 * @apiSuccess {String} title       标题
 * @apiSuccess {String} imageURL    题图 URL
 * @apiSuccess {Date}   startTime   开始时间
 * @apiSuccess {Date}   endTime     结束时间
 * @apiSuccess {String} location    地址
 * @apiSuccess {String} description 描述
 */
router.get('/hackathon/:id',  function (request, response) {

    var query = new LeanCloud.Query('Hackathon');

    Utility.reply(response,  query.get( request.params.id ));
});


/**
 * @api {put} /hackathon/:id 更新黑客松详情
 *
 * @apiName    updateHackathon
 * @apiVersion 1.0.0
 * @apiGroup   Hackathon
 *
 * @apiParam {String} id 唯一索引
 *
 * @apiUse Hackathon_Model
 */
router.put('/hackathon/:id',  Multiparty(),  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Hackathon', request.params.id
        ).fetch().then(function (hackathon) {

            if (request.currentUser.id === hackathon.get('creator').id) {

                request.body.editor = request.currentUser;

                return  hackathon.save( request.body );
            }

            var error = Error('This hackathon can be edited by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


/**
 * @api {delete} /hackathon/:id 删除黑客松
 *
 * @apiName    deleteHackathon
 * @apiVersion 1.0.0
 * @apiGroup   Hackathon
 *
 * @apiParam {String} id 唯一索引
 */
router.delete('/hackathon/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Hackathon', request.params.id
        ).fetch().then(function (hackathon) {

            if (request.currentUser.id === hackathon.get('creator').id)
                return hackathon.destroy();

            var error = Error('This hackathon can be deleted by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


module.exports = router;
