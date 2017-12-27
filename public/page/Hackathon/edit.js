require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    EWA.component(function (data) {

    //  单图上传组件

        data.setURL = function (event, data) {

            this.imageURL = ((data || '').files instanceof Array)  ?
                data.files[0].url  :  '';
        };

    //  奖项设置

        function update(list) {

            this[0].nextElementSibling.value = JSON.stringify( list.valueOf() );
        }

        data.addOne = function (event) {

            var $_Fieldset = $( event.target ).parents('fieldset').eq(0);

            var tBody = $_Fieldset.find('tbody').view(),
                imageUploader =
                    $_Fieldset.find('[type="file"]').parents(':view').view();

            tBody.insert( $.paramJSON('?' + $_Fieldset.serialize()) );

            if ( imageUploader )  imageUploader.clean();

            $_Fieldset.find(':field').val('');

            update.call($_Fieldset, tBody);
        };

        data.removeOne = function () {

            var tBody = this.$_View.parent().view();

            tBody.remove( this );

            update.call(tBody.$_View.parents('fieldset'), tBody);
        };

    //  提交收尾

        var app = new EWA();

        data.submit = function () {

            this.submitting = true;
        };

        data.goBack = function () {

            this.submitting = false;

            app.loadPage( -1 );
        };
    });
});
