'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');

const Member = LeanCloud.Object.extend('Member');

/**
 * @apiDefine Member_Model
 *
 * @apiParam  {String}  uid              用户 ID
 * @apiParam  {String}  [role="member"]  用户角色
 */

/**
 * @api {post} /team/:tid/member 添加队籍
 *
 * @apiName    postMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam  {String}  tid  团队 ID
 *
 * @apiUse Member_Model
 *
 * @apiSuccess {String} id    唯一索引
 * @apiSuccess {String} state 邀请状态
 */

router.post('/team/:tid/member',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Team', request.params.tid
        ).fetch().then(function (team) {

            if (request.currentUser.id === team.get('creator').id)
                return  (new Member()).save({
                    team:       team,
                    user:       LeanCloud.Object.createWithoutData(
                        '_User', request.body.uid
                    ),
                    role:       request.body.role || 'member',
                    state:      'pending',
                    creator:    request.currentUser
                });

            var error = Error('This team can be edited by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


/**
 * @api {get} /team/:tid/member 查询队友
 *
 * @apiName    listMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam  {String}  tid  团队 ID
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String} list.role           用户角色
 * @apiSuccess {String} list.state          邀请状态
 * @apiSuccess {Object} list.user           用户详情
 * @apiSuccess {String} list.user.username  用户名
 * @apiSuccess {Object} list.user.github    GitHub 用户详情
 */
router.get('/team/:tid/member',  function (request, response) {

    var data = request.body;

    data.team = LeanCloud.Object.createWithoutData('Team', request.params.tid);

    Utility.reply(
        response,
        Utility.query(
            data,  'Member',  ['role', 'state'],  ['user', 'creator']
        ).then(function (data) {

            for (let item of data.list)  delete item.team;

            return data;
        })
    );
});


/**
 * @api {get} /member/:id 查看队友详情
 *
 * @apiName    getMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam {String} id 唯一索引
 *
 * @apiSuccess {String} role           用户角色
 * @apiSuccess {String} state          邀请状态
 * @apiSuccess {Object} user           用户详情
 * @apiSuccess {String} user.username  用户名
 * @apiSuccess {Object} user.github    GitHub 用户详情
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
 * @apiParam {String} id 唯一索引
 *
 * @apiUse Member_Model
 */
router.put('/member/:id',  function (request, response) {

    var member = LeanCloud.Object.createWithoutData('Member', request.params.id);

    Utility.reply(response,  member.save({role: request.body.role}));
});


/**
 * @api {delete} /member/:id 移除队籍
 *
 * @apiName    deleteMember
 * @apiVersion 1.0.0
 * @apiGroup   Member
 *
 * @apiParam {String} id 唯一索引
 */
router.delete('/member/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Member', request.params.id
        ).fetch({
            include:    ['team']
        }).then(function (member) {

            var data = request.body;

            if (request.currentUser.id === member.team.get('creator').id)
                return member.destroy();

            var error = Error('This team can be edited by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


module.exports = router;
