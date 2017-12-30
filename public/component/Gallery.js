require(['jquery', 'EasyWebApp', 'Swiper'],  function ($, EWA, Swiper) {

    function Slide() {

        var swiper = new Swiper(this[0], {
                simulateTouch:                   false,
                autoplay:                        3000,
                autoplayDisableOnInteraction:    false,
                loop:                            true
            });

        return this.hover(
            swiper.stopAutoplay.bind( swiper ),
            swiper.startAutoplay.bind( swiper )
        );
    }

    //  【特效】物理倾斜板
    //
    //  https://segmentfault.com/a/1190000007701500

    function Board() {

        var offset = this.offset(),
            size = this.css(['width', 'height', 'font-size']);

        size.width = parseFloat( size.width ),
        size.height = parseFloat( size.height ),
        size['font-size'] = parseFloat( size['font-size'] );

        this.parent().css(
            'perspective',  (size.width / (size['font-size'] * 2)).toFixed(2) + 'rem'
        );

        return  this.mousemove(function (event) {

            var deltaX = event.pageX  -  offset.left  -  size.width / 2,
                deltaY = event.pageY  -  offset.top  -  size.height / 2;

            this.style.transform =
                'rotateX( '  +  (-deltaY / 100)  +  'deg )  '  +
                'rotateY( '  +  (deltaX / 100)  +  'deg )'

        }).mouseleave(function() {

            this.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    EWA.component(function () {

        var $_Slide = this.$_View.find('.swiper-container');

        this.on('ready',  function () {

            Board.call( Slide.call( $_Slide ) );
        });
    });
});
