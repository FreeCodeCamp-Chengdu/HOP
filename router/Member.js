'use strict';

const router = require('express').Router(), LeanCloud = require('leanengine');


/**
 * @apiDefine Member_Model
 *
 * @apiParam  {String{3..100}}  name  GitHub ID
 */

/**
 * @api {get} /member 查询队友
 *
 * @apiName    listMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   result.name        GitHub ID
 * @apiSuccess {String}   result.location    地址
 * @apiSuccess {String}   result.description 描述
 */
router.post('/member',  function (request, response) {


});


/**
 * @api {post} /member 添加队友
 *
 * @apiName    postMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiUse Member_Model
 *
 * @apiSuccess {Number} id 唯一索引
 */
router.post('/member',  function (request, response) {


});


/**
 * @api {get} /member/:id 查看队友详情
 *
 * @apiName    getMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam {Number} id 唯一索引
 *
 * @apiSuccess {String} name        GitHub ID
 * @apiSuccess {String} location    地址
 * @apiSuccess {String} description 描述
 */
router.get('/member/:id',  function (request, response) {

    console.dir(request)
});

/**
 * @api {put} /member/:id 更新队友详情
 *
 * @apiName    updateMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam {Number} id 唯一索引
 *
 * @apiUse Member_Model
 */
router.put('/member/:id',  function (request, response) {


});

/**
 * @api {delete} /member/:id 移除队友
 *
 * @apiName    deleteMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam {Number} id 唯一索引
 */
router.delete('/member/:id',  function (request, response) {


});


module.exports = router;
