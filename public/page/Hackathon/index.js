require(['jquery', 'EasyWebApp', 'ScrollReveal', 'BootStrap'],  function ($, EWA, ScrollReveal) {

    EWA.component(function (data) {

        var now = Date.now();

        data.history = [ ];

        data.future = [ ];

        $.each(data.event.sort(function (A, B) {

            return  new Date( A.date ) - new Date( B.date );

        }),  function (index) {

            if (new Date( this.date ) - now  >  0) {

                if ( data.recent )
                    data.future.push( this );
                else
                    data.recent = this;
            } else
                data.history.push( this );
        });

        data.history.reverse();

        delete data.event;

        var sr = ScrollReveal();

        this.on('ready',  function () {
            sr.reveal('#about', {
                duration: 2000,
                origin: 'bottom'
            }).reveal('.event', {
                duration: 2000,
                origin: 'left',
                distance: '100px',
                viewFactor: 0.2
            });
        });
    });
});
