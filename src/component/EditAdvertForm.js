define(function(require) {
    'use strict';
    
    var
    _           = require('underscore'),
    Component   = require('Component'),
    template    = require('/template/editAdvertForm');
 
    return Component.extend({

        template: template,

        filterState: function(state) {
            return _.extend({}, {
                advert: state.advert,
            });
        }
    });
 });