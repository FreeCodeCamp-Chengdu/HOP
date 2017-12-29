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
 * @api {post} /hackathon/:hid/team 发起团队
 *
 * @apiName    postTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam  {String}  hid  黑客松 ID
 *
 * @apiUse Team_Model
 *
 * @apiSuccess {String} id 唯一索引
 */
router.post('/hackathon/:hid/team',  function (request, response) {

    var data = request.body;

    data.creator = request.currentUser;

    data.hackathon = LeanCloud.Object.createWithoutData(
        'Hackathon', request.params.hid
    );

    Utility.reply(response,  (new Team()).save( data ));
});


/**
 * @api {get} /hackathon/:hid/team 查询黑客松团队
 *
 * @apiName    listHackathonTeam
 * @apiVersion 1.0.0
 * @apiGroup   Team
 *
 * @apiParam  {String}  hid  黑客松 ID
 *
 * @apiUse List_Query
 *
 * @apiSuccess {String}   list.title       标题
 * @apiSuccess {String}   list.logoURL     标志 URL
 * @apiSuccess {String}   list.location    地址
 * @apiSuccess {String}   list.description 描述
 */
router.get('/hackathon/:hid/team',  function (request, response) {

    var data = request.query;

    data.hackathon = LeanCloud.Object.createWithoutData(
        'Hackathon', request.params.hid
    );

    Utility.reply(
        response,
        Utility.query(
            data,  'Team',  ['title', 'description'],  ['creator', 'hackathon']
        )
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
            request.query,
            'Team',
            ['title', 'description'],
            ['creator', 'hackathon']
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
 * @apiParam {String} id 唯一索引
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
 * @apiParam {String} id 唯一索引
 *
 * @apiUse Team_Model
 */
router.put('/team/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Team', request.params.id
        ).fetch().then(function (team) {

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
 * @apiParam {String} id 唯一索引
 */
router.delete('/team/:id',  function (request, response) {

    Utility.reply(
        response,
        LeanCloud.Object.createWithoutData(
            'Team', request.params.id
        ).fetch().then(function (team) {

            if (request.currentUser.id === team.get('creator').id)
                return team.destroy();

            var error = Error('This team can be deleted by its creator only');

            error.status = 403;

            throw error;
        })
    );
});


module.exports = router;
