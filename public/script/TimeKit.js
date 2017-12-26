define(function () {

    var TimeUnit = [
            {
                scale:    1000,
                name:     "秒"
            },
            {
                scale:    60,
                name:     "分钟"
            },
            {
                scale:    60,
                name:     "小时"
            },
            {
                scale:    24,
                name:     "天"
            },
            {
                scale:    7,
                name:     "周"
            },
            {
                scale:    30 / 7,
                name:     "月"
            },
            {
                scale:    12,
                name:     "年"
            }
        ],
        Format = ['Y', 'M', 'D', 'H', 'm', 's', 'ms'];

    return {
        distanceOf:        function (start, end) {

            var time = new Date(end || +(new Date()))  -  new Date( start );

            var pass = (time > 0);

            for (var i = 0, _Value_ = Math.abs( time );  TimeUnit[i];  i++) {

                _Value_ = _Value_ / TimeUnit[i].scale;

                if (_Value_ >= 1)
                    time = _Value_;
                else
                    break;
            }

            return  i ? (
                time.toFixed(0)  +  TimeUnit[--i].name  +  (
                    end  ?  ''  :  (pass ? "前" : "后")
                )
            ) : (
                pass ? "刚刚" : "马上"
            );
        },
        toFormatString:    function (TimeStamp, format) {

            var date = new Date(TimeStamp  ||  +(new Date()));

            date = (new Date( date )).toJSON().split( /[^\d]/ );

            var _Date_ = { };

            for (var i = 0;  Format[i];  i++)
                _Date_[ Format[i] ] = date[i];

            return  (format || 'Y-M-D').replace(/[YMDHms]+/g,  function () {

                return  _Date_[ arguments[0] ];
            });
        }
    };
});
