define([
    'module', 'jquery', 'medium-editor', 'EasyWebApp',
    'medium-editor-insert-plugin'
],  function (module, $, MediumEditor, EWA) {

    var iWebApp = new EWA();


    return  function (text_input, option, image_API, onInput) {

        var editor = new MediumEditor(text_input, $.extend({
                elementsContainer:
                    $( text_input ).offsetParent().is('html, body')  ?
                        text_input.parentNode  :  null,
                placeholder:          {text:  text_input.placeholder},
                autoLink:             true,
                imageDragging:        false,
                paste:                {
                    cleanPastedHTML:    true,
                    cleanTags:          [
                        'html', 'head', 'body',
                        'meta', 'title', 'style', 'link', 'script'
                    ],
                    cleanAttrs:         [ ]
                },
                anchor:               {
                    linkValidation:    true,
                    targetCheckbox:    true,
                }
            }, option));

        if (onInput instanceof Function)
            editor.subscribe('editableInput',  onInput.bind( editor ));

        if ( image_API ) {

            image_API = new URL(image_API, iWebApp.apiRoot);

            $( text_input ).mediumInsert({
                editor:    editor,
                addons:    {
                    images:    {
                        fileUploadOptions:    {
                            url:          image_API + '',
                            paramName:    'file',
                        },
                        deleteMethod:         'DELETE',
                        deleteScript:         image_API + ''
                    }
                }
            });
        }

        return editor;
    };
});
