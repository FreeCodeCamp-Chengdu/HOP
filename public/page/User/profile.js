require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    var iWebApp = new EWA(),
        Data = {
            type:    'data',
            src:     '/university'
        };

    iWebApp.off( Data ).on(Data,  function (_, data) {

        return data.list;
    });

    EWA.component(function (data) {

        data.emailStatus = data.emailVerified ? 'success' : 'warning';

        data.phoneStatus = data.mobilePhoneVerified ? 'success' : 'warning';

        data.switch = function (event) {

            if ( this.edit )  return;

            this.edit = 1;

            event.stopPropagation(),  event.preventDefault();
        };

        data.atSchool = function (_, data) {

            this.degree = data.level;
        };

        data.complete = iWebApp.loadPage.bind(iWebApp, 0);
    });
});
