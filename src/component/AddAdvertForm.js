define(function(require) {
    'use strict';
    
    var
    _           = require('underscore'),
    $           = require('jquery'),
    Component   = require('Component'),
    template    = require('/template/addAdvertForm');
 
    return Component.extend({

        template: template,

        filterState: function(state) {
            return _.extend({}, {});
        }
    });
 });