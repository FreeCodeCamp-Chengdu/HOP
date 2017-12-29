require(['jquery', 'EasyWebApp','Swiper'],  function ($, EWA, Swiper) {

    EWA.component(function () {
        this.on('ready',  function () {
            var VM = this;
            new Swiper('.banner', {
                autoplay: 6000,
                speed: 4000,
                spaceBetween: 20,
                loop: true,
            });
        });
    });
});