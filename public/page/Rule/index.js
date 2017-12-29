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
                    rotate: 10,
                    stretch: 40,
                    depth: 30,
                    modifier: 5,
                    slideShadows : true
                },
                onTransitionEnd:        function (swiper) {

                    VM.current = swiper.realIndex;
                }
            });
        });
    });
});
