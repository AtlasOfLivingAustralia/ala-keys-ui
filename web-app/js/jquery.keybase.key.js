/**
 * Created by NKlaze on 10/04/2015.
 */

(function( $ ) {

    $.fn.keybase = function() {
        elem = this;

        if (arguments.length === 1) {
            var options = arguments[0];
        }

        if (arguments.length === 2) {
            var action = arguments[0];
            var options = arguments[1];
        }

        settings = $.extend({
            baseUrl: "http://keybase.rbg.vic.gov.au/ws/keyJSON",
            key: "",
            title: true,
            titleDiv: false,
            source: true,
            sourceDiv: false
        }, options);

        if (!json) {
            $.ajax({
                url: settings.baseUrl,
                data: {key_id: settings.key},
                dataType: "jsonp",
                async: false,
                success:function(data){
                    json = data;

                    if (settings.title) {
                        var titleDiv;
                        if (settings.titleDiv) {
                            titleDiv = settings.titleDiv;
                        }
                        else {
                            if (!$('.keybase-key-title').length) {
                                $(settings.playerDiv).append('<div class="keybase-key-title" style="clear:both"></div>');
                            }
                            titleDiv = '.keybase-key-title';
                        }

                        $('<div>', {class: 'keybase-project-icon'})
                            .append('<img src="' + json.project.project_icon + '" alt="" />')
                            .appendTo(titleDiv);

                        $('<h1>', {
                            style: "float:left;",
                            html: '<a href="/keybase/project/show/' + json.project.project_id + '"<span class="keybase-project-name">' + json.project.project_name + '</span></a>: <span class="keybase-key-name">' + json.key_name + '</span>'
                        }).appendTo(titleDiv);
                    }

                    if (settings.source) {
                        src = keySource();
                        if (src) {
                            var sourceDiv;
                            if (settings.sourceDiv) {
                                sourceDiv = settings.sourceDiv;
                            }
                            else {
                                if (!$('.keybase-key-source').length) {
                                    $('<div>', {class: 'keybase-key-source'})
                                        .appendTo(settings.playerDiv);
                                }
                                sourceDiv = '.keybase-key-source';
                            }

                            $('<div>', {class: 'keybase-key-source', html: src})
                                .appendTo(sourceDiv);
                        }
                    }

                    if (!$('.keybase-player-window').length) {
                        playerWindow();
                    }

                    // root node
                    rootNodeID = json.first_step.root_node_id;
                    next_id = rootNodeID;

                    nestedSets();
                    nextCouplet();
                    setPlayerEvents();
                }
            });

        }

        if (action === "indentedKey") {
            indentedKey();
        }

        if (action === "bracketedKey") {
            bracketedKey();
        }
    };

    var setPlayerEvents = function() {
        $('.keybase-player-currentnode').on('click', 'a', function( event ) {
            event.preventDefault();
            next_id = $(event.target).attr('href').replace("#l_", "");
            nextCouplet();
        });

        $('.keybase-player-path').on('click', 'a', function( event ) {
            event.preventDefault();
            var lead_id = $(event.target).attr('href').replace("#l_", "");
            next_id = getParent(lead_id);
            nextCouplet();
        });

        $('.keybase-player-stepback').on('click', 'a', function( event ) {
            event.preventDefault();
            var lead_id = $(event.target).attr('href').replace("#l_", "");
            next_id = getParent(lead_id);
            nextCouplet();
        });

        $('.keybase-player-startover').on('click', 'a.first-node', function( event ) {
            event.preventDefault();
            next_id = $(event.target).attr('href').replace("#l_", "");
            nextCouplet();
        });
    };

    var playerWindow = function() {
        $('<div>', {class: 'keybase-player-window'}).appendTo(settings.playerDiv);

        if (!$('.keybase-player-window').height()) {
            var panelHeight = $('.keybase-player-window').width() * 0.67;
            $('.keybase-player-window').css('height', panelHeight + 'px');
        }

        $('<div>', {class: 'keybase-player-leftpane'}).appendTo('.keybase-player-window');
        $('<div>', {class: 'keybase-player-currentnode'}).appendTo('.keybase-player-leftpane');
        $('<div>', {class: 'keybase-player-drag-updown'}).appendTo('.keybase-player-leftpane');
        $('<div>', {class: 'keybase-player-path'}).appendTo('.keybase-player-leftpane');
        $('<div>', {class: 'keybase-player-drag-leftright'}).appendTo('.keybase-player-window');
        $('<div>', {class: 'keybase-player-rightpane'}).appendTo('.keybase-player-window');
        $('<div>', {class: 'keybase-player-remainingitems'}).appendTo('.keybase-player-rightpane');
        $('<div>', {class: 'keybase-player-drag-updown'}).appendTo('.keybase-player-rightpane');
        $('<div>', {class: 'keybase-player-discardeditems'}).appendTo('.keybase-player-rightpane');


        $('.keybase-player-window').css({
            'position': 'relative'
        });
        $('.keybase-player-drag-leftright').css({
            'width': '6px',
            'height': '100%'
        });
        $('.keybase-player-drag-updown').css({
            'height': '6px',
            'width': '100%'
        });
        $('.keybase-player-leftpane, .keybase-player-rightpane').css({
            'height': '100%', 'position': 'absolute', 'top': '0px'
        });

        $('.keybase-player-leftpane').css({
            'width': (($('.keybase-player-window').width()*0.67) - 3) + 'px',
            'left': '0px'
        });
        $('.keybase-player-drag-leftright').css({
            'position': 'absolute',
            'top': '0px',
            'left': $('.keybase-player-leftpane').width() + 'px'
        });
        $('.keybase-player-rightpane').css({
            'width': (($('.keybase-player-window').width() * 0.33) - 3) + 'px',
            'left': ($('.keybase-player-leftpane').width() + 6) + 'px'
        });
        $('.keybase-player-currentnode, .keybase-player-path, ' +
            '.keybase-player-remainingitems, .keybase-player-discardeditems')
            .css({
                'position': 'absolute',
                'height': (($('.keybase-player-window').height()*0.5) - 3) + 'px',
                'width': '100%'
            });

        $('.keybase-player-drag-updown').css({
            'position': 'absolute',
            'top': (($('.keybase-player-window').height() * 0.5) - 3) + 'px'
        });
        $('.keybase-player-path, .keybase-player-discardeditems').css({
            'top': (($('.keybase-player-window').height() * 0.5) + 3) + 'px'
        });



        $('<h3>', {html: 'Current node'}).appendTo('.keybase-player-currentnode');
        $('<h3>', {html: 'Path'}).appendTo('.keybase-player-path');
        $('<h3>', {html: 'Remaining taxa'}).appendTo('.keybase-player-remainingitems');
        $('<h3>', {html: 'Discarded taxa'}).appendTo('.keybase-player-discardeditems');

        $('<div>').appendTo('.keybase-player-currentnode');
        $('<div>').appendTo('.keybase-player-path');
        $('<div>').appendTo('.keybase-player-remainingitems');
        $('<div>').appendTo('.keybase-player-discardeditems');

        $('.keybase-player-currentnode>div').css('height', ($('.keybase-player-currentnode').height()-$('.keybase-player-currentnode>h3').height()-(parseInt($('.keybase-player-currentnode>h3').css('padding-top'))*2)) + 'px');
        $('.keybase-player-path>div').css('height', ($('.keybase-player-path').height()-$('.keybase-player-path>h3').height()-(parseInt($('.keybase-player-path>h3').css('padding-top'))*2)) + 'px');
        $('.keybase-player-remainingitems>div').css('height', ($('.keybase-player-remainingitems').height()-$('.keybase-player-remainingitems>h3').height()-(parseInt($('.keybase-player-remainingitems>h3').css('padding-top'))*2)) + 'px');
        $('.keybase-player-discardeditems>div').css('height', ($('.keybase-player-discardeditems').height()-$('.keybase-player-discardeditems>h3').height()-(parseInt($('.keybase-player-discardeditems>h3').css('padding-top'))*2)) + 'px');


        // KeyBase Player menu
        $('<span>', {class: 'keybase-player-menu'}).appendTo('.keybase-player-currentnode h3');
        $('<span>', {class: 'keybase-player-startover'}).appendTo('.keybase-player-menu');
        $('<a>', {href: '#'}).appendTo('.keybase-player-startover');
        $('<span>', {class: 'keybase-player-stepback'}).appendTo('.keybase-player-menu');
        $('<a>', {href: '#'}).appendTo('.keybase-player-stepback');

        // Resize Player panes
        var position;
        $('.keybase-player-window .keybase-player-drag-leftright').mousedown(function(e){
            e.preventDefault();
            position = $('.keybase-player-window').offset();
            $(document).mousemove(function(e){
                if (e.pageX > position.left+190 &&
                    e.pageX < position.left+$('.keybase-player-window').width()-190) {
                    $('.keybase-player-leftpane').css("width",e.pageX-position.left);
                    $('.keybase-player-drag-leftright').css('left', e.pageX-position.left);
                    $('.keybase-player-rightpane').css({"left": e.pageX-position.left+6,
                        "width": ($('.keybase-player-window').width()-$('.keybase-player-leftpane').width()-6) + 'px'});
                    //$('.keybase-player-leftpane>div').css('width', $('.keybase-player-leftpane').width()-2);
                }
            })
        });

        $('.keybase-player-leftpane .keybase-player-drag-updown').mousedown(function(e) {
            e.preventDefault();
            position = $('.keybase-player-leftpane').offset();
            $(document).mousemove(function(e) {
                if (e.pageY > position.top+29
                    && e.pageY < position.top+$('.keybase-player-window').height()-32) {
                    $('.keybase-player-leftpane .keybase-player-drag-updown').css('top', e.pageY-position.top+2);
                    $('.keybase-player-currentnode').css("height", e.pageY-position.top);
                    $('.keybase-player-currentnode>div').css("height", e.pageY-position.top-37);
                    $('.keybase-player-path').css({'top': e.pageY-position.top+5,
                        'height': ($('.keybase-player-window').height()-$('.keybase-player-currentnode').height()-6) + 'px'});
                    $('.keybase-player-currentnode>div').css('height', ($('.keybase-player-currentnode').height()-$('.keybase-player-currentnode>h3').height()-(parseInt($('.keybase-player-currentnode>h3').css('padding-top'))*2)) + 'px');
                    $('.keybase-player-path>div').css('height', ($('.keybase-player-path').height()-$('.keybase-player-path>h3').height()-(parseInt($('.keybase-player-path>h3').css('padding-top'))*2)) + 'px');
                }
            })
        });

        $('.keybase-player-rightpane .keybase-player-drag-updown').mousedown(function(e) {
            e.preventDefault();
            position = $('.keybase-player-rightpane').offset();
            $(document).mousemove(function(e) {
                if (e.pageY > position.top+29
                    && e.pageY < position.top+$('.keybase-player-window').height()-32) {
                    $('.keybase-player-rightpane .keybase-player-drag-updown').css('top', e.pageY-position.top+2);
                    $('.keybase-player-remainingitems').css("height", e.pageY-position.top);
                    $('.keybase-player-remainingitems>div').css("height", e.pageY-position.top-37);
                    $('.keybase-player-discardeditems').css({'top': e.pageY-position.top+5,
                        'height': ($('.keybase-player-window').height()-$('.keybase-player-remainingitems').height()-6) + 'px'});
                    $('.keybase-player-remainingitems>div').css('height', ($('.keybase-player-remainingitems').height()-$('.keybase-player-remainingitems>h3').height()-(parseInt($('.keybase-player-remainingitems>h3').css('padding-top'))*2)) + 'px');
                    $('.keybase-player-discardeditems>div').css('height', ($('.keybase-player-discardeditems').height()-$('.keybase-player-discardeditems>h3').height()-(parseInt($('.keybase-player-discardeditems>h3').css('padding-top'))*2)) + 'px');
                }
            })
        });

        $(document).mouseup(function(e){
            $(document).unbind('mousemove');
        })




    };

    var keySource = function() {
        var source = json.source;
        var str;
        if (source.author && source.publication_year && source.title) {
            if (source.is_modified) {
                str = 'Modified from: ';
            }
            else {
                str = 'From: ';
            }

            str += '<b>' + source.author + '</b> (' + source.publication_year + '). ';
            if (source.journal) {
                str += source.title + '. <i>' + source.journal + '</i>';
                if (source.series) {
                    str += ', ser. ' + source.series;
                }
                str += ' <b>' + source.volume + '</b>';
                if (source.part) {
                    str += '(' + source.part + ')';
                }
                str += ': ' + source.page + '.';
            }
            else {
                if (source.in_title) {
                    str += source.title + '. In: ';
                    if (source.in_author) {
                        str += source.in_author + ', ';
                    }
                    str += '<i>' + source.in_title + '</i>';
                    if (source.volume) {
                        str += ' <b>' + source.volume + '</b>';
                    }
                    if (source.page) {
                        str += ', pp. ' + source.page;
                    }
                    str += '.';
                    if (source.publisher) {
                        str += ' ' + source.publisher;
                        if (source.place_of_publication) {
                            str += ',';
                        }
                        else {
                            str += '.';
                        }
                    }
                    if (source.place_of_publication) {
                        str += ' ' + source.place_of_publication + '.';
                    }
                }
            }
        }
        return str;
    };

    var nestedSets = function() {
        nested_sets = [];

        i = 1;
        getNode(rootNodeID);

        nested_sets.sort(function(a, b) {
            return a.left - b.left;
        });

        json.first_step.left = 1;
        json.first_step.right = Math.max.apply(Math, JSPath.apply('.right', nested_sets));

        //$('#response').JSONView(nested_sets);
    };

    var getNode = function(parentID) {
        var items = JSPath.apply('.leads{.parent_id==' + parentID + '}', json);
        $.each(items, function( index, item ) {
            i++;
            item.left = i;
            if (!item.item) {
                getNode(item.lead_id);
            }
            item.right = i;
            nested_sets.push(item);
        });
    };

    var nextCouplet = function() {
        if (next_id == rootNodeID) {
            left = json.first_step.left;
            right = json.first_step.right;
        }
        else {
            var curnode = JSPath.apply('.leads{.lead_id === "'+  next_id + '"}', json);
            left = curnode[0].left;
            right = curnode[0].right;
        }

        // Current node
        current_node = currentNode(next_id);

        if (current_node.length > 0) {
            var leads = [];
            $.each(current_node, function(index, item) {
                var lead = '<li><a href="#l_' + item.lead_id + '">' + item.lead_text + '</li>';
                leads.push(lead);
            });
            $('.keybase-player-currentnode:eq(0)>div:eq(0)').html('<ul>' + leads.join('') + '</ul>');
        }
        else {
            result = getResult();
            if (result[0].url) {
                var text = '<a href="' + result[0].url + '">' + result[0].item_name + '</a>';
            }
            else {
                var text = result[0].item_name;
            }
            $('.keybase-player-currentnode:eq(0)>div:eq(0)').html('<div class="keybase-player-result">Result: <b>' + text + '</b></div>');
        }

        $('.keybase-player-startover:eq(0)>a:eq(0)').attr('href', '#l_' + rootNodeID);
        $('.keybase-player-stepback:eq(0)>a:eq(0)').attr('href', '#l_' + next_id);


        // Path
        path = getPath();
        var leads = [];
        $.each(path, function(index, item) {
            var lead = '<li><a href="#l_' + item.lead_id + '">' + item.lead_text + '</li>';
            leads.push(lead);
        });
        $('.keybase-player-path:eq(0)>div:eq(0)').html('<ol>' + leads.join('') + '</ol>');

        // Remaining and discarded items
        auxRemaining();
        remainingItems();

        items = [];
        $.each(remaining_items, function(index, item) {
            var entity;
            entity = '<li>';
            if (item.url) {
                entity += '<a href="' + item.url + '">' + item.item_name + '</a>';
            }
            else {
                entity += item.item_name;
            }
            if (item.to_key) {
                entity += '<a href="/keybase/key/show/' + item.to_key + '"><span class="keybase-player-tokey"></span></a>';
            }
            if (item.link_to_item_name) {
                entity += ': ';
                if (item.link_to_url) {
                    entity += '<a href="' + item.link_to_url + '">' + item.link_to_item_name + '</a>';
                }
                else {
                    entity += item.link_to_item_name;
                }
                if (item.link_to_key) {
                    entity += '<a href="/keybase/key/show/' + item.link_to_key + '"><span class="keybase-player-tokey"></span></a>';
                }
            }
            entity += '</li>';
            items.push(entity);
        });

        $('.keybase-player-remainingitems:eq(0)>h3:eq(0)').html('Remaining items (' + remaining_items.length + ')');
        $('.keybase-player-remainingitems:eq(0)>div:eq(0)').html('<ul>' + items.join('') + '</ul>');

        items = [];
        $.each(discarded_items, function(index, item) {
            var entity;
            entity = '<li>';
            if (item.url) {
                entity += '<a href="' + item.url + '">' + item.item_name + '</a>';
            }
            else {
                entity += item.item_name;
            }
            if (item.to_key) {
                entity += '<a href="/keybase/key/show/' + item.to_key + '"><span class="keybase-player-tokey"></span></a>';
            }
            if (item.link_to_item_name) {
                entity += ': ';
                if (item.link_to_url) {
                    entity += '<a href="' + item.link_to_url + '">' + item.link_to_item_name + '</a>';
                }
                else {
                    entity += item.link_to_item_name;
                }
                if (item.link_to_key) {
                    entity += '<a href="/keybase/key/show/' + item.link_to_key + '"><span class="keybase-player-tokey"></span></a>';
                }
            }
            entity += '</li>';
            items.push(entity);
        });

        $('.keybase-player-discardeditems:eq(0)>h3:eq(0)').html('Discarded items (' + discarded_items.length + ')');
        $('.keybase-player-discardeditems:eq(0)>div:eq(0)').html('<ul>' + items.join('') + '</ul>');

    };

    var currentNode = function(parentID) {
        return JSPath.apply('.leads{.parent_id === "'+  parentID + '"}', json);
    };

    var getResult = function() {
        var item_id = JSPath.apply('.leads{.lead_id == "'+  next_id + '"}.item', json)[0];
        return JSPath.apply('.items{.item_id == "'+  item_id + '"}', json);
    };

    var getPath = function() {
        return JSPath.apply('.leads{.left <= ' + left + ' && .right >= ' + right + '}', json);
    };

    var auxRemaining = function() {
        aux_remaining = JSPath.apply('.leads{.item && .left >= ' + left + ' && .right <= ' + right + '}.item', json);
    };

    var remainingItems = function() {
        remaining_items = [];
        discarded_items = [];

        $.each(json.items, function(index, item) {
            if (aux_remaining.indexOf(item.item_id) > -1) {
                remaining_items.push(item);
            }
            else {
                discarded_items.push(item);
            }
        })
    };

    var getParent = function(leadID) {
        return JSPath.apply('.leads{.lead_id === "'+  leadID + '"}.parent_id[0]', json);
    };

    var indentedKey = function() {
        indented_key = [];
        var root = {};
        root.title = json.key_name;
        root.isFolder = true;
        root.expand = true;
        root.children = [];

        indentedKeyNode(rootNodeID, root);
        indented_key.push(root);
        $(settings.indentedKeyDiv).dynatree({
            children: indented_key,
            data: {mode: "all"},
            expand: true,
        });
    };

    var indentedKeyNode = function(parent_id, parent) {
        var children = JSPath('.{.parent_id==' + parent_id + '}', nested_sets);
        parent.children = [];
        if (children.length > 0) {
            var couplet = {};
            couplet.title = "Couplet";
            couplet.isFolder = true;
            couplet.expand = true;
            couplet.children = [];
            parent.children[0] = couplet;

            //parent.children = children;
            $.each(children, function(index, lead) {
                var child = $.extend({}, lead);
                child.title = lead.lead_text;
                child.href = "#" + lead.lead_id;
                child.expand = true;
                if (child.item == null) {
                    delete child.item;
                }
                delete child.lead_text;
                delete child.left;
                delete child.right;
                delete child.lead_id;
                delete child.parent_id;
                couplet.children[index] = child;
                indentedKeyNode(lead.lead_id, child);
            });
        }
        else {
            var taxa = {};
            taxa.title = "Item";
            taxa.isFolder = true;
            taxa.children = [];

            var taxon = {};
            taxon.title = JSPath.apply('.items{.item_id==' + parent.item + '}.item_name', json)[0];
            taxa.children[0] = taxon;
            //alert (taxon.title);
            delete parent.item;
            taxa.expand = true;
            parent.children[0] = taxa;
        }
    };

    var bracketedKey = function() {
        bracketed_key = [];
        parent_ids = JSPath.apply('.parent_id', nested_sets);
        var nodes = [];

        var root = {};
        root.title = json.key_name;
        root.isFolder = true;
        root.expand = true;
        root.children = [];

        $.each(parent_ids, function (index, parent) {
            if (nodes.indexOf(parent) == -1) {
                nodes.push(parent);

                var couplet = {};
                couplet.title = "Couplet";
                couplet.isFolder = true;
                couplet.expand = true;
                couplet.children = [];

                leads = JSPath.apply('.{.parent_id==' + parent + '}', nested_sets);
                $.each(leads, function(index, lead) {
                    var l = {};
                    l.title = lead.lead_text;
                    l.href = '#' + lead.lead_id;
                    l.expand = true;
                    l.children = [];
                    if (lead.item != null) {
                        var items = {};
                        items.title = "Item";
                        items.isFolder = true;
                        items.expand = true;
                        items.children = [];
                        var item = {};
                        item.title = JSPath.apply('.items{.item_id==' + lead.item + '}.item_name', json)[0];
                        item.expand = true;
                        items.children.push(item);
                        l.children.push(items);
                    }
                    couplet.children.push(l);
                });
                root.children.push(couplet);

            }
        });
        bracketed_key.push(root);

        $(settings.bracketedKeyDiv).dynatree({
            children: bracketed_key,
            data: {mode: "all"},
            expand: true
        });
    };

}( jQuery ));
