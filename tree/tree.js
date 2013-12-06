if (typeof GdPlgn === 'undefined') {
  GdPlgn = {};
}

/**
  GdPlgn Tree 0.1
  Author: G. Desjonqueres

  Plugin to build a tree of selectable nodes

  It takes a list of nodes, every selectable node has an id,
  it accepts a list of ids as pre-selection

  This plugin is built on top of the jquery plugin "Wd Tree"

  Use:
    new GdPlgn.tree('myTree', [
          {text: "Node 0", ChildNodes: [
              {id: "n00-00", text: "Node 0-0"},
              {id: "n00-01", text: "Node 0-1"}
            ]
          },
          {text: "Node 1", ChildNodes: [
              {id: "n01-00", text: "Node 1-0"},
              {id: "n01-01", text: "Node 1-1"},
              {id: "n01-02", text: "Node 1-2"},
              {id: "n01-03", text: "Node 1-3"}
            ]
          },
          {text: "Node 2", ChildNodes: [
              {id: "n02-00", text: "Node 2-0"},
              {text: "Node 2-1", ChildNodes: [
                  {id: "n02-01-00", text: "Node 2-1-0"},
                  {id: "n02-01-01", text: "Node 2-1-1"},
                  {id: "n02-01-02", text: "Node 2-1-2"},
                ]
              },
              {id: "n02-02", text: "Node 2-2"},
              {id: "n02-03", text: "Node 2-3"}
            ]
          }
        ],
        ['n01-03', 'n02-01-01']);
    });
*/
(function($) {

  var tree = function(elId, nodes, selected) {

    this.id = elId;
    this.$el = $("#" + this.id);

    if (typeof nodes !== 'object') {
      this.nodes = JSON.parse(nodes);
    }
    else {
      this.nodes = nodes;
    }
    if (typeof selected !== 'object') {
      this.selected = JSON.parse(selected);
    }
    else {
      this.selected = selected;
    }

    this.init = function() {
      var that = this,
        root;
      
      // patch...
      // "selected" doit contenir un tableau de string,
      // parfois les index numériques sont castés en int par php quand récupérés en POST
      // ce qui pose problème avec le $.inArray plus loin car les ids de la liste des nodes
      // sont uniquement des chaînes, eux
      $.each(that.selected, function(index, item) {
        if (typeof item == "number") {
          that.selected[index] = item.toString();
        }
      });

      this.recursive(this.nodes, this.selected);

      root = $.extend({}, this.treeDefaults, {
        "id" : "root",
        "text" : "Select all",
        "isexpand" : true,
        "ChildNodes" : this.nodes
      });
      this.$el.treeview({
        showcheck : true,
        data : [root],
        cbiconpath: "../vendors/tree/img/icons/"
      });

      // Attache l'ojet à l'élément du DOM
      this.$el.data("GdPlgnTree", this);
    };

    this.init();
  };

  tree.prototype = {
    treeDefaults: {
      "showcheck" : true,
      complete : true,
      "isexpand" : false,
      "checkstate" : 0,
      "hasChildren" : true
    },

    recursive: function(nodes, selected, parent, prefix) {
      if (prefix == null) {
        prefix = '';
      }

      for (var i = 0; i < nodes.length; i++) {

        nodes[i] = $.extend({}, this.treeDefaults, nodes[i]);

        if (!nodes[i].id) {
          nodes[i].id = (prefix != '' ? prefix + '_n' + i : 'n' + i);
        } else {
          nodes[i].value = nodes[i].id;
        }
        if ($.inArray(nodes[i].id, selected) != -1) {
          nodes[i].checkstate = 1;
          if (parent) {
            parent.checkstate = 2;
            parent.isexpand = true;
          }
        }

        if (nodes[i].ChildNodes == null) {
          nodes[i].hasChildren = false;
        } else {
          this.recursive(nodes[i].ChildNodes, selected, nodes[i], prefix + 'n' + i);
          if (nodes[i].checkstate == 2 && parent) {
            parent.checkstate = 2;
            parent.isexpand = true;
          }
        }
      }
    },

    getCheckedNodes: function() {
      var checkedItems = this.$el.getTSNs();
      var values = [];
      $.each(checkedItems, function(index, item) {
        if (item.value) {
          values.push({id: item.value, label: item.text});
        }
      });
      return values;
    },

    values: function() {
      var checkedItems = this.$el.getTSNs();
      var values = {};
      $.each(checkedItems, function(index, item) {
        if (item.value) {
          values[item.value] = item.text;
        }
      });
      return values;
    }
  };
  tree.prototype.toArray = tree.prototype.getCheckedNodes;

  GdPlgn.tree = tree;

})(jQuery);
