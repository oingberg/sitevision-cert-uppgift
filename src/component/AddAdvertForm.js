define(function(require) {
    'use strict';
    
    var
    _           = require('underscore'),
    Component   = require('Component'),
    template    = require('/template/addAdvertForm');
 
    return Component.extend({

        template: template,

        filterState: function(state) {
            return _.extend({}, {
                user: state.user,
                maxAmountOfAdverts: state.maxAmountOfAdverts,
                amountOfAdverts: state.amountOfAdverts
            });
        }
    });
 });