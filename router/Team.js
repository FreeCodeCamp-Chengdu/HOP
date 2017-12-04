'use strict';

const router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');

const Team = LeanCloud.Object.extend('Team');

/**
 * @apiDefine Team_Model
 *
 * @apiParam {String{3..10}}   title       标题
 * @apiParam {String}          [logoURL]   标志 URL
 * @apiParam {String{3..100}}  [location]  地址
 * @apiParam {String{10..100}} description 描述
 */

/**
 * @api {post} /activity/:aid/team 发起团队
 *
 * @apiName    postTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam  {Number}  aid  活动 ID
 *
 * @apiUse Team_Model
 *
 * @apiSuccess {Number} id 唯一索引
 */
router.post('/activity/:aid/team',  function (request, response) {

    var data = request.body;

    data.creator = request.currentUser;

    data.activity = LeanCloud.Object.createWithoutData(
        'Activity', request.params.aid
    );

    Utility.reply(response,  (new Team()).save( data ));
});


/**
 * @api {get} /activity/:aid/team 查询活动团队
 *
 * @apiName    listActivityTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam  {Number}  aid  活动 ID
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   list.title       标题
 * @apiSuccess {String}   list.logoURL     标志 URL
 * @apiSuccess {String}   list.location    地址
 * @apiSuccess {String}   list.description 描述
 */
router.get('/activity/:aid/team',  function (request, response) {

    var data = request.query;

    data.activity = LeanCloud.Object.createWithoutData(
        'Activity', request.params.aid
    );

    Utility.reply(
        response,
        Utility.query(data,  'Team',  ['title', 'description'],  ['activity'])
    );
});


/**
 * @api {get} /team 全局查询团队
 *
 * @apiName    listTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   list.title       标题
 * @apiSuccess {String}   list.logoURL     标志 URL
 * @apiSuccess {String}   list.location    地址
 * @apiSuccess {String}   list.description 描述
 */
router.get('/team',  function (request, response) {

    Utility.reply(
        response,
        Utility.query(
            request.query,  'Team',  ['title', 'description'],  ['activity']
        )
    );
});


/**
 * @api {get} /team/:id 查看团队详情
 *
 * @apiName    getTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam {Number} id 唯一索引
 *
 * @apiUse Model_Meta
 *
 * @apiSuccess {String} title       标题
 * @apiSuccess {String} logoURL     标志 URL
 * @apiSuccess {String} location    地址
 * @apiSuccess {String} description 描述
 */
router.get('/team/:id',  function (request, response) {

    var query = new LeanCloud.Query('Team');

    Utility.reply(response,  query.get( request.params.id ));
});


/**
 * @api {put} /team/:id 更新团队详情
 *
 * @apiName    updateTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam {Number} id 唯一索引
 *
 * @apiUse Team_Model
 */
router.put('/team/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Team', request.params.id
        ).fetch({
            include:    ['creator']
        }).then(function (team) {

            if (request.currentUser.id === team.get('creator').id) {

                request.body.editor = request.currentUser;

                return  team.save( request.body );
            }

            var error = Error('This team can be edited by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


/**
 * @api {delete} /team/:id 解散团队
 *
 * @apiName    deleteTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam {Number} id 唯一索引
 */
router.delete('/team/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Team', request.params.id
        ).fetch({
            include:    ['creator']
        }).then(function (team) {

            if (request.currentUser.id === team.get('creator').id)
                return team.destory();

            var error = Error('This team can be deleted by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


module.exports = router;
