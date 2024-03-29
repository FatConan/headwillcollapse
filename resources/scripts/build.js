// -- RequireJS config --
requirejs.config({
    baseUrl: '/resources/scripts',
    paths: {
        'text': ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'],
        'underscore': ['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min'],
        'jquery': ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min'],
        'jquery-ui': ['https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min'],
        'd3': ['https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min'],
        'delaunay':['/resources/scripts/brain/delaunay']
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