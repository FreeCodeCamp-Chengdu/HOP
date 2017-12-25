require(['jquery', 'EasyWebApp', 'Swiper'],  function ($, EWA, Swiper) {

    EWA.component(function () {

        this.on('ready',  function () {

            var VM = this;

            new Swiper('.swiper-container', {
                centeredSlides:         true,
                slidesPerView:          'auto',
                slideToClickedSlide:    true,
                grabCursor:             true,
                loop:                   true,
                pagination:             '.swiper-pagination',
                paginationClickable:    true,
                effect:                 'coverflow',
                coverflow:              {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows : true
                },
                onTransitionEnd:        function (swiper) {

                    VM.current = swiper.realIndex;
                }
            });
        });
    });
});
