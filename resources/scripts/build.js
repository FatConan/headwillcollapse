// -- RequireJS config --
requirejs.config({
    baseUrl: '/resources/scripts',
    paths: {
        'text': ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'],
        'underscore': ['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min'],
        'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min'],
        'jquery-ui': ['https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min'],
        'domReady': ['./common/DomReady']
    },
    map: {

    },
    shim: {
        'jquery-ui': ['jquery'],
        'underscore': {
            exports: '_'
        }
    }
});