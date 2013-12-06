/**
  GdPlgn Range 0.1
  Author: G. Desjonqueres

  Plugin to manage a range of values
  It creates a UI component that permits the end user to set a
  minimum and/or maximum value by sliding two handle bars

  This plugin wraps around jquery ui "slider" plugin for the sliding handles
  It makes the use of "slider" easier by taking a set of key/value pairs
  (the keys don't need to be integers and no need for a step value) and
  it builds the legend automatically

  Use:
    $("#myDiv").range({
      "takeBoundValues":false,
      "range":{
        "0":"0","20":"20 yo","40":"40 yo","50":"50 yo","70":"70 yo","80":"more..."
    });
*/
(function($) {
  $.widget("gdplgn.range", {
    options: {
      // If FALSE, selecting the first or last value sets lower or upper value to NULL
      // Useful if you do not want bound ranges like: { >= x } or { <= x }
      takeBoundValues: true,

      // List of key/value pairs
      range: {
        /*1: 'v 1',
        3: 'v 3',
        50: 'v 50',
        55: 'v 55',
        70: 'v 70'*/
      },

      // Selected values
      values: {
        lower: null,
        upper: null
      },

      // User callback function to be called after updating lower or upper value
      change: null
    },


    _create: function() {

      this._slider = null;
      this._keys = [];    // List of range keys
      this._invKeys = []; // List of indexes for range keys
      this._labels = [];  // list of labels
      this._valueLabels = {
        lower: null,
        upper: null
      };
    
      var i = 0,
        that = this,
        o = this.options,
        lastEltInd,
        min,
        max,
        selected = [];

      $.each(o.range, function(key, val) {
        that._keys[i] = key;
        that._invKeys[key] = i;
        that._labels[i] = o.range[key];
        i++;
      });

      // Updates the selected values
      lastEltInd = this._keys.length - 1;
      if (o.takeBoundValues === false) {
        if (o.values.lower == this._keys[0] || o.values.lower == this._keys[lastEltInd]) {
          o.values.lower = null;
        }
        if (o.values.upper == this._keys[0] || o.values.upper == this._keys[lastEltInd]) {
          o.values.upper = null;
        }
      }
      if (o.values.lower) {
        this._valueLabels.lower = o.range[o.values.lower];
      }
      if (o.values.upper) {
        this._valueLabels.upper = o.range[o.values.upper];
      }

      min = 1;
      max = this._keys.length;

      // Set the position of the slider bars
      selected[0] = (o.values.lower ? this._invKeys[o.values.lower] + 1 : min);
      selected[1] = (o.values.upper ? this._invKeys[o.values.upper] + 1 : max);

      // Initialize jqueryui slider object
      this._slider = this.element.slider({
        range: true,
        min: min,
        max: max,
        values: selected,
        stop: function(event, ui) {
          var changed = false,
            old = {
              lower: o.values.lower,
              upper: o.values.upper
            },
            change;

          // If a minimum value is selected
          if (o.takeBoundValues || (ui.values[0] != min && ui.values[0] != max)) {
            o.values.lower = that._keys[ui.values[0] - 1];
            that._valueLabels.lower = that._labels[ui.values[0] - 1];
          }
          else {
            o.values.lower = null;
            that._valueLabels.lower = null;
          }
          
          // If a maximum value is selected
          if (o.takeBoundValues || (ui.values[1] != min && ui.values[1] != max)) {
            o.values.upper = that._keys[ui.values[1] - 1];
            that._valueLabels.upper = that._labels[ui.values[1] - 1];
          }
          else {
            o.values.upper = null;
            that._valueLabels.upper = null;
          }

          if (old.lower != o.values.lower) {
            changed = true;
            change = {
              bound: "lower",
              value: o.values.lower,
              values: [o.values.lower, o.values.upper]
            };

          }
          else if (old.upper != o.values.upper) {
            changed = true;
            change = {
              bound: "upper",
              value: o.values.upper,
              values: [o.values.lower, o.values.upper]
            };

          }
          if (changed) {
            that._trigger("change", event, change);
          }
        }
      });

      this._buildLegend();
    },

    _buildLegend: function() {
      var width = this._slider.width() / (this._keys.length - 1),
        $legend;

      $legend = $('<div class="ui-slider-legend"><label style="width:' + width + 'px;">'
            + this._labels.join('</label><label style="width:' + width + 'px;">') +
            '</label></div>').insertAfter(this._slider);
      $legend.children('label:first-child').css('width', (width / 2) + 5);
      $legend.children('label:first-child').css('text-align', 'left');
      $legend.children('label:last-child').css('width', (width / 2) + 15);
      $legend.children('label:last-child').css('text-align', 'right');
    },

    toArray: function() {
      var values = {
        lower: null,
        upper: null
      };
      if (this.options.values.lower !== null) {
        values.lower = {
          value: this.options.values.lower,
          label: this._valueLabels.lower
        };
      }
      if (this.options.values.upper !== null) {
        values.upper = {
          value: this.options.values.upper,
          label: this._valueLabels.upper
        };
      }
      return values;
    },

    values: function(index, newValue) {
      var newValues;

      if (arguments.length > 1) {
        this.options.values[index] = newValue;
        this._valueLabels[index] = this.options.range[newValue];
        this._slider.slider("values", index == 'lower' ? 0 : 1, this._invKeys[newValue] + 1);
        return;
      }

      if (arguments.length) {
        if (typeof arguments[0] == 'object') {
          newValues = arguments[0];
          this.options.values.lower = newValues.lower;
          this._valueLabels.lower = this.options.range[newValues.lower];
          this.options.values.upper = newValues.upper;
          this._valueLabels.upper = this.options.range[newValues.upper];
          this._slider.slider("values", [this._invKeys[newValues.lower] + 1, this._invKeys[newValues.upper] + 1]);
        }
        else {
          if (this.options.values && this.options.values.length) {
            return this.options.values[index];
          }
          else {
            return this.options.values.lower;
          }
        }
      }
      else {
        return this.options.values;
      }
    }
  });
})(jQuery);
