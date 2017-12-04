'use strict';

const router = require('express').Router(), LeanCloud = require('leanengine');


/**
 * @apiDefine Activity_Model
 *
 * @apiParam {String{3..100}} title       标题
 * @apiParam {Date}           startTime   开始时间
 * @apiParam {Date}           endTime     结束时间
 * @apiParam {String{3..100}} [location]  地址
 * @apiParam {String{100..}}  description 描述
 */

/**
 * @api {get} /activity 查询活动
 *
 * @apiName    listActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   result.title       标题
 * @apiSuccess {Date}     result.startTime   开始时间
 * @apiSuccess {Date}     result.endTime     结束时间
 * @apiSuccess {String}   result.location    地址
 * @apiSuccess {String}   result.description 描述
 */
router.post('/activity',  function (request, response) {


});


/**
 * @api {post} /activity 发起活动
 *
 * @apiName    postActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiUse Activity_Model
 *
 * @apiSuccess {Number} id 唯一索引
 */
router.post('/activity',  function (request, response) {


});


/**
 * @api {get} /activity/:id 查看活动详情
 *
 * @apiName    getActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiParam {Number} id 唯一索引
 *
 * @apiUse Model_Meta
 *
 * @apiSuccess {String} title       标题
 * @apiSuccess {Date}   startTime   开始时间
 * @apiSuccess {Date}   endTime     结束时间
 * @apiSuccess {String} location    地址
 * @apiSuccess {String} description 描述
 */
router.get('/activity/:id',  function (request, response) {

    console.dir(request)
});

/**
 * @api {put} /activity/:id 更新活动详情
 *
 * @apiName    updateActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiParam {Number} id 唯一索引
 *
 * @apiUse Activity_Model
 */
router.put('/activity/:id',  function (request, response) {


});

/**
 * @api {delete} /activity/:id 删除活动
 *
 * @apiName    deleteActivity
 * @apiVersion 1.0.0
 * @apiGroup   Activity
 *
 * @apiParam {Number} id 唯一索引
 */
router.delete('/activity/:id',  function (request, response) {


});


module.exports = router;
