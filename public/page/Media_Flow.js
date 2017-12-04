define(['jquery', 'EasyWebApp'],  function ($, EWA) {

    function set_State(view, next) {

        view.$_View.mediaReady().then(function () {

            view.ready = next ? 0 : 2;
        });
    }

    return  function ($_List, onInit) {

        if ($_List instanceof Function)  onInit = $_List,  $_List = '';

        $_List = $_List || ':listview';

        onInit = (onInit instanceof Function)  &&  onInit;

        EWA.component(function (data) {

            var iWebApp = new EWA(),  VM = this,  next,
                list_view = this.$_View.find( $_List ).view();

            data = (data instanceof Array)  ?  {list: data}  :  data;

            data = (onInit  &&  onInit.call(iWebApp, VM, data))  ||  data;

            data = $.extend(data, {
                setNext:     function (event) {

                    if (! event.src)  return;

                    var link = event.header.link || '';

                    set_State(this,  next = (link.next || '').uri);
                },
                ready:       1,
                loadMore:    function () {

                    this.ready = 1;

                    $.getJSON(next,  function (list, _, XHR) {

                        if (VM.fixData instanceof Function)
                            list = VM.fixData({ }, list)  ||  list;

                        list_view.render(list, list_view.length);

                        set_State(
                            VM,
                            next = (
                                $.parseHeader( XHR.getAllResponseHeaders() )
                                    .link.next  ||  ''
                            ).uri
                        );
                    });
                }
            });

            VM.on('ready', data.setNext);

            return data;
        });
    };
});
