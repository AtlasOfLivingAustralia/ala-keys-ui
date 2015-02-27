$(function() {
    var url = 'http://localhost:8080/keybase/project/getprojects';
    $.getJSON(url, function(data) {
        var items = [];
        $.each(data.projects, function(index, item) {
            var li = '<li id="' + item.id + '">' + item.name + '</li>';
            items.push(li);
        });
        $('#projects').html('<ul>' + items.join('') + '</ul>');
    });
});