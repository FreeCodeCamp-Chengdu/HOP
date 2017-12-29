require(['jquery', 'EasyWebApp', 'Swiper'],  function ($, EWA, Swiper) {

    EWA.component(function () {

        this.on('ready',  function () {

            var VM = this;

            new Swiper('.swiper-rule', {
                centeredSlides:         true,
                slidesPerView:          'auto',
                slideToClickedSlide:    true,
                grabCursor:             true,
                loop:                   true,
                effect:                 'coverflow',
                coverflow:              {
                    rotate: 10,
                    stretch: 30,
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
