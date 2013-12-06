if (typeof GdPlgn === 'undefined') {
  GdPlgn = {};
}

/**
  GdPlgn AutoComplete 0.1
  Author: G. Desjonqueres

  Plugin autocomplete
  Brings a list of values to be selected resulting from a user search

  Performs an ajax request to get the values from the server

  Use:
    new GdPlgn.autoComplete('autocom', {
      "searchUri":"http://localhost/jquery-plugins/autocomplete/demo/ajax/index.php",
      "minLength": 2
    });
*/
(function($) {

  var autoComplete = function(elId, options) {

    var defaults = {
      searchUri: null,    // URI of the resource performing the search server side
      searchData: null,   // Parameters to send to the resource (other than the search term which is provided automatically as "lookup")
      delay: 300,         // Delay for the Ajax call
      minLength: 3        // Minimum text length expected before requesting the server
    };

    this.id = elId;
    if (typeof options !== 'object') {
      options = JSON.parse(options);
    }
    this.options = $.extend({}, defaults, options);

    this.init = function() {
      var that = this;

      this.$el = $("#" + elId);
      this.searchValue = null;
      this.successCount = 0;
      
      this.$el.on("keydown", function(event) {
        if (that.timeOutCllBck) {
          clearTimeout(that.timeOutCllBck);
        }
        that.timeOutCllBck = setTimeout(function() {
          if (that.searchValue !== that.$el.val()) {
            if (that.$el.val().length >= that.options.minLength) {
              that.search(that.$el.val());
            }
            else if (that.searchValue !== null) {
              that.$container.find(".results").hide();
              that.$container.find(".elements").empty();

            }
          }
        }, that.options.delay);
      });
      
      this.createElement();

      // Bind the object to the DOM
      this.$el.data("GdPlgnAutoComplete", this);
    };
    
    this.createElement = function() {
      this.$el.wrap('<div class="autocomplete" />');
      this.$container = $("<div />").insertAfter(this.$el);

      $('<div class="noresults">No result</div>' + "\n" +
        '<div class="results">' + "\n" +
        '<div class="instructions">Check values to select</div>' + "\n" +
        '<div class="elements"></div>' + "\n" +
        '</div>').appendTo(this.$container);

      this.$el.addClass("field");
    };
    
    this.search = function(term) {
      var that = this,
        data = $.extend({}, this.options.searchData, {lookup: term});

      GdBase.utils.post(
        this.options.searchUri,
        data,
        function(data) {
          that.searchValue = term;
          that.updateResults(data);
        }
      );
    };
    
    this.updateResults = function(data) {
      var that = this,
        isSuccessful = data.length >= 1 ? true : false,
        $elts;

      this.$container.find(".noresults").hide();
      this.$container.find(".results").hide();
      this.$container.find(".elements").empty();

      $elts = that.$container.find(".elements");
      $.each(data, function(index, item) {
        $elts.append('<span><input type="checkbox" id="cb_' + item.id + '" ' + 'name="' + item.id + '" value="' + item.label + '" />' + 
          '<label for="cb_' + item.id + '">' + item.id + ' - ' + item.label + '</label></span><br />');
      });
      
      if (isSuccessful) {
        this.$container.find(".results").show();
      }
      else {
        this.$container.find(".noresults").show();
      }

      /*if (parent.$.colorbox && isSuccessful && this.successCount == 0) {
        GdBase.utils.resizeColorBox(parent.$.colorbox, $("form"), $(".content"));
      }*/

      if (isSuccessful) {
        this.successCount++;
      }
    };

    this.values = function() {
      var values = {};

      this.$container.find("input:checked").each(function() {
        values[$(this).attr("name")] = $(this).val();
      });

      return values;
    };

    this.init();
  };
  
  GdPlgn.autoComplete = autoComplete;
  
})(jQuery);
