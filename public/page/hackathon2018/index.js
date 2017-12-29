require(['jquery', 'EasyWebApp','Swiper'],  function ($, EWA, Swiper) {

    EWA.component(function () {
        this.on('ready',  function () {
            var VM = this;
<<<<<<< HEAD
            new Swiper('.swiper-guest', {
                centeredSlides:         true,
                slidesPerView:          'auto',
                slideToClickedSlide:    true,
                grabCursor:             true,
                loop:                   true,
                pagination:             '.swiper-pagination',
                paginationClickable:    true,
                effect:                 'coverflow',
                coverflow:              {
                    rotate: 3,
                    stretch: 30,
                    depth: 30,
                    modifier: 5,
                    slideShadows : true
                },
                onTransitionEnd:        function (swiper) {

                    VM.current = swiper.realIndex;
                }
=======
            new Swiper('.banner', {
                autoplay: 6000,
                speed: 4000,
                spaceBetween: 20,
                loop: true,
>>>>>>> e59681de140c088a8cf68aa3c310f58298b0d6bd
            });
        });
    });
});