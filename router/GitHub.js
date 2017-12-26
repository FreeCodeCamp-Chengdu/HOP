'use strict';

const router = require('express').Router(),
      GitHub = require('express-github'),
      LeanCloud = require('leanengine');

const github = GitHub(
        {
            AppID:         process.env.GITHUB_APP_ID,
            AppSecret:     process.env.GITHUB_APP_SECRET,
            AppScope:      ['user:follow', 'public_repo'],
            HookSecret:    process.env.GITHUB_HOOK_SECRET
        },
        {
            setSession:    function (request, response, data) {

            //  https://forum.leancloud.cn/t/bug-github-oauth/16180/10

                return LeanCloud.User.signUpOrlogInWithAuthData(
                    {
                        uid:             data.id + '',
                        access_token:    data.AccessToken
                    },
                    'github'
                ).then(function (user) {

                    response.saveCurrentUser( user );

                    return user.save(
                        {
                            username:    data.login,
                            github:      data
                        },
                        {user: user}
                    );
                }).then(function () {

                    return data;
                });
            },
            getSession:    function (request, response) {

                return  request.currentUser ?
                    request.currentUser.get('github') : { };
            },
            successURL:    '/#!' + Buffer.from(
                'page/User/profile.html?data=user/profile'
            ).toString('base64')
        }
    );

router.use('/GitHub', github.router);



module.exports = router;
