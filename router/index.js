'use strict';

const Express = require('express'),
      CORS = require('cors'),
      bodyParser = require('body-parser'),
      LeanCloud = require('leanengine');

const app = Express();


/* ---------- Express 中间件 ---------- */

//  HTTP 基础中间件

app.use( Express.static('public/') );

app.use(CORS({
    origin:                  (process.env.WEB_DOMAIN || '').split('|').map(
        function (domain) {

            return `https://${domain}`;
        }
    ).concat(
        'http://localhost',
        `https://${process.env.CLOUD_APP}.leanapp.cn`
    ),
    credentials:             true,
    optionsSuccessStatus:    200
}));

app.use( require('cookie-parser')() );

app.use( bodyParser.urlencoded({ extended: false }) );

app.use( bodyParser.json() );

//  LeanCloud 云引擎中间件
/*
app.use( require('connect-timeout')('15s') );
*/
app.use( LeanCloud.express() );

app.enable('trust proxy');

app.use( LeanCloud.Cloud.HttpsRedirect() );

app.use(LeanCloud.Cloud.CookieSession({
    secret:       process.env.GITHUB_APP_SECRET,
    maxAge:       3600000,
    fetchUser:    true
}));


/* ---------- RESTful API 路由 ---------- */

app.use( require('./GitHub') );

/**
 * @apiDefine Model_Meta 模型元数据 后端自动生成的只读字段
 *
 * @apiSuccess {String}  id                唯一索引
 * @apiSuccess {Object}  creator           创建者
 * @apiSuccess {String}  creator.username  用户名
 * @apiSuccess {Object}  creator.github    GitHub 用户详情
 * @apiSuccess {Date}    createdAt         创建时间
 * @apiSuccess {Object}  editor            编辑者
 * @apiSuccess {String}  editor.username   用户名
 * @apiSuccess {Object}  editor.github     GitHub 用户详情
 * @apiSuccess {Date}    updatedAt         更新时间
 */

/**
 * @apiDefine List_Query 批量查询
 *
 * @apiParam {Number} [rows=10] 结果行数
 * @apiParam {Number} [page=1]  结果页码
 * @apiParam {String} [keyWord] 关键词
 *
 * @apiSuccess {Object[]} list                   结果列表
 * @apiSuccess {Number}   list.id                唯一索引
 * @apiSuccess {Object}   list.creator           创建者
 * @apiSuccess {String}   list.creator.username  用户名
 * @apiSuccess {Object}   list.creator.github    GitHub 用户详情
 * @apiSuccess {Date}     list.createdAt         创建时间
 * @apiSuccess {Object}   list.editor            编辑者
 * @apiSuccess {String}   list.editor.username   用户名
 * @apiSuccess {Object}   list.editor.github     GitHub 用户详情
 * @apiSuccess {Date}     list.updatedAt         更新时间
 * @apiSuccess {Number}   total                  结果总数
 */

app.use('/openAPI', require('./OpenAPI'));

app.use( require('./File') );

app.use( require('./User') );

app.use( require('./Hackathon') );

app.use( require('./Team') );

app.use( require('./Member') );



/* ---------- 异常处理 ---------- */

app.use(function(request, response, next) {

    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器

    if ( response.headersSent )  return;

    var error = new Error('Not Found');

    error.code = 404;

    next( error );
});


module.exports = app;
