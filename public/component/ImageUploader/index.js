require.config({
    packages:    ['ImageUploader']
});

require([
    'jquery', 'EasyWebApp', 'ImageUploader/FileKit'
],  function ($, EWA, FileKit) {

    EWA.component(function (data) {

        var File_DOM = this.$_View.find('[type="file"]')[0],
            VM = this,
            path = (new URL(data.action, (new EWA()).apiRoot))  +  '';

        function fallback(error) {

            VM.emit(
                {
                    type:    'error',
                    src:     data.action
                },
                error
            );
        }

        $.extend(data, {
            value:      data.value || '',
            percent:    data.value ? 100 : 0,
            preview:    function () {

                Promise.resolve(
                    this.value ?
                        $.delete(data.action, {file: this.value})  :  ''
                ).then(
                    FileKit.read.bind(FileKit, File_DOM.files[0])
                ).then(function () {

                    VM.value = arguments[0];    VM.percent = 0;

                }).catch( fallback );
            },
            clean:      function () {

                this.value = '';    File_DOM.value = '';

                this.emit('clean');
            },
            upload:     function () {

                var form = new FormData();

                form.append(
                    File_DOM.name, File_DOM.files[0], File_DOM.files[0].name
                );

                FileKit.upload(path,  form,  function () {

                    VM.percent = arguments[0];

                }).then(function () {

                    VM.emit(
                        {
                            type:    'upload',
                            src:     data.action
                        },
                        arguments[0]
                    );
                }).catch( fallback );
            }
        });
    });
});
