'use strict';

const URL_Utility = require('url'),
      router = require('express').Router(),
      LeanCloud = require('leanengine'),
      Utility = require('./utility');



router.get('/OAuth',  function (request, response) {

    var user = request.currentUser, account;

    if ( user ) {

        account = {
            email:    user.get('email'),
            phone:    user.get('mobilePhoneNumber')
        };

        for (var name in user.get('authData'))
            account[ name ] = user.get( name );
    }

    response.json(account || { });
});


router.get('/signOut',  function (request, response) {

    request.currentUser.logOut();

    response.clearCurrentUser();

    response.redirect(URL_Utility.resolve(request.headers.referer, '/'));
});


router.all('/profile',  function (request, response) {

    var user = request.currentUser, data = request.body, error;

    if ( user ) {
        switch ( request.method.toUpperCase() ) {
            case 'PUT':
                return  Utility.reply(
                    response,
                    user.save(
                        {
                            email:                data.email || null,
                            mobilePhoneNumber:    data.mobilePhoneNumber || null,
                            profile:              data
                        },
                        {user: user}
                    ).then(function () {

                        return data.SMS_Code ?
                            LeanCloud.User.verifyMobilePhone( data.SMS_Code )  :
                            arguments[0];
                    })
                );
            case 'GET':
                return response.json(Object.assign(
                    {
                        emailVerified:          user.get('emailVerified'),
                        mobilePhoneVerified:    user.get('mobilePhoneVerified')
                    },
                    user.get('profile')
                ));
            default:       {
                error = new URIError('Method Not Allowed');

                error.status = 405;
            }
        }
    } else {
        error = new ReferenceError('Unauthorized');

        error.status = 401;
    }

    throw error;
});


module.exports = router;
