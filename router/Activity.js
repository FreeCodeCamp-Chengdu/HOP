'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');

const Activity = LeanCloud.Object.extend('Activity');

/**
 * @apiDefine Activity_Model
 *
 * @apiParam {String{3..100}} title       标题
 * @apiParam {String}         [imageURL]  题图 URL
 * @apiParam {Date}           startTime   开始时间
 * @apiParam {Date}           endTime     结束时间
 * @apiParam {String{3..100}} [location]  地址
 * @apiParam {String{100..}}  description 描述
 */

/**
 * @api {post} /activity 发起活动
 *
 * @apiName    postActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiUse Activity_Model
 *
 * @apiSuccess {String} id 唯一索引
 */
router.post('/activity',  function (request, response) {

    var data = request.body;

    data.creator = request.currentUser;

    data.startTime = new Date( data.startTime );

    data.endTime = new Date( data.endTime );

    Utility.reply(response,  (new Activity()).save( data ));
});


/**
 * @api {get} /activity 查询活动
 *
 * @apiName    listActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
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
router.get('/activity',  function (request, response) {

    Utility.reply(
        response,
        Utility.query(request.query,  'Activity',  ['title', 'description'])
    );
});


/**
 * @api {get} /activity/:id 查看活动详情
 *
 * @apiName    getActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
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
router.get('/activity/:id',  function (request, response) {

    var query = new LeanCloud.Query('Activity');

    Utility.reply(response,  query.get( request.params.id ));
});


/**
 * @api {put} /activity/:id 更新活动详情
 *
 * @apiName    updateActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiParam {String} id 唯一索引
 *
 * @apiUse Activity_Model
 */
router.put('/activity/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Activity', request.params.id
        ).fetch().then(function (activity) {

            if (request.currentUser.id === activity.get('creator').id) {

                request.body.editor = request.currentUser;

                return  activity.save( request.body );
            }

            var error = Error('This activity can be edited by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


/**
 * @api {delete} /activity/:id 删除活动
 *
 * @apiName    deleteActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiParam {String} id 唯一索引
 */
router.delete('/activity/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Activity', request.params.id
        ).fetch().then(function (activity) {

            if (request.currentUser.id === activity.get('creator').id)
                return activity.destroy();

            var error = Error('This activity can be deleted by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


module.exports = router;
