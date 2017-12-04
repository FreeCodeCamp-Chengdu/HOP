'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');

const Member = LeanCloud.Object.extend('Member');

/**
 * @apiDefine Member_Model
 *
 * @apiParam  {String{3..100}}  name  GitHub ID
 */

/**
 * @api {post} /team/:tid/member 添加队友
 *
 * @apiName    postMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam  {Number}  tid  团队 ID
 *
 * @apiUse Member_Model
 *
 * @apiSuccess {Number} id 唯一索引
 */

router.post('/team/:tid/member',  function (request, response) {

    var data = request.body;

    data.team = LeanCloud.Object.createWithoutData('Team', request.params.tid);

    Utility.reply(response,  (new Member()).save( data ));
});


/**
 * @api {get} /team/:tid/member 查询队友
 *
 * @apiName    listMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam  {Number}  tid  团队 ID
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   result.name        GitHub ID
 * @apiSuccess {String}   result.location    地址
 * @apiSuccess {String}   result.description 描述
 */
router.get('/team/:tid/member',  function (request, response) {

    var data = request.body;

    data.team = LeanCloud.Object.createWithoutData('Team', request.params.tid);

    Utility.reply(
        response,
        Utility.query(data,  'Member',  ['name', 'description'],  ['team'])
    );
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

    var query = new LeanCloud.Query('Member');

    Utility.reply(response,  query.get( request.params.id ));
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

    var member = LeanCloud.Object.createWithoutData('Member', request.params.id);

    Utility.reply(response,  member.save( request.body ));
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

    var member = LeanCloud.Object.createWithoutData('Member', request.params.id);

    Utility.reply(response, member.destory());
});


module.exports = router;
