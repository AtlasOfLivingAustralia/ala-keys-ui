/**
 * Created by NKlaze on 10/04/2015.
 */

(function( $ ) {
    var json;

    $.fn.keybase = function() {
        var elem = $(this);

        if (arguments.length === 1) {
            var options = arguments[0];
        }

        if (arguments.length === 2) {
            var action = arguments[0];
            var options = arguments[1];
        }

        settings = $.extend({
            baseUrl: "http://keybase.rbg.vic.gov.au/ws/keyJSON",
            key: ""
        }, options);

        if (!json) {
            $.ajax({
                url: settings.baseUrl,
                data: {key_id: settings.key},
                dataType: "jsonp",
                async: false,
                success:function(data){
                    json = data;

                    $('<div>', {class: 'keybase-project-icon'})
                        .append('<img src="' + json.project.project_icon + '" alt="" />')
                        .appendTo('.keybase-key-metadata');

                    $('<h1>', {
                        html: '<span class="keybase-project-name">' + json.project.project_name + ':</span> <span class="keybase-key-name">' + json.key_name+ '</span>'
                    }).appendTo('.keybase-key-metadata');

                    // root node
                    rootNodeID = json.first_step.root_node_id;
                    next_id = rootNodeID;

                    //nestedSets();
                    //nextCouplet();

                }
            });

        }

    };



}( jQuery ));
