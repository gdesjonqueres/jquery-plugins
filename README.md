jQuery Plugins
==============

This is some plugins using jQuery I had to develop for my last project.
They are basically UI components for inputing values by the end user


Range
-----

Manages a range of values
It creates a UI component that permits the end user to set a
minimum and/or maximum value by sliding two handle bars

This plugin wraps around jquery ui "slider" plugin for the sliding handles
It makes the use of "slider" easier by taking a set of key/value pairs
(the keys don't need to be integers and no need for a step value) and
it builds the legend automatically

[See demo](http://epinaog.herokuapp.com/range/demo/)


Tree
----

Builds a tree of selectable nodes

It takes a list of nodes, every selectable node has an id,
it accepts a list of ids as pre-selection

This plugin is built on top of the jquery plugin "Wd Tree"

[See demo](http://epinaog.herokuapp.com/tree/demo/)



AutoComplete
------------

Brings a list of values to be selected resulting from a user search

Performs an ajax request to get the values from the server

[See demo](http://epinaog.herokuapp.com/autocomplete/demo/)
