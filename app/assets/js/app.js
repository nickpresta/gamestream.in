var App = {
    start: function() {
        App._initEvents()
        App._initSort()
        App._initSearch()
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

    _initEvents: function() {
        $('.js-preview').click(App.__toggle_preview)
    },

    __toggle_preview: function() {
      if (! $(this).hasClass('open')) {
        App.__preview_content().insertAfter($(this).parents('tr'))
        $(this).addClass('open')
        $(this).find('i').attr('class', 'icon-eye-close')
        $(this).contents().filter(function() {
          return this.nodeType === 3;
        }).remove();
        $(this).append(' Close')
      } else {
        $(this).parents('tr').next().remove()
        $(this).removeClass('open')
        $(this).find('i').attr('class', 'icon-eye-open')
        $(this).contents().filter(function() {
          return this.nodeType === 3;
        }).remove();
        $(this).append(' Preview')
      }
    },
    __preview_content: function() {
      // This will be in a template, eventually
      return $('<tr><td colspan="6"><div class="align-center"><embed src="http://www.twitch.tv/widgets/live_embed_player.swf?channel=nickpresta"></embed></div></td></tr>')
    }

};

$(document).ready(function() {
    App.start();
});
