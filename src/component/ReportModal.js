define(function(require) {
    'use strict';
    
    var
        _          = require('underscore'),
        Component  = require('Component'),
        template   = require('/template/reportModal');
    
    return Component.extend({
        template: template,

        events: {
            self: {
                'state:changed': 'render'
            },
            store: 'handleStoreUpdate'
        },

        handleStoreUpdate: function(newState) {
            this.setState(newState);
        },

        filterState: function(state) {
            return _.extend({}, {
                advertDsid: state.advertDsid
            });
        }
    });
 });