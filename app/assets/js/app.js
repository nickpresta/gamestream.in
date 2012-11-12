var App = {
    start: function() {
        this._initSort()
    },

    _initSort: function() {
        var $table = $('table')
        var config = {}
        var noSorts = $table.find('th[class~="no-sort"]')
        noSorts.each(function() {
            config[$(this).index()] = {sorter: false};
        })
        $table.tablesorter({headers: config})
    },

    _initSearch: function() {
    },
};

$(document).ready(function() {
    App.start();
});
