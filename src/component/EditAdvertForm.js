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
                user: state.user,
                advert: state.advert,
            });
        }
    });
 });