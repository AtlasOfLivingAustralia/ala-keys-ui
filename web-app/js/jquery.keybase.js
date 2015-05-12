/**
 * Created by NKlaze on 10/04/2015.
 */

var json;
var hierarchy;


$(function() {
    if ($('#project-box').length) {
        $('#project-box').keybaseProject('projectListHome', {});
    }

    if ($('#project-list').length) {
        $('#project-list').keybaseProject('projectList', {});
    }

    if ($('#keys-hierarchical').length) {
        $('#keys-hierarchical').keybaseProject('keysHierarchical', {params: {project: project_id}});

        $('#project-tab').on('click', 'a[href=#keys-hierarchical]', function(e) {
            $('#keys-hierarchical').keybaseProject('keysHierarchical', {params: {project: project_id}});
        });

        $('#project-tab').on('click', 'a[href=#keys-alphabetical]', function(e) {
            $('#keys-alphabetical').keybaseProject('keysAlphabetical', {params: {project: project_id}});
        });


    }

    if ($('#keybase-player').length) {
        $.fn.keybase({
            playerDiv: '#keybase-player',
            key: key_id
            //titleDiv: '.keybase-key-title',
            //sourceDiv: '.keybase-key-source'
        });
    }

    $('.nav-tabs').on('click', 'a[href=#tab_indented]', function (event ) {
        if ($('#tab_indented .dynatree-container').length === 0) {
            $.fn.keybase('indentedKey', {
                indentedKeyDiv: '#keybase-indented'
            });
        }
    });

    $('.nav-tabs').on('click', 'a[href=#tab_bracketed]', function (event ) {
        if ($('#tab_bracketed .dynatree-container').length === 0) {
            $.fn.keybase('bracketedKey', {
                bracketedKeyDiv: '#keybase-bracketed'
            });
        }
    });

});
