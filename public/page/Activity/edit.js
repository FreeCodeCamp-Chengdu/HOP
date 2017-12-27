require(['jquery', 'EasyWebApp', 'DateRangePicker'],  function ($, EWA) {

    EWA.component(function (data) {

        $('#date_select').daterangepicker({
            timePicker:          true,
            timePicker24Hour:    true,
            locale:              {
                format:         "YYYY-MM-DDTHH:mm:SS",
                separator:      " - ",
                applyLabel:     "确定",
                cancelLabel:    "取消",
                daysOfWeek:     ["日", "一", "二", "三", "四", "五", "六"],
                monthNames:     [
                    "一月", "二月", "三月", "四月", "五月", "六月",
                    "七月", "八月", "九月", "十月", "十一月", "十二月"
                ],
                firstDay:       1
            },
            minDate:             (new Date()).toISOString().split('T')[0]
        },  function () {

            var args = arguments;

            $( this.element ).nextAll('[type="hidden"]').val(function (index) {

                return args[ index ].utcOffset(8).format('YYYY-MM-DDTHH:mm:ss');
            });
        });

    //  单图上传组件

        data.setURL = function (event, data) {

            this.imageURL = ((data || '').files instanceof Array)  ?
                data.files[0].url  :  '';
        };
    });
});
